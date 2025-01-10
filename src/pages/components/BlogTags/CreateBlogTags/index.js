import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import BlogTagsNewEditForm from '../../../../sections/@dashboard/e-commerce/BlogTagsNewEditForm';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function CreateBlogTags() {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new BlogTags | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('BlogTags.CreateanewBlogTags')}`}
          links={[

            { name: `${translate('BlogTags.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('BlogTags.BlogTags')}`,
              href: PATH_DASHBOARD.blogtags,
            },
            { name: `${translate('BlogTags.CreateanewBlogTags')}` },
          ]}
        />
        {/* <Icon iconName="BiArrowBack" /> */}


        <BlogTagsNewEditForm />
      </Container>
    </>
  );
}
