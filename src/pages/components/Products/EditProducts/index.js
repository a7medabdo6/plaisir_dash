import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import ProductsNewEditForm from '../../../../sections/@dashboard/e-commerce/ProductsNewEditForm';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function EditCategorey() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Category | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('products.Edit')}`}
          links={[
            
            { name: `${translate('products.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('products.products')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('products.Edit')}` },
          ]}
        />
        <ProductsNewEditForm />
      </Container>
    </>
  );
}


