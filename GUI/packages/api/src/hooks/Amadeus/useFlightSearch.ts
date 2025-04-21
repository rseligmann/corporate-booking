import { useQuery } from '@tanstack/react-query';
import { AmadeusFlightServices } from '../../services/amadeus/flightSearchServices';
import { FlightAggregationRequest } from '@/types';

// get average flight prices for each airport pair and overall average price
export const useAvgFlightPriceSearch = (searchParams?: FlightAggregationRequest) =>{
    return useQuery({
        queryKey: ['avgFlightPriceSearch', searchParams],
        queryFn:() => {
            if(searchParams){
                return AmadeusFlightServices.getAvgFlightPrices(searchParams)
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!searchParams
    })
}