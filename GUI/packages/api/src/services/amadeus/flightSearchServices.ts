import api from '../../api';
import { FlightAggregationRequest, FlightAggregationResponse } from '@/types';

export const AmadeusFlightServices = {
    async getAvgFlightPrices(searchParams: FlightAggregationRequest): Promise<FlightAggregationResponse> {
        const response = await api.get<FlightAggregationResponse>('/amadeus/flights/flight-offers-avg-price', {
            params: searchParams
        });
        return response.data
    }
}