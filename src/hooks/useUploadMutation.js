// src/hooks/useUploadMutation.js
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api/uploadApi';

const useUploadMutation = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log('File uploaded successfully:', data);
    },
    onError: (error) => {
      console.error('Upload failed:', error.response?.data || error.message);
    },
  });
};

export default useUploadMutation;
