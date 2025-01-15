// useBlogFormHelpers.js
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import useUploadMutation from 'src/hooks/useUploadMutation';

export function useFileHandler(setValue) {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  console.log(fileId);
  
  const uploadMutation = useUploadMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRemoveFile = () => {
    setValue('photo', null);
  };

  const handleRemoveAllFiles = () => {
    setValue('photo', []);
  };

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
        enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Upload failed:', error);
      },
    });
  };

  return {
    fileId,
    handleDrop,
    handleRemoveFile,
    handleRemoveAllFiles,
    onUpload,
    isLoading,
  };
}

export function useStepHandler(initialStep = 1) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    setIsNextDisabled(false);
  }, [currentStep]);

  return {
    currentStep,
    handleNext,
    handlePrev,
    isNextDisabled,
    setIsNextDisabled,
  };
}
