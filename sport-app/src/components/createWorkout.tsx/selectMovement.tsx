import { Form, Select } from 'antd';

type SelectMovementProps = {
  movementCount: number;
};

const SelectMovement = ({ movementCount }: SelectMovementProps) => {
  return (
    <Form.Item>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.from(Array(movementCount).keys()).map((item: number) => (
          <>
            {item + 1}.
            <Select
              style={{ width: 400 }}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'disabled',
                  disabled: true,
                  label: 'Disabled',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
              ]}
            />
          </>
        ))}
      </div>
    </Form.Item>
  );
};

export default SelectMovement;
