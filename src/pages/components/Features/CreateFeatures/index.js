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

export default function CreateFeatures() {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new features | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('features.CreateanewFeatures')}`}
          links={[

            { name: `${translate('features.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('features.features')}`,
              href: PATH_DASHBOARD.features.root,
            },
            { name: `${translate('features.NewFeatures')}` },
          ]}
        />
        {/* <Icon iconName="BiArrowBack" /> */}


        <FeaturesNewEditForm />
      </Container>
    </>
  );
}
