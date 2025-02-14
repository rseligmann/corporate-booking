import { calculateMonthlySpend } from "../../utils/calculateMonthlySpend";
import { TripDetails } from "@/types";
import { LineChart } from '@mantine/charts';

export const MonthlySpendChart = ({ trips }: { trips: TripDetails[] }) => {
    const monthlySpend = calculateMonthlySpend(trips);

    return (
        <div>
            <LineChart
                data={monthlySpend}
                h={300}
                dataKey="month"
                series={[
                    { name: 'flightSpend', color: 'blue'},
                    { name: 'hotelSpend', color: 'green'},
                ]}
                curveType="natural"
            />
        </div>
    );
};