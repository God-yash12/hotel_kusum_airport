import { RoomsGrid } from '@/components/rooms/RoomsGrid';
import { Room } from '@/types/RoomCard';
import RoomBg from '@/assets/room-bg.jpg';

const fetchRooms = (): Room[] => [
    {
        id: 1,
        title: 'Deluxe Ocean View',
        description: 'Experience breathtaking ocean views from this spacious room with a private balcony and premium amenities.',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
        price: 299,
        isAvailable: true,
        category: 'Premium',
        amenities: ['Ocean View', 'Private Balcony', 'Mini Bar', 'Free WiFi'],
        maxGuests: 2,
        bedType: 'King Bed',
        roomSize: '45 m²',
    },
    {
        id: 2,
        title: 'Executive Suite',
        description: 'Luxurious suite with separate living area, perfect for business travelers or romantic getaways.',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        price: 499,
        isAvailable: true,
        category: 'Premium',
        amenities: ['Ocean View', 'Private Balcony', 'Mini Bar', 'Free WiFi'],
        maxGuests: 2,
        bedType: 'King Bed',
        roomSize: '45 m²',
    },
    {
        id: 2,
        title: 'Executive Suite',
        description: 'Luxurious suite with separate living area, perfect for business travelers or romantic getaways.',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        price: 499,
        isAvailable: true,
        category: 'Suite',
        amenities: ['Living Room', 'Executive Lounge Access', 'Jacuzzi'],
        maxGuests: 3,
        bedType: 'King Bed + Sofa',
        roomSize: '75 m²',
    },
    // Add more rooms as needed
];

export default function RoomsPage() {
    const rooms = fetchRooms();

    const handleBookNow = (room: Room) => {
        console.log('Booking room:', room.title);
        // Add your booking logic here
    };

    const handleReadMore = (room: Room) => {
        console.log('View details:', room.title);
        // Add navigation or modal logic here
    };

    return (
        <div className="relative"
          style={{ backgroundImage: `url(${RoomBg})` }}>

            <div
                className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
              
            >
                <div className="backdrop-blur-sm min-h-screen">
                    <div className="container mx-auto px-4 py-16">
                        <div className="text-center mb-12  text-shadow-lg">
                            <h1 className="text-4xl font-bold mb-4 text-amber-600">Our Accommodations</h1>
                            <p className="text-xl max-w-2xl mx-auto">
                                Discover our collection of thoughtfully designed rooms for your perfect stay
                            </p>
                        </div>

                        <RoomsGrid
                            rooms={rooms}
                            onBookNow={handleBookNow}
                            onReadMore={handleReadMore}
                            showAmenities={true}
                            animationDelay={150}
                            gridConfig={{ sm: 1, md: 2, lg: 3, xl: 3 }}
                            className="px-4"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}