import api from '@/api/api';
import { SearchCityResponse, SearchServiceableAirportsResponse } from '@/types';

export const SearchServices = {
    async getCities(q: string, limit: number, threshold: number): Promise<SearchCityResponse[]>  {
        const response = await api.get<SearchCityResponse[]>('/search/cities', {params: {
            q, limit, threshold
        }});
        return response.data;
    },

    async getServiceableAirports(hubs: string[], city_id: string, max_distance: number): Promise<SearchServiceableAirportsResponse[]> {
        const response = await api.get<SearchServiceableAirportsResponse[]>('/search/airport_serviceability', {params: {
            hubs, city_id, max_distance
        }});
        return response.data;
    }
}