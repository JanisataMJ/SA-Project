import React, { useEffect, useState } from 'react'; 
import { Table } from 'antd'; 
import { GetStudentsByRoomID, GetUserRoom } from '../../services/https'; 

const Listpages: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]); 
  const [roomID, setRoomID] = useState<number | null>(null); 

  useEffect(() => {
    const userID = 1; 

    const fetchUserRoom = async () => {
      try {
        const roomData = await GetUserRoom(userID); 
        console.log(roomData); 

        if (Array.isArray(roomData) && roomData.length > 0) {
          const { room_id } = roomData[0]; 
          setRoomID(room_id); 
        } else {
          console.error("ไม่พบข้อมูลห้องสำหรับผู้ใช้"); 
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบห้องของผู้ใช้:", error); 
      }
    };

    fetchUserRoom(); 
  }, []); 

  
  useEffect(() => {
    if (roomID !== null) { 
      const fetchStudents = async () => {
        try {
          const result = await GetStudentsByRoomID(roomID); 
          console.log(result); 

          if (Array.isArray(result)) { 
            const formattedStudents = result.map(student => ({ 
              StudentID: student.StudentID || 'ไม่ระบุ', 
              name: `${student.FirstName || 'ไม่ระบุ'} ${student.LastName || 'ไม่ระบุ'}`, 
              major: student.Major || 'ไม่ระบุ', 
              year: student.Year || 'ไม่ระบุ', 
              roomRate: "2900", 
            }));
            setStudents(formattedStudents); 
          } else {
            console.error(result.error || "เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา"); 
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการเรียก API:", error); 
        }
      };

      fetchStudents(); 
    }
  }, [roomID]); 

  
  const columns = [
    {
      title: 'รหัสนักศึกษา', 
      dataIndex: 'StudentID', 
      key: 'StudentID', 
    },
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'สำนัก',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'ชั้นปี',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'ค่าห้อง',
      dataIndex: 'roomRate',
      key: 'roomRate',
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={students} 
      pagination={false} 
      rowKey="StudentID" 
    />
  );
};

export default Listpages;