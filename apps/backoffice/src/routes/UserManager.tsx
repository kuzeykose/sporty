import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography } from 'antd';
import axios from 'axios';

const { Content } = Layout;
const { Title } = Typography;

type UserList = {
  email: string;
  lastname: string;
  roles: string[];
};

const UserManager = () => {
  const [userList, setUserList] = useState<UserList[]>([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await axios.get('http://localhost:8080/api/user/list');
    if (response.status === 200) {
      setUserList(response.data.Items);
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'age',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_: string, { roles }: any) => (
        <>
          {roles.map((tag: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'USER') {
              color = 'orange';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>User Manager</Title>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          borderRadius: '8px',
          background: 'white',
        }}
      >
        <Table dataSource={userList} columns={columns} />
      </Content>
    </>
  );
};

export default UserManager;
