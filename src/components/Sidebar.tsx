import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

type SidebarProps = {
  // Define any props you want to pass to the Sidebar component
};

const Sidebar: React.FC<SidebarProps> = () => {
  const history = useHistory();

  const handleClick = (e: any) => {
    console.log(`e.key`, e.key);
    history.push(`/${e.key}`);
  };
  
  return (
    <Sider width={200} className="site-layout-background h-screen">
      <Menu
        mode="inline"
        theme='dark'
        defaultSelectedKeys={[history.location.pathname.slice(1)]}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        onClick={handleClick}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="個人工具">
          <Menu.Item key="todoList">Todo List</Menu.Item>
          <Menu.Item key="financeApp">Finance Tracker</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="社群工具">
          <Menu.Item key="mediaPanel">Social Media Panel</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
