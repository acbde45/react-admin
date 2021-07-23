import { Navigate } from 'react-router-dom';

import DashboardLayout from '@/components/DashboardLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/app/home" /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: '*', element: <Navigate to="/login" /> },
];

export default routes;
