import { Helmet } from 'react-helmet-async';
import Dashboard from '@/features/dashboard/dashboard'

function DashboardPage() {
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

export default DashboardPage;