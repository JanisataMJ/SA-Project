import React, { useState } from 'react';
import { Input, Button, message, Space } from 'antd';
import { CreateAnnouncement } from "../../../services/https";

const { TextArea } = Input;

const Announcement: React.FC = () => {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (!Title || !Content) {
      messageApi.open({
        type: 'error',
        content: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    try {
      const response = await CreateAnnouncement({ Title, Content });

      if (response.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'ประกาศถูกสร้างเรียบร้อยแล้ว',
        });
        setTitle('');
        setContent('');
      } else {
        messageApi.open({
          type: 'error',
          content: `เกิดข้อผิดพลาดในการสร้างประกาศ: ${response.data.message || response.statusText}`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.open({
        type: 'error',
        content: `เกิดข้อผิดพลาดในการสร้างประกาศ: ${(error as Error).message}`,
      });
    }
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
          แจ้งข่าวสาร
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

      {/* Title TextArea with label */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>Title</label>
        <TextArea
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title here"
          autoSize
          style={{ width: '100%' }}
        />
      </div>

      {/* Announcement TextArea with label */}
      <div>
        <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>Announcement</label>
        <TextArea
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter announcement here"
          autoSize={{ minRows: 3, maxRows: 10 }}
          style={{ width: '100%' }}
        />
      </div>
      
      {contextHolder}
      <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button 
          onClick={handleSubmit} 
          style={{ backgroundColor: '#1890ff', color: 'white', borderColor: '#1890ff' }} 
        >
          ยืนยัน
        </Button>
      </Space>
    </div>
  );
};

export default Announcement;
