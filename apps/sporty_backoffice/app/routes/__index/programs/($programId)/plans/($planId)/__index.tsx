import { useParams } from '@remix-run/react';

const PlanIndex = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      {params.programId} - {params.planId}
    </div>
  );
};

export default PlanIndex;
