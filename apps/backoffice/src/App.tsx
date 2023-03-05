import { useEffect, useState } from 'react';

import Login from './routes/Login';
import Root from './routes/Root';
import UserManager from './routes/UserManager';
import WorkoutCreator from './routes/WorkoutCreator';
import WorkoutCalendar from './routes/WorkoutCalendar';
import Plans from './routes/Plans';
import PlanCreator from './routes/PlanCreator';
import PlansList from './routes/PlansList';

import { authServices } from './services/authServices';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    authServices.currentUser.subscribe((x) => {
      setUser(x);
    });
  }, []);

  const ProtectRoot = ({ children, redirectTo }: any) => {
    return user ? children : <Navigate to={redirectTo} />;
  };

  const ProtectLogin = ({ children, redirectTo }: any) => {
    return user ? <Navigate to={redirectTo} /> : children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectRoot redirectTo="/login">
          <Root />
        </ProtectRoot>
      ),
      children: [
        {
          path: '/userManager',
          element: <UserManager />,
        },
        {
          path: '/workoutCalendar',
          element: <WorkoutCalendar />,
        },
        {
          path: '/workoutCalendar/createWorkout/:date/:plan',
          element: <WorkoutCreator />,
        },
        {
          path: '/plans',
          element: <Plans />,
          children: [
            {
              path: '/plans/list',
              element: <PlansList />,
            },
            {
              path: '/plans/create',
              element: <PlanCreator />,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: (
        <ProtectLogin redirectTo="/">
          <Login />
        </ProtectLogin>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
