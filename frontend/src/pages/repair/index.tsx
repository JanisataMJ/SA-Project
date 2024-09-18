import {
  Button,
  Form,
  Input,
  Row,
  Space,
  Col,
  Upload,
  Card,
  Divider,
  message,
  Modal,
  Select,
  Typography,
  GetProp,
  UploadFile,
  UploadProps,
  Spin,
} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import ImgCrop from "antd-img-crop";

import { StudentInterface } from "./../../interfaces/Student";
import { RepairInterface } from "./../../interfaces/repairing";
import { DormInterface } from "./../../interfaces/Dorm";
import { RoomInterface } from "./../../interfaces/Room";
import { ReservationInterface } from "./../../interfaces/Reservation";
import { GetStudentsById, CreateRepair } from "./../../services/https";
import "./../repair/index.css";
import Repairing from "./../adminpage/Repairing";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type CombinedData = ReservationInterface & StudentInterface & RepairInterface & DormInterface & RoomInterface;

export default function RepairCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [studentData, setStudentData] = useState<StudentInterface | null>(null);
  const [repairing, setRepairing] = useState<RepairInterface | null>(null);
  const [reservationData, setReservationData] = useState<{
    reservation: ReservationInterface | null;
    student: StudentInterface | null;
    dorm: DormInterface | null;
    room: RoomInterface | null;
  }>({
    reservation: null,
    student: null,
    dorm: null,
    room: null,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getStudentData = async (id: string) => {
    try {
      const studentRes = await GetStudentsById(id);
      if (studentRes.status === 200) {
        setStudentData(studentRes.data);
      } else {
        messageApi.open({
          type: "error",
          content: "Error fetching data",
        });
        setStudentData(null);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch student data.",
      });
      setStudentData(null);
    }
  };

  const getRepairData = async (id: string) => {
    try {
      const response = await fetch(`/api/repairs/${id}`);
      const data = await response.json();
      
      // Extract reservation from data
      const reservation = data.Reservation;
      const student = reservation.Student;
      const dorm = reservation.Dorm;
      const room = reservation.Room;
      
      setRepairing(data);
      setReservationData({
        reservation,
        student,
        dorm,
        room,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch repair data.",
      });
    }
  };
  
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const showSuccessMessage = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "Successfully saved data",
    });
  }, [messageApi]);

  const showErrorMessage = useCallback(() => {
    messageApi.open({
      type: "error",
      content: "An error occurred!",
    });
  }, [messageApi]);

  const onFinish = async (values: RepairInterface) => {
    values.Image = fileList[0]?.thumbUrl || '';
    values.ID = repairing?.ID;
    let res = await CreateRepair(values);
    if (res) {
      showSuccessMessage();
      setTimeout(() => navigate("/repair"), 2000);
    } else {
      showErrorMessage();
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    if (studentId) {
      getRepairData(studentId);  // Fetch repair data using studentId
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID not found.",
      });
    }
  }, []);
  return (
    <>
      <Space direction="vertical">
        <>
          <Card>
            <h2>แจ้งซ่อม</h2>
            <Divider />
            <Form
              name="repairDetails"
              layout="vertical"
              autoComplete="off"
            >
              <Space direction="vertical">
                {repairing && reservationData.reservation ? (
                  <>
                    {reservationData.student && (
                      <>
                        <Text>Student ID: {reservationData.student.StudentID}</Text>
                        <Text>Name: {reservationData.student.FirstName} {reservationData.student.LastName}</Text>
                      </>
                    )}
                    {reservationData.dorm && reservationData.room && (
                      <>
                        <Text>Dorm: {reservationData.dorm.ID} Room: {reservationData.room.RoomNumber}</Text>
                      </>
                    )}
                  </>
                ) : (<Text></Text>)}
              </Space>
            </Form>

            <br />

            <Form
              name="basic2"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="หัวข้อการขอรับบริการ"
                    name="Subject"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกหัวข้อการขอรับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="อ่างน้ำตัน" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    label="ภาพประกอบ"
                    name="Image"
                    valuePropName="fileList"
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={(file) => {
                          setFileList([...fileList, file]);
                          return false;
                        }}
                        maxCount={1}
                        multiple={false}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />} >Upload</Button>
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="รายละเอียดการขอรับบริการ"
                    name="Detail"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียดการขอรับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="ทำเศษอาหารตก" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="รายละเอียดสถานที่รับบริการ"
                    name="Location_Details"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียดสถานที่รับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="ห้องน้ำรวมชั้น 1" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="หมายเหตุ"
                    name="Remarks"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="ช่องทางติดต่อ"
                    name="Contact"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกช่องทางติดต่อ !",
                      },
                    ]}
                  >
                    <Input placeholder="ติดต่อเจ้าหน้าที่หน้าหอพัก" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="ช่วงเวลาที่รับบริการ"
                    name="Time_Slot"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกช่วงเวลาที่รับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="9:00-16:00 น." />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col style={{ marginTop: "40px" }}>
                  <Form.Item>
                    <Space>
                      <Button htmlType="button" style={{ marginRight: "10px" }}>
                        ยกเลิก
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                      >
                        ยืนยัน
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      </Space>
    </>
  );
}
