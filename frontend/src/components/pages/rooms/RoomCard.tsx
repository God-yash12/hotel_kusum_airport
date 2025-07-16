

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Room } from '@/types/RoomTypes';
import { useNavigate } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  const handleViewRoom = () => {
    navigate(`/rooms/${room.slug}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-primary">
          ${room.price}/night
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{room.name}</span>
          <span className="text-sm text-muted-foreground">{room.size}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {room.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {room.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {room.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.features.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Up to {room.maxGuests} guests
          </span>
          <Button onClick={handleViewRoom}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};