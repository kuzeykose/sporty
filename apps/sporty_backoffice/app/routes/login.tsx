import { ActionArgs, redirect } from '@remix-run/server-runtime';
import { Box, Form, Checkbox, Card, Button, ButtonVariants, Input } from 'ui';
import { createUserSession, getUserId, login } from '~/utils/session.server';

export const loader = async ({ request }: ActionArgs) => {
  const email = await getUserId(request);
  if (email) {
    throw redirect('/');
  }
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const email = body.get('email') as string;
  const password = body.get('password') as string;

  const user = await login({ email, password });
  return createUserSession(user.email, user.roles, '/');
};

export default function Login() {
  return (
    <Box className="mx-auto max-w-xl">
      <Card>
        <Form method="post" className="space-y-6">
          <Input label="Email" type="email" name="email" />
          <Input label="Password" type="password" name="password" />
          <Box className="flex items-center justify-between">
            <Checkbox label="Remember me" />
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </Box>
          <Button type="submit" variant={ButtonVariants.Primary} className="w-full">
            Submit
          </Button>
        </Form>
      </Card>
    </Box>
  );
}
