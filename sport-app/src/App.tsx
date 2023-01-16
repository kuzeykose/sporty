import React, { useState } from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import CreateWorkout from './components/createWorkout.tsx';

const { Header, Content, Sider } = Layout;

const menu = [
  {
    icon: LaptopOutlined,
    name: 'ant-olsturma',
  },
  {
    icon: UserOutlined,
    name: 'kullanici paneli',
  },
];

const items2: MenuProps['items'] = menu.map((item, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.name,
  };
});

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
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
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'white',
            }}
          >
            <CreateWorkout />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
