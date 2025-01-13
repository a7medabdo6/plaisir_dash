/* eslint-disable */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment, FormControl, FormHelperText, Button } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFUploadWithLabel,
  RHFTextField,
} from '../../../components/hook-form';

import { useLocales } from '../../../locales';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useStepHandlerHomeContent } from './helpers/useHomeContentFormHelpers';
import useUpdateHomeContentMutation from 'src/hooks/HomeContent/useUpdateBlogTagMutation';

// ----------------------------------------------------------------------

HomeContentEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentHomeContent: PropTypes.object,
};

export default function HomeContentEditForm({ isEdit, currentHomeContent }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();



  const { defaultValues, NewHomeContentSchema, HomeContentsData, onSubmit,onUpload,isLoading ,handleDrop,uploadedFileDetails} = useStepHandlerHomeContent(currentHomeContent);


  const methods = useForm({
    resolver: yupResolver(NewHomeContentSchema),
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
    if (isEdit && HomeContentsData) {
      reset(HomeContentsData);
    }
    if (!isEdit) {
      reset(HomeContentsData);
    }
  }, [isEdit, HomeContentsData]);


 
  




  const handleRemoveFile = (fieldName) => {
    setValue(fieldName, null);  // إزالة الصورة المحددة
  };

  const handleRemoveAllFiles = (fieldName) => {
    setValue(fieldName, null);  // إزالة كل الصور
  };

  const [currentSection, setCurrentSection] = useState(1);
  const nextSection = () => {
    if (currentSection < 5) {  // Adjust number based on total sections
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {
              HomeContentsData ? (
                <Stack spacing={3}>
                  {currentSection === 1 && (
                    <Stack spacing={2} >
                      <RHFTextField name="banner_fir_title_en" label={translate('HomeContent.labels.banner_fir_title_en')} />
                      <RHFTextField name="banner_fir_title_ar" label={translate('HomeContent.labels.banner_fir_title_ar')} />
                      <RHFTextField name="banner_sec_title_en" label={translate('HomeContent.labels.banner_sec_title_en')} />
                      <RHFTextField name="banner_sec_title_ar" label={translate('HomeContent.labels.banner_sec_title_ar')} />
                      <RHFTextField name="banner_third_title_en" label={translate('HomeContent.labels.banner_third_title_en')} />
                      <RHFTextField name="banner_third_title_ar" label={translate('HomeContent.labels.banner_third_title_ar')} />
                      <RHFTextField name="banner_btn_en" label={translate('HomeContent.labels.banner_btn_en')} />
                      <RHFTextField name="banner_btn_ar" label={translate('HomeContent.labels.banner_btn_ar')} />

                      <RHFUploadWithLabel
                        label="Upload Banner Photo"
                        defaultValue={defaultValues.banner_photo.id}
                        multiple
                        thumbnail
                        name="banner_photo"
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner_photo')}
                        onRemove={() => handleRemoveFile('banner_photo')}
                        onRemoveAll={() => handleRemoveAllFiles('banner_photo')}
                        onUpload={()=>onUpload('banner_photo')
                        }
                      />
                      <RHFUploadWithLabel
                        thumbnail
                        name="banner_photo_ar"
                        label="Upload Banner Photo (Arabic)"
                        defaultValue={defaultValues.banner_photo_ar.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner_photo_ar')}
                        onRemove={() => handleRemoveFile('banner_photo_ar')}
                        onRemoveAll={() => handleRemoveAllFiles('banner_photo_ar')}
                        onUpload={()=>onUpload('banner_photo_ar')}
                      />
                    </Stack>
                  )
                  }

                  {currentSection === 2 && (
                    <Stack spacing={2}>
                      <RHFTextField name="service_fir_title_en" label={translate('HomeContent.labels.service_fir_title_en')} />
                      <RHFTextField name="service_fir_title_ar" label={translate('HomeContent.labels.service_fir_title_ar')} />
                      <RHFTextField name="service_fir_sub_title_en" label={translate('HomeContent.labels.service_fir_sub_title_en')} />
                      <RHFTextField name="service_fir_sub_title_ar" label={translate('HomeContent.labels.service_fir_sub_title_ar')} />
                      <RHFTextField name="service_sec_title_en" label={translate('HomeContent.labels.service_sec_title_en')} />
                      <RHFTextField name="service_sec_title_ar" label={translate('HomeContent.labels.service_sec_title_ar')} />
                      <RHFTextField name="service_sec_sub_title_en" label={translate('HomeContent.labels.service_sec_sub_title_en')} />
                      <RHFTextField name="service_sec_sub_title_ar" label={translate('HomeContent.labels.service_sec_sub_title_ar')} />
                      <RHFTextField name="service_third_title_en" label={translate('HomeContent.labels.service_third_title_en')} />
                      <RHFTextField name="service_third_title_ar" label={translate('HomeContent.labels.service_third_title_ar')} />
                      <RHFTextField name="service_third_sub_title_en" label={translate('HomeContent.labels.service_third_sub_title_en')} />
                      <RHFTextField name="service_third_sub_title_ar" label={translate('HomeContent.labels.service_third_sub_title_ar')} />
                      <RHFTextField name="service_forth_title_en" label={translate('HomeContent.labels.service_forth_title_en')} />
                      <RHFTextField name="service_forth_title_ar" label={translate('HomeContent.labels.service_forth_title_ar')} />
                      <RHFTextField name="service_fivth_title_en" label={translate('HomeContent.labels.service_fivth_title_en')} />
                      <RHFTextField name="service_fivth_title_ar" label={translate('HomeContent.labels.service_fivth_title_ar')} />
                      <RHFTextField name="service_sex_title_en" label={translate('HomeContent.labels.service_sex_title_en')} />
                      <RHFTextField name="service_sex_title_ar" label={translate('HomeContent.labels.service_sex_title_ar')} />
                      <RHFTextField name="service_seven_title_en" label={translate('HomeContent.labels.service_seven_title_en')} />
                      <RHFTextField name="service_seven_title_ar" label={translate('HomeContent.labels.service_seven_title_ar')} />
                      <RHFTextField name="know_us_title_en" label={translate('HomeContent.labels.know_us_title_en')} />
                      <RHFTextField name="know_us_title_ar" label={translate('HomeContent.labels.know_us_title_ar')} />
                      <RHFTextField name="know_us_sub_title_en" label={translate('HomeContent.labels.know_us_sub_title_en')} />
                      <RHFTextField name="know_us_sub_title_ar" label={translate('HomeContent.labels.know_us_sub_title_ar')} />
                      <RHFTextField name="know_us_sec_title_en" label={translate('HomeContent.labels.know_us_sec_title_en')} />
                      <RHFTextField name="know_us_sec_title_ar" label={translate('HomeContent.labels.know_us_sec_title_ar')} />
                      <RHFTextField name="know_us_fir_item_en" label={translate('HomeContent.labels.know_us_fir_item_en')} />
                      <RHFTextField name="know_us_fir_item_ar" label={translate('HomeContent.labels.know_us_fir_item_ar')} />
                      <RHFTextField name="know_us_sec_item_en" label={translate('HomeContent.labels.know_us_sec_item_en')} />
                      <RHFTextField name="know_us_sec_item_ar" label={translate('HomeContent.labels.know_us_sec_item_ar')} />
                      <RHFTextField name="know_us_third_item_en" label={translate('HomeContent.labels.know_us_third_item_en')} />
                      <RHFTextField name="know_us_third_item_ar" label={translate('HomeContent.labels.know_us_third_item_ar')} />
                      <RHFTextField name="know_us_left_title_en" label={translate('HomeContent.labels.know_us_left_title_en')} />
                      <RHFTextField name="know_us_left_title_ar" label={translate('HomeContent.labels.know_us_left_title_ar')} />
                      <RHFUploadWithLabel
                        thumbnail
                        name="know_us_photo"
                        label="Upload Know Us Photo"
                        defaultValue={defaultValues.know_us_photo.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'know_us_photo')}
                        onRemove={() => handleRemoveFile('know_us_photo')}
                        onRemoveAll={() => handleRemoveAllFiles('know_us_photo')}
                        onUpload={()=>onUpload('know_us_photo')}
                      />
                      <RHFUploadWithLabel
                        thumbnail
                        name="know_us_photo_ar"
                        label="Upload Know Us Photo ar"
                        defaultValue={defaultValues.know_us_photo_ar.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'know_us_photo_ar')}
                        onRemove={() => handleRemoveFile('know_us_photo_ar')}
                        onRemoveAll={() => handleRemoveAllFiles('know_us_photo_ar')}
                        onUpload={()=>onUpload('know_us_photo_ar')}
                      />
                    </Stack>
                  )}

                  {currentSection === 3 && (
                    <Stack spacing={2}>
                      <RHFTextField name="why_choose_title_en" label={translate('HomeContent.labels.why_choose_title_en')} />
                      <RHFTextField name="why_choose_title_ar" label={translate('HomeContent.labels.why_choose_title_ar')} />
                      <RHFTextField name="why_choose_left_title_en" label={translate('HomeContent.labels.why_choose_left_title_en')} />
                      <RHFTextField name="why_choose_left_title_ar" label={translate('HomeContent.labels.why_choose_left_title_ar')} />
                      <RHFTextField name="why_choose_fir_item_en" label={translate('HomeContent.labels.why_choose_fir_item_en')} />
                      <RHFTextField name="why_choose_fir_item_ar" label={translate('HomeContent.labels.why_choose_fir_item_ar')} />
                      <RHFTextField name="why_choose_sec_item_en" label={translate('HomeContent.labels.why_choose_sec_item_en')} />
                      <RHFTextField name="why_choose_sec_item_ar" label={translate('HomeContent.labels.why_choose_sec_item_ar')} />
                      <RHFUploadWithLabel
                        thumbnail
                        name="why_choose_photo"
                        label="Upload Why Choose Photo"
                        defaultValue={defaultValues.why_choose_photo.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'why_choose_photo')}
                        onRemove={() => handleRemoveFile('why_choose_photo')}
                        onRemoveAll={() => handleRemoveAllFiles('why_choose_photo')}
                        onUpload={()=>onUpload('why_choose_photo')}
                      />
                      <RHFUploadWithLabel
                        thumbnail
                        name="why_choose_photo_ar"
                        label="Upload Why Choose Photo (Arabic)"
                        defaultValue={defaultValues.why_choose_photo_ar.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'why_choose_photo_ar')}
                        onRemove={() => handleRemoveFile('why_choose_photo_ar')}
                        onRemoveAll={() => handleRemoveAllFiles('why_choose_photo_ar')}
                        onUpload={()=>onUpload('why_choose_photo_ar')}
                      />
                    </Stack>
                  )}

                  {currentSection === 4 && (
                    <Stack spacing={2}>
                      <RHFTextField
                        name="ready_to_travel_title_en"
                        label="Ready to Travel (English)"
                        defaultValue={defaultValues.ready_to_travel_title_en}
                      />
                      <RHFTextField
                        name="ready_to_travel_title_ar"
                        label="Ready to Travel (Arabic)"
                        defaultValue={defaultValues.ready_to_travel_title_ar}
                      />
                      <RHFTextField
                        name="ready_to_travel_sub_title_en"
                        label="Sub Title (English)"
                        defaultValue={defaultValues.ready_to_travel_sub_title_en}
                      />
                      <RHFTextField
                        name="ready_to_travel_sub_title_ar"
                        label="Sub Title (Arabic)"
                        defaultValue={defaultValues.ready_to_travel_sub_title_ar}
                      />
                      <RHFTextField
                        name="percentage"
                        label="Percentage"
                        defaultValue={defaultValues.percentage}
                      />
                      <Stack spacing={2}>
                        <RHFUploadWithLabel
                          thumbnail
                          name="ready_to_travel_photo"
                          label="Upload Ready to Travel Photo"
                          defaultValue={defaultValues.ready_to_travel_photo.id}
                          multiple
                          onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'ready_to_travel_photo')}
                          onRemove={() => handleRemoveFile('ready_to_travel_photo')}
                          onRemoveAll={() => handleRemoveAllFiles('ready_to_travel_photo')}
                          onUpload={()=>onUpload('ready_to_travel_photo')}
                          />
                        <RHFUploadWithLabel
                          thumbnail
                          name="ready_to_travel_sec_photo"
                          label="Upload Ready to Travel Sec Photo"
                          defaultValue={defaultValues.ready_to_travel_sec_photo.id}
                          multiple
                          onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'ready_to_travel_sec_photo')}
                          onRemove={() => handleRemoveFile('ready_to_travel_sec_photo')}
                          onRemoveAll={() => handleRemoveAllFiles('ready_to_travel_sec_photo')}
                          onUpload={()=>onUpload('ready_to_travel_sec_photo')}
                        />
                        <RHFUploadWithLabel
                          thumbnail
                          name="ready_to_travel_third_photo"
                          label="Upload Ready to Travel Third Photo"
                          defaultValue={defaultValues.ready_to_travel_third_photo.id}
                          multiple
                          onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'ready_to_travel_third_photo')}
                          onRemove={() => handleRemoveFile('ready_to_travel_third_photo')}
                          onRemoveAll={() => handleRemoveAllFiles('ready_to_travel_third_photo')}
                          onUpload={()=>onUpload('ready_to_travel_third_photo')}
                        />
                        <RHFUploadWithLabel
                          thumbnail
                          name="ready_to_travel_forth_photo"
                          label="Upload Ready to Travel Forth Photo"
                          defaultValue={defaultValues.ready_to_travel_forth_photo.id}
                          multiple
                          onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'ready_to_travel_forth_photo')}
                          onRemove={() => handleRemoveFile('ready_to_travel_forth_photo')}
                          onRemoveAll={() => handleRemoveAllFiles('ready_to_travel_forth_photo')}
                          onUpload={()=>onUpload('ready_to_travel_forth_photo')}
                        />
                      </Stack>
                    </Stack>
                  )}

                </Stack>
              ) : (<>
                <p>loading..</p></>)
            }

          </Card>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="space-between" m={5}>
        <Button
          variant="contained"
          onClick={prevSection}
          disabled={currentSection === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={nextSection}
          disabled={currentSection === 4}  // Adjust based on total sections
        >
          Next
        </Button>
      </Stack>
      <LoadingButton type="submit" variant="contained" loading={isLoading}>
        {translate(isEdit ? 'HomeContent.edit' : 'HomeContent.create')}
      </LoadingButton>
    </FormProvider>
  );
}
