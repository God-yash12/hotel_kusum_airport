import { Controller, Post, Get, Body, Param, UseGuards, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { SelectRoomDto } from './dto/create-booking.dto';
import { GuestDetailsDto } from '../room/dto/create-room.dto';
import { ConfirmPaymentDto } from '../room/dto/create-room.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // STAGE 2: Create draft booking with room selection
  @Post('draft')
  async createDraftBooking(@Body() selectRoomDto: SelectRoomDto) {
    return await this.bookingService.createDraftBooking(selectRoomDto);
  }

  // STAGE 3: Add guest details
  @Put('guest-details')
  async addGuestDetails(@Body() guestDetailsDto: GuestDetailsDto) {
    return await this.bookingService.addGuestDetails(guestDetailsDto);
  }

  // STAGE 4: Confirm payment
  @Post('confirm-payment')
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return await this.bookingService.confirmPayment(confirmPaymentDto);
  }

  // Get booking details
  @Get(':id')
  async getBooking(@Param('id') id: number) {
    return await this.bookingService.getBookingById(id);
  }

  // ADMIN ENDPOINTS
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  async getAllBookings() {
    return await this.bookingService.getAllBookings();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('admin/:id/cancel')
  async cancelBooking(
    @Param('id') bookingId: number,
    @Body('adminNotes') adminNotes?: string
  ) {
    return await this.bookingService.cancelBooking(bookingId, adminNotes);
  }
}