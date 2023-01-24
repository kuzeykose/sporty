import { Form, Select } from 'antd';
const { Option } = Select;

type SelectMovementProps = {
  movementCount: number;
  movements: any;
  restField: any;
  name: string;
};

const SelectMovement = ({ movementCount, movements, restField, name }: SelectMovementProps) => {
  const renderMovementsOptions = () => {
    return movements.map((item: any) => {
      return { value: item.id, label: item.snippet.title };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* {Array.from(Array(movementCount).keys()).map((item: number) => (
        <Form.Item {...restField} name={[name, 'workout', 'movements']}>
          {item + 1}.{' '}
          <Select style={{ width: 400 }}>
            {renderMovementsOptions().map((item: { value: string; label: string }) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
      ))} */}
      <Form.Item {...restField} name={[name, 'workout', 'movements']}>
        {/* {item + 1}.{' '} */}
        <Select style={{ width: 400 }}>
          {renderMovementsOptions().map((item: { value: string; label: string }) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default SelectMovement;
