// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  category: path(ROOTS_DASHBOARD, '/category'),
  categoryNew: path(ROOTS_DASHBOARD, '/category/new'),
  Coupon: path(ROOTS_DASHBOARD, '/Coupon'),
  CouponNew: path(ROOTS_DASHBOARD, '/Coupon/new'),



  features: path(ROOTS_DASHBOARD, '/features'),
  featuresNew: path(ROOTS_DASHBOARD, '/features/new'),
  // category: {
  //   root: '/dashboard/ecommerce',
  //   list: '/dashboard/ecommerce/list',
  //   create: '/dashboard/ecommerce/new',
  // },
  
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};
