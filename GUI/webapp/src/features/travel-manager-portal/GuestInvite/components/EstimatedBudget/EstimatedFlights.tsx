import { Card, Group, NavLink, Table } from '@mantine/core'
import { FlightAggregationResponse } from '@/types'
import classes from './EstimatedFlights.module.scss'

interface EstimateBudgetProps {
  flightData: FlightAggregationResponse;
}

export const EstimatedFlights: React.FC<EstimateBudgetProps> = ({flightData}) => {

    const rows = flightData?.pair_statistics.map((flights) => (
        <Table.Tr key={`${flights.origin}-${flights.destination}`}>
          <Table.Td>{`${flights.origin}-${flights.destination}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.average_price)}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.min_price)}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.max_price)}`}</Table.Td>
          <Table.Td>{flights.flight_count}</Table.Td>
        </Table.Tr>
      ))

    return(
        <div>
            <Group gap="xl">
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(flightData.overall_average_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`${Math.round(flightData.total_flights)}`}</div>
                    <div className={classes.budgetItem__label}>total flights</div>
                </Card>
                </Group>
            <NavLink
                //href="#required-for-focus"
                label='Pricing Details'
                childrenOffset={0}
                classNames={{root: classes.navLink__root, label: classes.navLink__label, chevron: classes.navLink__chevron}}
                //leftSection={<ChevronRight size={12} strokeWidth={1.5} className='mantine-rotate-rtl'/>}
            >
                <Table>
                    <Table.Thead>
                    <Table.Tr>
                        <Table.Th className={classes.th}>Route</Table.Th>
                        <Table.Th className={classes.th}>Avg. Price</Table.Th>
                        <Table.Th className={classes.th}>Min</Table.Th>
                        <Table.Th className={classes.th}>Max</Table.Th>
                        <Table.Th className={classes.th}>Flights</Table.Th>
                    </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={classes.Tbody}>{rows}</Table.Tbody>
                </Table>
            </NavLink>
        </div>
    )
}