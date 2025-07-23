import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    NO_SHOW = 'no_show'
}

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}

@Entity('bookings')
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    bookingReference: string;

    @ManyToOne(() => User, user => user.bookings, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;


    @Column()
    userId: number;

    @ManyToOne(() => Room, room => room.bookings, { eager: true })
    @JoinColumn({ name: 'roomId' })
    room: Room;

    @Column()
    roomId: number;

    @Column({ type: Date })
    checkInDate: Date;

    @Column({ type: Date })
    checkOutDate: Date;

    @Column()
    adults: number;

    @Column({ default: 0 })
    children: number;

    @Column()
    nights: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    paidAmount: number;

    @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
    status: BookingStatus;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;

    @Column('text', { nullable: true })
    specialRequests: string;

    @Column()
    guestFullName: string;

    @Column()
    guestEmail: string;

    @Column()
    guestPhone: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
