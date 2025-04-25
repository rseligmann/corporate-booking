import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import  GuestDashboard from '../../features/guestdashboard/GuestDashboard';

export const GuestDashboardPage: FC = () => {

  return (
    <>
      <Helmet>
        <title>Trip Dashboard | Guest TravelPortal</title>
        <meta name="description" content="Manage your travel arrangements" />
      </Helmet>
      <GuestDashboard
        tripStatus={{
          flight: { status: "pending", details: "Booking required" },
          hotel: { status: "confirmed", details: "Hilton Downtown" },
          transport: { status: "pending", details: "Setup required" },
          expenses: { status: "pending", details: "No expenses submitted" }
        }}
      />
    </>
  );
}

export default GuestDashboardPage;