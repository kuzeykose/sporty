import { useEffect, useState } from 'react';
import { Form, Calendar, Card, Modal, DatePicker, Select, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';

import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { BadgeProps } from 'antd';
import axios from 'axios';

const { Option } = Select;

const WorkoutCalendar = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutList, setWorkoutList] = useState<any>();

  useEffect(() => {
    getWorkoutList();
  }, []);

  const getWorkoutList = async () => {
    const response = await axios.get('http://localhost:8080/api/workout/list');
    if (response.status === 200) {
      console.log(response.data.Items);

      setWorkoutList(response.data.Items);
    }
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const calendarHandler = (date: Dayjs) => {
    showModal();
    form.setFieldValue('date', date);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const formValues = form.getFieldsValue();
    const date = formValues.date.format('YYYY-MM-DD');
    const plan = formValues.plan;

    navigate(`/workoutCalendar/createWorkout/${date}/${plan}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getListData = (value: Dayjs) => {
    let data: any = [];
    workoutList?.forEach((item: any) => {
      const splitSK = item.SK.split('#');
      // console.log(value.format('YYYY-MM-DD'), splitSK[2], value.format('YYYY-MM-DD') === splitSK[2]);
      if (value.format('YYYY-MM-DD') === splitSK[2]) data.push({ type: 'warning', content: splitSK[1] });
    });

    return data || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    return (
      <>
        {listData?.map((item: any) => (
          <Badge status={item.type as BadgeProps['status']} text={item.content} />
        ))}
      </>
    );
  };

  return (
    <Card title="Workout Calendar">
      <Calendar dateCellRender={dateCellRender} onChange={calendarHandler} onPanelChange={onPanelChange} />
      <Modal title="Select Date & Workout to Change" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form} style={{ marginTop: 22 }}>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input your username!' }]}>
            <DatePicker disabled />
          </Form.Item>

          <Form.Item label="Plan" name="plan" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default WorkoutCalendar;
