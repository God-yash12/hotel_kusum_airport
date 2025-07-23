import { IsString, IsEmail, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class GuestDetailsDto {
    @IsInt()
    bookingId: number;

    @IsString()
    guestFullName: string;

    @IsEmail()
    guestEmail: string;

    @IsString()
    guestPhone: string;

    @IsOptional()
    @IsString()
    specialRequests?: string;
}



export class ConfirmPaymentDto {
    @IsInt()
    bookingId: number;

    @IsNumber()
    @Min(0)
    paidAmount: number;
}