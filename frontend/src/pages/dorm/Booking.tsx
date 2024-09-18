import React, { useEffect, useState } from "react";
import { GetRoomsByFloorAndDorm } from "../../services/https";  


interface Room {
  RoomNumber: string;
  DormStatus: string;
  Available: boolean;
  Floor: number;
  Dorm: {
    dorm_name: string;
    Gender: {
      Gender: string;
    };
  };
}

const RoomDetail: React.FC<{ floorId: number; dormId: number }> = ({ floorId = 1, dormId = 1 }) => {
  const [rooms, setRooms] = useState<Room[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await GetRoomsByFloorAndDorm(floorId, dormId); 
        if (response && !response.error) {
          const roomData = response.map((room: Room) => ({
            ...room,
            Floor: Number(room.Floor) 
          }));

          setRooms(roomData); 
        } else {
          setError("Room not found");
        }
      } catch (error) {
        setError("Error fetching room data");
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [floorId, dormId]); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h2>Room Details</h2>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.RoomNumber}>
            <p><strong>Room Number:</strong> {room.RoomNumber}</p>
            <p><strong>Status:</strong> {room.DormStatus}</p>
            <p><strong>Available:</strong> {room.Available ? 'Yes' : 'No'}</p>
            <p><strong>Floor:</strong> {room.Floor}</p>
            <p><strong>Dorm Name:</strong> {room.Dorm.dorm_name}</p>
            <p><strong>Gender:</strong> {room.Dorm.Gender.Gender}</p>
            <hr /> {/* Add a separator between rooms */}
          </div>
        ))
      ) : (
        <p>No rooms available.</p> 
      )}
    </div>
  );
};

export default RoomDetail;
