import api from '../../api';
import { FlightAggregationRequest, FlightAggregationResponse, FlightOffersResponse } from '@/types';

export const AmadeusFlightServices = {
    async getAvgFlightPrices(searchParams: FlightAggregationRequest): Promise<FlightAggregationResponse> {
        const response = await api.get<FlightAggregationResponse>('/amadeus/flights/flight-offers-avg-price', {
            params: searchParams
        });
        return response.data
    },

    async getMultiAirportFlightOffers(searchParams: FlightAggregationRequest): Promise<FlightOffersResponse[]> {
        const response = await api.get<FlightOffersResponse[]>('/amadeus/flights/flight-offers-multi-airport', {
            params: searchParams
        });
        return response.data
    }
}