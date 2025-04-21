import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import  GuestDashboard from './GuestDashboard';

export const GuestDashboardPage: FC = () => {
  const handleActionClick = (action: string) => {
    // Handle different actions (flight, hotel, etc.)
    console.log(`Action clicked: ${action}`);
  };

  return (
    <>
      <Helmet>
        <title>Trip Dashboard | TravelPortal</title>
        <meta name="description" content="Manage your travel arrangements" />
      </Helmet>
      <GuestDashboard
        guestName="John Doe"
        tripDates={{
          start: "2024-02-15",
          end: "2024-02-20"
        }}
        location={{
          origin: "San Francisco",
          destination: "New York"
        }}
        weather={{
          temperature: "72°F",
          condition: "Sunny",
          icon: "/weather-icon.svg"
        }}
        tripStatus={{
          flight: { status: "pending", details: "Booking required" },
          hotel: { status: "confirmed", details: "Hilton Downtown" },
          transport: { status: "pending", details: "Setup required" },
          expenses: { status: "pending", details: "No expenses submitted" }
        }}
        onActionClick={handleActionClick}
      />
    </>
  );
}

export default GuestDashboardPage;