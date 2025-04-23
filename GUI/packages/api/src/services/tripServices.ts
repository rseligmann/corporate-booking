import api from '../api';
import { CreateTripResponse, Trip } from '@corporate-travel-frontend/types';

export const TripServices = {
    async createTrip(tripData: Trip): Promise<CreateTripResponse>{
        const response = await api.post<CreateTripResponse>('/trip', tripData);
        return response.data
    },

    async getTrip(trip_id: string): Promise<Trip> {
        const response = await api.get<Trip>(`/trip/id/${trip_id}`);
        return response.data
    },

    async getGuestTrips(guest_profile_id: string): Promise<[Trip]> {
        const response = await api.get<[Trip]>(`/trip/guest/${guest_profile_id}`);
        return response.data
    },

    async getCompanyTrips(): Promise<[Trip]> {
        const response = await api.get<[Trip]>('/trips');
        return response.data
    },

    async deleteTrip(trip_id: string): Promise<boolean> {
        const response = await api.delete<boolean>(`/trip/${trip_id}`);
        return response.data
    }
}