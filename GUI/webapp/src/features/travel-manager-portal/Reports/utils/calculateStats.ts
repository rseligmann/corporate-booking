import { TripDetails } from '@/types';

export const calculateStats = (trips: TripDetails[]) => {
    const now = new Date();
    
    const stats = {
        upcoming: 0,
        active: 0,
        past30DaySpend: 0,
        past30to60DaySpend: 0,
        percentChange30DaySpend: 0,
        totalGuestsLast30Days: 0,
        totalGuests:0,
        totalSpend: 0,
        averageTripCostPerGuest: 0,
    };

    trips.forEach(trip => {
        const checkIn = new Date(trip.hotel.check_in);
        const checkOut = new Date(trip.hotel.check_out);
        
        // Calculate upcoming trips
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        if (checkIn > now && checkIn <= sevenDaysFromNow) {
            stats.upcoming++;
        }
        
        // Calculate active trips
        if (checkIn <= now && checkOut >= now) {
            stats.active++;
        }
        
        // Calculate total spend over past 30 days
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (checkOut > thirtyDaysAgo && checkOut <= now) {
            stats.past30DaySpend += trip.hotel.price + (trip.flight.outbound?.price || 0) + (trip.flight.return?.price || 0);
        }

        // Calculate spend 60 days to 30 days ago
        if (checkOut > new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000) && checkOut <= thirtyDaysAgo) {
            stats.past30to60DaySpend += trip.hotel.price + (trip.flight.outbound?.price || 0) + (trip.flight.return?.price || 0);
        }

        // Calculate total guests over past 30 days
        if (checkOut > thirtyDaysAgo && checkOut <= now) {
            stats.totalGuestsLast30Days++;
        }

        // Calculate total guests
        if(checkOut < now){
        stats.totalGuests++;
        }

        // Calculate total spend
        if(checkOut < now){
        stats.totalSpend += trip.hotel.price + (trip.flight.outbound?.price || 0) + (trip.flight.return?.price || 0);
        }
        
    });

    stats.percentChange30DaySpend = ((stats.past30DaySpend - stats.past30to60DaySpend) / stats.past30to60DaySpend) * 100;
    stats.averageTripCostPerGuest = stats.totalSpend / stats.totalGuests;

    return stats;
  };