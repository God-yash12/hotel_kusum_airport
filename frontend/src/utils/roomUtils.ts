import { roomsData } from "@/data/rooms";
import { Room, RoomType } from "@/types/RoomTypes";

export const getRoomBySlug = (slug: string): Room | null => {
  const roomType = slug as RoomType;
  return roomsData[roomType] || null;
};

export const getAllRooms = (): Room[] => {
  return Object.values(roomsData);
};

export const getRoomTypes = (): RoomType[] => {
  return Object.keys(roomsData) as RoomType[];
};