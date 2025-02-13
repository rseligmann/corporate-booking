import { TripDetails } from '@/types';

export const calculateStats = (trips: TripDetails[]) => {
    const now = new Date();
    
    const stats = {
        upcoming: 0,
        active: 0,
        requiresAttention: 0,
        nextArrivalIn: null as number | null,
        checkingOutToday: 0
    };

    trips.forEach(trip => {
        const checkIn = new Date(trip.hotel.check_in);
        const checkOut = new Date(trip.hotel.check_out);
        
        // Calculate upcoming trips
        if (checkIn > now) {
            stats.upcoming++;
            
            // Calculate days until next arrival
            const daysUntilArrival = Math.ceil(
                (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (stats.nextArrivalIn === null || daysUntilArrival < stats.nextArrivalIn) {
            stats.nextArrivalIn = daysUntilArrival;
            }
        }
        
        // Calculate active trips
        if (checkIn <= now && checkOut >= now) {
            stats.active++;
            
            // Calculate checking out today
            if (checkOut.toDateString() === now.toDateString()) {
            stats.checkingOutToday++;
            }
        }
        
        // Calculate trips requiring attention
        if (trip.status === 'delayed') {
            stats.requiresAttention++;
        }
    });

    return stats;
  };