import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Stack, Button, IconButton, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// assets
import { UploadIllustration } from '../../assets/illustrations';
//
import Iconify from '../iconify';
//
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';
import MultiFilePreviewHomeContent from './preview/MultiFilePreviewHomeContent';
import { useLocales } from 'src/locales';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

UploadHomeContent.propTypes = {
  sx: PropTypes.object,
  error: PropTypes.bool,
  files: PropTypes.array,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onDelete: PropTypes.func,
  onRemove: PropTypes.func,
  onUpload: PropTypes.func,
  thumbnail: PropTypes.bool,
  helperText: PropTypes.node,
  onRemoveAll: PropTypes.func,
  newValue: PropTypes.string,
};

export default function UploadHomeContent({
  disabled,
  multiple = false,
  error,
  helperText,
  isLoading,
  newValue,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });
  const { translate } = useLocales();

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;
console.log(isLoading);

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light',
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasFile && {
            padding: '12% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        <Placeholder
          sx={{
            ...(hasFile && {
              opacity: 0,
            }),
          }}
        />

        {hasFile && <SingleFilePreview file={file} />}
      </StyledDropZone>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFiles && (
        <>
          {
            files
              .filter(i => i.id !== null)  // فلترة العناصر بحيث لا يتم تضمين العناصر التي تحتوي على id == null
              .map((i) => {
                const correctedUrl = i?.path?.replace("51.20.18.35:3000", "api.plaissir.com");
                const correctedUrlNew = newValue?.replace("51.20.18.35:3000", "api.plaissir.com");

                return (
                  // قم بإرجاع العنصر فقط إذا كان id ليس null
                  <div key={i.id}>
                    <>
                      <Box sx={{ my: 3 }}>
                        <img src={correctedUrlNew ? correctedUrlNew : correctedUrl} alt="Logo" style={{ width: '50%', height: "280px", padding: "5px" }} />
                        {/* <MultiFilePreviewHomeContent files={files} thumbnail={thumbnail} onRemove={onRemove} /> */}
                      </Box>
                      
                          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                            {onRemoveAll && (
                              <LoadingButton color="inherit" variant="outlined" loading={isLoading} size="small" onClick={onRemoveAll}>
                                {translate('RemoveAll')}

                              </LoadingButton>
                            )}

                            {onUpload && (
                              <LoadingButton size="small" variant="contained" loading={isLoading} onClick={onUpload}>
                                {translate('UploadAll')}

                              </LoadingButton>
                            )}
                          </Stack>
                        

                    </>
                  </div>
                );
              })
          }
        </>

      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

Placeholder.propTypes = {
  sx: PropTypes.object,
};

function Placeholder({ sx, ...other }) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        ...sx,
      }}
      {...other}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <div>
        <Typography gutterBottom variant="h5">
          Drop or Select file
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click
          <Typography
            variant="body2"
            component="span"
            sx={{
              mx: 0.5,
              color: 'primary.main',
              textDecoration: 'underline',
            }}
          >
            browse
          </Typography>
          thorough your machine
        </Typography>
      </div>
    </Stack>
  );
}
