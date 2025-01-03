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
  booking: path(ROOTS_DASHBOARD, '/booking'),

  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  category: path(ROOTS_DASHBOARD, '/category'),
  categoryNew: path(ROOTS_DASHBOARD, '/category/new'),
  Coupon: path(ROOTS_DASHBOARD, '/Coupon'),
  CouponNew: path(ROOTS_DASHBOARD, '/Coupon/new'),



  features: path(ROOTS_DASHBOARD, '/features'),
  featuresNew: path(ROOTS_DASHBOARD, '/features/new'),


  products: path(ROOTS_DASHBOARD, '/products'),
  productsNew: path(ROOTS_DASHBOARD, '/products/new'),



  booking: path(ROOTS_DASHBOARD, '/booking'),
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  // category: {
  //   root: '/dashboard/ecommerce',
  //   list: '/dashboard/ecommerce/list',
  //   create: '/dashboard/ecommerce/new',
  // },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   four: path(ROOTS_DASHBOARD, '/user/four'),
  //   five: path(ROOTS_DASHBOARD, '/user/five'),
  //   six: path(ROOTS_DASHBOARD, '/user/six'),
  // },
};
