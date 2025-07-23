
import { IsDateString, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';


export class CheckAvailabilityDto  {
    @IsDateString()
    checkInDate: Date;

    @IsDateString()
    checkOutDate: Date;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    adults: number;


    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(0)
    children: number;


}


export class SelectRoomDto {
    @IsInt()
    roomId: number;

    @IsDateString()
    checkInDate: string;

    @IsDateString()
    checkOutDate: string;

    @IsInt()
    adults: number;

    @IsInt()
    children: number;
}


