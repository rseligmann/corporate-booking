import { useState, useEffect } from 'react';
import { Card, Loader, Stack, Text } from '@mantine/core'
import { useAvgFlightPriceSearch } from '@/api/hooks';
import { FlightAggregationRequest, Trip } from '@/types'
import classes from './EstimatedBudget.module.scss';

interface EstimateBudgetProps {
  formData: Trip;
}

export const EstimatedBudget: React.FC<EstimateBudgetProps> = ({formData}) => {

  const [ flightSearch, setFlightSearch ] = useState<FlightAggregationRequest>()

  // Format date to YYYY-MM-DD string
  const formatDateToString = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if(
      formData.itinerary.searchedAirports.originAirports && 
      formData.itinerary.searchedAirports.destinationAirports &&
      formData.itinerary.startDate &&
      formData.itinerary.endDate
    ){
      const newFlightSearch: FlightAggregationRequest = {
        originLocationCodes: formData.itinerary.searchedAirports.originAirports,
        destinationLocationCodes: formData.itinerary.searchedAirports.destinationAirports,
        departureDate: formatDateToString(formData.itinerary.startDate),
        returnDate: formatDateToString(formData.itinerary.endDate),
        adults: 1,
        travelClass: formData.travelPreferences.flight.cabinClass,
        currencyCode: 'USD',
        arrival_time_window_end: formData.itinerary.startDate.toISOString().slice(0,-5),
        return_departure_time_window_start: formData.itinerary.endDate.toISOString().slice(0,-5),
        max_stops: formData.travelPreferences.flight.maxStops
      }
      setFlightSearch(newFlightSearch)
    }
  }, [formData])
  
  const { data: flightData, isPending: flightIsPending, error: flightError } = useAvgFlightPriceSearch(flightSearch)
  

  return (
    <Card  shadow='xs' padding='md' radius='md' withBorder>
        <Text size ="lg" fw={700}>Estimated Budget</Text>
        {flightSearch ? (
          <Stack align='stretch' justify='center' gap='md'>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__label}>Average Flight</div>
              {flightData 
                ? (
                  <div className={classes.budgetItem__value}>
                    {`$${flightData.overall_average_price}`}
                  </div>
                ) : (
                  flightIsPending
                ) ? (
                  <Loader type = "dots"/>
                ) : (
                flightError
                ) ? (
                  <div>{flightError.message}</div>
                ) : (
                  <></>
                )
              }
            </div>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__label}>Average Hotel</div>
              <div className={classes.budgetItem__value}>$320</div>
            </div>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__label}>Total Estimate</div>
              <div className={classes.budgetItem__value}>$770</div>
            </div>
          </Stack>
        ) : 
        <div>
          <Text> Please provide origin, destination, and meeting times to see pricing data</Text>
        </div>
        }
    </Card>
  );
};