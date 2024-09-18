import React from 'react';
import {
  Card,
  Form,
  Input,
  Divider,
  Row,
  Col,
} from "antd";


const ReadResignationForm: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  // ข้อมูลสมมุติที่แสดงในฟอร์ม
  const formValues = {
    because_of: "ต้องการเปลี่ยนสถานที่พักเนื่องจากความสะดวกในการเดินทาง",
    accommodation: "บ้านพัก",  // แสดงข้อความแทน Radio value
    house_no: "123/45",
    village_no: "4",
    allay: "ซอยสันติ",
    road: "ถนนหลัก",
    sub_district: "บางเขน",
    district: "เขตบางเขน",
    province: "กรุงเทพมหานคร",
    post_code: "10220",
    phone_number: "012-345-6789"
  };

  return (
    <div className="container">
      <Card title="แบบฟอร์มลาออกหอพัก" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้ทำเรื่อง: B191563 มนัสเต สวัสดิกะ</p>
          <p>วันที่ปัจจุบัน: {formattedDate}</p>
        </div>

        <Form
          name="resignation-form"
          layout="vertical"
          initialValues={formValues}
        >
          <Form.Item
            label="เหตุผลที่ลาออกเนื่องจาก"
            name="because_of"
          >
            <Input.TextArea readOnly />
          </Form.Item>

          <Form.Item
            label="สถานที่พัก"
            name="accommodation"
          >
            <Input readOnly value={formValues.accommodation} />
          </Form.Item>

          <Divider />

          <h3>ที่อยู่ที่ท่านพัก</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="บ้านเลขที่" name="house_no">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="หมู่ที่" name="village_no">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ซอย" name="allay">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ถนน" name="road">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ตำบล/แขวง" name="sub_district">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="อำเภอ/เขต" name="district">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="จังหวัด" name="province">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ไปรษณีย์" name="post_code">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="เบอร์โทรศัพท์" name="phone_number">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ReadResignationForm;
