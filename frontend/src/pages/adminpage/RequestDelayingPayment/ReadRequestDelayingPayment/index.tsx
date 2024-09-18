import React from 'react';
import { Card, Form, Input, Divider, Row, Col } from "antd";

const ReadRequestDelayingPayment: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const formValues = {
    dorm_payment: "1000 บาท",
    electricly_bill: "500 บาท",
    water_bill: "300 บาท",
    because_of: "ต้องการผ่อนผันเนื่องจากเหตุผลทางการเงิน",
    due_date: formattedDate // สมมุติข้อมูลวันครบกำหนด
  };

  return (
    <div className="container">
      <Card title="แบบฟอร์มขอผ่อนผันการชำระ" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้ทำเรื่อง: B191563 มนัสเต สวัสดิกะ</p>
          <p>วันที่ปัจจุบัน: {formattedDate}</p>
        </div>
        
        <Divider />

        <Form
          name="delaying-payment-form"
          layout="vertical"
          initialValues={formValues}
        >
          <Form.Item
            label="ค่าหอพัก"
            name="dorm_payment"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="ค่าไฟฟ้า"
            name="electricly_bill"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="ค่าน้ำ"
            name="water_bill"
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

export default ReadRequestDelayingPayment;
