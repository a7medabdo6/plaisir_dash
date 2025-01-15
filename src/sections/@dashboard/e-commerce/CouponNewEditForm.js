/* eslint-disable */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import useCreateCouponMutation from 'src/hooks/Coupon/useCreateCouponMutation ';
import useUpdateCouponMutation from 'src/hooks/Coupon/useUpdateCouponMutation';
import useSingleCoupon from 'src/hooks/Coupon/useSingleCoupon';

// ----------------------------------------------------------------------

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];



CouponNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCoupon: PropTypes.object,
};

export default function CouponNewEditForm({ isEdit, currentCoupon }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const createMutation = useCreateCouponMutation();
  const { mutate: updateCoupon, isLoading: isUpdating } = useUpdateCouponMutation();
  const { id } = useParams();

  const { data:Onecoupon, error, isLoading } = useSingleCoupon(id);
  const NewCouponSchema = Yup.object().shape({
    code: Yup.string().required(`${translate('coupon.errors.code')}`),
    discountPercentage: Yup.string().nullable().required(`${translate('coupon.errors.discountPercentage')}`),
    expirationDate: Yup.date().nullable().required(`${translate('coupon.errors.expirationDate')}`),
    products: Yup.array().min(1, `${translate('coupon.errors.products.min')}`),
  });

  const defaultValues = useMemo(
    () => ({
      code: Onecoupon?.code || '',
      discountPercentage: Onecoupon?.discountPercentage,
      expirationDate: Onecoupon?.expirationDate || new Date().toISOString().split('T')[0],
      products: Onecoupon?.products || [],
    }),
    [Onecoupon]
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
    if (isEdit && Onecoupon) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, Onecoupon]);

 
  const handleSubmitCoupon= async (formData) => {
    const CouponData = {
      code: formData.code,
      discountPercentage: formData.discountPercentage.toString(),
      expirationDate: formData.expirationDate,
      products: [
        {
          id: 6, // يمكنك ضبط الرقم كما يناسبك
        },
      ],
    };

    try {
      if (isEdit) {
        const updatedCoupon= {
          code: formData.code,
          discountPercentage: formData.discountPercentage.toString(),
          expirationDate: formData.expirationDate,
          products: [
            {
              id: 6, // يمكنك ضبط الرقم كما يناسبك
            },
          ],
        };
        updateCoupon(updatedCoupon);
        enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
      } else {
        await createMutation.mutateAsync(CouponData);
        enqueueSnackbar(`${translate('addSuccess')}`, { variant: 'success' });
      }
      navigate('/dashboard/coupon');
    } catch (error) {
      console.error('Error during submission:', error);
      enqueueSnackbar(`${translate('addError')}`, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitCoupon)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <FormControl fullWidth error={!!errors.code}>
                <RHFTextField name="code" type="text" label={`${translate('coupon.code')}`} />
              </FormControl>

              <FormControl fullWidth error={!!errors.discountPercentage}>
                <RHFTextField name="discountPercentage" type="text" label={`${translate('coupon.discountPercentage')}`} />
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
