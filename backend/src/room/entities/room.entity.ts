import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "src/booking/entities/booking.entity";

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
    OCCUPIED = 'occupied'
}

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    roomNumber: string;

    @Column({ type: 'enum', enum: RoomType })
    roomType: RoomType;

    @Column({ type: 'enum', enum: RoomStatus, default: RoomStatus.AVAILABLE })
    roomStatus: RoomStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    pricePerNight: number;

    @Column()
    capacity: number;   // for max adults

    @Column({ default: 2 })
    maxChildren: number;

    @Column({ type: 'text', nullable: true })
    description: string;


    @Column('simple-array', { nullable: true })
    amenities: string[];  // e.g., WiFi, TV, AC, etc.


    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @OneToMany(() => Booking, booking => booking.room)
    bookings: Booking[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
