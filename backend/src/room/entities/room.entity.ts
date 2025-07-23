import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

export enum RoomType {
  DELUXE = 'deluxe',
  EXECUTIVE_SUITE = 'executive_suite',
  STANDARD_SUITE = 'standard_suite',
  PREMIUM_SUITE = 'premium_suite'
}

export enum RoomStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  MAINTENANCE = 'maintenance',
  OUT_OF_ORDER = 'out_of_order',
  BLOCKED = 'blocked'
}

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roomNumber: string;

  @Column({
    type: 'enum',
    enum: RoomType
  })
  roomType: RoomType;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE
  })
  status: RoomStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerNight: number;

  @Column()
  maxAdults: number; // max adults capacity

  @Column({ default: 2 })
  maxChildren: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column({ default: true })
  isActive: boolean; // Admin can deactivate rooms

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}