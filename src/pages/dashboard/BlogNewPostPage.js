import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { BlogNewPostForm } from '../../sections/@dashboard/blog';
import 'react-quill/dist/quill.snow.css';  // استيراد أنماط Quill
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> Blog: New Post | Minimal UI</title>
      </Helmet>


      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('bloging.create_a_new_post')}`}
          links={[
            {
              name: `${translate('bloging.dashboard')}`,
              href: PATH_DASHBOARD.root,
            },
            {
              name: `${translate('bloging.blog')}`,
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: `${translate('bloging.create')}`,
            },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </>
  );
}
