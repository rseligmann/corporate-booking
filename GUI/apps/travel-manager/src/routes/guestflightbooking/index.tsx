import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { GuestFlightBooking } from '../../features/guest-flights/GuestFlightBooking';

export const GuestFlightsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Flight Selection | TravelPortal</title>
        <meta name="description" content="Select your flights" />
      </Helmet>
      <GuestFlightBooking />
    </>
  );
}

export default GuestFlightsPage;