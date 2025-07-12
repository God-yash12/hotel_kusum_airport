// types/RoomTypes.ts
export interface Room {
  id: string | number;
  title: string;
  description: string;
  image: string;
  price: number;
  isAvailable: boolean;
  currency?: string;
  amenities?: string[];
  maxGuests?: number;
  bedType?: string;
  roomSize?: string;
  category?: string;
}

export interface RoomCardProps {
  room: Room;
  onBookNow?: (room: Room) => void;
  onReadMore?: (room: Room) => void;
  className?: string;
  showAmenities?: boolean;
  animationDelay?: number;
}

export interface RoomsGridProps {
  rooms: Room[];
  onBookNow?: (room: Room) => void;
  onReadMore?: (room: Room) => void;
  className?: string;
  showAmenities?: boolean;
  animationDelay?: number;
  gridConfig?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}