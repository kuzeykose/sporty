import React, { useState } from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';

import CreateWorkout from './components/createWorkout.tsx';

const { Header, Content, Sider } = Layout;

const menu = [
  {
    icon: LaptopOutlined,
    name: 'Create Workout',
  },
  {
    icon: UserOutlined,
    name: 'User Manager',
    path: '/userManager',
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

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click ', e);
};

function App() {
  return (
    <></>
    // <Layout style={{ height: '100vh' }}>
    //   <Header className="header">
    //     <div className="logo" />
    //   </Header>
    //   <Layout>
    //     <Sider width={200}>
    //       <Menu
    //         mode="inline"
    //         defaultSelectedKeys={['1']}
    //         defaultOpenKeys={['sub1']}
    //         style={{ height: '100%', borderRight: 0 }}
    //         items={items2}
    //         onClick={onClick}
    //       />
    //     </Sider>
    //     <Layout style={{ padding: '24px' }}>
    //       <CreateWorkout />
    //     </Layout>
    //   </Layout>
    // </Layout>
  );
}

export default App;
