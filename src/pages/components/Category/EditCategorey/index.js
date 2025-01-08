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
import { useParams } from 'react-router-dom';  // لاستخراج الـ ID من الرابط
import useSingleCategory from 'src/hooks/Category/useSingleCategory';

// ----------------------------------------------------------------------

export default function EditCategorey() {
  const { translate } = useLocales();
  const { id } = useParams();

  const { themeStretch } = useSettingsContext();
  const { data, error, isLoading } = useSingleCategory(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading category: {error.message}</div>;
  }

  if (!data) {
    return <div>No category found.</div>;
  }

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new Category | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('category.Edit')}`}
          links={[

            { name: `${translate('category.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('category.category')}`,
              href: PATH_DASHBOARD.category.root,
            },
            { name: `${translate('category.Edit')}` },
          ]}
        />
        <CategoryNewEditForm data={data} isEdit={true} />
      </Container>
    </>
  );
}


