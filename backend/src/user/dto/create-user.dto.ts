import { IsEnum, IsOptional, IsNumber, IsString, IsArray } from 'class-validator';
import { RoomStatus, RoomType } from '../../room/entities/room.entity';

export class UpdateRoomStatusDto {
  @IsEnum(RoomStatus)
  status: RoomStatus;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsEnum(RoomType)
  roomType?: RoomType;

  @IsOptional()
  @IsNumber()
  pricePerNight?: number;

  @IsOptional()
  @IsNumber()
  maxAdults?: number;

  @IsOptional()
  @IsNumber()
  maxChildren?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  amenities?: string[];
}