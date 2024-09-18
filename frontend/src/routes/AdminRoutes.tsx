// AdminRoutes.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '../components/third-patry/Loadable';
import AdminLayout from '../layout/AdminLayout/index';

const LoginAdmin = Loadable(lazy(() => import('../pages/authentication/LoginAdmin')));
const Announcement = Loadable(lazy(() => import('../pages/adminpage/Announcement')));
const Repairing = Loadable(lazy(() => import('../pages/adminpage/Repairing')));
const Enteringandexitingdorm = Loadable(lazy(() => import('../pages/adminpage/Enteringandexitingdorm')));
const ResigningForm = Loadable(lazy(() => import('../pages/adminpage/ResigningForm')));
const RequestDelayingPayment = Loadable(lazy(() => import('../pages/adminpage/RequestDelayingPayment')));
const PaymentConfirmation = Loadable(lazy(() => import('../pages/adminpage/PaymentConfirmation')));
const AdminManagement = Loadable(lazy(() => import('../pages/adminpage/manageadmin')));


const AdminRoutes = (isLoggedInAdmin: boolean): RouteObject[] => {
  return [
    {
      path: '/',
      element: isLoggedInAdmin ? <AdminLayout /> : <LoginAdmin />,
      children: [
        {
          path: 'Announcement',
          element: <Announcement />,
        },
        {
          path: 'Repairing',
          element: <Repairing />,
        },
        {
          path: 'Enteringandexitingdorm',
          element: <Enteringandexitingdorm />,
        },
        {
          path: 'ResigningForm',
          element: <ResigningForm />,
        },
        {
          path: 'RequestDelayingPayment',
          element: <RequestDelayingPayment />,
        },
        {
          path: 'PaymentConfirmation',
          element: <PaymentConfirmation />,
        },
        { path: '/AdminManagement', element: <AdminManagement /> },  
      ],
    },
  ];
};


export default AdminRoutes;

