import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useFeatureFormHelpers } from './helpers/useFeatureFormHelpers';
import { useLocales } from 'src/locales';
import useSingleFeature from 'src/hooks/Features/useSingleFeature';

// ----------------------------------------------------------------------

const FeaturesNewEditForm = ({ isEdit, currentFeatures }) => {
  const { id } = useParams();
  const { data: featureData, isLoading, isError } = useSingleFeature(id);
  const {
    methods,
    NewFeaturesSchema,
    defaultValues,
    onSubmit,
    isCreating,
    isProcessing,
    isUpdating,
  } = useFeatureFormHelpers(isEdit, featureData);
  const { translate } = useLocales();
  const { handleSubmit, formState: { isSubmitting } } = methods;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading feature data!</div>;

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
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  loading={isProcessing} // Handle all loading states
                >
                  {!isEdit ? `${translate('features.CreateFeatures')}` : `${translate('features.SaveChanges')}`}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

FeaturesNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentFeatures: PropTypes.object,
};

export default FeaturesNewEditForm;
