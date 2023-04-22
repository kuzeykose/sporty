import { Card, Box, Input, Button, Form } from 'ui';
import { ActionArgs, redirect } from '@remix-run/server-runtime';
import { createProgram } from '~/utils/program.server';
import { useLoaderData } from '@remix-run/react';

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  const projectName = formData.get('projectName') as string;
  const projectDescription = formData.get('projectDescription') as string;

  const res = await createProgram(request, projectName, projectDescription);
  if (res.status === 200) {
    throw redirect('/');
  } else {
    return res;
  }
};

export default function Index() {
  const data = useLoaderData<typeof action>();
  console.log(data);

  return (
    <Box className="flex p-12">
      <Box className="w-1/2 mt-4 space-y-1">
        <h1 className="text-3xl font-semibold">Let's Create something new! 🎉</h1>
        <h1 className="text-sm">
          Create your project for your community! Reach people, motivete them and train together. Just for fun!
        </h1>
      </Box>
      <Card className="w-[500px]">
        <Form className="space-y-4" method="post">
          <Input name="projectName" label="Project Name" />
          <Input name="projectDescription" label="Project Description" />

          <Button className="font-semibold w-full h-10" type="submit">
            Create Project
          </Button>
        </Form>
      </Card>
    </Box>
  );
}
