import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../services/weather';

export const useWeather = (lat: number, lng: number) => {
    return useQuery({
        queryKey: ['weather', lat, lng],
        queryFn: () => WeatherService.getWeather(lat,lng),
    });
};