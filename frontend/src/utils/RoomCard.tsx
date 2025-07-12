// components/RoomCard.tsx
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RoomCardProps } from '@/types/RoomCard';

export const RoomCard = ({
    room,
    onBookNow,
    onReadMore,
    className = '',
    showAmenities = false,
    animationDelay = 100,
}: RoomCardProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, animationDelay);

        return () => clearTimeout(timer);
    }, [animationDelay]);

    const {
        title,
        description,
        image,
        price,
        isAvailable,
        currency = '$',
        amenities = [],
        maxGuests,
        bedType,
        roomSize,
        category,
    } = room;

    return (
        <Card className={`p-0 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:shadow-lg hover:scale-[1.02] ${className}`}>
            {/* Image Section */}
            <div className="relative -mt-[1px] overflow-hidden rounded-t-lg">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                />

                {/* Category Badge */}
                {category && (
                    <Badge className="absolute top-2 left-2 bg-black/80 text-white hover:bg-black/90">
                        {category}
                    </Badge>
                )}

                {/* Availability Badge */}
                <Badge
                    variant={isAvailable ? 'default' : 'destructive'}
                    className="absolute top-2 right-2 bg-amber-300 text-black hover:bg-amber-400 transition-colors"
                >
                    {isAvailable ? 'Available' : 'Booked'}
                </Badge>

                {/* Price Tag */}
                <div className="absolute bottom-2 left-2 bg-black/80 text-white px-3 py-1 rounded-full">
                    <span className="font-bold">{currency}{price}</span>
                    <span className="text-xs opacity-80 ml-1">/night</span>
                </div>
            </div>

            {/* Content Section */}
            <CardHeader>
                <CardTitle className="text-xl font-display tracking-wider font-semibold">{title}</CardTitle>
                <div className="flex gap-2 text-sm text-muted-foreground">
                    {maxGuests && <span> {maxGuests}</span>}
                    {bedType && <span> {bedType}</span>}
                    {roomSize && <span> {roomSize}</span>}
                </div>
            </CardHeader>

            <CardContent>
                <CardDescription className="line-clamp-2 mb-3">
                    {description}
                </CardDescription>

                {showAmenities && amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                            </Badge>
                        ))}
                        {amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{amenities.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-col lg:flex-row gap-2 mb-4">
                {onReadMore && (
                    <Button
                        variant="outline"
                        className="flex-1 h-12 bg-white text-black font-medium cursor-pointer rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                        onClick={() => onReadMore(room)}
                    >
                        Details
                    </Button>
                )}

                <Button
                    className="flex-1 h-12 bg-[#C3A165] text-white cursor-pointer font-medium rounded-lg hover:bg-[#B89A4D] transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    onClick={() => onBookNow?.(room)}
                    disabled={!isAvailable}
                >
                    {isAvailable ? 'Book Now' : 'Unavailable'}
                </Button>
            </CardFooter>
        </Card>
    );
};