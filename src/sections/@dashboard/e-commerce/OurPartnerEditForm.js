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
import useUpdateOurPartnerMutation from 'src/hooks/OurPartner/useUpdateOurPartnerMutation';
import imageBanner from '../../../assets/images/bannerImag.png'
import FooterSectionThree from '../../../assets/images/FooterSectionThree.png'
import imageOurPartner from '../../../assets/images/imageOurPartner.png'
import imageSectionFour from '../../../assets/images/SectionFour.png'

import FooterSectionTwo from '../../../assets/images/FooterSectionTwo.png'

import Modal from 'react-modal';
import { useStepHandlerOurPartner } from './helpers/useOurPartnerFormHelpers';

Modal.setAppElement('#root'); // لتجنب التحذيرات
// ----------------------------------------------------------------------

OurPartnerEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentOurPartner: PropTypes.object,
};

export default function OurPartnerEditForm({ isEdit, currentOurPartner }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();



  const { defaultValues, NewOurPartnerSchema, OurPartnersData, onSubmit, onUpload, isLoading, handleDrop, uploadedFileDetails } = useStepHandlerOurPartner(currentOurPartner);
  console.log(OurPartnersData);

  const methods = useForm({
    resolver: yupResolver(NewOurPartnerSchema),
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
    if (isEdit && OurPartnersData) {
      reset(OurPartnersData);
    }
    if (!isEdit) {
      reset(OurPartnersData);
    }
  }, [isEdit, OurPartnersData]);








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
              OurPartnersData ? (
                <Stack spacing={3}>
                  <Stack spacing={2}>
                    <img
                      src={imageOurPartner}
                      alt="Uploaded Banner"
                      style={{ width: '100%', cursor: 'pointer' }}
                      onClick={() => handleOpenModal(imageOurPartner)}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <RHFTextField name="partner_title_en" label={translate('OurPartner.partner_title_en.value')} />
                      </Grid>
                      <Grid item xs={6}>
                        <RHFTextField name="partner_title_ar" label={translate('OurPartner.partner_title_ar.value')} />
                      </Grid>

                      <Grid item xs={6}>
                        <RHFTextField name="partner_subtitle_en" label={translate('OurPartner.partner_subtitle_en.value')} />
                      </Grid>
                      <Grid item xs={6}>
                        <RHFTextField name="partner_subtitle_ar" label={translate('OurPartner.partner_subtitle_ar.value')} />
                      </Grid>

                      <Grid item xs={6}>
                        <RHFTextField name="why_partner_title_en" label={translate('OurPartner.why_partner_title_en.value')} />
                      </Grid>
                      <Grid item xs={6}>
                        <RHFTextField name="why_partner_title_ar" label={translate('OurPartner.why_partner_title_ar.value')} />
                      </Grid>

                      <Grid item xs={6}>
                        <RHFTextField name="why_partner_answer_en" label={translate('OurPartner.why_partner_answer_en.value')} />
                      </Grid>
                      <Grid item xs={6}>
                        <RHFTextField name="why_partner_answer_ar" label={translate('OurPartner.why_partner_answer_ar.value')} />
                      </Grid>
                    </Grid>

                    <RHFUploadWithLabel
                      label={translate('OurPartner.banner_partner_photo.value')}
                      defaultValue={defaultValues.banner_partner_photo.id}
                      newValue={uploadedFileDetails?.banner_partner_photo?.path}
                      multiple
                      thumbnail
                      name="banner_partner_photo"
                      onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'banner_partner_photo')}
                      onRemove={() => handleRemoveFile('banner_partner_photo')}
                      onRemoveAll={() => handleRemoveAllFiles('banner_partner_photo')}
                      isLoading={isLoading}
                      onUpload={() => onUpload('banner_partner_photo')}
                    />

                    <RHFUploadWithLabel
                      label={translate('OurPartner.partner_photo_1.value')}
                      defaultValue={defaultValues.partner_photo_1.id}
                      newValue={uploadedFileDetails?.partner_photo_1?.path}
                      multiple
                      thumbnail
                      name="partner_photo_1"
                      onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'partner_photo_1')}
                      onRemove={() => handleRemoveFile('partner_photo_1')}
                      onRemoveAll={() => handleRemoveAllFiles('partner_photo_1')}
                      isLoading={isLoading}
                      onUpload={() => onUpload('partner_photo_1')}
                    />

                    <RHFUploadWithLabel
                      label={translate('OurPartner.partner_photo_2.value')}
                      defaultValue={defaultValues.partner_photo_2.id}
                      newValue={uploadedFileDetails?.partner_photo_2?.path}
                      multiple
                      thumbnail
                      name="partner_photo_2"
                      onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'partner_photo_2')}
                      onRemove={() => handleRemoveFile('partner_photo_2')}
                      onRemoveAll={() => handleRemoveAllFiles('partner_photo_2')}
                      isLoading={isLoading}
                      onUpload={() => onUpload('partner_photo_2')}
                    />
                  </Stack>











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

      <LoadingButton type="submit" variant="contained" loading={isLoading} style={{ width: "100%", marginTop: "30px" }}>
        {translate('OurPartner.Edit')}
      </LoadingButton>
    </FormProvider>
  );
}
