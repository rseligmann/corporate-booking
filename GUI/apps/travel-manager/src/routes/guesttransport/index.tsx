import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestTransport from './GuestTransport';

export const GuestTransportPage: FC = () => {
  // Example data - replace with actual data from your API
  const locations = [
    {
      type: 'pickup' as const,
      name: 'San Francisco International Airport (SFO)',
      address: 'International Terminal, Level 2',
      time: '2024-02-15T09:00:00',
      instructions: 'Meet your driver at the designated rideshare pickup area'
    },
    {
      type: 'dropoff' as const,
      name: 'Company Office',
      address: '123 Main Street, San Francisco, CA 94105',
      time: '2024-02-15T10:00:00'
    }
  ];

  const vouchers = [
    {
      code: 'TRIP2024ABC',
      service: 'Uber' as const,
      status: 'pending' as const,
      validFrom: '2024-02-15T00:00:00',
      validUntil: '2024-02-16T23:59:59',
      maxAmount: 50
    },
    {
      code: 'TRIP2024DEF',
      service: 'Lyft' as const,
      status: 'active' as const,
      validFrom: '2024-02-15T00:00:00',
      validUntil: '2024-02-16T23:59:59',
      maxAmount: 50
    }
  ];

  const handleActivateVoucher = (code: string) => {
    console.log('Activating voucher:', code);
    // Implement voucher activation logic
  };

  const handleLaunchApp = (service: string) => {
    console.log('Launching app:', service);
    // Implement deep linking to ride service apps
  };

  return (
    <>
      <Helmet>
        <title>Ground Transport | TravelPortal</title>
        <meta name="description" content="Manage your ground transportation arrangements" />
      </Helmet>
      <GuestTransport 
        locations={locations}
        vouchers={vouchers}
        onActivateVoucher={handleActivateVoucher}
        onLaunchApp={handleLaunchApp}
      />
    </>
  );
};

export default GuestTransportPage;