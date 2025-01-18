import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';

import { Box, Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFUpload, RHFUploadWithLabel } from '../../../components/hook-form';
import { useLocales } from 'src/locales';
import useSingleCompany from 'src/hooks/Company/useSingleCompany';
import { useCompanyFormHelpers } from './helpers/useCompanyFormHelpers';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const CompanyNewEditForm = ({ isEdit, currentCompany }) => {
  const { translate } = useLocales();
  console.log(isEdit);

  const { id } = useParams();
  const { data: CompanyData, isLoading, isError,

  } = useSingleCompany(id);
  const NewCompanysSchema = Yup.object().shape({
    commercial_name_en: Yup.string().required(`${translate('Companys.errors.commercial_name_en_required')}`),
    commercial_name_ar: Yup.string().required(`${translate('Companys.errors.commercial_name_ar_required')}`),
    country: Yup.string().required(`${translate('Companys.errors.country_required')}`),
    phone: Yup.string().required(`${translate('Companys.errors.phone_required')}`),
    notes: Yup.string().required(`${translate('Companys.errors.notes_required')}`),
    locaton: Yup.string().required(`${translate('Companys.errors.locaton_required')}`),
    photo_id: Yup.object().shape({
      id: Yup.string().required(`${translate('Companys.errors.photo_id_required')}`),
    }),
    commercial_register: Yup.object().shape({
      id: Yup.string().required(`${translate('Companys.errors.commercial_register_required')}`),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      commercial_name_en: CompanyData?.commercial_name_en || '',
      commercial_name_ar: CompanyData?.commercial_name_ar || '',
      country: CompanyData?.country || '',
      phone: CompanyData?.phone || '',
      notes: CompanyData?.notes || '',
      locaton: CompanyData?.locaton || '',
      photo_id: {
        id: CompanyData?.photo_id?.id || '',
      },
      commercial_register: {
        id: CompanyData?.commercial_register?.id || '',
      },
    }),
    [CompanyData]
  );
  const methods = useForm({
    resolver: yupResolver(NewCompanysSchema),
    defaultValues,
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const {
    NewCompanySchema,
    onSubmit,
    handleDrop,
    handleRemoveFile,
    handleRemoveAllFiles,
    onUpload,
    isCreating,
    isProcessing,
    setFile,
    isUpdating,
  } = useCompanyFormHelpers(isEdit, CompanyData, setValue, defaultValues, methods);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Company data!</div>;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="commercial_name_ar" label={`${translate('Company.commercialNameAr')}`} />
              <RHFTextField name="commercial_name_en" label={`${translate('Company.commercialNameEn')}`} />
              <RHFTextField name="country" label={`${translate('Company.country')}`} />
              <RHFTextField name="phone" label={`${translate('Company.phone')}`} />
              <RHFTextField name="notes" label={`${translate('Company.notes')}`} />
              <RHFTextField name="locaton" label={`${translate('Company.locaton')}`} />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {`${translate('Company.commercialRegister')}`}
                </Typography>

                <RHFUploadWithLabel
                  thumbnail
                  name="commercial_register"
                  label={translate('HomeContent.commercial_register.value')}
                  defaultValue={defaultValues.commercial_register}
                  multiple
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'commercial_register')}
                  onRemove={() => handleRemoveFile('commercial_register')}
                  onRemoveAll={() => handleRemoveAllFiles('commercial_register')}
                  onUpload={() => onUpload('commercial_register')}
                  isLoading={isLoading}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {`${translate('Company.images')}`}
                </Typography>
                <RHFUploadWithLabel
                  thumbnail
                  name="photo_id"
                  label={translate('HomeContent.photo_id.value')}
                  defaultValue={defaultValues.photo_id}
                  multiple
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'photo_id')}
                  onRemove={() => handleRemoveFile('photo_id')}
                  onRemoveAll={() => handleRemoveAllFiles('photo_id')}
                  onUpload={() => onUpload('photo_id')}
                  isLoading={isLoading}
                />
              </Stack>

              <Stack spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  loading={isProcessing} // Handle all loading states
                >
                  {!isEdit ? `${translate('Company.CreateCompany')}` : `${translate('Company.SaveChanges')}`}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

CompanyNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCompany: PropTypes.object,
};

export default CompanyNewEditForm;
