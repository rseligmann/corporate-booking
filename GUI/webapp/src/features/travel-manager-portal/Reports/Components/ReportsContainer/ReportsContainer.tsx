import { Card, Space, Tabs, Text, } from '@mantine/core';
import { TripsTable } from '../TripsTable/TripsTable';
import { Trip } from '@/types';
import { MonthlySpendChart } from '../MonthlySpendChart/MonthlySpendChart';
import classes from './ReportsContainer.module.scss';

const tabs = [
  'Trip History',
  'Billing',
];

interface ReportsContainerProps {
    trips: Trip[];
  }

export const ReportsContainer: React.FC<ReportsContainerProps> = ({trips})=> {
    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
        {tab}
        </Tabs.Tab>
    ));

  return (
    <div className={classes.header}>
        <Tabs
          defaultValue="Trip History"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <div className={classes.tabPadding}>
            <Tabs.List>{items}</Tabs.List>
          </div>
          
          <Tabs.Panel value="Trip History">
            <Card shadow ="xs" padding="lg" radius="md" withBorder>
                <TripsTable trips={trips}/>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel value="Billing">
            <Card shadow ="xs" padding="lg" radius="md" withBorder>
                <Text size ="lg" fw={700}>
                    Spending Overview
                </Text>
                <Text size ="md" c="dimmed">
                    Track your travel spending over time
                </Text>
                <Space h="md"/>
                <div className="chart-container">
                    <MonthlySpendChart trips={trips}/>
                </div>
            </Card>
          </Tabs.Panel>
          
        </Tabs>
    </div>

  );
}