import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Divider, Table, Button, message } from "antd";
import type { TableProps } from "antd";
import { CreateReservation } from "../../../services/https";
import { ReservationInterface } from "../../../interfaces/Reservation";
import { GetStudentsByRoomID } from '../../../services/https';
import axios from "axios";


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
  ID: number;
}



interface ReviewModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  room: Room | null;
  dorm_id: number;
  room_id?: number;
  updateReservationsCount: () => Promise<void>;
}


const ModalTest: React.FC<ReviewModalProps> = ({
  isVisible,
  handleCancel,
  room,
  dorm_id,
  room_id,
  updateReservationsCount
}) => {
  
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  
  const columns: TableProps<any>["columns"] = [
    { title: "รหัสนักศึกษา", dataIndex: "StudentID", key: "StudentID" },
    { title: "ชื่อ - นามสกุล", dataIndex: "name", key: "name" },
    { title: "สำนัก", dataIndex: "major", key: "major" },
    { title: "ชั้นปี", dataIndex: "year", key: "year" },
    { title: "ค่าห้อง", dataIndex: "roomRate", key: "roomRate" }
  ];

  
  const fetchStudents = async () => {
    setLoading(true); 
    setStudents([]); 

    if (room && room.ID) {
      try {
        const result = await GetStudentsByRoomID(room.ID);
        console.log(result); 
        
        
        if (Array.isArray(result)) {
          const formattedStudents = result.map(student => ({
            StudentID: student.StudentID || "ไม่ระบุ",
            name: `${student.FirstName || "ไม่ระบุ"} ${student.LastName || "ไม่ระบุ"}`,
            major: student.Major || "ไม่ระบุ",
            year: student.Year || "ไม่ระบุ",
            roomRate: "2,900" 
          }));
          setStudents(formattedStudents); 
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        message.error("ไม่สามารถดึงข้อมูลนักศึกษาได้");
      } finally {
        setLoading(false); 
      }
    } else {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    if (isVisible) {
      fetchStudents(); 
    }
  }, [room, isVisible]); 

  
  const handleConfirm = async () => {
    if (!room) {
      message.error("Room information is missing.");
      return;
    }

    const reservationData: ReservationInterface = {
      ID: undefined,
      ReservationDate: new Date(),
      StudentID: 1, 
      DormID: dorm_id,
      RoomID: room_id
    };

    try {
      await CreateReservation(reservationData);
      message.success("Reservation created successfully!");
      await updateReservationsCount(); 
      
      setTimeout(() => handleCancel(), 2900); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message || "An error occurred.");
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  
  const handleModalClose = async () => {
    handleCancel(); 
  };

  return (
    <Modal
      title={`Room ${room ? room.RoomNumber : "Loading..."}`}
      visible={isVisible}
      onCancel={handleModalClose} 
      footer={null}
      centered
    >
      {room ? (
        <>
          <Row>
            <Col>
              <h2>รายชื่อผู้ร่วมจอง</h2>
            </Col>
          </Row>
          <Divider />
          
          {/* แสดงข้อความหากยังไม่มีผู้จอง */}
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p> 
          ) : students.length === 0 ? (
            <p>ยังไม่มีผู้จอง</p> 
          ) : (
            <Table 
              columns={columns} 
              dataSource={students} 
              pagination={false} 
              loading={loading} 
            />
          )}

          <Button type="primary" onClick={handleConfirm} disabled={loading}>
            Confirm
          </Button>
        </>
      ) : (
        <p>Loading room details...</p>
      )}
    </Modal>
  );
};


export default ModalTest;
