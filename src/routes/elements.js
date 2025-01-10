import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const CreateCategories = Loadable(
  lazy(() => import('../pages/components/Category/CreateCategories/CreateCategories'))
);
export const CreateCoupon = Loadable(
  lazy(() => import('../pages/components/Coupon/CreateCoupon'))
);
export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
export const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
// DASHBOARD: BLOG
export const BlogPostsPage = Loadable(lazy(() => import('../pages/dashboard/BlogPostsPage')));
export const BlogPostPage = Loadable(lazy(() => import('../pages/dashboard/BlogPostPage')));
export const BlogNewPostPage = Loadable(lazy(() => import('../pages/dashboard/BlogNewPostPage')));


// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const OrderListPage = Loadable(lazy(() => import('../pages/dashboard/OrderListPage')));

export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserOrederCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserOrederCreatePage')));


export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

export const GeneralBookingPage = Loadable(lazy(() => import('../pages/dashboard/GeneralBookingPage')));


export const Category = Loadable(lazy(() => import('../pages/Category')));
export const EditCategorey = Loadable(lazy(() => import('../pages/components/Category/EditCategorey')));
export const Coupon = Loadable(lazy(() => import('../pages/Coupon')));
export const EditCoupon = Loadable(lazy(() => import('../pages/components/Coupon/EditCoupon')));

export const CreateFeatures = Loadable(
  lazy(() => import('../pages/components/Features/CreateFeatures'))
);
export const Features = Loadable(lazy(() => import('../pages/Features')));
export const EditFeatures = Loadable(lazy(() => import('../pages/components/Features/EditFeatures/')));


export const CreateBlogTags = Loadable(
  lazy(() => import('../pages/components/BlogTags/CreateBlogTags'))
);
export const BlogTags = Loadable(lazy(() => import('../pages/BlogTags')));
export const EditBlogTags = Loadable(lazy(() => import('../pages/components/BlogTags/EditBlogTags/')));

export const CreateFAQ = Loadable(
  lazy(() => import('../pages/components/FAQ/CreateFAQ'))
);
export const FAQ = Loadable(lazy(() => import('../pages/FAQ')));
export const EditFAQ = Loadable(lazy(() => import('../pages/components/FAQ/EditFAQ')));


export const CreateProducts = Loadable(
  lazy(() => import('../pages/components/Products/CreateProducts'))
);
export const Products = Loadable(lazy(() => import('../pages/Products')));
export const EditProducts = Loadable(lazy(() => import('../pages/components/Products/EditProducts/')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

