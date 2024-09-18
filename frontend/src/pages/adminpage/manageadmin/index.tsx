import React, { useState, useEffect } from 'react';
import { Table, message, Button, Modal, Form, Input } from 'antd';
import { AadminInterface } from '../../../interfaces/Admin'; // Ensure the path to the interface is correct
import { Adminlist, CreateAdmin, DeleteAdmin } from "../../../services/https";

const ManageAdmin: React.FC = () => {
    const [admins, setAdmins] = useState<AadminInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            try {
                const response = await Adminlist();
                if (response.status === 200) {
                    setAdmins(response.data);
                } else {
                    message.error('ไม่พบข้อมูลแอดมิน');
                }
            } catch (error) {
                console.error('Error fetching admins:', error);
                message.error('เกิดข้อผิดพลาดในการดึงข้อมูลแอดมิน');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleAddAdmin = async (values: AadminInterface) => {
        setLoading(true);
        try {
            const response = await CreateAdmin(values);
            if (response.status === 200) {
                message.success('เพิ่มแอดมินสำเร็จ');
                setIsModalVisible(false);
                form.resetFields();
                const fetchAdmins = async () => {
                    const response = await Adminlist();
                    if (response.status === 200) {
                        setAdmins(response.data);
                    }
                };
                fetchAdmins();
            } else {
                message.error('ไม่สามารถเพิ่มแอดมินได้');
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            message.error('เกิดข้อผิดพลาดในการเพิ่มแอดมิน');
        } finally {
            setLoading(false);
        }
    };

   // Example of handling id conversion if needed
const handleDeleteAdmin = async (id: any) => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
        message.error('ID ของแอดมินไม่ถูกต้อง');
        return;
    }

    setLoading(true);
    try {
        const response = await DeleteAdmin(numericId);
        if (response.status === 200) {
            message.success('ลบแอดมินสำเร็จ');
            const fetchAdmins = async () => {
                const response = await Adminlist();
                if (response.status === 200) {
                    setAdmins(response.data);
                }
            };
            fetchAdmins();
        } else {
            message.error('ไม่สามารถลบแอดมินได้');
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        message.error('เกิดข้อผิดพลาดในการลบแอดมิน');
    } finally {
        setLoading(false);
    }
};

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'First Name', dataIndex: 'FirstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'LastName', key: 'lastName' },
        { title: 'Phone', dataIndex: 'Phone', key: 'phone' },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: AadminInterface) => (
                <Button 
                    type="link" 
                    danger 
                    onClick={() => handleDeleteAdmin(record.id)} // Ensure record.id is not undefined
                >
                    ลบ
                </Button>
            ),
        },
    ];
    

    return (
        <div>
            <h1>จัดการแอดมิน</h1>
            <Button 
                type="primary" 
                onClick={() => setIsModalVisible(true)} 
                style={{ marginBottom: 16 }}
            >
                เพิ่มแอดมิน
            </Button>
            <Table
                dataSource={admins}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
            <Modal
                title="เพิ่มแอดมิน"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddAdmin}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'กรุณากรอก Username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        label="Password"
                        rules={[{ required: true, message: 'กรุณากรอก Password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="FirstName"
                        label="First Name"
                        rules={[{ required: true, message: 'กรุณากรอก First Name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="LastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'กรุณากรอก Last Name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Phone"
                        label="Phone"
                        rules={[{ required: true, message: 'กรุณากรอก Phone' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            เพิ่มแอดมิน
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageAdmin;
