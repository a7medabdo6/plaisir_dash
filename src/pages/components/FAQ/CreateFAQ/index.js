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
import FAQNewEditForm from 'src/sections/@dashboard/e-commerce/FAQNewEditForm';

// ----------------------------------------------------------------------

export default function CreateFAQ() {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new FAQ | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('faq.CreateanewFAQ')}`}
          links={[

            { name: `${translate('faq.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('faq.faq')}`,
              href: PATH_DASHBOARD.FAQ.root,
            },
            { name: `${translate('faq.NewFAQ')}` },
          ]}
        />
        {/* <Icon iconName="BiArrowBack" /> */}


        <FAQNewEditForm />
      </Container>
    </>
  );
}
