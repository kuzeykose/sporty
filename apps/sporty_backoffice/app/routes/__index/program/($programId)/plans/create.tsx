import { Card, Box, Input, Button, Form, DatePicker } from 'ui';
import { ActionArgs, redirect } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { createPlan } from '~/utils/plan.server';

export const action = async ({ request, params }: ActionArgs) => {
  const programId = params.programId;
  let formData = await request.formData();
  const body = {
    programId,
    planName: formData.get('planName') as string,
    planDescription: formData.get('planDescription') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
  };

  const res = programId && (await createPlan(request, body));
  if (res.status === 200) {
    throw redirect(`/program/${programId}/plans`);
  } else {
    return res;
  }
};

export default function Index() {
  const data = useLoaderData<typeof action>();

  return (
    <Box className="flex p-12 gap-6">
      <Box className="w-3/7 mt-4 space-y-1">
        <h1 className="text-3xl font-semibold">Let's Create new plans for new goals! 🎯</h1>
        <h1 className="text-sm">
          Create your plan for your community! Set a Target, reach your community and crash it together!
        </h1>
      </Box>
      <Card className="w-[500px]">
        <Form className="space-y-4" method="post">
          <div className="flex gap-4">
            <DatePicker name="startDate" className="w-full" label="Start date" />
            <DatePicker name="endDate" className="w-full" label="End Date" />
          </div>
          <Input name="planName" label="Plan Name" />
          <Input name="planDescription" label="Plan Description" />
          <Input name="planNote" label="Plan Note" />

          <Button className="font-semibold w-full h-10" type="submit">
            Create Plan
          </Button>
        </Form>
      </Card>
    </Box>
  );
}
