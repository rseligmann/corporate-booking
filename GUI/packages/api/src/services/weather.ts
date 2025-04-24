import api from '../api'
import { WeatherResponse } from '@corporate-travel-frontend/types'

export const WeatherService = {
    async getWeather(lat: number, lng: number): Promise<WeatherResponse> {
        const response = await api.get<WeatherResponse>('/weather',{params: {
            lat: lat,
            lng: lng
        }});
        return response.data
    }
}