import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Link,
  Modal,
  Box
} from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';
import MenuPopover from '../../../../../components/menu-popover';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import { useLocales } from '../../../../../locales';
import fallbackImage from '../../../../../assets/images/noimage.png'
// ----------------------------------------------------------------------

CategoryTableRow.propTypes = {
  avtar: PropTypes.bool,
  icon: PropTypes.bool,
  coupon: PropTypes.bool,
  isCategories: PropTypes.bool,
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  openConfirm: PropTypes.bool,
  setOpenConfirm: PropTypes.func,
};

export default function CategoryTableRow({ openConfirm,
  setOpenConfirm, keys, row, selected, onEditRow, onSelectRow, onDeleteRow, avtar, icon, coupon, isCategories,loading }) {


  const [photoUrl, setPhotoUrl] = useState(row?.photo?.path);
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (photoUrl && typeof photoUrl === 'string') {
      const updatedUrl = photoUrl.replace("localhost:3000", "51.20.18.35:3000");
      setPhotoUrl(updatedUrl);
    }
  }, [photoUrl]); 
  const { translate } = useLocales();
  // const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const imageSrc = photoUrl || fallbackImage;
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          # {row.id}
        </TableCell>
        <TableCell align="left">
          <img  src={imageSrc} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 0 }}
            onClick={handleOpen}
          />
        </TableCell>
        <TableCell align="left">
          {row.name_ar}
        </TableCell>
        <TableCell align="left">
          {row.name_en}
        </TableCell>
        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          
          {`${translate('category.delet')}`}

        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />

          {`${translate('category.Edit')}`}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={`${translate('category.delet')}`}
        content={`${translate('category.are_you_sure_to_delete')}`}
        action={
          <Button disabled={loading} variant="contained" color="error" onClick={onDeleteRow}>
                  {loading ? translate('category.loading') : translate('category.delet')}

            {/* {`${translate('category.delet')}`} */}
          </Button>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 2,
            boxShadow: 24,
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
          }}
        >
          <img
            src={imageSrc}
            alt="Photo"
            style={{ width: '100%', height: 'auto' }} // عرض الصورة داخل الـ Modal
          />
        </Box>
      </Modal>
    </>
  );
}
