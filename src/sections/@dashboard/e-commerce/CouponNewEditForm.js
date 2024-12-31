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
import { RHFMultiCheckbox, RHFSlider } from '../../../components/hook-form';

import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const Coupon_OPTION = [
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
    discountPercentage: Yup.number().nullable() .required(`${translate('coupon.errors.discountPercentage')}`),
    expirationDate: Yup.date().nullable() .required(`${translate('coupon.errors.expirationDate')}`),
    products: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required(`${translate('coupon.errors.products.id')}`)
      })
    ).min(1, `${translate('coupon.errors.products.min')}`),
  });

  const defaultValues = useMemo(
    () => ({
      code: currentCoupon?.code || '',
      discountPercentage: currentCoupon?.discountPercentage ,
      expirationDate: currentCoupon?.expirationDate || new Date().toISOString().split('T')[0], // تعيين تاريخ اليوم كقيمة افتراضية
      products: currentCoupon?.images || [],
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

  const Category_OPTION = [
    { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
    { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
    { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <FormControl fullWidth error={!!errors.code}>
                <RHFTextField name="code" type="text" label={`${translate('coupon.code')}`} />
                {/* <FormHelperText>{errors.code?.message}</FormHelperText> */}
              </FormControl>

              <FormControl fullWidth error={!!errors.discountPercentage}>
                <RHFTextField name="discountPercentage" type="number" label={`${translate('coupon.discountPercentage')}`} />
                {/* <FormHelperText>{errors.discountPercentage?.message}</FormHelperText> */}
              </FormControl>

              <FormControl fullWidth error={!!errors.expirationDate}>
                <RHFTextField name="expirationDate" type="date" label={`${translate('coupon.expirationDate')}`} />
                {/* <FormHelperText>{errors.expirationDate?.message}</FormHelperText> */}
              </FormControl>

              <RHFSelect native name="products" label={`${translate('coupon.products')}`}>
                <option value="" />
                {Category_OPTION.map((Category) => (
                  <optgroup key={Category.group} label={Category.group}>
                    {Category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </RHFSelect>
              {/* <RHFMultiCheckbox
          name="multiCheckbox"
          label="Select your interests"
          options={[
            { value: 'option 1', label: 'Option 1' },
            { value: 'option 2', label: 'Option 2' },
            { value: 'option 3', label: 'Option 3' },
          ]}
          row={false} // لتحديد الاتجاه (عمودي أو أفقي)
          spacing={2} // المسافة بين العناصر
          helperText="Please select at least one option"
        /> */}
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
