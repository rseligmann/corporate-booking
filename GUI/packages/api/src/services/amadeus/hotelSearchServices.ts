import api from '../../api';
import { HotelCustomSearchRequest, HotelAggregationResponse } from '@/types';

export const AmadeusHotelServices = {
    async getAvgHotelPrices(searchParams: HotelCustomSearchRequest): Promise<HotelAggregationResponse> {
        const response = await api.get<HotelAggregationResponse>('/amadeus/hotels/hotel-offers-avg-price', {
            params: searchParams
        });
        return response.data
    }
}