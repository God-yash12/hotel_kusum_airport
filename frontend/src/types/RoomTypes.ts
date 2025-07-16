export interface Room {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  amenities: string[];
  maxGuests: number;
  size: string;
  bedType: string;
}

export type RoomType = 'deluxe' | 'premium-suite' | 'executive-suite' | 'standard-suite';
