// src/services/room.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Room, RoomType, RoomStatus } from '../room/entities/room.entity';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import { CheckAvailabilityDto } from '../booking/dto/create-booking.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  // STAGE 1: Check room availability
  async checkAvailability(availabilityDto: CheckAvailabilityDto) {
    const { checkInDate, checkOutDate, adults, children } = availabilityDto;

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }

    if (checkOut <= checkIn) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    // Get all active rooms that can accommodate guests
    const allSuitableRooms = await this.roomRepository.find({
      where: {
        maxAdults: adults >= 1 ? adults : 1,
        maxChildren: children >= 0 ? children : 0,
        isActive: true,
        status: Not(In([RoomStatus.OUT_OF_ORDER, RoomStatus.BLOCKED]))
      }
    });

    // Get rooms that are already booked for these dates
    const bookedRoomIds = await this.getBookedRoomIds(checkInDate, checkOutDate);

    // Filter out booked rooms and rooms under maintenance
    const availableRooms = allSuitableRooms.filter(room => 
      !bookedRoomIds.includes(room.id) && 
      room.status === RoomStatus.AVAILABLE
    );

    // Group by room type with availability count
    const availability = this.groupRoomsByTypeWithCount(availableRooms);

    return {
      searchCriteria: {
        checkInDate,
        checkOutDate,
        adults,
        children,
        nights: Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      },
      availability,
      availableRooms: availableRooms.map(room => ({
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        amenities: room.amenities,
        description: room.description,
        maxAdults: room.maxAdults,
        maxChildren: room.maxChildren
      }))
    };
  }

  private async getBookedRoomIds(checkInDate: Date, checkOutDate: Date): Promise<number[]> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.status NOT IN (:...cancelledStatuses)', {
        cancelledStatuses: [BookingStatus.CANCELLED, BookingStatus.NO_SHOW]
      })
      .andWhere(
        '(booking.checkInDate < :checkOutDate AND booking.checkOutDate > :checkInDate)',
        { checkInDate, checkOutDate }
      )
      .getMany();

    return bookings.map(booking => booking.roomId);
  }

  private groupRoomsByTypeWithCount(rooms: Room[]) {
    const grouped = rooms.reduce((acc, room) => {
      if (!acc[room.roomType]) {
        acc[room.roomType] = {
          roomType: room.roomType,
          availableCount: 0,
          pricePerNight: room.pricePerNight,
          maxAdults: room.maxAdults,
          maxChildren: room.maxChildren,
          amenities: room.amenities,
          description: room.description,
          sampleRoomNumbers: []
        };
      }
      acc[room.roomType].availableCount++;
      acc[room.roomType].sampleRoomNumbers.push(room.roomNumber);
      return acc;
    }, {});

    return Object.values(grouped);
  }

  // Admin functions
  async updateRoomStatus(roomId: number, status: RoomStatus, adminNotes?: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    room.status = status;
    return await this.roomRepository.save(room);
  }

  async getAllRoomsForAdmin() {
    return await this.roomRepository.find({
      relations: ['bookings'],
      order: { roomNumber: 'ASC' }
    });
  }

  async getRoomWithCurrentBooking(roomId: number) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['bookings']
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Get current active booking
    const currentBooking = await this.bookingRepository.findOne({
      where: {
        roomId,
        status: In([BookingStatus.CONFIRMED, BookingStatus.PENDING_PAYMENT])
      },
      relations: ['user']
    });

    return {
      room,
      currentBooking
    };
  }
}