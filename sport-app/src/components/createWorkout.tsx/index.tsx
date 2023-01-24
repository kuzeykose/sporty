import { useState } from 'react';
import { Button, Form, Tabs, Divider } from 'antd';
import type { TabsProps } from 'antd';
import Detail from './detail';
import SelectMovement from './selectMovement';

const CreateWorkout = ({ movements, restField, name }: any) => {
  const [movementCount, setMovementCount] = useState<number>(0);

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
                // { label: 'MovementCount', name: 'movementCount', onChange: setMovementCount, value: movementCount },
                { label: 'SecondForEachTime', name: 'secondForEachTime' },
              ]}
              restField={restField}
              name={name}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
          </div>
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
              restField={restField}
              name={name}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
          </div>
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
              restField={restField}
              name={name}
            />
            <Divider type="vertical" style={{ height: 'auto' }} />
            <SelectMovement movementCount={movementCount} movements={movements} restField={restField} name={name} />
          </div>
        </>
      ),
    },
  ];

  const onChange = () => {
    setMovementCount(0);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default CreateWorkout;
