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
export const EcommerceProductCreatePage = Loadable(
  lazy(() => import('../pages/components/Category/EcommerceProductCreatePage/EcommerceProductCreatePage'))
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
export const Category = Loadable(lazy(() => import('../pages/Category')));
export const EditCategorey = Loadable(lazy(() => import('../pages/components/Category/EditCategorey')));
export const Coupon = Loadable(lazy(() => import('../pages/Coupon')));
export const EditCoupon = Loadable(lazy(() => import('../pages/components/Coupon/EditCoupon')));

export const CreateFeatures = Loadable(
  lazy(() => import('../pages/components/Features/CreateFeatures'))
);
export const Features = Loadable(lazy(() => import('../pages/Features')));
export const EditFeatures = Loadable(lazy(() => import('../pages/components/Features/EditFeatures/')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
