// blogFormFunctions.js

import { useState, useEffect, useCallback } from 'react';

// التحكم في تغيير Quill
export const useQuillChange = (setValue) => {
  return (field, value) => {
    setValue(field, value, { shouldValidate: true });
  };
};

// تحميل الملفات
export const useHandleFile = (setValue) => {
  const [file, setFile] = useState(null);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });
        setFile(newFile);
        setValue('photo', [newFile], { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => setValue('photo', null);
  const handleRemoveAllFiles = () => setValue('photo', []);

  return { file, handleDrop, handleRemoveFile, handleRemoveAllFiles, setFile };
};

// إدارة خطوات النموذج
export const useStepNavigation = (methods) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const watchFields = methods.watch(['desc_en', 'desc_ar', 'content_en', 'content_ar', 'photo']);

  useEffect(() => {
    const [descEn, descAr, contentEn, contentAr, photoUp] = watchFields;
    if (
      (currentStep === 1 && descEn && descAr) ||
      (currentStep === 2 && contentEn && contentAr) ||
      (currentStep === 3 && photoUp)
    ) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  }, [currentStep, watchFields]);

  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return { currentStep, isNextDisabled, handleNext, handlePrev };
};

// إدارة رفع الصور
export const usePhotoUpload = (enqueueSnackbar, translate, uploadMutation) => {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    setIsLoading(true);

    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        setIsLoading(false);
        setFileId(data.file.id);
        enqueueSnackbar(translate('imageUploadSuccess'), { variant: 'success' });
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Upload failed:', error);
      },
    });
  };

  return { file, setFile, fileId, onUpload, isLoading };
};
