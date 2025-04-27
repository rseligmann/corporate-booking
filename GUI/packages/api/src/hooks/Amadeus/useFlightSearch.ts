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

// get list of flight offers for each airport pair

export const useMultiAirportFlightOffers = (searchParams?: FlightAggregationRequest) => {
    return useQuery({
        queryKey: ['multiAirportFlightOffers', searchParams],
        queryFn:() =>{
            if(searchParams){
                return AmadeusFlightServices.getMultiAirportFlightOffers(searchParams)
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!searchParams
    })
}