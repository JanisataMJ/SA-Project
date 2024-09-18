import React, { useEffect, useState } from "react"; 
import { Col, Divider, Row, message } from "antd"; 
import { useLocation } from "react-router-dom"; 
import Modal from "./Modal/Modal"; 
import {
  GetRoomsByFloorAndDorm,
  GetReservationsByRoomID,
} from "../../services/https"; 


interface Room {
  id: number; 
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
  ID: number; 
}


const style: React.CSSProperties = {
  padding: "30px 0",
  borderRadius: "8px",
  height: "90px",
  border: "2px solid #d6d6d6",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};


const MainDorm1: React.FC = () => {
  
  const [rooms, setRooms] = useState<Room[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); 
  const [floorsData, setFloorsData] = useState<
    { floor: number; rooms: Room[]; count: number[] }[]
  >([]); 

  
  const showModal = (room: Room) => {
    
    const floorIndex = floorsData.findIndex(floorData =>
      floorData.rooms.some(r => r.ID === room.ID)
    );
    
    
    if (floorIndex === -1) return;
  
    
    const currentReservationCount = floorsData[floorIndex].count[floorsData[floorIndex].rooms.findIndex(r => r.ID === room.ID)] || 0; 
  
    if (currentReservationCount >= 3) {
      message.warning("จองเต็มแล้ว"); 
    } else {
      setSelectedRoom(room); 
      setIsModalVisible(true); 
    }
  };

  
  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  
  const fetchRoomData = async (floor: number, dorm: number) => {
    try {
      const response = await GetRoomsByFloorAndDorm(floor, dorm); 
      if (response && !response.error) {
        
        const roomData = response.map((room: Room) => ({
          
          ...room,
          Floor: Number(room.Floor), 
        }));
        return roomData; 
      } else {
        throw new Error("Room not found"); 
      }
    } catch (error) {
      setError("Error fetching room data"); 
      console.error("Error fetching room data:", error); 
      return []; 
    }
  };

  
  const fetchReservationsCount = async (rooms: Room[]) => {
    const counts = await Promise.all(
      rooms.map(async (room) => {
        
        try {
          const response = await GetReservationsByRoomID(room.ID); 
          return response && !response.error ? response.length : 0; 
        } catch (error) {
          console.error("Error fetching reservations count:", error); 
          return 0; 
        }
      })
    );
    return counts; 
  };

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const dorm = Number(queryParams.get("dorm")); 
  const namedorm = String(queryParams.get("NameDorm"))

  
  useEffect(() => {
    const fetchAllRooms = async () => {
      const floors = [1, 2, 3]; 
      const allRooms = await Promise.all(
        floors.map((floor) => fetchRoomData(floor, dorm))
      ); 

      const counts = await fetchReservationsCount(allRooms.flat()); 
      setFloorsData(
        allRooms.map((rooms, index) => ({
          
          floor: floors[index],
          rooms,
          count: counts.slice(index * rooms.length, (index + 1) * rooms.length), 
        }))
      );

      setLoading(false); 
    };

    fetchAllRooms(); 
  }, [dorm]); 

  
  const updateReservationsCount = async () => {
    const counts = await fetchReservationsCount(
      floorsData.flatMap((floorData) => floorData.rooms)
    ); 
    setFloorsData((prevFloorsData) =>
      prevFloorsData.map((floorData, index) => ({
        
        ...floorData,
        count: counts.slice(
          index * floorData.rooms.length,
          (index + 1) * floorData.rooms.length
        ), 
      }))
    );
  };

  
  if (loading) {
    return <p>Loading...</p>;
  }

  
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Row className="row-container">
        <Col>
          <h2 style={{ color: "#1f1f1f" }}>{namedorm} {dorm}</h2>
        </Col>
        <Col>
          <h2 className="heading-red">Air conditioner</h2>
        </Col>
      </Row>
      <Divider />
      {floorsData.map(({ floor, rooms, count }) => (
        <div key={floor}>
          <div>ชั้นที่ {floor}</div>
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "10px",
            }}
          >
            {rooms.map((room, index) => {
              const currentCount = count[index];
              const isFull = currentCount >= 3; 
              const roomStyle = isFull ? { ...style, backgroundColor: 'red', color: 'white' } : style; 

              return (
                <div key={room.id} style={roomStyle} onClick={() => showModal(room)}>
                  <div>{room.RoomNumber}</div>
                  <br />
                  <br />
                  <div>{currentCount}/3</div>
                </div>
              );
            })}
          </div>
          <br />
        </div>
      ))}
      <Modal
        isVisible={isModalVisible}
        handleCancel={handleCancel}
        room={selectedRoom}
        dorm_id={dorm}
        room_id={selectedRoom ? selectedRoom.ID : 0}
        updateReservationsCount={updateReservationsCount}
      />
    </>
  );
};


export default MainDorm1;
