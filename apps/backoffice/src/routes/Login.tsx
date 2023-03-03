import { Card, Input, Form, Button } from 'antd';
import { authServices } from '../services/authServices';

type InputFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const onFinish = async (values: InputFormValues) => {
    authServices.login(values.email, values.password);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: 200 }}>
      <Card style={{ width: 650, height: 250 }}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
