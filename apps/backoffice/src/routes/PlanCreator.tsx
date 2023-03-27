import { Upload, DatePicker, Form, Typography, Layout, UploadProps, message } from 'antd';
import { authServices } from '../services/authServices';
import { Button, Input, Textarea } from 'ui';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;
const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const PlanCreator = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    let body = values;
    let image: any = {};
    body.date = [values.date[0].format(dateFormat), values.date[1].format(dateFormat)];

    const base64WithExtras = (await toBase64(values.image.file.originFileObj)) as string;
    image.data = base64WithExtras.split('base64,')[1];
    image.type = values.image.file.type;
    image.key = values.image.file.name;
    body.image = image;

    let config = {
      headers: {
        'x-access-token': authServices.currentUserValue.accessToken,
      },
    };

    const req = await axios.post('http://localhost:8080/api/plan/create', body, config);
    if (req.status === 200) {
      message.success(req.data.message);
      navigate('/plans/list');
    }
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.result);
    });

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    customRequest: ({ file, onSuccess }: any) => {
      onSuccess('ok');
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
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
            <Textarea />
          </Form.Item>

          <Form.Item label="Plan Cover" name="image">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default PlanCreator;
