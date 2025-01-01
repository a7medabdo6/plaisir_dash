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
import { Box, Card, Grid, Stack, Typography, InputAdornment, FormControl, FormHelperText } from '@mui/material';
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
  RHFCheckbox,
  RHFMultiSelect,
  RHFAutocomplete,
} from '../../../components/hook-form';

import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

const Category_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

CouponNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCoupon: PropTypes.object,
};

export default function CouponNewEditForm({ isEdit, currentCoupon }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const NewCouponSchema = Yup.object().shape({
    code: Yup.string().required(`${translate('coupon.errors.code')}`),
    discountPercentage: Yup.number().nullable().required(`${translate('coupon.errors.discountPercentage')}`),
    expirationDate: Yup.date().nullable().required(`${translate('coupon.errors.expirationDate')}`),
    products: Yup.array().min(1, `${translate('coupon.errors.products.min')}`),
  });

  const defaultValues = useMemo(
    () => ({
      code: currentCoupon?.code || '',
      discountPercentage: currentCoupon?.discountPercentage,
      expirationDate: currentCoupon?.expirationDate || new Date().toISOString().split('T')[0],
      products: currentCoupon?.products || [],
    }),
    [currentCoupon]
  );

  const methods = useForm({
    resolver: yupResolver(NewCouponSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCoupon) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentCoupon]);

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
              <FormControl fullWidth error={!!errors.code}>
                <RHFTextField name="code" type="text" label={`${translate('coupon.code')}`} />
              </FormControl>

              <FormControl fullWidth error={!!errors.discountPercentage}>
                <RHFTextField name="discountPercentage" type="number" label={`${translate('coupon.discountPercentage')}`} />
              </FormControl>

              <FormControl fullWidth error={!!errors.expirationDate}>
                <RHFTextField name="expirationDate" type="date" label={`${translate('coupon.expirationDate')}`} />
              </FormControl>

            
              <RHFMultiSelect
                name="products"
                label="Select Products"
                options={options}
                placeholder=" "
                chip
                checkbox
                helperText=" "
                sx={{ mb: 3 }}
              />

              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <RHFSwitch name="inStock" label={`${translate('coupon.IsActive')}`} />
                </Card>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? `${translate('coupon.CreateCoupon')}` : `${translate('coupon.SaveChanges')}`}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
