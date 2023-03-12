import { Form, Checkbox, Card, Button, ButtonVariants, Input } from 'ui';
import { useFormik } from 'formik';
import { authServices } from '../services/authServices';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      authServices.login(values.email, values.password);
    },
  });

  return (
    <Card>
      <Form onSubmit={formik.handleSubmit} className="space-y-6">
        <Input label="Email" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
        <Button type="submit" variant={ButtonVariants.Primary} className="w-full">
          Submit
        </Button>
      </Form>
    </Card>
  );
}
