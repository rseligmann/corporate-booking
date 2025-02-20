import { Trip } from '@/types';

export const calculateStats = (trips: Trip[]) => {
    const now = new Date();
    
    const stats = {
        upcoming: 0,
        active: 0,
        requiresAttention: 0,
        nextArrivalIn: null as number | null,
        checkingOutToday: 0
    };

    trips.forEach(trip => {
        const tripStartDate = new Date(trip.itinerary.startDate);
        const tripEndDate = new Date(trip.itinerary.endDate);
        
        // Calculate upcoming trips
        if (tripStartDate > now) {
            stats.upcoming++;
            
            // Calculate days until next arrival
            const daysUntilArrival = Math.ceil(
                (tripStartDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (stats.nextArrivalIn === null || daysUntilArrival < stats.nextArrivalIn) {
            stats.nextArrivalIn = daysUntilArrival;
            }
        }
        
        // Calculate active trips
        if (tripStartDate <= now && tripEndDate >= now) {
            stats.active++;
            
            // Calculate checking out today
            if (tripEndDate.toDateString() === now.toDateString()) {
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