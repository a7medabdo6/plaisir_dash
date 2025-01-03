import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets/illustrations';
import { useLocales } from '../../locales';

// ----------------------------------------------------------------------

export default function GeneralBookingPage() {
  const theme = useTheme();
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> General: Booking | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title={`${translate(`book.TotalBooking`)}`}
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title={`${translate(`book.Check_in`)}`} total={311000} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title={`${translate(`book.Check_Out`)}`}
              total={124000}
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes
                  total={18765}
                  percent={2.6}
                  chart={{
                    series: [111, 136, 76, 108, 74, 54, 57, 84],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom title={`${translate(`book.BookedRoom`)}`} data={_bookingsOverview} />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets
                  chart={{
                    colors: [theme.palette.warning.main],
                    series: [
                      { label: `${translate(`book.Check_in`)}`, percent: 72, total: 38566 },
                      { label: `${translate(`book.Check_Out`)}`, percent: 64, total: 18472 },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable
            placeholder="Room Available"
              title={`${translate(`book.RoomAvailable`)}`}
              chart={{
                series: [
                  { label: 'Sold out',placeholder: `${translate(`book.Soldout`)}`, value: 120 },
                  {  label: 'Available',placeholder: `${translate(`book.Available`)}`, value: 66 },
                ],
              }}
            />
          </Grid>
          

          <Grid item xs={12} md={8}>
            <BookingReservationStats
              title={`${translate(`book.ReservationStats`)}`}
              subheader={`(+43% ${translate(`book.Check_in`)} | +12% ${translate(`book.Check_Out`)}) than last year`}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    type: `${translate(`book.week`)}`,
                    data: [
                      { name: `${translate(`book.Check_in`)}`, data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: `${translate(`book.Check_Out`)}`, data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    type: `${translate(`book.month`)}`,
                    data: [
                      { name: `${translate(`book.Check_in`)}`, data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: `${translate(`book.Check_Out`)}`, data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                  {
                    type: `${translate(`book.year`)}`,
                    data: [
                      { name: `${translate(`book.Check_in`)}`, data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                      { name: `${translate(`book.Check_Out`)}`, data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews
              title={`${translate(`book.CustomerReviews`)}`}
              subheader={`${_bookingReview.length} ${translate(`book.Reviews`)}`}
              list={_bookingReview}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <BookingNewestBooking
              title="Newest Booking"
              subheader="12 Booking"
              list={_bookingNew}
            />
          </Grid> */}

          <Grid item xs={12}>
            <BookingDetails
              title={`${translate(`book.BookingDetails`)}`}
              tableData={_bookings}
              tableLabels={[
                { id: 'booker', label: `${translate(`book.booker`)}` },
                { id: 'checkIn', label: `${translate(`book.Check_in`)}` },
                { id: 'checkOut', label: `${translate(`book.Check_Out`)}` },
                { id: 'status', label: `${translate(`book.status`)}` },
                { id: 'phone', label: `${translate(`book.Phone`)}` },
                { id: 'roomType', label: `${translate(`book.RoomType`)}`},
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
