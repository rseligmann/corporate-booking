import { TripDetails } from '@/types';

//Helper function to calculate trip length in days
export const calculateTripLength =(trip: TripDetails): number => {
    let startDate: Date;
    let endDate: Date;

    // If there are flights, use flight dates, else use hotel dates
    startDate = trip.flight.outbound ? trip.flight.outbound.departureTime : trip.hotel.check_in;
    endDate = trip.flight.return ? trip.flight.return.arrivalTime : trip.hotel.check_out;

    // Calculate difference in days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
