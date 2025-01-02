import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageSix,
  PageFour,
  PageFive,
  LoginPage,
  EcommerceProductCreatePage,
  EditCategorey,
  CreateCoupon,
  PageThree,
  EditCoupon,
  Coupon,
  Category,
  Features,
  CreateFeatures,
  EditFeatures,
  Products,
  CreateProducts,
  EditProducts
} from './elements';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        { path: 'category', element: <Category /> },
        { path: 'category/new', element: <EcommerceProductCreatePage /> },
        { path: 'category/edit:id', element: <EditCategorey /> },

        { path: 'coupon', element: <Coupon /> },
        { path: 'coupon/new', element: <CreateCoupon /> },
        { path: 'coupon/edit:id', element: <EditCoupon /> },

        { path: 'features', element: <Features /> },
        { path: 'features/new', element: <CreateFeatures /> },
        { path: 'features/edit:id', element: <EditFeatures /> },


        { path: 'products', element: <Products /> },
        { path: 'products/new', element: <CreateProducts /> },
        { path: 'products/edit:id', element: <EditProducts /> },
        
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
