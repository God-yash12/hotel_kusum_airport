import { RoomsGrid } from '@/components/rooms/RoomsGrid';
import { Room } from '@/types/RoomCard';
import RoomBg from '@/assets/room-bg.jpg';
import useFadeIn  from '@/hooks/UseFadeIn';

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
        id: 3,
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
];

export default function RoomsPage() {
    const rooms = fetchRooms();
    
    // Use the imported hook for different elements with staggered delays
    const titleVisible = useFadeIn(200);
    const descriptionVisible = useFadeIn(400);
    const gridVisible = useFadeIn(600);

    const handleBookNow = (room: Room) => {
        console.log('Booking room:', room.title);
        // Add your booking logic here
    };

    const handleReadMore = (room: Room) => {
        console.log('View details:', room.title);
        // Add navigation or modal logic here
    };

    return (
        <div className="relative">
            <div
                style={{ backgroundImage: `url(${RoomBg})` }}
                className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
            >
                <div className='absolute inset-0 opacity-20'></div>
                
                <div className="backdrop-blur-sm min-h-screen relative z-10">
                    <div className="container mx-auto px-4 py-16">
                        <div className="text-center mb-12 text-shadow-lg">
                            <h1 className={`text-4xl font-bold mb-4 text-amber-600 transition-all duration-1000 ${
                                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                                Our Accommodations
                            </h1>
                            <p className={`text-xl max-w-2xl mx-auto text-gray-800 transition-all duration-1000 ${
                                descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                                Discover our collection of thoughtfully designed rooms for your perfect stay
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 ${
                            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
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
        </div>
    );
}