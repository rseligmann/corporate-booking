import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestHotel from './GuestHotel';

export const GuestHotelPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Hotel Details | TravelPortal</title>
        <meta name="description" content="View your hotel booking details and information" />
      </Helmet>
      <GuestHotel />
    </>
  );
};

export default GuestHotelPage;