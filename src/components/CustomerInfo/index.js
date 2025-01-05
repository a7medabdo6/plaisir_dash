import PropTypes from 'prop-types';
import { Box, Card, Stack, Button, Typography, Avatar, CardHeader, CardContent } from '@mui/material';
import { Edit } from '@mui/icons-material'; // استيراد أيقونة القلم من MUI

// ----------------------------------------------------------------------

CustomerInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  onAddToBlacklist: PropTypes.func.isRequired,
};

export default function CustomerInfo({
  name,
  email,
  avatarUrl,
  onAddToBlacklist,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Customer Info"
        sx={{ backgroundColor: 'black', color: 'grey.50' }} // Set the header background and text color
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Avatar (customer image) */}
            <Avatar src={avatarUrl} sx={{ width: 56, height: 56 }} />

            {/* Customer Name and Email */}
            <Box>
              <Typography variant="h6" sx={{ color: 'black' }}>{name}</Typography>
              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                {email}
              </Typography>
            </Box>
          </Stack>

          {/* Add to Blacklist Button */}
          <Button
            variant="contained"
            color="error"
            onClick={onAddToBlacklist}
            sx={{ mt: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'grey.700' } }}
          >
            Add to Blacklist
          </Button>
        </Stack>
      </CardContent>
      <hr />
      <Stack spacing={2} m={3}>
        <Stack direction="row" justifyContent="space-between" mt={3} mb={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
            Delivery
          </Typography>
          <Edit sx={{ cursor: 'pointer', fontSize: 20, color: 'grey.500' }} /> {/* استبدال النص بـ أيقونة القلم */}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Ship by
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>DHL</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Ship by
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>Speedy</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Ship by
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>Standard</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Tracking No.
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>SPX037739199373</Typography>
        </Stack>
      </Stack>
      <hr />
      <Stack spacing={2} m={3}>
        <Stack direction="row" justifyContent="space-between" mt={3} mb={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
          Shipping
          </Typography>
          <Edit sx={{ cursor: 'pointer', fontSize: 20, color: 'grey.500' }} /> {/* استبدال النص بـ أيقونة القلم */}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
          Address
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600',width:"100px" }}>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
          Phone number
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>365-374-4961</Typography>
        </Stack>

       

      
      </Stack>
      <hr />
      <Stack spacing={2} m={3}>
        <Stack direction="row" justifyContent="space-between" mt={3} mb={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>
          Payment
          </Typography>
          <Edit sx={{ cursor: 'pointer', fontSize: 20, color: 'grey.500' }} /> {/* استبدال النص بـ أيقونة القلم */}
        </Stack>
        <Stack direction="row" justifyContent="flex-start">
        
          <Typography variant="body2" sx={{ color: 'grey.600',width:"100%" }}>**** **** **** 4578</Typography>
        </Stack>

        

       

      
      </Stack>
    </Card>
  );
}
