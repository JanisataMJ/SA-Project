// AdminLayout.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import './index.css';
import userImage from '../../assets/profile.jfif';
import Logo from '../../assets/logo.png';
import AdminRoutes from '../../routes/AdminRoutes'; 

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedInAdmin = true;

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/Announcement':
        setSelectedKeys(['1']);
        break;
      case '/Repairing':
        setSelectedKeys(['2']);
        break;
      case '/RequestDelayingPayment':
        setSelectedKeys(['form1']);
        break;
      case '/Enteringandexitingdorm':
        setSelectedKeys(['form2']);
        break;
      case '/ResigningForm':
        setSelectedKeys(['form3']);
        break;
      case '/PaymentConfirmation':
        setSelectedKeys(['paymentConfirmation']);
        break;
      case '/AdminManagement': // New menu item
        setSelectedKeys(['adminManagement']);
        break;
      default:
        setSelectedKeys([]);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // ลบค่าการล็อกอินจาก localStorage
    localStorage.removeItem('isLoginAdmin');
    localStorage.removeItem('isLoginStudent');
    // เปลี่ยนเส้นทางไปยังหน้า Login
    navigate('/login');
  };

  const dropdownMenu = (
    <Menu className="custom-menu-submenu" mode="inline">
      <Menu.Item key="form1">
        <Link to="/RequestDelayingPayment">ฟอร์มผ่อนผัน</Link>
      </Menu.Item>
      <Menu.Item key="form2">
        <Link to="/Enteringandexitingdorm">ฟอร์มขออนุญาตเข้า-ออกหอพัก</Link>
      </Menu.Item>
      <Menu.Item key="form3">
        <Link to="/ResigningForm">ฟอร์มลาออกหอพัก</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        className="custom-sider"
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', margin: '16px auto' }}>
          <img src={Logo} alt="Logo" style={{ width: '40%' }} />
        </div>
        <div className="user-info-container">
          <img src={userImage} alt="User" />
          <div className="id">12345</div>
          <div className="name">John Doe</div>
        </div>
        <Menu className='custom-menu' mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key="1">
            <Link to="/Announcement">แจ้งข่าวสาร</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/Repairing">แจ้งซ่อม</Link>
          </Menu.Item>
          <Menu.SubMenu key="dropdown" title="แบบฟอร์ม">
            {dropdownMenu}
          </Menu.SubMenu>
          <Menu.Item key="paymentConfirmation">
            <Link to="/PaymentConfirmation">ยืนยันการชำระ</Link>
          </Menu.Item>
          <Menu.Item key="adminManagement"> {/* New menu item */}
            <Link to="/AdminManagement">จัดการแอดมิน</Link>
          </Menu.Item>
        </Menu>
        <div className="logout-container">
          <Button className="logout-button" type="primary" onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content className="custom-content" style={{ padding: 24 }}>
          <Routes>
            {AdminRoutes(isLoggedInAdmin)[0].children?.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
