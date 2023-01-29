import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
const { Option } = Select;

type SelectMovementProps = {
  movementCount: number;
  movements: any;
  restField: any;
  formListname: number;
};

const SelectMovement = ({ movementCount, movements, restField, formListname }: SelectMovementProps) => {
  const renderMovementsOptions = () => {
    return movements.map((item: any) => {
      return { value: item.id, label: item.snippet.title };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.List name={[formListname, 'movements']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'movement']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Select style={{ width: 200 }}>
                    {renderMovementsOptions().map((item: { value: string; label: string }) => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Select style={{ width: 75 }}>
                    <Option value="rep">Rep</Option>
                    <Option value="time">Time</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'length']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Movement
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default SelectMovement;

// {Array.from(Array(movementCount).keys()).map((item: number) => (
//   <Form.Item {...restField} name={[name, 'workout', 'movements']}>
//     {item + 1}.{' '}
//     <Select style={{ width: 400 }}>
//       {renderMovementsOptions().map((item: { value: string; label: string }) => (
//         <Option value={item.value}>{item.label}</Option>
//       ))}
//     </Select>
//   </Form.Item>
// ))}
// <Form.Item {...restField} name={[name, 'workout', 'movements']}>
//   {/* {item + 1}.{' '} */}
//   <Select style={{ width: 400 }}>
//     {renderMovementsOptions().map((item: { value: string; label: string }) => (
//       <Option value={item.value}>{item.label}</Option>
//     ))}
//   </Select>
// </Form.Item>
