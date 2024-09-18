import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FileImageOutlined } from '@ant-design/icons';
import slipImage from '../../../assets/slip.png'; 

interface PaymentData {
  key: string;
  time: string;
  amount: number;
  slip: string;
  confirmed?: boolean; // เพิ่มฟิลด์นี้เพื่อแสดงว่ารายการได้รับการยืนยันแล้วหรือไม่
}

const data: PaymentData[] = [
  {
    key: '1',
    time: '10:00 AM',
    amount: 1500,
    slip: slipImage,
  },
  {
    key: '2',
    time: '11:30 AM',
    amount: 2000,
    slip: slipImage,
  },
];

const PaymentConfirmation: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData[]>(data); // ใช้ state เพื่อจัดการข้อมูล

  const handleViewSlip = (url: string) => {
    if (url) {
      setCurrentImage(url);
      setVisible(true);
    } else {
      console.error('URL ของสลิปไม่ถูกต้อง');
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentImage('');
  };

  const handleConfirm = (key: string) => {
    setSelectedKey(key);

    // อัปเดตสถานะของรายการใน state
    const updatedData = paymentData.map((item) =>
      item.key === key ? { ...item, confirmed: true } : item
    );
    setPaymentData(updatedData);

    console.log(`ยืนยันการชำระเงินสำหรับรายการ ${key}`);
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'จำนวนเงิน',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `${text} บาท`,
    },
    {
      title: 'สลิป',
      dataIndex: 'slip',
      key: 'slip',
      render: (text) => (
        <Button
          icon={<FileImageOutlined />}
          onClick={() => handleViewSlip(text)}
        >
          ดูภาพ
        </Button>
      ),
    },
    {
      title: 'การดำเนินการ',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          disabled={record.confirmed} // ปิดการใช้งานปุ่มถ้ารายการได้รับการยืนยันแล้ว
          onClick={() => handleConfirm(record.key)}
        >
          {record.confirmed ? 'ยืนยันแล้ว' : 'ยืนยัน'}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Header with underline */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px', 
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: '25px',
            fontWeight: 'bold', 
            position: 'relative',
            paddingBottom: '10px',
          }}
        >
          การยืนยันการชำระเงิน
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderBottom: '3px solid #000', 
          }}
        />
      </div>

      <Table
        dataSource={paymentData}
        columns={columns}
        pagination={false}
        bordered
        style={{ marginBottom: '20px' }}
      />
      <Modal
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        width={600}
      >
        <img
          alt="Slip"
          style={{ width: '100%', height: 'auto' }}
          src={currentImage}
        />
      </Modal>
    </div>
  );
};

export default PaymentConfirmation;
