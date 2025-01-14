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
import { useStepHandlerFooterContent } from './helpers/useFooterContentFormHelpers';
import useUpdateFooterContentMutation from 'src/hooks/FooterContent/useUpdateFooterContentMutation';
import imageBanner from '../../../assets/images/bannerImag.png'
import FooterSectionThree from '../../../assets/images/FooterSectionThree.png'
import FooterSectionOne from '../../../assets/images/FooterSectionOne.png'
import imageSectionFour from '../../../assets/images/SectionFour.png'

import FooterSectionTwo from '../../../assets/images/FooterSectionTwo.png'

import Modal from 'react-modal';

Modal.setAppElement('#root'); // لتجنب التحذيرات
// ----------------------------------------------------------------------

FooterContentEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentFooterContent: PropTypes.object,
};

export default function FooterContentEditForm({ isEdit, currentFooterContent }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();



  const { defaultValues, NewFooterContentSchema, FooterContentsData, onSubmit, onUpload, isLoading, handleDrop, uploadedFileDetails } = useStepHandlerFooterContent(currentFooterContent);

  console.log(uploadedFileDetails);

  const methods = useForm({
    resolver: yupResolver(NewFooterContentSchema),
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
    if (isEdit && FooterContentsData) {
      reset(FooterContentsData);
    }
    if (!isEdit) {
      reset(FooterContentsData);
    }
  }, [isEdit, FooterContentsData]);








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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // فتح الصورة في النافذة المنبثقة
  const handleOpenModal = (imagePath) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  // إغلاق النافذة المنبثقة
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {
              FooterContentsData ? (
                <Stack spacing={3}>
                  {currentSection === 1 && (
                    <Stack spacing={2} >
                      <img
                        src={FooterSectionOne}
                        alt="Uploaded Banner"
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(FooterSectionOne)}
                      />


                      <RHFTextField name="adventure_title_en" label={translate('FooterContent.adventure_title_en.value')} />
                      <RHFTextField name="adventure_title_ar" label={translate('FooterContent.adventure_title_ar.value')} />

                      <RHFTextField name="adventure_service_title_en_1" label={translate('FooterContent.adventure_service_title_en_1.value')} />
                      <RHFTextField name="adventure_service_title_ar_1" label={translate('FooterContent.adventure_service_title_ar_1.value')} />
                      <RHFTextField name="adventure_service_desc_en_1" label={translate('FooterContent.adventure_service_desc_en_1.value')} />
                      <RHFTextField name="adventure_service_desc_ar_1" label={translate('FooterContent.adventure_service_desc_ar_1.value')} />

                      <RHFTextField name="adventure_service_title_en_2" label={translate('FooterContent.adventure_service_title_en_2.value')} />
                      <RHFTextField name="adventure_service_title_ar_2" label={translate('FooterContent.adventure_service_title_ar_2.value')} />
                      <RHFTextField name="adventure_service_desc_en_2" label={translate('FooterContent.adventure_service_desc_en_2.value')} />
                      <RHFTextField name="adventure_service_desc_ar_2" label={translate('FooterContent.adventure_service_desc_ar_2.value')} />

                      <RHFTextField name="adventure_service_title_en_3" label={translate('FooterContent.adventure_service_title_en_3.value')} />
                      <RHFTextField name="adventure_service_title_ar_3" label={translate('FooterContent.adventure_service_title_ar_3.value')} />
                      <RHFTextField name="adventure_service_desc_en_3" label={translate('FooterContent.adventure_service_desc_en_3.value')} />
                      <RHFTextField name="adventure_service_desc_ar_3" label={translate('FooterContent.adventure_service_desc_ar_3.value')} />

                      <RHFTextField name="adventure_service_title_en_4" label={translate('FooterContent.adventure_service_title_en_4.value')} />
                      <RHFTextField name="adventure_service_title_ar_4" label={translate('FooterContent.adventure_service_title_ar_4.value')} />
                      <RHFTextField name="adventure_service_desc_en_4" label={translate('FooterContent.adventure_service_desc_en_4.value')} />
                      <RHFTextField name="adventure_service_desc_ar_4" label={translate('FooterContent.adventure_service_desc_ar_4.value')} />

                      <RHFTextField name="adventure_service_title_en_5" label={translate('FooterContent.adventure_service_title_en_5.value')} />
                      <RHFTextField name="adventure_service_title_ar_5" label={translate('FooterContent.adventure_service_title_ar_5.value')} />
                      <RHFTextField name="adventure_service_desc_en_5" label={translate('FooterContent.adventure_service_desc_en_5.value')} />
                      <RHFTextField name="adventure_service_desc_ar_5" label={translate('FooterContent.adventure_service_desc_ar_5.value')} />

                      <RHFTextField name="adventure_service_title_en_6" label={translate('FooterContent.adventure_service_title_en_6.value')} />
                      <RHFTextField name="adventure_service_title_ar_6" label={translate('FooterContent.adventure_service_title_ar_6.value')} />
                      <RHFTextField name="adventure_service_desc_en_6" label={translate('FooterContent.adventure_service_desc_en_6.value')} />
                      <RHFTextField name="adventure_service_desc_ar_6" label={translate('FooterContent.adventure_service_desc_ar_6.value')} />



                      <RHFUploadWithLabel
                        label="adventure photo"
                        defaultValue={defaultValues.adventure_photo.id}
                        newValue={uploadedFileDetails?.adventure_photo?.path}
                        multiple
                        thumbnail
                        name="adventure_photo"
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'adventure_photo')}
                        onRemove={() => handleRemoveFile('adventure_photo')}
                        onRemoveAll={() => handleRemoveAllFiles('adventure_photo')}
                        onUpload={() => onUpload('adventure_photo')
                        }
                      />

                    </Stack>
                  )
                  }

                  {currentSection === 2 && (
                    <Stack spacing={2}>
                      <img
                        src={FooterSectionTwo}
                        alt="Uploaded Banner"
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(FooterSectionTwo)}
                      />
                      <RHFTextField name="app_title_en" label={translate('FooterContent.app_title_en.value')} />
                      <RHFTextField name="app_title_ar" label={translate('FooterContent.app_title_ar.value')} />

                      <RHFTextField name="app_sec_title_en" label={translate('FooterContent.app_sec_title_en.value')} />
                      <RHFTextField name="app_sec_title_ar" label={translate('FooterContent.app_sec_title_ar.value')} />

                      <RHFTextField name="discount_fir_title_en" label={translate('FooterContent.discount_fir_title_en.value')} />
                      <RHFTextField name="discount_fir_title_ar" label={translate('FooterContent.discount_fir_title_ar.value')} />

                      <RHFTextField name="discount_sec_title_en" label={translate('FooterContent.discount_sec_title_en.value')} />
                      <RHFTextField name="discount_sec_title_ar" label={translate('FooterContent.discount_sec_title_ar.value')} />

                      <RHFTextField name="discount_btn_title_en" label={translate('FooterContent.discount_btn_title_en.value')} />
                      <RHFTextField name="discount_btn_title_ar" label={translate('FooterContent.discount_btn_title_ar.value')} />

                      <RHFTextField name="discount_percentage_en" label={translate('FooterContent.discount_percentage_en.value')} />
                      <RHFTextField name="discount_percentage_ar" label={translate('FooterContent.discount_percentage_ar.value')} />

                      <RHFTextField name="discount_percentage_title_en" label={translate('FooterContent.discount_percentage_title_en.value')} />
                      <RHFTextField name="discount_percentage_title_ar" label={translate('FooterContent.discount_percentage_title_ar.value')} />

                      <RHFUploadWithLabel
                        thumbnail
                        name="banner_photo_for_app"
                        label="banner photo for app"
                        newValue={uploadedFileDetails?.banner_photo_for_app?.path}

                        defaultValue={defaultValues.banner_photo_for_app.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner_photo_for_app')}
                        onRemove={() => handleRemoveFile('banner_photo_for_app')}
                        onRemoveAll={() => handleRemoveAllFiles('banner_photo_for_app')}
                        onUpload={() => onUpload('banner_photo_for_app')}
                      />

                      <RHFUploadWithLabel
                        thumbnail
                        name="discount_photo"
                        label="discount photo"
                        newValue={uploadedFileDetails?.discount_photo?.path}

                        defaultValue={defaultValues.discount_photo.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'discount_photo')}
                        onRemove={() => handleRemoveFile('discount_photo')}
                        onRemoveAll={() => handleRemoveAllFiles('discount_photo')}
                        onUpload={() => onUpload('discount_photo')}
                      />

                    </Stack>
                  )}

                  {currentSection === 3 && (
                    <Stack spacing={2}>
                      <img
                        src={FooterSectionThree}
                        alt="Uploaded Banner"
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(FooterSectionThree)}
                      />
                      <RHFTextField name="email" label={translate('FooterContent.email.value')} />
                      <RHFTextField name="phone" label={translate('FooterContent.phone.value')} />

                      <RHFTextField name="facebook" label={translate('FooterContent.facebook.value')} />
                      <RHFTextField name="x" label={translate('FooterContent.x.value')} />
                      <RHFTextField name="instgram" label={translate('FooterContent.instgram.value')} />
                      <RHFTextField name="twitter" label={translate('FooterContent.twitter.value')} />
                      <RHFTextField name="youtube" label={translate('FooterContent.youtube.value')} />


                      <RHFUploadWithLabel
                        thumbnail
                        name="logo"
                        label="logo"
                        defaultValue={defaultValues.logo.id}
                        multiple
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'logo')}
                        onRemove={() => handleRemoveFile('logo')}
                        onRemoveAll={() => handleRemoveAllFiles('logo')}
                        onUpload={() => onUpload('logo')}
                      />

                    </Stack>
                  )}



                </Stack>
              ) : (<>
                <p>loading..</p></>)
            }
            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={{
              content: {
                height: '371px', // تحديد الارتفاع
                margin: 'auto', // لجعل النافذة تظهر في منتصف الشاشة
                borderRadius: '10px', // إضافة حواف دائرية اختيارية
                padding: '20px',

              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // لون التعتيم حول النافذة
              },
            }}>
              <button onClick={handleCloseModal} style={{ marginBottom: '10px' }}>Close</button>
              <img src={currentImage} alt="Full Size" style={{ width: '100%', height: "280px", padding: "5px" }} />
            </Modal>
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
          disabled={currentSection === 3}  // Adjust based on total sections
        >
          Next
        </Button>
      </Stack>
      <LoadingButton type="submit" variant="contained" loading={isLoading}>
        {translate(isEdit ? 'FooterContent.edit' : 'FooterContent.create')}
      </LoadingButton>
    </FormProvider>
  );
}
