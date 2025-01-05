import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Grid } from '@mui/material';
import { Box, Card, Stack, Button, Typography, Avatar, CardHeader, CardContent } from '@mui/material';
import { AccessTime } from '@mui/icons-material'; // Icon for time
import PropTypes from 'prop-types';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
import { CheckoutSummary } from 'src/sections/@dashboard/e-commerce/checkout';
import CustomerInfo from 'src/components/CustomerInfo';

// ----------------------------------------------------------------------

export default function UserOrederCreatePage() {
  const { themeStretch } = useSettingsContext();
  const handleAddToBlacklist = () => {
    alert('Customer added to blacklist!');
  };
  const historyEvents = [
    { description: 'Delivery successful', timestamp: '04 Jan 2025 11:33 am' },
    { description: 'Transporting to [2]', timestamp: '09 Jan 2025 10:35 am' },
    { description: 'Transporting to [1]', timestamp: '09 Jan 2025 9:35 am' },
    { description: 'The shipping unit has picked up the goods', timestamp: '09 Jan 2025 8:35 am' },
    { description: 'Order has been created', timestamp: '31 Dec 2025 7:00 am' },
  ];
  return (
    <>
      <Helmet>
        <title> User: Create a new user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Order Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'order',
              href: PATH_DASHBOARD.user.list,
            },
            { name: '# order 7842' },
          ]}
        />

        <Grid container spacing={3}>
          {/* Left side: Checkout Summary (takes 8 columns on medium and up) */}
          <Grid item xs={12} md={8}>
              {/* Big Product Info Card */}
      <Card sx={{ mb: 3, padding: 3 }}>
        <CardHeader
          title="Details"
          sx={{ backgroundColor: '', color: 'black' }}
        />
        <CardContent>
          <Stack spacing={1}>
            {/* All Product Cards inside one big card */}
            <ProductCard 
              image="https://via.placeholder.com/150" 
              title="Product 1" 
              description="This is a sample product description." 
              price={29.99} 
              quantity={5} 
            />
            <ProductCard 
              image="https://via.placeholder.com/150" 
              title="Product 2" 
              description="This is another sample product description." 
              price={49.99} 
              quantity={2} 
            />
            <ProductCard 
              image="https://via.placeholder.com/150" 
              title="Product 3" 
              description="This is a third sample product description." 
              price={19.99} 
              quantity={10} 
            />
          </Stack>
        </CardContent>
        <SummaryCard />
        <History events={historyEvents} />

      </Card>
            <CheckoutSummary />
          </Grid>

          {/* Right side: Customer Info (takes 4 columns on medium and up) */}
          <Grid item xs={12} md={4}>
            <CustomerInfo
              name="John Doe"
              email="john.doe@example.com"
              avatarUrl="https://www.example.com/path-to-avatar.jpg"
              onAddToBlacklist={handleAddToBlacklist}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


function ProductCard({ image, title, description, price, quantity }) {
  return (
    <Card sx={{ mb: 3, border: '1px solid #ddd', padding: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Product Image */}
          <Avatar src={image} sx={{ width: 56, height: 56 }} />

          {/* Product Title */}
          <Box>
            <Typography variant="h6" sx={{ color: 'black' }}>{title}</Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {description}
            </Typography>
          </Box>
        </Stack>

        {/* Product Price and Quantity */}
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Typography variant="body1" sx={{ color: 'black' }}>
            Price: ${price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.600' }}>
            Quantity: {quantity}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

function SummaryCard() {
  return (
    <Card sx={{ mb: 3, padding: 3 }}>
      <CardHeader
        title="Order Summary"
        sx={{ backgroundColor: '', color: 'black' }}
      />
      <CardContent>
        <Stack spacing={2}>
          {/* Subtotal */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'black' }}>Subtotal</Typography>
            <Typography variant="body1" sx={{ color: 'black' }}>$484.15</Typography>
          </Stack>

          {/* Shipping */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'black' }}>Shipping</Typography>
            <Typography variant="body1" sx={{ color: 'red' }}>- $10</Typography>
          </Stack>

          {/* Discount */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'black' }}>Discount</Typography>
            <Typography variant="body1" sx={{ color: 'red' }}>- $10</Typography>
          </Stack>

          {/* Taxes */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'black' }}>Taxes</Typography>
            <Typography variant="body1" sx={{ color: 'black' }}>$10</Typography>
          </Stack>

          {/* Total */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: 'black' }}>Total</Typography>
            <Typography variant="h6" sx={{ color: 'black' }}>$474.15</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}


History.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
};

function HistoryEvent({ description, timestamp, isLastEvent }) {
  // تحويل التاريخ إلى كائن Date
  const eventDate = new Date(timestamp);
  const currentDate = new Date();

  // إذا كان الحدث قد مرَّ عليه (التاريخ أقل من الوقت الحالي)، اللون سيكون أخضر فاتح
  const isEventPast = eventDate < currentDate;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2, position: 'relative' }}>
      {/* Event Description */}
      <Typography 
        variant="body2" 
        sx={{ 
          color: isEventPast ? 'success.main' : 'black', // تغيير اللون بناءً على حالة الحدث
          flex: 1 
        }}
      >
        {description}
      </Typography>

      {/* Event Timestamp */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <AccessTime sx={{ fontSize: 16, color: isEventPast ? 'success.main' : 'grey.300' }} />
        <Typography variant="body2" sx={{ color: isEventPast ? 'success.main' : 'grey.300' }}>
          {timestamp}
        </Typography>
      </Stack>

      {/* Progress Line */}
      {!isLastEvent && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '0',
            width: '2px',
            height: '100%',
            backgroundColor:  isEventPast ? 'success.main' : 'grey.300', // تغيير اللون بناءً على حالة الحدث
            
            transform: 'translateX(-50%)',
            zIndex: -1,

          }}
        />
      )}
    </Stack>
  );
}

function History({ events }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Shipping History"
        sx={{ backgroundColor: 'black', color: 'grey.50' }}
      />
      <CardContent>
        <Stack spacing={3}>
          {events.map((event, index) => (
            <HistoryEvent
              key={index}
              description={event.description}
              timestamp={event.timestamp}
              isLastEvent={index === events.length - 1} // Check if it's the last event
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

