interface Daily {
    time: [string];
    weather_code: [string];
    temperature_2m_max: [string];
    temperature_2m_min: [string];
    precipitation_probability_max: [string];
}

interface DailyUnits{
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
}

export interface WeatherResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    daily: Daily;
    daily_units: DailyUnits;
}