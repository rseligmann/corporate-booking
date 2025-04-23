import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TripServices } from '../services';
import { Trip } from '@corporate-travel-frontend/types';

// Create a new trip
export const useCreateTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (tripData: Trip) =>
            TripServices.createTrip(tripData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trip']})
        }
    })
};

// Fetch a specific trip by trip id
export const useGetTrip = (trip_id: string) => {
    return useQuery({
        queryKey: ['trip', trip_id],
        queryFn: () => TripServices.getTrip(trip_id),
        enabled: !!trip_id,
    });
};

// Fetch trips by guest id
export const useGetGuestTrips = (guest_profile_id: string) => {
    return useQuery({
        queryKey: ['trips', guest_profile_id],
        queryFn: () => TripServices.getGuestTrips(guest_profile_id),
        enabled: !!guest_profile_id
    });
};

// Fetch trips by company (tenant)
export const useGetCompanyTrips = () => {
    return useQuery({
        queryKey: ['trips'],
        queryFn: () => TripServices.getCompanyTrips(),
    });
};

// Delete a trip
export const useDeleteTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (trip_id: string) =>
            TripServices.deleteTrip(trip_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips']})
        }
    })
}