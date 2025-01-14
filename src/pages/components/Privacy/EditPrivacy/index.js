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

import PrivacyEditForm from 'src/sections/@dashboard/e-commerce/PrivacyEditForm';

// ----------------------------------------------------------------------

export default function EditFooterContent() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Category | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('coupon.Edit')}`}
          links={[
            
            { name: `${translate('coupon.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('coupon.coupon')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('coupon.Edit')}` },
          ]}
        />
        <PrivacyEditForm />
      </Container>
    </>
  );
}


