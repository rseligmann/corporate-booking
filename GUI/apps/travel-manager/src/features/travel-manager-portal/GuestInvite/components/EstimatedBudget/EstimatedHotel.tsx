import { Card, Group } from '@mantine/core'
import { HotelAggregationResponse } from '@/types'
import classes from './EstimatedFlights.module.scss'

interface EstimateBudgetProps {
  hotelData: HotelAggregationResponse;
}

export const EstimatedHotels: React.FC<EstimateBudgetProps> = ({hotelData}) => {

    return(
        <div>
            <Group gap="sm">
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(hotelData.overall_average_total_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(hotelData.overall_average_night_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price/night</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`${hotelData.total_available_hotels}`}</div>
                    <div className={classes.budgetItem__label}>total hotels</div>
                </Card>
                </Group>
        </div>
    )
}