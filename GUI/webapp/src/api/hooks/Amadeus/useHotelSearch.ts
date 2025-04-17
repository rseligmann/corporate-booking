import { useQuery } from '@tanstack/react-query';
import { AmadeusHotelServices } from '@/api/services/amadeus/hotelSearchServices';
import { HotelCustomSearchRequest } from '@/types';

// get average flight prices for each airport pair and overall average price
export const useAvgHotelPriceSearch = (searchParams?: HotelCustomSearchRequest) =>{
    return useQuery({
        queryKey: ['avgHotelPriceSearch', searchParams],
        queryFn:() => {
            if(searchParams){
                return AmadeusHotelServices.getAvgHotelPrices(searchParams)
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!searchParams
    })
}