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
import CompanyNewEditForm from 'src/sections/@dashboard/e-commerce/CompanyNewEditForm';

// ----------------------------------------------------------------------

export default function CreateCompany() {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Company | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('Company.CreateanewCompany')}`}
          links={[

            { name: `${translate('Company.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Company.Company')}`,
              href: PATH_DASHBOARD.Company,
            },
            { name: `${translate('Company.NewCompany')}` },
          ]}
        />
        {/* <Icon iconName="BiArrowBack" /> */}


        <CompanyNewEditForm />
      </Container>
    </>
  );
}
