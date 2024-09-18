import {
  Button,
  Space,
  Form,
  Input,
  Radio,
  Row,
  Col,
  DatePicker,
  Card,
  Divider,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
const { Text } = Typography;
import "../../repair/index.css";

export default function index() {

  const [form] = Form.useForm(); // สร้าง reference สำหรับฟอร์ม

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  return (
    <>
      <Card>
        <h2>แบบฟอร์มขออนุญาติเข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          //onFinish={onFinish}
          autoComplete="off"
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical">
                <Text>ผู้รับบริการ  B191563  กานต์รวี  นภารัตน์</Text>
                <Text>อาคาร  4  ห้อง  414A</Text>
              </Space>
            </Col>
            <Col>
              <Text>วันที่ปัจจุบัน: {formattedDate}</Text>
            </Col>
          </Row>
        </Form>

        <br />

        <Form
          name="basic"
          layout="horizontal"
          autoComplete="off"
        >
          <Row gutter={64}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="เรื่องที่ขอ:"
                name="request"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกเรื่องที่ขออนุญาติ !",
                  },
                ]}>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value="ขอกลับหอพักหลังเวลาปิดหอพัก">ขอกลับหอพักหลังเวลาปิดหอพัก</Radio>
                    <Radio value="ขอออกจากหอพักก่อนเวลาเปิดหอพัก">ขอออกจากหอพักก่อนเวลาเปิดหอพัก</Radio>
                    <Radio value="ค้างคืนนอกหอพัก">ค้างคืนนอกหอพัก</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="เนื่องจาก"
                name="because_of"
                rules={[{ required: true, message: 'กรุณากรอกเหตุผลในการขออนุญาติเข้า-ออกหอพัก !' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="วันที่ขออนุญาติ"
                name="date_request"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวัน/เดือน/ปี !",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/En_ExitingForm">
                    <Button htmlType="button" style={{ marginRight: "10px" }} onClick={() => { form.resetFields(); }}>
                      ยกเลิก
                    </Button>
                  </Link>
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
  );
}