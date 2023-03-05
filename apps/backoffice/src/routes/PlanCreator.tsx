import { DatePicker, Form, Typography, Layout, Input, Button } from 'antd';
import { authServices } from '../services/authServices';
import axios from 'axios';

const { TextArea } = Input;
const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const PlanCreator = () => {
  const onFinish = (values: any) => {
    let body = values;
    body.date = [values.date[0].format(dateFormat), values.date[1].format(dateFormat)];

    let config = {
      headers: {
        'x-access-token': authServices.currentUserValue.accessToken,
      },
    };

    axios.post('http://localhost:8080/api/plan/create', body, config);
  };

  return (
    <>
      <Title level={2}>Create Plan</Title>

      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          borderRadius: '8px',
          background: 'white',
        }}
      >
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Plan Id" name="planId" rules={[{ required: true, message: 'Please input your Plan Id!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input your date!' }]}>
            <RangePicker
              // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
              format={dateFormat}
            />
          </Form.Item>

          <Form.Item
            label="Plan Note"
            name="planNote"
            rules={[{ required: true, message: 'Please input your Plan Note!' }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default PlanCreator;
