import { useState, useEffect } from 'react';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Form, DatePicker, Input, Select, Space, Divider, Layout, Card, Modal } from 'antd';
import axios from 'axios';
import CreateWorkout from '../components/createWorkout.tsx';

const { Title } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;

export default function WorkoutCreator() {
  const [form] = Form.useForm();
  const [movements, setMovements] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getMovements('', []);
  }, []);

  const getMovements = async (nextPageToken: string, moves: any, prevToken?: string) => {
    try {
      const resp: any = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId: 'PLKeP6lzWrjONXZOUz8ypcfMaPYuGJZPi0',
          maxResults: '50',
          key: 'AIzaSyAYleFihTlTSlRvQHVqXNW39W8sG0arI-k',
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
    } catch (error) {}
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <Title level={2}>Create Workout</Title>
      <Content>
        <Card title="Workout">
          <Form form={form} name="createWorkout" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="date-picker"
              label="Date"
              tooltip={{ title: 'Workout date', icon: <InfoCircleOutlined /> }}
              required
            >
              <DatePicker style={{ width: 250 }} />
            </Form.Item>
            <Form.Item
              name="dailyNote"
              label="Daily Note"
              tooltip={{ title: 'Daily note for workout, reach your team!', icon: <InfoCircleOutlined /> }}
            >
              <TextArea style={{ width: 350 }} />
            </Form.Item>
            {/* <Form.Item>
              <Button onClick={showModal}>Generate Workout</Button>
            </Form.Item> */}

            {/* <Modal title="Create Workout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}> */}
            <Form.List name="workouts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      style={{
                        margin: '12px 0',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        width: 'auto',
                        overflow: 'auto',
                      }}
                    >
                      <Space key={key} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'level']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                          tooltip={{
                            title: 'Workout level for athletes! Athletes can choose what level they want.',
                            icon: <InfoCircleOutlined />,
                          }}
                          style={{ width: 450 }}
                          label="Level"
                        >
                          <Select placeholder="Level" style={{ width: 150 }}>
                            <Option value="advance">Advance</Option>
                            <Option value="intermediate">Intermediate</Option>
                            <Option value="beginner">Beginner</Option>
                            <Option value="new">New</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item {...restField} name={[name, 'workout']}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Form.Item>
                      </Space>

                      <Form.List name={[name, 'workout']}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <CreateWorkout movements={movements} restField={restField} name={name} />
                                <MinusCircleOutlined onClick={() => remove(name)} />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Workout
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  ))}

                  <Form.Item>
                    <Button
                      style={{ margin: '22px auto', width: '100%' }}
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Level
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* </Modal> */}

            {/* <Form.Item label="Difficulty">
              <Select style={{ width: 250 }}>
                <Select.Option value="advenced">Advenced</Select.Option>
                <Select.Option value="intermediate">Intermediate</Select.Option>
                <Select.Option value="beginner">Beginner</Select.Option>
              </Select>
            </Form.Item>
            <Divider /> */}

            {/* <Form.List name="workouts">
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
*/}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Workout
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </section>
  );
}

// "advanced": [
//   {
//     "workoutName": "calisthenics",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "NOTFORTIME",
//           "note": "Rest As Much As You Need Between Sets"
//         },
//         "movements": [
//           {
//             "movement": "One Arm Assisted Pbar Curl",
//             "type": "rep"
//           },
//           {
//             "movement": "DB Snach",
//             "type": "time",
//             "length": 300
//           }
//         ]
//       }
//     }
//   },
//   {
//     "workoutName": "one_dumbell_training",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "EMOM",
//           "totalTime": 10,
//           "each": 1,
//           "note": "one set right, one set left"
//         },
//         "movements": [
//           {
//             "movement": "Diamond Push Up",
//             "type": "time",
//             "length": 300
//           },
//           {
//             "movement": "DB Snach",
//             "type": "time",
//             "length": 300
//           }
//         ]
//       },
//       "B": {
//         "settings": {
//           "type": "FORTIME",
//           "totalTime": 8,
//           "remaningTime": {
//             "movement": "Diamond Push Up",
//             "type": "time"
//           }
//         },
//         "movements": [
//           {
//             "movement": "Diamond Push Up",
//             "type": "time",
//             "length": 300
//           },
//           {
//             "movement": "DB Snach",
//             "type": "time",
//             "length": 300
//           }
//         ]
//       }
//     }
//   },
//   {
//     "workoutName": "core",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "EMOM",
//           "totalTime": 8,
//           "each": "30sn",
//           "note": "Core workout"
//         },
//         "movements": [
//           {
//             "movement": "Max. V-Up Like A Gymnast",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Max. Tuck-Up",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           }
//         ]
//       }
//     }
//   }
// ],
// "intermediate": [
//   {
//     "workoutName": "core",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "EMOM",
//           "totalTime": 8,
//           "each": "30sn",
//           "note": "Core workout"
//         },
//         "movements": [
//           {
//             "movement": "Max. V-Up Like A Gymnast",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Max. Tuck-Up",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           }
//         ]
//       }
//     }
//   }
// ],
// "beginner": [
//   {
//     "workoutName": "core",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "EMOM",
//           "totalTime": 8,
//           "each": "30sn",
//           "note": "Core workout"
//         },
//         "movements": [
//           {
//             "movement": "Max. V-Up Like A Gymnast",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Max. Tuck-Up",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           }
//         ]
//       }
//     }
//   }
// ],
// "new": [
//   {
//     "workoutName": "core",
//     "workout": {
//       "A": {
//         "settings": {
//           "type": "EMOM",
//           "totalTime": 8,
//           "each": "30sn",
//           "note": "Core workout"
//         },
//         "movements": [
//           {
//             "movement": "Max. V-Up Like A Gymnast",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Max. Tuck-Up",
//             "type": "time",
//             "length": "30sec"
//           },
//           {
//             "movement": "Rest",
//             "type": "time",
//             "length": "30sec"
//           }
//         ]
//       }
//     }
//   }
// ]
// }
