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
import { useStepHandlerPrivacy } from './helpers/usePrivacyFormHelpers';

import FooterSectionOne from '../../../assets/images/FooterSectionOne.png'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';


import Modal from 'react-modal';

Modal.setAppElement('#root'); // لتجنب التحذيرات
// ----------------------------------------------------------------------

PrivacyEditForm.propTypes = {
  currentPrivacy: PropTypes.object,
};

export default function PrivacyEditForm({ currentPrivacy }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();



  const { defaultValues, NewPrivacychema, PrivacyData, onSubmit, isLoading } = useStepHandlerPrivacy(currentPrivacy);

  console.log(PrivacyData);

  const methods = useForm({
    resolver: yupResolver(NewPrivacychema),
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
    if (PrivacyData) {
      reset({
        content_en: PrivacyData.content_en,
        content_ar: PrivacyData.content_ar,
      });
    }
  }, [PrivacyData, reset]);

  const handleQuillChange = (field, value) => {
    setValue(field, value, { shouldValidate: true });
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
              PrivacyData ? (
                <Stack spacing={3}>
                  <Stack spacing={2} >
                    <img
                      src={FooterSectionOne}
                      alt="Uploaded Banner"
                      style={{ width: '100%', cursor: 'pointer' }}
                      onClick={() => handleOpenModal(FooterSectionOne)}
                    />




                    <Stack spacing={2}>
                      
                          <div>
                            <Typography variant="subtitle2" gutterBottom>
                              {translate('Privacy.content_en.value')}
                            </Typography>
                            <ReactQuill
                              value={methods.getValues('content_en')}
                              onChange={(value) => handleQuillChange('content_en', value)}
                              theme="snow"
                              style={{ height: '200px', marginBottom: '50px' }}
                            />
                          
                            {errors.content_en && (
                              <FormHelperText error>{errors.content_en.message}</FormHelperText>
                            )}
                          </div>
                        
                      

                   
                          <div>
                            <Typography variant="subtitle2" gutterBottom>
                              {translate('Privacy.content_ar.value')}
                            </Typography>
                            <ReactQuill
                              value={methods.getValues('content_ar')}
                              onChange={(value) => handleQuillChange('content_ar', value)}
                              theme="snow"
                              style={{ height: '200px', marginBottom: '50px' }}
                            />

                            {errors.content_ar && (
                              <FormHelperText error>{errors.content_ar.message}</FormHelperText>
                            )}
                          </div>
                       
                    </Stack>


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

      <LoadingButton type="submit" variant="contained" loading={isLoading} style={{width:"100%",marginTop:"30px"}}>
        {translate('Privacy.Edit')}
      </LoadingButton>
    </FormProvider>
  );
}
