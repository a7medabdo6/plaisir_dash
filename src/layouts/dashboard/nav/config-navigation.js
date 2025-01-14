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
  Products: icon("ic_Product"),
  booking: icon('ic_booking'),
  blog: icon('ic_blog'),
  order: icon('ic_order'),





};
const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role?.name; 
console.log(userRole);

const navConfig = [
  // ADMIN فقط
  // ----------------------------------------------------------------------
  ...(userRole === 'Admin'
    ? [
        {
          subheader: 'general v4.1.0',
          items: [
            { title: 'categorydash', path: PATH_DASHBOARD.category, icon: ICONS.category },
            { title: 'coupondash', path: PATH_DASHBOARD.Coupon, icon: ICONS.Coupon },
            { title: 'featuresdash', path: PATH_DASHBOARD.features, icon: ICONS.Features },
            { title: 'productsdash', path: PATH_DASHBOARD.products, icon: ICONS.Products },
            { title: 'faqdash', path: PATH_DASHBOARD.FAQ, icon: ICONS.Products },
            { title: 'BlogTagsdash', path: PATH_DASHBOARD.blogtags, icon: ICONS.Products },

            { title: 'HomeContentdash', path: PATH_DASHBOARD.HomeContent, icon: ICONS.Products },
            { title: 'FooterContentdash', path: PATH_DASHBOARD.FooterContent, icon: ICONS.Products },
            { title: 'Termsdash', path: PATH_DASHBOARD.Terms, icon: ICONS.Products },
            { title: 'Privacydash', path: PATH_DASHBOARD.Privacy, icon: ICONS.Products },


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
        {
          subheader: 'management',
          items: [
            {
              title: 'user',
              path: PATH_DASHBOARD.user.root,
              icon: ICONS.user,
              children: [
                { title: 'list', path: PATH_DASHBOARD.user.list },
              ],
            },
            {
              title: 'Order',
              path: PATH_DASHBOARD.order.root,
              icon: ICONS.order,
              children: [
                { title: 'list', path: PATH_DASHBOARD.order.list },
              ],
            },
          ],
        },
      ]
    :  [
      {
        subheader: 'general v4.1.0',
        items: [
          // { title: 'categorydash', path: PATH_DASHBOARD.category, icon: ICONS.category },
          { title: 'coupondash', path: PATH_DASHBOARD.Coupon, icon: ICONS.Coupon },
          // { title: 'featuresdash', path: PATH_DASHBOARD.features, icon: ICONS.Features },
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
      {
        subheader: 'management',
        items: [
          {
            title: 'user',
            path: PATH_DASHBOARD.user.root,
            icon: ICONS.user,
            children: [
              { title: 'list', path: PATH_DASHBOARD.user.list },
            ],
          },
          {
            title: 'Order',
            path: PATH_DASHBOARD.order.root,
            icon: ICONS.order,
            children: [
              { title: 'list', path: PATH_DASHBOARD.order.list },
            ],
          },
        ],
      },
    ]),];
// const navConfig = [
//   // GENERAL
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'general v4.1.0',
//     items: [
//       // { title: 'One', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
//       // { title: 'Two', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
//       // { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
//       { title: 'booking', path: PATH_DASHBOARD.booking, icon: ICONS.booking },

//       { title: 'categorydash', path: PATH_DASHBOARD.category, icon: ICONS.category },
//       { title: 'coupondash', path: PATH_DASHBOARD.Coupon, icon: ICONS.Coupon },
//       { title: 'featuresdash', path: PATH_DASHBOARD.features, icon: ICONS.Features },
//       { title: 'productsdash', path: PATH_DASHBOARD.products, icon: ICONS.Products },




//     ],
//   },


//   {
//     subheader: 'blog',
//     items: [
//       {
//         title: 'blog',
//         path: PATH_DASHBOARD.blog.root,
//         icon: ICONS.blog,
//         children: [
//           { title: 'posts', path: PATH_DASHBOARD.blog.posts },
//           { title: 'post', path: PATH_DASHBOARD.blog.demoView },
//           { title: 'create', path: PATH_DASHBOARD.blog.new },
//         ],
//       },
//     ],
//   },
//   // MANAGEMENT
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'management',
//     items: [
//       // USER
//       {
//         title: 'user',
//         path: PATH_DASHBOARD.user.root,
//         icon: ICONS.user,
//         children: [
//           // { title: 'profile', path: PATH_DASHBOARD.user.profile },
//           // { title: 'cards', path: PATH_DASHBOARD.user.cards },
//           { title: 'list', path: PATH_DASHBOARD.user.list },
//           // { title: 'create', path: PATH_DASHBOARD.user.new },
//           // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
//           // { title: 'account', path: PATH_DASHBOARD.user.account },
//         ],
//       },
//       {
//         title: 'Order',
//         path: PATH_DASHBOARD.order.root,
//         icon: ICONS.user,
//         children: [
//           // { title: 'profile', path: PATH_DASHBOARD.user.profile },
//           // { title: 'cards', path: PATH_DASHBOARD.user.cards },
//           { title: 'list', path: PATH_DASHBOARD.order.list },
//           // { title: 'create', path: PATH_DASHBOARD.user.new },
//           // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
//           // { title: 'account', path: PATH_DASHBOARD.user.account },
//         ],
//       },
    
    
//     ],
//   },
  
//   // {
//   //   subheader: 'management',
//   //   items: [
//   //     {
//   //       title: 'user',
//   //       path: PATH_DASHBOARD.user.root,
//   //       icon: ICONS.user,
//   //       children: [
//   //         { title: 'Four', path: PATH_DASHBOARD.user.four },
//   //         { title: 'Five', path: PATH_DASHBOARD.user.five },
//   //         { title: 'Six', path: PATH_DASHBOARD.user.six },
//   //       ],
//   //     },
//   //   ],
//   // },
// ];

export default navConfig;
