import { useState, useEffect } from 'react';
import { Card, Divider, Loader, Stack, Text } from '@mantine/core'
import { useAvgFlightPriceSearch, useAvgHotelPriceSearch } from '@corporate-travel-frontend/api/hooks';
import { EstimatedFlights } from './EstimatedFlights';
import { EstimatedHotels } from './EstimatedHotel';
import { FlightAggregationRequest, HotelCustomSearchRequest, HotelRating, Trip } from '@/types'
import classes from './EstimatedBudget.module.scss';

interface EstimateBudgetProps {
  formData: Trip;
}

export const EstimatedBudget: React.FC<EstimateBudgetProps> = ({formData}) => {

  const [ flightSearch, setFlightSearch ] = useState<FlightAggregationRequest>()
  const [ hotelSearch, setHotelSearch ] = useState <HotelCustomSearchRequest>()

  // Format date to YYYY-MM-DD string
  const formatDateToString = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const getNumbersUptoFive = (minRating: number): HotelRating[] => {
    const result: HotelRating[] = [];
    for(let i = minRating; i<=5; i++) {
      result.push(String(i) as HotelRating)
    }
    return result;
  }
  

  useEffect(() => {
    if(
      formData.itinerary.origin.searchedAirports && 
      formData.itinerary.destination.searchedAirports &&
      formData.itinerary.startDate &&
      formData.itinerary.endDate &&
      formData.itinerary.origin.searchedAirports?.length > 0 &&
      formData.itinerary.destination.searchedAirports?.length > 0 
    ){
      const newFlightSearch: FlightAggregationRequest = {
        originLocationCodes: formData.itinerary.origin.searchedAirports,
        destinationLocationCodes: formData.itinerary.destination.searchedAirports,
        departureDate: formatDateToString(formData.itinerary.startDate),
        returnDate: formatDateToString(formData.itinerary.endDate),
        adults: 1,
        travelClass: formData.travelPreferences.flight.cabinClass,
        currencyCode: 'USD',
        //arrival_time_window_end: formData.itinerary.startDate.toISOString().slice(0,-5),
        //return_departure_time_window_start: formData.itinerary.endDate.toISOString().slice(0,-5),
        max_stops: formData.travelPreferences.flight.maxStops
      }

      const newHotelSearch: HotelCustomSearchRequest = {
        latitude: formData.itinerary.destination.city.lat as number,
        longitude: formData.itinerary.destination.city.lng as number,
        radius: 3,
        ratings: getNumbersUptoFive(formData.travelPreferences.hotel.minimumRating as number),
        checkInDate: formatDateToString(formData.itinerary.startDate),
        checkOutDate: formatDateToString(formData.itinerary.endDate)
      }
      setFlightSearch(newFlightSearch)
      setHotelSearch(newHotelSearch)
    }
  }, [formData.itinerary, formData.travelPreferences])
  
  const { data: flightData, isPending: flightIsPending, error: flightError } = useAvgFlightPriceSearch(flightSearch)
  const { data: hotelData, isPending: hotelIsPending, error: hotelError } = useAvgHotelPriceSearch(hotelSearch)

  return (
    <Card  shadow='xs' padding='md' radius='md' withBorder>
        <Text size ="lg" fw={700}>Estimated Budget</Text>
        {flightSearch ? (
          <Stack align='stretch' justify='center' gap='md'>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Flight Pricing</div>
              {flightData 
                ? (
                  <EstimatedFlights 
                    flightData={flightData}
                  />
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
            <Divider/>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Hotel Pricing</div>
              {hotelData
                ? (
                  <EstimatedHotels
                    hotelData={hotelData}
                  />
                ) : (
                  hotelIsPending
                ) ? (
                  <Loader type = "dots"/>
                ) : (
                hotelError
                ) ? (
                  <div>{hotelError.message}</div>
                ) : (
                  <></>
                )
              }
            </div>
            <Divider/>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Total Estimate</div>
              <div className={classes.budgetItem__value}>{`$${Math.round((flightData?.overall_average_price || 0)+(hotelData?.overall_average_total_price || 0))}`}</div>
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