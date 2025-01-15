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
import HomeContentEditForm from 'src/sections/@dashboard/e-commerce/HomeContentEditForm';

// ----------------------------------------------------------------------

export default function EditHomeContent() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Category | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('HomeContent.Edit')}`}
          links={[
            
            { name: `${translate('HomeContent.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('HomeContent.HomeContent')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('HomeContent.Edit')}` },
          ]}
        />
        <HomeContentEditForm />
      </Container>
    </>
  );
}


