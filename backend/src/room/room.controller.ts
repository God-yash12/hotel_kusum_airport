// src/controllers/room.controller.ts
import { Controller, Get, Query, UseGuards, Param, Put, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { CheckAvailabilityDto } from '../booking/dto/create-booking.dto';
import { JwtAuthGuard } from '../guards//jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateRoomStatusDto } from '../user/dto/create-user.dto';
import { RoomStatus } from './entities/room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // STAGE 1: Check availability (Public endpoint)
  @Get('availability')
  async checkAvailability(@Query() availabilityDto: CheckAvailabilityDto) {
    return await this.roomService.checkAvailability(availabilityDto);
  }

  @Get('types')
  async getRoomTypes() {
    return {
      roomTypes: [
        {
          type: 'deluxe',
          name: 'Deluxe Room',
          description: 'Comfortable room with modern amenities',
          basePrice: 150
        },
        {
          type: 'executive_suite',
          name: 'Executive Suite', 
          description: 'Spacious suite for business travelers',
          basePrice: 250
        },
        {
          type: 'standard_suite',
          name: 'Standard Suite',
          description: 'Perfect for families and longer stays',
          basePrice: 200
        },
        {
          type: 'premium_suite',
          name: 'Premium Suite',
          description: 'Luxury suite with premium amenities',
          basePrice: 350
        }
      ]
    };
  }

  // ADMIN ENDPOINTS
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  async getAllRooms() {
    return await this.roomService.getAllRoomsForAdmin();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/:id')
  async getRoomDetails(@Param('id') roomId: number) {
    return await this.roomService.getRoomWithCurrentBooking(roomId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('admin/:id/status')
  async updateRoomStatus(
    @Param('id') roomId: number,
    @Body() updateStatusDto: UpdateRoomStatusDto
  ) {
    return await this.roomService.updateRoomStatus(
      roomId, 
      updateStatusDto.status, 
      updateStatusDto.adminNotes
    );
  }
}