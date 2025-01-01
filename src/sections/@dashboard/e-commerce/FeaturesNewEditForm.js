/* eslint-disable */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from '../../../components/hook-form';
import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const Features_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

// ----------------------------------------------------------------------

FeaturesNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentFeatures: PropTypes.object,
};

export default function FeaturesNewEditForm({ isEdit, currentFeatures }) {
  const navigate = useNavigate();
    const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const NewFeaturesSchema = Yup.object().shape({
    name_en: Yup.string().required(`${translate('features.errors.name_en_required')}`),
    name_ar: Yup.string().required(`${translate('features.errors.name_ar_required')}`),
    icon: Yup.string().required(`${translate('features.errors.icon_required')}`),

    tags: Yup.array().min(2, `${translate('features.errors.tags_required')}`),
    price: Yup.number().moreThan(0, `${translate('features.errors.price_required')}`),
    description: Yup.string().required(`${translate('features.errors.description_required')}`),
  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentFeatures?.name_en || '',
      name_ar: currentFeatures?.name_ar || '',
      description: currentFeatures?.description || '',
      icon: currentFeatures?.icon || "",
      code: currentFeatures?.code || '',
      sku: currentFeatures?.sku || '',
      price: currentFeatures?.price || 0,
      priceSale: currentFeatures?.priceSale || 0,
      tags: currentFeatures?.tags || [TAGS_OPTION[0]],
      inStock: true,
      taxes: true,
      gender: currentFeatures?.gender || GENDER_OPTION[2].value,
      Features: currentFeatures?.Features || Features_OPTION[0].classify[1],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFeatures]
  );

  const methods = useForm({
    resolver: yupResolver(NewFeaturesSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentFeatures) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentFeatures]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };



  

 

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name_ar" label={`${translate('features.NameAr')}`} />
              <RHFTextField name="name_en" label={`${translate('features.NameEn')}`} />

              <RHFTextField name="icon" label={`${translate('features.icon')}`} />

            

              
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <RHFSwitch name="inStock" label={`${translate('features.IsActive')}`} />
                </Card>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? `${translate('features.CreateFeatures')}` : `${translate('features.SaveChanges')}`}
                </LoadingButton>
              </Stack>

            </Stack>
          </Card>
        </Grid>

     
      </Grid>
    </FormProvider>
  );
}
