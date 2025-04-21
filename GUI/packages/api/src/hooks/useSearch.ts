import { useQuery } from '@tanstack/react-query';
import { SearchServices } from '../services/searchServices';

// Search US based cities
export const useCitySearch = (q: string, limit: number, threshold: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['searchCity', q, limit, threshold],
        queryFn: () => SearchServices.getCities(q,limit,threshold),
        enabled: q.length >= 1 && enabled,
        staleTime: 1000 * 60 * 3,
    })
}

// Search airports within a distance of an airport (200 miles max distance)
export const useServiceableAirportSearch = (hubs: string[], city_id: string, max_distance: number) => {
    return useQuery({
        queryKey: ['searchServiceableAirport', hubs, city_id, max_distance],
        queryFn: () => SearchServices.getServiceableAirports(hubs, city_id, max_distance),
        enabled: Boolean(city_id) && city_id.length >=1,
        staleTime: 1000 * 60 * 3,
    })
}