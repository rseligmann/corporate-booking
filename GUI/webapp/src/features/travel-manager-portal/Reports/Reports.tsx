import React from 'react'
import { getSampleTripData } from '../utils/sampleTripData';
import { Grid, Space} from'@mantine/core'
import { TravelMgrPageLayout } from '@/layouts';
import { StatsCard } from './Components/StatsCard/StatsCard'
import { calculateStats } from './utils/calculateStats';
import './Reports.scss';
import { ReportsContainer } from './Components/ReportsContainer/ReportsContainer';

const ReportsPage: React.FC = () => {
  const tripData = getSampleTripData();
  const stats= calculateStats(tripData);

  return (
    <TravelMgrPageLayout
      title="Reports"
      subtitle="Track and analyze your travel expenses"
    >
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard 
            cardTitle="This Month's Spend" 
            stat={`$${stats.past30DaySpend}`} 
            statDetail={`${stats.percentChange30DaySpend ? stats.percentChange30DaySpend : "-"}% last month`}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard 
            cardTitle="Active Trips" 
            stat={`${stats.active}`}
            statDetail={`${stats.upcoming} upcoming this week`}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard 
            cardTitle="Total Guests" 
            stat={`${stats.totalGuestsLast30Days}`}
            statDetail="This month"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard 
            cardTitle="Average Trip Cost" 
            stat={`$${stats.averageTripCostPerGuest}`} 
            statDetail="Per guest"/>
        </Grid.Col>
      </Grid>
      <Space h="md"/>
      <ReportsContainer trips={tripData}/>
    </TravelMgrPageLayout>
  );
};

export default ReportsPage;