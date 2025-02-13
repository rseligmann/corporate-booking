import { Clock, UserCheck, AlertCircle, UserPlus } from 'lucide-react';
import { Button, Card, Space, Text } from '@mantine/core'
import { StatsCard } from './components/StatsCard/StatsCard';
import { getSampleTripData } from './utils/sampleTripData';
import { calculateStats } from './utils/calculateStats';
import { CurrentTripsTable } from './components/CurrentTripsTable/CurrentTripsTable';
import './Dashboard.scss';

const Dashboard = () => {
  const tripData = getSampleTripData();
  const stats = calculateStats(tripData);
  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__title-group">
            <h1 className="dashboard__title">Welcome back, Sarah</h1>
            <p className="dashboard__subtitle">Manage your guest travel arrangements</p>
          </div>
          <Button 
            variant = "filled"
            onClick={() => window.location.href = '/guest-invite'}
            leftSection={<UserPlus size={14} />}
          >
            <span>New Guest Invite</span>
          </Button>
        </div>

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
            <Text size ="xl" fw={700}>
              Current Trips
            </Text>
            <Text size ="md" c="dimmed">
              Overview of all upcoming and active travel arrangements
            </Text>
            <Space h="md"/>
            <CurrentTripsTable trips={tripData}/>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;