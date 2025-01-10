import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useLocales } from 'src/locales';
import { useBlogTagsFormHelpers } from './helpers/useBlogTagsFormHelpers';
import useSingleBlogTag from 'src/hooks/BlogTags/useSingleBlogTag';

// ----------------------------------------------------------------------

const BlogTagsNewEditForm = ({ isEdit, currentBlogTags }) => {
  const { id } = useParams();
  const { data: BlogTagsData, isLoading, isError } = useSingleBlogTag(id);
  const {
    methods,
    NewBlogTagsSchema,
    defaultValues,
    onSubmit,
    isCreating,
    isProcessing,
    isUpdating,
  } = useBlogTagsFormHelpers(isEdit, BlogTagsData);
  const { translate } = useLocales();
  const { handleSubmit, formState: { isSubmitting } } = methods;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading BlogTags data!</div>;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title_ar" label={`${translate('BlogTags.title_ar')}`} />
              <RHFTextField name="title_en" label={`${translate('BlogTags.title_en')}`} />

              <Stack spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  loading={isProcessing} // Handle all loading states
                >
                  {!isEdit ? `${translate('BlogTags.CreateBlogTags')}` : `${translate('BlogTags.SaveChanges')}`}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

BlogTagsNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBlogTags: PropTypes.object,
};

export default BlogTagsNewEditForm;
