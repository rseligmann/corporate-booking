import { FC } from 'react'; 
import { Helmet } from 'react-helmet-async';
import Reports from '@/routes/reports/Reports'

export const ReportsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Reports | TravelPortal</title>
        <meta name="description" content="View and analyze your travel expenses" />
      </Helmet>
      <Reports />
    </>
  );
}

export default ReportsPage;