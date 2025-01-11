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
  CreateCategories,
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
  GeneralBookingPage,
  EditProducts,
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  UserProfilePage,
  UserCardsPage,
  UserListPage,
  UserCreatePage,
  UserEditPage,
  UserAccountPage,
  OrderListPage,
  UserOrederCreatePage,
  FAQ,
  CreateFAQ,
  EditFAQ,
  EditBlogTags,
  BlogEditPostPage,
  BlogTags,
  CreateBlogTags
} from './elements';
import AuthRoleGuard from 'src/auth/AuthRoleGuard';


// ----------------------------------------------------------------------

export default function Router() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role?.name;
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
        { path: 'booking', element: <GeneralBookingPage /> },

        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'category',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <Category />
            </AuthRoleGuard>
          ),
        },
        {
          path: 'category/new',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <CreateCategories />
            </AuthRoleGuard>
          ),
        },
        
        {
          path: 'category/edit:id',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <EditCategorey />
            </AuthRoleGuard>
          ),
        },
        // { path: 'category', element: <Category /> },
        // { path: 'category/new', element: <CreateCategories /> },
        // { path: 'category/edit:id', element: <EditCategorey /> },

        {
          path: 'features',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <Features />
            </AuthRoleGuard>
          ),
        },
        {
          path: 'features/new',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <CreateFeatures />
            </AuthRoleGuard>
          ),
        },
        
        {
          path: 'features/edit:id',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <EditFeatures />
            </AuthRoleGuard>
          ),
        },


        {
          path: 'FAQ',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <FAQ />
            </AuthRoleGuard>
          ),
        },
        {
          path: 'FAQ/new',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <CreateFAQ />
            </AuthRoleGuard>
          ),
        },
        
        {
          path: 'FAQ/edit:id',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <EditFAQ />
            </AuthRoleGuard>
          ),
        },
        {
          path: 'blogtags',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <BlogTags />
            </AuthRoleGuard>
          ),
        },
        {
          path: 'blogtags/new',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <CreateBlogTags />
            </AuthRoleGuard>
          ),
        },
        
        {
          path: 'blogtags/edit:id',
          element: (
            <AuthRoleGuard allowedRoles={['Admin']} userRole={userRole}>
              <EditBlogTags />
            </AuthRoleGuard>
          ),
        },
        { path: 'coupon', element: <Coupon /> },
        { path: 'coupon/new', element: <CreateCoupon /> },
        { path: 'coupon/edit:id', element: <EditCoupon /> },

       


        { path: 'products', element: <Products /> },
        { path: 'products/new', element: <CreateProducts /> },
        { path: 'products/edit:id', element: <EditProducts /> },


        { path: 'booking', element: <GeneralBookingPage /> },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
            { path: 'edit/:id', element: <BlogEditPostPage /> },

          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <OrderListPage /> },
            { path: 'new', element: <UserOrederCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },

        // {
        //   path: 'user',
        //   children: [
        //     { element: <Navigate to="/dashboard/user/four" replace />, index: true },
        //     { path: 'four', element: <PageFour /> },
        //     { path: 'five', element: <PageFive /> },
        //     { path: 'six', element: <PageSix /> },
        //   ],
        // },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
