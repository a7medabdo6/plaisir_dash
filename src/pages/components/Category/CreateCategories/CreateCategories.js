import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import CategoryNewEditForm from '../../../../sections/@dashboard/e-commerce/CategoryNewEditForm';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function CreateCategories() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Category | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('category.CreateanewCategory')}`}
          links={[
            
            { name: `${translate('category.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('category.category')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('category.NewCategory')}` },
          ]}
        />
        <CategoryNewEditForm />
      </Container>
    </>
  );
}
