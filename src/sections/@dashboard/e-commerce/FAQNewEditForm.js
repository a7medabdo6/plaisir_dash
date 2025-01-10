import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useLocales } from 'src/locales';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد أنماط Quill
import { useFAQFormHelpers } from './helpers/useFAQFormHelpers';
import useSingleFAQ from 'src/hooks/FAQ/useSingleFAQ';

// ----------------------------------------------------------------------

const FAQNewEditForm = ({ isEdit, currentFeatures }) => {
  const { id } = useParams();
  const { data: featureData, isLoading, isError } = useSingleFAQ(id);
  const {
    methods,
    NewFAQSchema,
    defaultValues,
    onSubmit,
    isCreating,
    isProcessing,
    isUpdating,
  } = useFAQFormHelpers(isEdit, featureData);
  const { translate } = useLocales();
  const { handleSubmit, formState: { errors, isSubmitting }, setValue } = methods;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading feature data!</div>;

  // Function to handle changes in ReactQuill
  const handleQuillChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="ques_en" label={`${translate('faq.quesEn')}`} />
              <RHFTextField name="ques_ar" label={`${translate('faq.quesAr')}`} />

              <div>
                <Typography>{`${translate('faq.answerEn')}`}</Typography>
                <ReactQuill
                  value={methods.getValues('answer_en')}
                  onChange={(value) => handleQuillChange('answer_en', value)}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { font: [] }],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      ['link'],
                      ['blockquote'],
                      [{ align: [] }],
                      ['image', 'video'],
                    ],
                  }}
                  formats={[
                    'header', 'font', 'list', 'bold', 'italic', 'underline',
                    'link', 'blockquote', 'align', 'image', 'video',
                  ]}
                  style={{ height: '200px', marginBottom: '50px' }}
                />
                {errors.answer_en && (
                  <Typography color="error">{errors.answer_en.message}</Typography>
                )}
              </div>

              <div>
                <Typography>{`${translate('faq.answerAr')}`}</Typography>
                <ReactQuill
                  value={methods.getValues('answer_ar')}
                  onChange={(value) => handleQuillChange('answer_ar', value)}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { font: [] }],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      ['link'],
                      ['blockquote'],
                      [{ align: [] }],
                      ['image', 'video'],
                    ],
                  }}
                  formats={[
                    'header', 'font', 'list', 'bold', 'italic', 'underline',
                    'link', 'blockquote', 'align', 'image', 'video',
                  ]}
                  style={{ height: '200px', marginBottom: '50px' }}
                />
                {errors.answer_ar && (
                  <Typography color="error">{errors.answer_ar.message}</Typography>
                )}
              </div>

              <Stack spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  loading={isProcessing}
                >
                  {!isEdit ? `${translate('faq.CreateFAQ')}` : `${translate('faq.SaveChanges')}`}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

FAQNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentFeatures: PropTypes.object,
};

export default FAQNewEditForm;
