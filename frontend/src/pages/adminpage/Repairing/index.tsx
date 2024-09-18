import React, { useState } from 'react';
import { Button, Table, Select } from 'antd';
import ReadRepairing from './ReadRepairing/index';

const { Option } = Select;

interface RecordType {
  key: string;
  date: string;
}

const Repairing: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const columns = [
    {
      title: 'รายการแจ้งซ่อม',
      children: [
        {
          dataIndex: 'date',
          key: 'date',
          render: (text: string) => (
            <div style={{ textAlign: 'center' }}>{text}</div> 
          ),
        },
        {
          key: 'details',
          render: (_: any, record: RecordType) => (
            <div style={{ textAlign: 'center' }}>
              <Button
                type="link"
                onClick={() => handleDetailsClick(record.key)}
              >
                ดูรายละเอียด
              </Button>
            </div>
          ),
        },
        {
          key: 'update',
          render: (_: any, record: RecordType) => (
            <div style={{ textAlign: 'center' }}>
              <Select
                defaultValue="อัพเดทสถานะ"
                style={{ width: 120 }}
                onChange={(value) => handleUpdateStatus(record.key, value)}
              >
                <Option value="pending">Pending</Option>
                <Option value="inProgress">In Progress</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </div>
          ),
        },
      ],
    },
  ];

  const data: RecordType[] = [
    {
      key: '1',
      date: '2024-08-01',
    },
    {
      key: '2',
      date: '2024-08-02',
    },
    {
      key: '3',
      date: '2024-08-03',
    },
  ];

  const handleDetailsClick = (key: string) => {
    setSelectedKey(key); 
  };

  const handleUpdateStatus = (key: string, status: string) => {
    console.log(`อัพเดทสถานะ ${status} สำหรับ:`, key);
  };

  const handleBackClick = () => {
    setSelectedKey(null); 
  };

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
            position: 'relative',
            paddingBottom: '10px',
          }}
        >
          รายการแจ้งซ่อม
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
      {selectedKey ? (
        <div>
          <Button
            type="primary"
            onClick={handleBackClick}
            style={{ marginBottom: '16px' }}
          >
            กลับไปหน้าเดิม
          </Button>
          <ReadRepairing key={selectedKey} /> 
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            showHeader={false} 
            style={{ maxWidth: '1100px', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default Repairing;
