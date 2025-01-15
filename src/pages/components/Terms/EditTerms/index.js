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

import TermsEditForm from 'src/sections/@dashboard/e-commerce/TermsEditForm';

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
          heading={`${translate('Terms.Edit')}`}
          links={[
            
            { name: `${translate('Terms.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name:   `${translate('Terms.Terms')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('Terms.Edit')}` },
          ]}
        />
        <TermsEditForm />
      </Container>
    </>
  );
}


