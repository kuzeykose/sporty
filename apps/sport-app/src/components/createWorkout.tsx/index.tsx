import { useState } from 'react';
import { Button, Form, Tabs, Divider, Card, Input, Typography } from 'antd';
import Detail from './detail';
import SelectMovement from './selectMovement';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CreateWorkout = ({ movements, restField, name }: any) => {
  const [movementCount, setMovementCount] = useState<number>(0);

  // const items: TabsProps['items'] = [
  //   {
  //     key: '1',
  //     label: `EMOM`,
  //     children: (
  //       <>
  //         <div style={{ display: 'flex', gap: 66 }}>
  //           <Detail
  //             workoutDetail={[
  //               { label: 'Workout Name', name: 'workoutName' },
  //               { label: 'Total time - minutes', name: 'time' },
  //               { label: 'SecondForEachTime', name: 'secondForEachTime' },
  //             ]}
  //             restField={restField}
  //             name={name}
  //           />
  //           <Divider type="vertical" style={{ height: 'auto' }} />
  //           <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
  //         </div>
  //       </>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: `AMRAP`,
  //     children: (
  //       <>
  //         <div style={{ display: 'flex', gap: 66 }}>
  //           <Detail
  //             workoutDetail={[
  //               { label: 'Total time - minutes', name: 'time' },
  //               { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
  //             ]}
  //             restField={restField}
  //             name={name}
  //           />
  //           <Divider type="vertical" style={{ height: 'auto' }} />
  //           <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
  //         </div>
  //       </>
  //     ),
  //   },
  //   {
  //     key: '3',
  //     label: `FOR TIME`,
  //     children: (
  //       <>
  //         <div style={{ display: 'flex', gap: 66 }}>
  //           <Detail
  //             workoutDetail={[
  //               { label: 'Total time - minutes', name: 'time' },
  //               { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
  //             ]}
  //             restField={restField}
  //             name={name}
  //           />
  //           <Divider type="vertical" style={{ height: 'auto' }} />
  //           <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
  //         </div>
  //       </>
  //     ),
  //   },
  // ];

  const onChange = () => {
    setMovementCount(0);
  };

  return (
    <>
      <Card style={{ borderColor: '#d9d9d9' }}>
        <Form.Item label="Workout Name">
          <Input style={{ width: 250 }} placeholder="One Dumbell, Core, Morning, etc." />
        </Form.Item>
        <Form.List name={[name, 'section']}>
          {(fields, { add, remove }) => (
            <>
              <div style={{ display: 'flex', gap: 12 }}>
                {fields.map(({ key, name, ...restField }) => (
                  <Card style={{ marginBottom: 8, display: 'flex' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        margin: 3,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Title level={4} style={{ margin: 0 }}>
                        Section: {name + 1}
                      </Title>
                      <Button onClick={() => remove(name)} danger>
                        Remove Section
                      </Button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '450px' }}>
                      <Card style={{ width: '100%' }} title="Settings">
                        <Detail restField={restField} formListname={name} />
                      </Card>
                      <Card style={{ width: '100%' }} title="Movements">
                        <SelectMovement
                          movementCount={movementCount}
                          movements={movements}
                          restField={restField}
                          formListname={name}
                        />
                      </Card>
                    </div>
                  </Card>
                ))}
              </div>
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Section
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </>
  );
};

export default CreateWorkout;
