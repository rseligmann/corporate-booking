import { Trip } from '@/types';

//Helper function to calculate trip length in days
export const calculateTripLength =(trip: Trip): number => {
    let startDate: Date;
    let endDate: Date;

    if (trip.itinerary.startDate && trip.itinerary.endDate){
        // If there are flights, use flight dates, else use hotel dates
        startDate = trip.itinerary.startDate;
        endDate = trip.itinerary.endDate;

        // Calculate difference in days
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }else return 0
}
