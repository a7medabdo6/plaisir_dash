// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  category: icon('ic_category'),  // إضافة أيقونة جديدة
  Coupon: icon("ic_coupon"),
  Features: icon("ic_Features"),
  Products: icon("ic_Features"),
  booking: icon('ic_booking'),
  blog: icon('ic_blog'),




};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v4.1.0',
    items: [
      // { title: 'One', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      // { title: 'Two', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      // { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
      { title: 'booking', path: PATH_DASHBOARD.booking, icon: ICONS.booking },

      { title: 'categorydash', path: PATH_DASHBOARD.category, icon: ICONS.category },
      { title: 'coupondash', path: PATH_DASHBOARD.Coupon, icon: ICONS.Coupon },
      { title: 'featuresdash', path: PATH_DASHBOARD.features, icon: ICONS.Features },
      { title: 'productsdash', path: PATH_DASHBOARD.products, icon: ICONS.Products },




    ],
  },


  {
    subheader: 'blog',
    items: [
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

    
    
    ],
  },
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
