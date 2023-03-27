import { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'ui';

const { Content } = Layout;
const { Title } = Typography;
// const { Meta } = Card;

type Plan = {
  SK: string;
  PK: string;
  date: string[];
  planNote: string;
  image: string;
};

const PlansList = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>();

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = async () => {
    const resp = await axios.get('http://localhost:8080/api/plan/list');
    if (resp.status === 200) {
      setPlans(resp.data);
    }
  };

  const redirectCreator = () => {
    navigate('/plans/create');
  };

  return (
    <>
      <Title level={2}>Plans</Title>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          borderRadius: '8px',
          background: 'white',
        }}
      >
        <Button onClick={redirectCreator} style={{ marginBottom: 12 }}>
          Create New Plan
        </Button>

        <div className="grid grid-cols-4 gap-4">
          {plans?.map((plan: Plan) => (
            <Card className="cursor-pointer">
              <img className="w-40" alt={plan.PK} src={plan.image} />
              <Card.Title text={plan.PK.split('#')[1]} />
              <p>{plan.planNote}</p>
            </Card>
          ))}
        </div>
      </Content>
    </>
  );
};

export default PlansList;
