import { Clock, UserCheck, AlertCircle, UserPlus } from 'lucide-react';
import { Button, Card, Space, Text } from '@mantine/core'
import { StatsCard } from './components/StatsCard/StatsCard';
import { getSampleTripData } from '../utils/getSampleTripData';
import { TravelMgrPageLayout } from '@/layouts';
import { calculateStats } from './utils/calculateStats';
import { CurrentTripsTable } from './components/CurrentTripsTable/CurrentTripsTable';
import './Dashboard.scss';

const Dashboard = () => {
  const tripData = getSampleTripData();
  const stats = calculateStats(tripData);

  const actionButton = (
    <Button 
      variant="filled"
      onClick={() => window.location.href = '/guest-invite'}
      leftSection={<UserPlus size={14} />}
    >
      <span>New Guest Invite</span>
    </Button>
  );

  return (
    <TravelMgrPageLayout
      title="Welcome back, Sarah"
      subtitle="Manage your guest travel arrangements"
      action={actionButton}
    >

        <div className="dashboard__stats">
          <StatsCard 
            cardTitle="Upcoming Trips" 
            icon={Clock} 
            guestCount={stats.upcoming} 
            quickStat={`Next arrival in ${stats.nextArrivalIn} days`}
          />
          
          <StatsCard 
            cardTitle="Active Trips" 
            icon={UserCheck} 
            guestCount={stats.active} 
            quickStat={`${stats.checkingOutToday} checking out today`}
          />

          <StatsCard 
            cardTitle="Requires Attention" 
            icon={AlertCircle} 
            guestCount={stats.requiresAttention} 
            quickStat="Flight delays detected"
          />
          
        </div>

        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>
              Current Trips
            </Text>
            <Text size ="md" c="dimmed">
              Overview of all upcoming and active travel arrangements
            </Text>
            <Space h="md"/>
            <CurrentTripsTable trips={tripData}/>
        </Card>
    </TravelMgrPageLayout>
  );
};

export default Dashboard;