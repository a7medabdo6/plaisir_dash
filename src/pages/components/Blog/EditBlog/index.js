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

export default function EditBlog() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Blog | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('bloging.Edit')}`}
          links={[
            
            { name: `${translate('bloging.dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('bloging.blog')}`,
              href: PATH_DASHBOARD.blog,
            },
            { name: `${translate('bloging.Edit')}` },
          ]}
        />
        <BlogNewPostForm isEdit={true} />
      </Container>
    </>
  );
}


