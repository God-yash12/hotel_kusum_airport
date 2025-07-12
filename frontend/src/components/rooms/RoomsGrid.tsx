// components/RoomsGrid.tsx
import { RoomsGridProps } from '@/types/RoomCard';
import { RoomCard } from '@/utils/RoomCard';

export const RoomsGrid = ({
  rooms,
  onBookNow,
  onReadMore,
  className = '',
  showAmenities = false,
  animationDelay = 100,
  gridConfig = { sm: 1, md: 2, lg: 3, xl: 3 },
}: RoomsGridProps) => {
  return (
    <div
      className={`grid gap-6 
      grid-cols-${gridConfig.sm} 
      md:grid-cols-${gridConfig.md} 
      lg:grid-cols-${gridConfig.lg} 
      xl:grid-cols-${gridConfig.xl} 
      ${className}`}
    >
      {rooms.map((room, index) => (
        <RoomCard
          key={room.id}
          room={room}
          onBookNow={onBookNow}
          onReadMore={onReadMore}
          showAmenities={showAmenities}
          animationDelay={index * animationDelay}
        />
      ))}
    </div>
  );
};