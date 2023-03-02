import { useState, useEffect } from 'react';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Form, Input, Select, Space, Layout, Card, Breadcrumb } from 'antd';
import axios from 'axios';
import CreateWorkout from '../components/createWorkout.tsx';
import { useMatch, useNavigate } from 'react-router-dom';
import { authServices } from '../services/authServices';

const { Title } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;

export default function WorkoutCreator() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [movements, setMovements] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const match = useMatch('/workoutCalendar/createWorkout/:date/:plan');

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

  const onFinish = async (values: any) => {
    console.log({ ...values, ...match?.params }, authServices.currentUserValue.accessToken);

    let config = {
      headers: {
        'x-access-token': authServices.currentUserValue.accessToken,
      },
    };

    let body = {
      ...values,
      ...match?.params,
    };

    const resp = await axios.post('http://localhost:8080/api/workout/create', body, config);

    if (resp.status === 200) {
      navigate('/workoutCalendar');
    }
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

  const titleBreadcrumb = () => {
    const { date, plan }: any = match?.params;

    return (
      <Breadcrumb>
        <Breadcrumb.Item>Workout</Breadcrumb.Item>
        <Breadcrumb.Item>{date}</Breadcrumb.Item>
        <Breadcrumb.Item>{plan}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <section>
      <Title level={2}>Create Workout</Title>
      <Content>
        <Card title={titleBreadcrumb()}>
          <Form form={form} name="createWorkout" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="dailyNote"
              label="Daily Note"
              tooltip={{ title: 'Daily note for workout, reach your team!', icon: <InfoCircleOutlined /> }}
            >
              <TextArea style={{ width: 350 }} />
            </Form.Item>

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
