import { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Form, DatePicker, Input, Select, Space, Divider } from 'antd';
import axios from 'axios';
import CreateWorkout from '../components/createWorkout.tsx';

const { Title } = Typography;
const { TextArea } = Input;

export default function WorkoutCreator() {
  const [form] = Form.useForm();
  const [movements, setMovements] = useState<any>([]);

  useEffect(() => {
    getMovements('', []);
  }, []);

  const getMovements = async (nextPageToken: string, moves: any, prevToken?: string) => {
    const resp: any = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        playlistId: 'PLKeP6lzWrjONXZOUz8ypcfMaPYuGJZPi0',
        maxResults: '50',
        key: 'AIzaSyAzw5YpkkGD88CzWWwm4zG_17F-nILWAQE',
        pageToken: nextPageToken,
      },
    });

    if (resp) {
      if (resp.data.nextPageToken && resp.data.nextPageToken !== prevToken) {
        getMovements(resp.data.nextPageToken, [...moves, ...resp.data.items], nextPageToken);
      } else {
        setMovements(moves);
      }
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Title level={2}>Create Workout</Title>
      <Form form={form} name="createWorkout" onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item name="date-picker">
          <DatePicker style={{ width: 250 }} />
        </Form.Item>
        <Form.Item name="dailyNote" label="Daily Note">
          <TextArea style={{ width: 350 }} />
        </Form.Item>
        <Form.Item label="Difficulty">
          <Select style={{ width: 250 }}>
            <Select.Option value="advenced">Advenced</Select.Option>
            <Select.Option value="intermediate">Intermediate</Select.Option>
            <Select.Option value="beginner">Beginner</Select.Option>
          </Select>
        </Form.Item>
        <Divider />

        <Form.List name="workouts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <Form.Item
                    {...restField}
                    name={[name, 'workoutName']}
                    label="Workout Name"
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Space key={key} style={{ marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'workout']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                    >
                      <CreateWorkout movements={movements} restField={restField} name={name} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                </>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Workout
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
