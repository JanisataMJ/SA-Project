import React, { useState } from 'react';
import {
  Button,
  Space,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Card,
  Divider,
  Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Text } = Typography;
import "../../repair/index.css";

export default function Index() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const [componentDisabled, setComponentDisabled] = useState(true);

  const formItemLayout = {
    labelCol: {
      xs: { span: 36 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <Card>
        <h2>แบบฟอร์มลาออกหอพัก</h2>
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
          <Col span={24}>
              <Form.Item
                label="สถานที่พัก"
                name="accommodation"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานที่ที่ไปพักหลังลาออกจากหอพัก !",
                  },
                ]}
              >
                <Radio.Group>
                <Space direction="vertical">
                  <Radio value="rest_home">บ้านพัก</Radio>
                  <Radio value="dormitory_outside">หอพักภายนอกมหาวิทยาลัย</Radio>
                </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="เหตุผลที่ลาออกเนื่องจาก"
                name="because_of"
                rules={[{ required: true, message: 'กรุณากรอกเหตุผลในการลาออกจากหอพัก !' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/ResigningForm">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
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
