import {
    Button,
    Space,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Card,
    Divider,
    Typography,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { Text } = Typography;

import { DelayedPaymentFormInterface } from "../../../interfaces/delayedpaymentform";
import { DelayedPaymentFormUI, GetDelayedPaymentForm, ListDelayedPaymentForms, UpdateDelayedPaymentForm } from "../../../services/https";
import "../../repair/index.css";

export default function DelayedPaymentFormCreate() {

    const navigate = useNavigate();
    const [messageApi] = message.useMessage();
    const [form] = Form.useForm();

    const onFinish = async (values: DelayedPaymentFormInterface) => {
        let res = await DelayedPaymentFormUI(values);
        console.log(res);
        if (res) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            //form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
            //setFileList([]); // รีเซ็ตไฟล์อัปโหลด
            setTimeout(function () {
                navigate("/repair");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาด !",
            });
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    const columns: ColumnsType<DelayedPaymentFormInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
        },
        {
            title: "หัวข้อการขอรับบริการ",
            dataIndex: "Subject",
            key: "subject",
        },
        {
            title: "รายละเอียดการขอรับบริการ",
            dataIndex: "Detail",
            key: "detail",
        },
        {
            title: "นามสกุล",
            dataIndex: "Location_Details",
            key: "location_details",
        },
        {
            title: "เพศ",
            dataIndex: "Contact",
            key: "contact",
        },
        {
            title: "อีเมล",
            dataIndex: "Time_Slot",
            key: "time_slot",
        },
        {
            title: "วันเกิด",
            dataIndex: "Remarks",
            key: "remarks",
            render: (record) => <p>{dayjs(record).format("dddd DD MMM YYYY")}</p>,
        },
        {
            title: "จัดการ",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
                <>
                </>
            ),
        },
    ]
    return (
        <>
            <Card>
                <h2>แบบฟอร์มขอผ่อนผันการชำระค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำประปา</h2>
                <Divider />
                <Form
                    name="basic"
                    layout="vertical"
                    //onFinish={onFinish}
                    autoComplete="off"
                >
                    <Space direction="vertical">
                        <Text>ผู้รับบริการ  B191563  กานต์รวี  นภารัตน์</Text>
                        <Text>อาคาร  4  ห้อง  414A</Text>
                    </Space>
                </Form>

                <br />

                <Form
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={64}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าหอพัก"
                                name="dorm_payment"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าไฟฟ้า"
                                name="electricly_bill"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าน้ำ"
                                name="water_bill"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="เนื่องจาก"
                                name="because_of"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกเหตุผลในการขอผ่อนผันชำระ !",
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชำระภายในวันที่"
                                name="due_date"
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
                                    <Link to="/DelayedPaymentForm">
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