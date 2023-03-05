import React from 'react';
import { DiffOutlined, LaptopOutlined, LogoutOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuProps, Layout, Menu, Avatar, Dropdown, Space } from 'antd';

const { Header, Sider } = Layout;

const menu = [
  {
    icon: DiffOutlined,
    name: 'Plans',
    key: 'plans/list',
  },
  {
    icon: LaptopOutlined,
    name: 'Workout Calendar',
    key: 'workoutCalendar',
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

  const items: MenuProps['items'] = [
    {
      onClick: () => {
        localStorage.removeItem('sporty_token');
        navigate('/login');
      },
      key: '1',
      danger: true,
      icon: <LogoutOutlined style={{ marginRight: 6 }} />,
      label: 'Logout',
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          padding: '20px 30px',
          background: 'rgba(240, 242, 245, 0.4)',
          borderBlockEnd: '1px solid rgba(5, 5, 5, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          className="logo"
          style={{
            height: 40,
            width: 150,
            background: '#ff7a45',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Logo
        </div>
        <Space wrap>
          <Dropdown menu={{ items }}>
            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', minHeight: '91vh', borderInlineEnd: '1px solid rgba(5, 5, 5, 0.06)' }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ padding: '24px', height: '100%' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Root;
