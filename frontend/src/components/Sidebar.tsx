import React, { useState } from 'react';
import './Side.css';
import { useNavigate } from 'react-router-dom';
import userImage from '../assets/profile.jfif';
import Logo from '../assets/logo.png';
import { Layout, Menu, Button } from 'antd';

const { Sider, Content } = Layout;

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']); // ใช้ state สำหรับ selectedKeys
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]); // ตั้งค่า selectedKeys เมื่อมีการคลิก
    switch (key) {
      case '1':
        navigate('/Announcement');
        break;
      case '2':
        navigate('/Repairing');
        break;
      case 'form1':
        navigate('/DelayedPaymentForm');
        break;
      case 'form2':
        navigate('/En_ExitingForm');
        break;
      case 'form3':
        navigate('/Resigningform');
        break;
      case '3':
        navigate('/Status');
        break;
      case 'paymentConfirmation':
        navigate('/PaymentConfirmation'); // เปลี่ยนเส้นทางตามชื่อใหม่
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // ทำการออกจากระบบที่นี่
    console.log('Logging out...');
    // ตัวอย่างการนำทางไปยังหน้าเข้าสู่ระบบ
    navigate('/login');
  };

  const dropdownMenu = (
    <Menu className="custom-menu-submenu" mode="inline">
      <Menu.Item key="form1" onClick={() => handleMenuClick('form1')}>
        ฟอร์มผ่อนผัน
      </Menu.Item>
      <Menu.Item key="form2" onClick={() => handleMenuClick('form2')}>
        ฟอร์มขออนุญาตเข้า-ออกหอพัก
      </Menu.Item>
      <Menu.Item key="form3" onClick={() => handleMenuClick('form3')}>
        ฟอร์มลาออกหอพัก
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} className="custom-sider">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', margin: '16px auto' }}>
          <img src={Logo} alt="Logo" style={{ width: '40%' }} />
        </div>
        {/* User Info Section */}
        <div className="user-info-container">
          <img src={userImage} alt="User" />
          <div className="id">B191563</div>
          <div className="name">กานต์รวี นภารัตน์</div>
        </div>
        <Menu
          className='custom-menu'
          mode="inline"
          selectedKeys={selectedKeys} // ใช้ selectedKeys ใน Menu
        >
          <Menu.Item key="1" onClick={() => handleMenuClick('1')}>
            แจ้งข่าวสาร
          </Menu.Item>
          <Menu.Item key="2" onClick={() => handleMenuClick('2')}>
            แจ้งซ่อม
          </Menu.Item>
          <Menu.SubMenu
            key="dropdown"
            title="แบบฟอร์ม"
            popupOffset={[0, 4]} // Adjust dropdown positioning
          >
            {dropdownMenu}
          </Menu.SubMenu>
          <Menu.Item key="3" onClick={() => handleMenuClick('3')}>
            ติดตามสถานะ
          </Menu.Item>
          <Menu.Item key="paymentConfirmation" onClick={() => handleMenuClick('paymentConfirmation')}>
            ยืนยันการชำระ
          </Menu.Item>
        </Menu>
        <div className="logout-container">
          <Button
            className="logout-button"
            type="primary"
            onClick={handleLogout}
          >
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content
          className="custom-content"
          style={{
            padding: 24
          }}
        >
          {children} {/* Use children passed to the component */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;