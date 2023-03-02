import { Form, InputNumber, Divider, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;

type DetailProps = {
  restField: any;
  formListname: number;
};

const Detail = ({ restField, formListname }: DetailProps) => {
  const [workoutType, setWorkoutType] = useState<string>('');

  const renderFromType = (type: string) => {
    switch (type) {
      case 'emom':
        return (
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item {...restField} name={[formListname, 'settings', 'every']} label="Every">
              <Input />
            </Form.Item>
            <Form.Item {...restField} name={[formListname, 'settings', 'totalTime']} label="Total Time">
              <Input />
            </Form.Item>
          </div>
        );
      case 'amrap':
        return (
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item {...restField} name={[formListname, 'settings', 'totalTime']} label="In">
              <Input />
            </Form.Item>
          </div>
        );
      case 'fortime':
        return (
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item {...restField} name={[formListname, 'settings', 'cap']} label="Cap">
              <Input />
            </Form.Item>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Form.Item {...restField} name={[formListname, 'settings', 'note']} label="Note">
        <Input />
      </Form.Item>
      <Form.Item {...restField} label={'Type'} name={[formListname, 'settings', 'type']}>
        <Select onChange={setWorkoutType}>
          <Option value="emom">EMOM</Option>
          <Option value="amrap">AMRAP</Option>
          <Option value="fortime">FOR TIME</Option>
          <Option value="notfortime">NOT FOR TIME</Option>
        </Select>
      </Form.Item>
      {renderFromType(workoutType)}
    </>
  );
};

export default Detail;
