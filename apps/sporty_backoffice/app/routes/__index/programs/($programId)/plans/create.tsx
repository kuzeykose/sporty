import { useState } from 'react';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { Upload, Card, Box, Input, Button, Form, DatePicker } from 'ui';
import { ActionArgs, redirect } from '@remix-run/server-runtime';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { createPlan } from '~/utils/plan.server';
import { CreatePlan } from '~/types/plan';
import qs from 'qs';

export const action = async ({ request, params }: ActionArgs) => {
  const programId = params.programId as string;
  const reqTest = await request.text();
  const parseReqTest = qs.parse(reqTest);
  const form = JSON.parse(parseReqTest.form as string);
  form.programId = programId;

  const res = programId && (await createPlan(request, form));
  if (res.status === 200) {
    throw redirect(`/program/${programId}/plans`);
  } else {
    return res;
  }
};

export default function Index({ params }: any) {
  const data = useLoaderData<typeof action>();
  const [plan, setPlan] = useState<CreatePlan>({
    programId: '',
    planName: '',
    planDescription: '',
    planNote: '',
    startDate: '',
    endDate: '',
    image: { key: '', data: '', type: '' },
  });
  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    const str = JSON.stringify(plan);
    submit({ form: str }, { method: 'post' });
  };

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
            <DatePicker
              name="startDate"
              className="w-full"
              label="Start date"
              value={plan.startDate}
              onSelect={(e: any) => {
                setPlan({ ...plan, startDate: e.date });
              }}
            />
            <DatePicker
              name="endDate"
              className="w-full"
              label="End Date"
              value={plan.endDate}
              onSelect={(e: any) => {
                setPlan({ ...plan, endDate: e.date });
              }}
            />
          </div>
          <Input
            name="planName"
            label="Plan Name"
            value={plan.planName}
            onChange={(e: any) => {
              setPlan({ ...plan, planName: e.target.value });
            }}
          />
          <Input
            name="planDescription"
            label="Plan Description"
            onChange={(e: any) => {
              setPlan({ ...plan, planDescription: e.target.value });
            }}
          />
          <Input
            name="planNote"
            label="Plan Note"
            onChange={(e: any) => {
              setPlan({ ...plan, planNote: e.target.value });
            }}
          />
          <Upload
            icon={<ArrowUpOnSquareIcon className="w-10 h-10" />}
            title="Upload Image"
            accept="image/png, image/jpeg"
            imageName={plan.image.key || ''}
            onChange={(e) => {
              const reader = new FileReader();
              if (e.target.files) {
                const file = e.target.files[0];
                reader.addEventListener(
                  'load',
                  () => {
                    const res = reader.result as string;
                    const b64: string[] = res.split('data:image/png;base64,');
                    setPlan({ ...plan, image: { data: b64[1], key: file.name, type: file.type } });
                  },
                  false
                );

                if (file) {
                  reader.readAsDataURL(file);
                }
              }
            }}
          />
          <Button className="font-semibold w-full h-10" onClick={handleSubmit}>
            Create Plan
          </Button>
        </Form>
      </Card>
    </Box>
  );
}
