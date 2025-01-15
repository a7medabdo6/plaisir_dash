/* eslint-disable */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import FormProvider, {
  RHFUpload,
  RHFTextField,
} from '../../../components/hook-form';
import { useLocales } from '../../../locales';
import { useCategoryForm } from './helpers/useCategoryFormHelpers';

// ----------------------------------------------------------------------

CategoryNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCategory: PropTypes.object,
  data: PropTypes.object,
};

export default function CategoryNewEditForm({ isEdit, currentCategory, data }) {
  const { translate } = useLocales();
  const defaultValues = useMemo(
    () => ({
      name_en: data?.name_en || '',
      name_ar: data?.name_ar || '',
      images: data?.images || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const NewCategorySchema = Yup.object().shape({
    name_en: Yup.string().required(`${translate('category.errors.name_en_required')}`),
    name_ar: Yup.string().required(`${translate('category.errors.name_ar_required')}`),
  });
  const methods = useForm({
    resolver: yupResolver(NewCategorySchema),
    defaultValues,
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const {
    handleDrop,
    onUpload,
    handleRemoveFile,
    handleRemoveAllFiles,
    handleSubmitCategory,
    isLoading,
    file,
    setFile,
  } = useCategoryForm(isEdit, currentCategory, data, setValue);
  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitCategory)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name_ar" label={`${translate('category.NameAr')}`} />
              <RHFTextField name="name_en" label={`${translate('category.NameEn')}`} />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {`${translate('category.images')}`}
                </Typography>
                <RHFUpload
                  multiple
                  thumbnail
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={onUpload}
                />
              </Stack>
              <Stack spacing={3}>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || isLoading}
                >
                  {!isEdit ? `${translate('category.CreateCategory')}` : `${translate('category.SaveChanges')}`}
                </LoadingButton>
              </Stack>

            </Stack>
          </Card>
        </Grid>


      </Grid>
    </FormProvider>
  );
}
