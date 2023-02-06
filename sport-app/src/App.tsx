import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './routes/Login';
import Root from './routes/Root';
import UserManager from './routes/UserManager';
import WorkoutCreator from './routes/WorkoutCreator';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/createWorkout',
          element: <WorkoutCreator />,
        },
        {
          path: '/userManager',
          element: <UserManager />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
