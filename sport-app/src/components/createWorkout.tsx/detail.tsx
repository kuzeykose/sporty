import { Form, InputNumber, Divider } from 'antd';

type DetailProps = {
  workoutDetail: workoutDetail[];
};

type workoutDetail = {
  label: string;
  name: string;
  onChange?: (e: number) => void;
  value?: number;
};

const Detail = ({ workoutDetail }: DetailProps) => {
  return (
    <>
      <div>
        {workoutDetail.map((item: workoutDetail) => (
          <Form.Item label={item.label} name={item.name}>
            <InputNumber min={0} value={item.value} onChange={(e) => item.onChange && item.onChange(e as number)} />
          </Form.Item>
        ))}
      </div>
    </>
  );
};

export default Detail;
