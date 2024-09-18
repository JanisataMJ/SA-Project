import React from 'react';
import { Card, Form, Input, DatePicker, Divider, Row, Col } from "antd";

const ReadEnteringAndExitingDorm: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const formValues = {
    request: "ขอกลับหอพักหลังเวลาปิดหอพัก",
    because_of: "ทำโปรเจค", // สมมุติข้อมูลที่กรอกในฟอร์ม
    due_date: formattedDate // วันขออนุญาต
  };

  return (
    <div className="container">
      <Card title="แบบฟอร์มขออนุญาติเข้า-ออกหอพัก" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้ทำเรื่อง: B191563 มนัสเต สวัสดิกะ</p>
          <p>วันที่ปัจจุบัน: {formattedDate}</p>
        </div>
        
        <Divider />

        <Form
          name="entering-exiting-form"
          layout="vertical"
          initialValues={formValues}
        >
          <Form.Item
            label="เรื่องที่ขอ:"
            name="request"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="เนื่องจาก"
            name="because_of"
          >
            <Input.TextArea readOnly />
          </Form.Item>

          <Form.Item
            label="ชำระภายในวันที่"
            name="due_date"
          >
            <Input readOnly />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ReadEnteringAndExitingDorm;
