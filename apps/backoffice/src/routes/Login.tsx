import { Card, Form } from 'antd';
import { authServices } from '../services/authServices';
import { Button, ButtonVariants, Input } from 'ui';

type InputFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: 200 }}>
      <Card style={{ width: 650, height: 250 }}>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button variant={ButtonVariants.Primary}>Submit</Button>
        </Form.Item>
      </Card>
    </div>
  );
}
