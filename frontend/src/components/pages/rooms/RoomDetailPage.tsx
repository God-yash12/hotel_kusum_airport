import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  {getRoomBySlug} from '@/utils/roomUtils';
import { Carousel } from '@/components/ui/carousel';
import { RoomFeatures } from './RoomFeatures';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, Maximize, Bed, Calendar } from 'lucide-react';

export const RoomDetailPage: React.FC = () => {
  const { roomSlug } = useParams<{ roomSlug: string }>();
  const navigate = useNavigate();
  
  const room = roomSlug ? getRoomBySlug(roomSlug) : null;

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The room you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/rooms')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Rooms
        </Button>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate(`/booking/${room.slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </Button>
        
        <Badge variant="secondary" className="text-lg px-4 py-2">
          ${room.price}/night
        </Badge>
      </div>

      {/* Room Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{room.name}</h1>
        <p className="text-lg text-muted-foreground">{room.shortDescription}</p>
      </div>

      {/* Image Carousel */}
      <div className="mb-8">
        <Carousel>
          {room.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${room.name} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </Carousel>
      </div>

      {/* Room Info Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">Max Guests</p>
              <p className="text-sm text-muted-foreground">{room.maxGuests} guests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Maximize className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">Room Size</p>
              <p className="text-sm text-muted-foreground">{room.size}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Bed className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">Bed Type</p>
              <p className="text-sm text-muted-foreground">{room.bedType}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold">Price</p>
              <p className="text-sm text-muted-foreground">${room.price}/night</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">About This Room</h2>
          <p className="text-muted-foreground leading-relaxed">{room.description}</p>
        </CardContent>
      </Card>

      {/* Features and Amenities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Features & Amenities</h2>
        <RoomFeatures features={room.features} amenities={room.amenities} />
      </div>

      {/* Book Now Section */}
      <Card className="border-primary">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Ready to Book?</h3>
              <p className="text-muted-foreground">
                Starting from <span className="font-semibold text-primary">${room.price}</span> per night
              </p>
            </div>
            <Button size="lg" onClick={handleBookNow} className="md:w-auto">
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};