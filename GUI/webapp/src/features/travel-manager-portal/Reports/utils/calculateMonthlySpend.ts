import { Trip } from '@/types';

interface MonthlySpend {
    month: string;  // Format: "YYYY-MM"
    flightSpend: number;
    hotelSpend: number;
}

export const calculateMonthlySpend = (trips: Trip[]): MonthlySpend[] => {
    // Create a map to store spending by month
    const monthlySpendMap = new Map<string, MonthlySpend>();

    trips.forEach(trip => {
        const monthKey = trip.itinerary.startDate.toISOString().slice(0, 7); // Gets YYYY-MM

        // Initialize or get the monthly spend object
        let monthSpend = monthlySpendMap.get(monthKey) || {
            month: monthKey,
            flightSpend: 0,
            hotelSpend: 0
        };

        // Add hotel spend
        if(trip.hotel)
        monthSpend.hotelSpend += trip.hotel.price;

        // Add flight spend if exists
        if (trip.flights?.outbound) {
            monthSpend.flightSpend += trip.flights.outbound.price;
        }
        if (trip.flights?.return) {
            monthSpend.flightSpend += trip.flights.return.price;
        }

        // Update the map
        monthlySpendMap.set(monthKey, monthSpend);
    });

    // Convert map to array and sort by month
    return Array.from(monthlySpendMap.values())
        .sort((a, b) => a.month.localeCompare(b.month));

};