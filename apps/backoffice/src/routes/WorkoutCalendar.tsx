import { useEffect, useState } from 'react';
import { Form, Calendar, Card, Modal, DatePicker, Select, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonVariants } from 'ui';

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
  const [plans, setPlans] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<string>();

  useEffect(() => {
    getWorkoutList();
    getPlans();
  }, []);

  const getWorkoutList = async () => {
    const response = await axios.get('http://localhost:8080/api/workout/list');
    if (response.status === 200) {
      setWorkoutList(response.data.Items);
    }
  };

  const getPlans = async () => {
    const resp = await axios.get('http://localhost:8080/api/plan/list');
    if (resp.status === 200) {
      setPlans(resp.data);
    }
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const calendarHandler = (date: Dayjs) => {
    showModal();
    form.setFieldValue('date', date);
    setSelectedDate(date.format('YYYY-MM-DD'));
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
    form.resetFields();
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

      <Modal title="Select Date & Workout to Change" open={isModalOpen} footer={null}>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form} style={{ marginTop: 22 }}>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input your username!' }]}>
            <DatePicker disabled />
          </Form.Item>

          <Form.Item label="Plan" name="plan" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Select>
              {selectedDate &&
                plans?.map((item: any) => {
                  const startDate = new Date(item.date[0]);
                  const selected = new Date(selectedDate);
                  const endDate = new Date(item.date[1]);

                  if (startDate < selected && selected < endDate) {
                    return <Option value={item.PK.split('#')[1]}>{item.PK.split('#')[1]}</Option>;
                  }
                })}
            </Select>
          </Form.Item>
        </Form>

        <div className="flex gap-2 justify-end">
          <Button variant={ButtonVariants.Secondary} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </div>
      </Modal>
    </Card>
  );
};

export default WorkoutCalendar;
