import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/features/dashboard/dashboard'

export const DashboardPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | TravelPortal</title>
        <meta name="description" content="Manage your guest travel arrangements" />
      </Helmet>
      <Dashboard />
    </>
  );
}
