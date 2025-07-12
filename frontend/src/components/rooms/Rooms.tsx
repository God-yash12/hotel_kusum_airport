import React from 'react';
import { Star, Wifi, Car, Coffee, Tv, Wind, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import RoomBg from '@/assets/room-bg.jpg';
import UseFadeIn from '@/hooks/UseFadeIn';
import Room1 from '@/assets/room1.jpg';
import { CircleArrowRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';


// Room data interface
interface Room {
    id: number;
    title: string;
    price: number;
    image: string;
    available: boolean;
    rating: number;
    features: string[];
    description: string;
}

// Sample room data
const roomsData: Room[] = [
    {
        id: 1,
        title: "Executive Suite",
        price: 299,
        image: Room1,
        available: true,
        rating: 4.8,
        features: ["Free WiFi", "Parking", "Coffee Maker", "Smart TV"],
        description: "Luxurious executive suite with panoramic city views and premium amenities for the discerning traveler."
    },
    {
        id: 2,
        title: "Deluxe Ocean View",
        price: 399,
        image: Room1,
        available: true,
        rating: 4.9,
        features: ["Ocean View", "Balcony", "Mini Bar", "AC"],
        description: "Breathtaking ocean views with private balcony and modern furnishings for an unforgettable stay."
    },
    {
        id: 3,
        title: "Premium Family Room",
        price: 249,
        image: Room1,
        available: false,
        rating: 4.7,
        features: ["Family Size", "Kitchenette", "Free WiFi", "Parking"],
        description: "Spacious family accommodation with separate living area and all essential amenities for comfort."
    },
    {
        id: 4,
        title: "Business Class Single",
        price: 189,
        image: Room1,
        available: true,
        rating: 4.6,
        features: ["Work Desk", "Fast WiFi", "Coffee Maker", "Printer"],
        description: "Perfect for business travelers with dedicated workspace and high-speed connectivity."
    },
    {
        id: 5,
        title: "Luxury Penthouse",
        price: 599,
        image: Room1,
        available: true,
        rating: 5.0,
        features: ["Penthouse", "Jacuzzi", "Butler Service", "City View"],
        description: "Ultimate luxury experience with personalized service and exclusive amenities."
    },
    {
        id: 6,
        title: "Standard Comfort Room",
        price: 149,
        image: Room1,
        available: true,
        rating: 4.5,
        features: ["Queen Bed", "Free WiFi", "AC", "Room Service"],
        description: "Comfortable and affordable accommodation with all essential amenities for a pleasant stay."
    }
];

// Feature icon mapping
const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        "Free WiFi": <Wifi className="h-2 w-2" />,
        "Fast WiFi": <Wifi className="h-2 w-2" />,
        "Parking": <Car className="h-2 w-2" />,
        "Coffee Maker": <Coffee className="h-2 w-2" />,
        "Smart TV": <Tv className="h-2 w-2" />,
        "AC": <Wind className="h-2 w-2" />,
        "Family Size": <Users className="h-2 w-2" />,
    };
    return iconMap[feature] || <Star className="h-2 w-2" />;
};

export const Rooms: React.FC = () => {
    const titleVisible = UseFadeIn(200);
    const cardsVisible = UseFadeIn(400);

    return (
        <div
            style={{ backgroundImage: `url(${RoomBg})` }}
            className='w-full min-h-full lg:min-h-screen bg-center bg-cover bg-no-repeat bg-fixed py-12'>

            <div className='container max-w-6xl mx-auto px-4'>
                {/* Title and description */}
                <header className={`flex flex-col items-center space-y-4 mb-8 transition-opacity duration-1000 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div>
                        <h1 className='text-lg lg:text-2xl font-bold font-display text-center text-amber-600'>Our Accommodations </h1>
                        <div className='h-0.5 bg-amber-500 w-60 mt-2 mx-auto'></div>
                    </div>
                    <p className='text-center'>Explore our range of luxurious rooms and suites designed for your comfort.</p>
                </header>


                {/* Room cards */}
                <div className={`transition-opacity duration-1000 ${cardsVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <Carousel
                        className='w-full relative'
                        opts={{
                            align: "start",
                            slidesToScroll: 1,
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                    >
                        <CarouselContent className='-ml-1'>
                            {roomsData.map((room) => (
                                <CarouselItem key={room.id} className='pl-1 basis-full sm:basis-1/2 lg:basis-1/3'>
                                    <Card className='overflow-hidden group hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm border-1 border-amber-400 rounded-xl h-full mx-1 flex flex-col'>
                                        <div className='relative flex-grow-0'>
                                            <img src={room.image} alt={room.title}
                                                className='w-full h-48 -mt-6 object-cover group-hover:scale-105 transition-transform duration-600 rounded-md' />

                                            <Badge className='absolute top-2 right-2 z-10 bg-amber-300 rounded-sm text-black'>
                                                {room.available ? "Available" : 'Booked'}
                                            </Badge>

                                            <Badge className='absolute -bottom-3 left-0 z-10 px-2 bg-amber-600 text-white border-0 border-amber-400 rounded-none'>
                                                <p className="text-white font-semibold text-md py-1">${room.price}</p>
                                                <p className="text-white text-xs">/ per night</p>
                                            </Badge>
                                        </div>
                                        {/* Room details */}
                                        <CardContent className='space-y-2 pt-6 flex flex-col flex-grow'>
                                            <div className='flex-grow'>
                                                <h2 className='text-lg font-semibold font-display'>{room.title}</h2>
                                                {/* features */}
                                                <div className='flex flex-wrap gap-2 text-sm text-gray-600 mt-2'>
                                                    {room.features.map((feature, index) => (
                                                        <div key={index} className='flex items-center space-x-1'>
                                                            {getFeatureIcon(feature)}
                                                            <span className='text-xs'>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* description */}
                                                <div className='text-sm text-gray-700 mt-2'>
                                                    <p>{room.description}</p>
                                                </div>
                                            </div>

                                            <Button
                                                className='flex items-center justify-center mt-4 w-full bg-[#BB9A62] hover:bg-[#A68A4D] hover:tracking-widest transition-all duration-300 delay-100 text-white font-semibold font-display gap-2'
                                                onClick={() => alert(`Booking for ${room.title}`)}>
                                                <span>Read more</span>
                                                <CircleArrowRight className='h-4 w-4' />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white' />
                        <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white' />
                    </Carousel>
                </div>
            </div>
        </div>
    )
};