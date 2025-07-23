// src/services/booking.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus, PaymentStatus } from '../booking/entities/booking.entity';
import { Room, RoomStatus } from '../room/entities/room.entity';
import { SelectRoomDto } from './dto/create-booking.dto';
import { GuestDetailsDto } from '../room/dto/create-room.dto';
import { ConfirmPaymentDto } from '../room/dto/create-room.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  // STAGE 2: Create draft booking with room selection
  async createDraftBooking(selectRoomDto: SelectRoomDto): Promise<Booking> {
    const { roomId, checkInDate, checkOutDate, adults, children } = selectRoomDto;

    // Validate room availability
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.status !== RoomStatus.AVAILABLE) {
      throw new BadRequestException('Room is not available');
    }

    // Double-check room is not booked for these dates
    const isAvailable = await this.isRoomAvailableForDates(roomId, checkInDate, checkOutDate);
    if (!isAvailable) {
      throw new BadRequestException('Room is already booked for selected dates');
    }

    // Calculate nights and total amount
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * room.pricePerNight;

    // Create draft booking (STAGE 2 complete)
    const booking = this.bookingRepository.create({
      bookingReference: this.generateBookingReference(),
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults,
      children,
      nights,
      totalAmount,
      status: BookingStatus.DRAFT,
      paymentStatus: PaymentStatus.PENDING
    });

    return await this.bookingRepository.save(booking);
  }

  // STAGE 3: Add guest details to draft booking
  async addGuestDetails(guestDetailsDto: GuestDetailsDto): Promise<Booking> {
    const { bookingId, guestFullName, guestEmail, guestPhone, specialRequests } = guestDetailsDto;

    const booking = await this.bookingRepository.findOne({ 
      where: { id: bookingId, status: BookingStatus.DRAFT }
    });

    if (!booking) {
      throw new NotFoundException('Draft booking not found');
    }

    // Update booking with guest details (STAGE 3 complete)
    booking.guestFullName = guestFullName;
    booking.guestEmail = guestEmail;
    booking.guestPhone = guestPhone;
    booking.specialRequests = specialRequests || '';
    booking.status = BookingStatus.PENDING_PAYMENT; // Ready for payment

  
    return await this.bookingRepository.save(booking);
  }

  // STAGE 4: Confirm payment and finalize booking
  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<Booking> {
    const { bookingId, paidAmount } = confirmPaymentDto;

    const booking = await this.bookingRepository.findOne({ 
      where: { id: bookingId, status: BookingStatus.PENDING_PAYMENT },
      relations: ['room']
    });

    if (!booking) {
      throw new NotFoundException('Booking not found or not ready for payment');
    }

    // Update payment information
    booking.paidAmount = paidAmount;
    booking.status = BookingStatus.CONFIRMED;

    if (paidAmount >= booking.totalAmount) {
      booking.paymentStatus = PaymentStatus.PAID;
    } else if (paidAmount > 0) {
      booking.paymentStatus = PaymentStatus.PARTIAL;
    }

    // Update room status to BOOKED
    await this.roomRepository.update(booking.roomId, { 
      status: RoomStatus.BOOKED 
    });

    return await this.bookingRepository.save(booking);
  }

  private async isRoomAvailableForDates(roomId: number, checkInDate: string, checkOutDate: string): Promise<boolean> {
    const conflictingBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.roomId = :roomId', { roomId })
      .andWhere('booking.status NOT IN (:...cancelledStatuses)', {
        cancelledStatuses: [BookingStatus.CANCELLED, BookingStatus.NO_SHOW]
      })
      .andWhere(
        '(booking.checkInDate < :checkOutDate AND booking.checkOutDate > :checkInDate)',
        { checkInDate, checkOutDate }
      )
      .getCount();

    return conflictingBookings === 0;
  }

  private generateBookingReference(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `HTL${timestamp.slice(-6)}${random}`;
  }

  // Get booking details
  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room', 'user']
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  // Admin functions
  async getAllBookings(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['room', 'user'],
      order: { createdAt: 'DESC' }
    });
  }

  async cancelBooking(bookingId: number, adminNotes?: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['room']
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = BookingStatus.CANCELLED;
    booking.adminNotes = adminNotes || '';

    // Free up the room
    await this.roomRepository.update(booking.roomId, { 
      status: RoomStatus.AVAILABLE 
    });

    return await this.bookingRepository.save(booking);
  }
}