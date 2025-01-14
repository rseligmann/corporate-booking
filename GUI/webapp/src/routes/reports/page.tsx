import { Helmet } from 'react-helmet-async';
import Reports from '@/features/reports/reports'

function ReportsPage() {
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