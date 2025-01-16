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
import OurPartnerEditForm from 'src/sections/@dashboard/e-commerce/OurPartnerEditForm';

// ----------------------------------------------------------------------

export default function EditOurPartner() {
    const { translate } = useLocales();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> OurPartner | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('OurPartner.Edit')}`}
          links={[
            
            { name: `${translate('OurPartner.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('OurPartner.OurPartner')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('OurPartner.Edit')}` },
          ]}
        />
        <OurPartnerEditForm />
      </Container>
    </>
  );
}


