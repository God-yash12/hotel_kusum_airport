import { Room, RoomType } from "@/types/RoomTypes";





export const roomsData: Record<RoomType, Room> = {
  'deluxe': {
    id: '1',
    name: 'Deluxe Room',
    slug: 'deluxe',
    price: 150,
    description: 'Experience luxury in our spacious Deluxe Room featuring modern amenities, elegant decor, and stunning city views. Perfect for both business and leisure travelers.',
    shortDescription: 'Spacious room with modern amenities and city views',
    images: [
      '/images/deluxe-1.jpg',
      '/images/deluxe-2.jpg',
      '/images/deluxe-3.jpg',
      '/images/deluxe-4.jpg'
    ],
    features: [
      'King size bed',
      'City view',
      'Free Wi-Fi',
      'Air conditioning',
      'Mini bar',
      'Flat screen TV',
      'Work desk',
      'Room service'
    ],
    amenities: [
      'Private bathroom',
      'Complimentary toiletries',
      'Hair dryer',
      'Safe',
      'Coffee maker'
    ],
    maxGuests: 2,
    size: '35 sqm',
    bedType: 'King bed'
  },
  'premium-suite': {
    id: '2',
    name: 'Premium Suite',
    slug: 'premium-suite',
    price: 250,
    description: 'Indulge in our Premium Suite with separate living area, premium furnishings, and exclusive access to concierge services. Ideal for extended stays and special occasions.',
    shortDescription: 'Luxury suite with separate living area and premium amenities',
    images: [
      '/images/premium-1.jpg',
      '/images/premium-2.jpg',
      '/images/premium-3.jpg',
      '/images/premium-4.jpg'
    ],
    features: [
      'Separate living area',
      'King size bed',
      'Ocean view',
      'Premium Wi-Fi',
      'Climate control',
      'Premium mini bar',
      '55" Smart TV',
      'Executive desk',
      '24/7 room service',
      'Concierge service'
    ],
    amenities: [
      'Marble bathroom',
      'Premium toiletries',
      'Bathrobe & slippers',
      'In-room safe',
      'Espresso machine',
      'Welcome amenities'
    ],
    maxGuests: 3,
    size: '55 sqm',
    bedType: 'King bed + Sofa bed'
  },
  'executive-suite': {
    id: '3',
    name: 'Executive Suite',
    slug: 'executive-suite',
    price: 350,
    description: 'Our Executive Suite offers the ultimate in luxury with panoramic views, premium amenities, and exclusive executive lounge access. Perfect for business executives and VIP guests.',
    shortDescription: 'Ultimate luxury suite with panoramic views and executive privileges',
    images: [
      '/images/executive-1.jpg',
      '/images/executive-2.jpg',
      '/images/executive-3.jpg',
      '/images/executive-4.jpg'
    ],
    features: [
      'Panoramic city view',
      'Executive lounge access',
      'King size bed',
      'Separate living room',
      'High-speed Wi-Fi',
      'Smart climate control',
      'Premium entertainment system',
      'Executive workspace',
      'Butler service',
      'Priority room service'
    ],
    amenities: [
      'Luxury marble bathroom',
      'Premium spa toiletries',
      'Plush bathrobe & slippers',
      'Digital safe',
      'Nespresso machine',
      'Premium welcome gifts',
      'Turndown service'
    ],
    maxGuests: 4,
    size: '75 sqm',
    bedType: 'King bed + Living area'
  },
  'standard-suite': {
    id: '4',
    name: 'Standard Suite',
    slug: 'standard-suite',
    price: 120,
    description: 'Our comfortable Standard Suite provides all essential amenities for a pleasant stay. Great value for money with quality service and modern facilities.',
    shortDescription: 'Comfortable suite with essential amenities and great value',
    images: [
      '/images/standard-1.jpg',
      '/images/standard-2.jpg',
      '/images/standard-3.jpg',
      '/images/standard-4.jpg'
    ],
    features: [
      'Queen size bed',
      'Garden view',
      'Free Wi-Fi',
      'Air conditioning',
      'Mini refrigerator',
      '32" TV',
      'Work area',
      'Daily housekeeping'
    ],
    amenities: [
      'Private bathroom',
      'Standard toiletries',
      'Hair dryer',
      'In-room safe',
      'Tea/coffee facilities'
    ],
    maxGuests: 2,
    size: '28 sqm',
    bedType: 'Queen bed'
  }
};
