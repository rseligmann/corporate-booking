import { TripDetails } from '@/types';

interface MonthlySpend {
    month: string;  // Format: "YYYY-MM"
    flightSpend: number;
    hotelSpend: number;
}

export const calculateMonthlySpend = (trips: TripDetails[]): MonthlySpend[] => {
    // Create a map to store spending by month
    const monthlySpendMap = new Map<string, MonthlySpend>();

    trips.forEach(trip => {
        // Get the month from hotel check-in date
        const monthKey = trip.hotel.check_in.toISOString().slice(0, 7); // Gets YYYY-MM

        // Initialize or get the monthly spend object
        let monthSpend = monthlySpendMap.get(monthKey) || {
            month: monthKey,
            flightSpend: 0,
            hotelSpend: 0
        };

        // Add hotel spend
        monthSpend.hotelSpend += trip.hotel.price;

        // Add flight spend if exists
        if (trip.flight.outbound) {
            monthSpend.flightSpend += trip.flight.outbound.price;
        }
        if (trip.flight.return) {
            monthSpend.flightSpend += trip.flight.return.price;
        }

        // Update the map
        monthlySpendMap.set(monthKey, monthSpend);
    });

    // Convert map to array and sort by month
    return Array.from(monthlySpendMap.values())
        .sort((a, b) => a.month.localeCompare(b.month));

};