import React from 'react';
import { Card, Form, Input, Divider, Row, Col } from "antd";
const ReadRepairing: React.FC = () => {
  const formValues = {
    subject: "ระบบไฟฟ้าเสีย",
    detail: "ระบบไฟฟ้าในห้อง 414A ไม่ทำงาน",
    location_detail: "ห้อง 414A, อาคาร 4",
    remark: "รบกวนดำเนินการด่วน",
    contact: "089-123-4567",
    time_slot: " 10:00 - 12:00"
  };
  const imageUrl = 'https://via.placeholder.com/600x400'; 
  return (
    <div className="container">
      <Card title="แบบฟอร์มแจ้งซ่อม" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้รับบริการ: B191563 มนัสเต สวัสดิกะ</p>
          <p>อาคาร: 4 ห้อง: 414A</p>
        </div>
        <Divider />
        <Form
          name="repairing-form"
          layout="vertical"
          initialValues={formValues}
        >
          <Form.Item
            label="หัวข้อการขอรับบริการ"
            name="subject"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="ภาพประกอบ"
            name="image"
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={imageUrl}
                alt="Image"
                style={{ width: '100%', maxWidth: '600px', maxHeight: '400px', objectFit: 'contain' }} // ขยายขนาดภาพ
              />
            </div>
          </Form.Item>

          <Form.Item
            label="รายละเอียดการขอรับบริการ"
            name="detail"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="รายละเอียดสถานที่รับบริการ"
            name="location_detail"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="หมายเหตุ"
            name="remark"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="ช่องทางติดต่อ"
            name="contact"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="ช่วงเวลาที่รับบริการ"
            name="time_slot"
          >
            <Input readOnly />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ReadRepairing;
