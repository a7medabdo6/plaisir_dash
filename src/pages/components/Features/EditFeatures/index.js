import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import FeaturesNewEditForm from '../../../../sections/@dashboard/e-commerce/FeaturesNewEditForm';
import { useLocales } from '../../../../locales';

// ----------------------------------------------------------------------

export default function EditFeatures() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Features | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('features.Edit')}`}
          links={[
            
            { name: `${translate('features.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('features.features')}`,
              href: PATH_DASHBOARD.features.root,
            },
            { name: `${translate('features.Edit')}` },
          ]}
        />
        <FeaturesNewEditForm isEdit={true} />
      </Container>
    </>
  );
}


