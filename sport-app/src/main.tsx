import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import WorkoutCreator from './routes/WorkoutCreator';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/createWorkout',
        element: <WorkoutCreator />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
  // </React.StrictMode>
);
