import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import { useLocales } from '../../../../locales';
import { BlogNewPostForm } from 'src/sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function CreateBlog() {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Blog | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('Blog.CreateanewBlog')}`}
          links={[

            { name: `${translate('Blog.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Blog.Blog')}`,
              href: PATH_DASHBOARD.Blog,
            },
            { name: `${translate('Blog.CreateanewBlog')}` },
          ]}
        />
        {/* <Icon iconName="BiArrowBack" /> */}


        <BlogNewPostForm />
      </Container>
    </>
  );
}
