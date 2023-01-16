import { useState } from 'react';
import { Typography, Button, Form, Tabs, Divider } from 'antd';
import type { TabsProps } from 'antd';
import Detail from './detail';
import SelectMovement from './selectMovement';

const { Title } = Typography;

const CreateWorkout = () => {
  const [form] = Form.useForm();
  const [movementCount, setMovementCount] = useState<number>(0);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `EMOM`,
      children: (
        <>
          <div style={{ display: 'flex', gap: 66 }}>
            <Detail
              workoutDetail={[
                { label: 'Total time - minutes', name: 'time' },
                { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
                { label: 'SecondForEachTime', name: 'secondForEachTime' },
              ]}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Workout
            </Button>
          </Form.Item>
        </>
      ),
    },
    {
      key: '2',
      label: `AMRAP`,
      children: (
        <>
          <div style={{ display: 'flex', gap: 66 }}>
            <Detail
              workoutDetail={[
                { label: 'Total time - minutes', name: 'time' },
                { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
              ]}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Workout
            </Button>
          </Form.Item>
        </>
      ),
    },
    {
      key: '3',
      label: `FOR TIME`,
      children: (
        <>
          <div style={{ display: 'flex', gap: 66 }}>
            <Detail
              workoutDetail={[
                { label: 'Total time - minutes', name: 'time' },
                { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
              ]}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} />
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Workout
            </Button>
          </Form.Item>
        </>
      ),
    },
  ];

  const onChange = (key: string) => {
    setMovementCount(0);
    form.resetFields();
  };

  return (
    <>
      <Title level={2}>Create Workout</Title>
      <Form form={form} name="createWorkout" onFinish={onFinish} autoComplete="off" labelCol={{ span: 16 }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Form>
    </>
  );
};

export default CreateWorkout;
