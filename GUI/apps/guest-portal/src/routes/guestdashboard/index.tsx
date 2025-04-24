import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import  GuestDashboard from './GuestDashboard';

export const GuestDashboardPage: FC = () => {

  return (
    <>
      <Helmet>
        <title>Trip Dashboard | Guest TravelPortal</title>
        <meta name="description" content="Manage your travel arrangements" />
      </Helmet>
      <GuestDashboard
        tripDates={{
          start: "2024-02-15",
          end: "2024-02-20"
        }}
        location={{
          origin: "San Francisco",
          destination: "New York"
        }}
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