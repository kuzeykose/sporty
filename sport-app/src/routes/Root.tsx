import React, { useState } from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuProps, Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const menu = [
  {
    icon: LaptopOutlined,
    name: 'Create Workout',
    key: 'createWorkout',
  },
  {
    icon: UserOutlined,
    name: 'User Manager',
    key: 'userManager',
  },
];

const items2: MenuProps['items'] = menu.map((item) => {
  return {
    key: item.key,
    icon: React.createElement(item.icon),
    label: item.name,
  };
});

function Root() {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ padding: '24px', height: '100%' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: '88vh',
              background: 'white',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Root;
