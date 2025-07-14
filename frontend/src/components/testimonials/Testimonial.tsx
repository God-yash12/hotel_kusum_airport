



import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import UseFadeIn from '@/hooks/UseFadeIn';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';


// Room data interface
interface Testimonial {
    id: number;
    name: string;
    rating: number;
    comment: string;
    media?: string;
    link?: string;
}


// Sample room data
const roomsData: Testimonial[] = [
    {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing stay! The room was perfect.",
        media: "Facebook.com",
        link: "https://www.facebook.com/johndoe"
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Very comfortable and clean.",
        media: "Google.com",
        link: "https://www.google.com/janesmith"
    },
    {
        id: 3,
        name: "Alice Johnson",
        rating: 5,
        comment: "Loved the view from the room!",
        media: "Instagram.com",
        link: "https://www.instagram.com/alicejohnson"
    },
    {
        id: 4,
        name: "Bob Brown",
        rating: 3,
        comment: "It was okay, but I've had better.",
        media: "TripAdvisor.com",
        link: "https://www.tripadvisor.com/bobbrown"
    },
    {
        id: 5,
        name: "Charlie Davis",
        rating: 4,
        comment: "Great location and friendly staff.",
        media: "Yelp.com",
        link: "https://www.yelp.com/charliedavis"
    },
    {
        id: 6,
        name: "Eve White",
        rating: 5,
        comment: "Best hotel experience I've ever had!",
        media: "Booking.com",
        link: "https://www.booking.com/evewhite"
    }
];

export const Testimonials: React.FC = () => {
    const titleVisible = UseFadeIn(200);
    const cardsVisible = UseFadeIn(400);

    return (
        <div className='w-full min-h-full bg-gray-50 py-16'>
            <div className='container max-w-6xl mx-auto px-4'>
                {/* Title and description */}
                <header
                    className={`flex flex-col items-center space-y-2 mb-12 transition-opacity duration-700 ease-out ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    <h1 className='text-xl lg:text-2xl font-bold font-display text-center text-amber-600'>
                        What Our Guests Say
                        <div className='h-0.5 bg-amber-500 w-56 mx-auto'></div>
                    </h1>
                    <p className='text-center text-gray-600 max-w-2xl'>
                        Read testimonials from our satisfied guests.
                    </p>
                </header>

                {/* Testimonial cards */}
                <div className={`transition-all duration-700 ease-out ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Carousel
                        className='w-full relative'
                        opts={{
                            align: "start",
                            slidesToScroll: 1,
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                                stopOnInteraction: false,
                            }),
                        ]}
                    >
                        <CarouselContent className='-ml-4'>
                            {roomsData.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className='pl-4 basis-full sm:basis-1/2 lg:basis-1/3'
                                >
                                    <Card className='h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>
                                        <CardContent className='p-6 h-full flex flex-col'>
                                            {/* Rating */}
                                            <div className='mb-4'>
                                                <div className='text-amber-500 text-lg'>
                                                    {'★'.repeat(testimonial.rating)}
                                                    {'☆'.repeat(5 - testimonial.rating)}
                                                </div>
                                            </div>

                                            {/* Comment */}
                                            <div className='flex-grow'>
                                                <p className='text-gray-700 italic text-lg leading-relaxed mb-6'>
                                                    "{testimonial.comment}"
                                                </p>
                                            </div>

                                            {/* Author */}
                                            <div className='mt-auto pt-4 border-t border-gray-100'>
                                                <h3 className='font-semibold text-gray-900 font-display'>{testimonial.name}  </h3>
                                                <p>Via {testimonial.link ? (
                                                    <Link to={testimonial.link} className='text-xs text-amber-500 italic'>{testimonial.media}</Link>
                                                ) : (
                                                    <span className='text-xs text-amber-500 italic'>{testimonial.media}</span>
                                                )}</p>
                                            </div>
                                                    </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='left-0 md:-left-10 z-20 bg-white/80 hover:bg-white text-gray-800 border border-gray-300 shadow-lg h-10 w-10 rounded-full hidden md:flex items-center justify-center' />
                        <CarouselNext className='right-0 md:-right-10 z-20 bg-white/80 hover:bg-white text-gray-800 border border-gray-300 shadow-lg h-10 w-10 rounded-full hidden md:flex items-center justify-center' />
                    </Carousel>
                </div>
            </div>
        </div>
    );
};