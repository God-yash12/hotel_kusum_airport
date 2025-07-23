import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

export enum BookingStatus {
  DRAFT = 'draft',              // Stage 1-3: Booking in progress
  PENDING_PAYMENT = 'pending_payment', // Stage 4: Ready for payment
  CONFIRMED = 'confirmed',       // Payment successful
  CANCELLED = 'cancelled',       // Cancelled by user/admin
  COMPLETED = 'completed',       // Guest checked out
  NO_SHOW = 'no_show'           // Guest didn't arrive
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',          // Advance payment
  PAID = 'paid',
  REFUNDED = 'refunded'
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookingReference: string;

  // ===== STAGE 1: AVAILABILITY SEARCH DATA =====
  @Column({ type: 'date' })
  checkInDate: Date;

  @Column({ type: 'date' })
  checkOutDate: Date;

  @Column()
  adults: number;

  @Column({ default: 0 })
  children: number;

  @Column()
  nights: number; // calculated

  // ===== STAGE 2: ROOM SELECTION =====
  @ManyToOne(() => Room, room => room.bookings)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  roomId: number;

  // ===== STAGE 3: GUEST DETAILS =====
  @Column()
  guestFullName: string;

  @Column()
  guestEmail: string;

  @Column()
  guestPhone: string;

  @Column('text', { nullable: true })
  specialRequests: string;

  // ===== STAGE 4: PAYMENT & CONFIRMATION =====
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.DRAFT
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus: PaymentStatus;

  // ===== USER RELATIONSHIP (Optional for guest bookings) =====
  @ManyToOne(() => User, user => user.bookings, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  // ===== ADMIN NOTES =====
  @Column('text', { nullable: true })
  adminNotes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}