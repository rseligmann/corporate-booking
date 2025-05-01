import { useWeather } from '@corporate-travel-frontend/api/hooks'
import { Card, Grid, LoadingOverlay, Text, Space } from '@mantine/core'
import { WeatherCard } from './WeatherCard';
import { weatherIcons } from './WeatherCodeMapping'
import { Trip } from '@corporate-travel-frontend/types';
import classes from './WeatherForecast.module.scss'


// Format date to display day of week
const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};


interface WeatherForecaseProps{
    tripsData: Trip[] | undefined;
}

export const WeatherForecast: React.FC<WeatherForecaseProps> = ({tripsData}) => {

    const longitude = tripsData?.[0].itinerary.destination.city.lng || 0
    const latitude = tripsData?.[0].itinerary.destination.city.lat || 0
    const city = tripsData?.[0].itinerary.destination.city.name
    const state = tripsData?.[0].itinerary.destination.city.state_id


    const { data: weatherData, isSuccess: isWeatherSuccess, isPending: isWeatherPending, error: weatherError } = useWeather(latitude, longitude )

    const forecastData = weatherData?.daily.time.slice(0,10).map((date, index) => ({
        date,
        formattedDate: formatDate(weatherData.daily.time[index]),
        weatherCode: Number(weatherData.daily.weather_code[index]),
        maxTemp: Number(weatherData.daily.temperature_2m_max[index]),
        minTemp: Number(weatherData.daily.temperature_2m_min[index]),
        precipProb: weatherData.daily.precipitation_probability_max[index]
      }));

    return(
        <Card className={classes.weatherCard}>
            <Text size='lg' fw={700}>{`Weather in ${city}, ${state}`}</Text>
            <LoadingOverlay visible={!isWeatherSuccess}/>
            <Space h='md'/>
            <Grid columns={10}>
                {forecastData?.map((day, index) => {
                    const WeatherIcon = weatherIcons[day.weatherCode as keyof typeof weatherIcons].icon
                    const weatherLabel = weatherIcons[day.weatherCode as keyof typeof weatherIcons].label
                    return(
                        <Grid.Col span={{ base: 5,sm: 3, md: 2, lg: 1}}  key={`${index}-${day.date}`}>
                            <WeatherCard
                                day={index === 0 ? 'Today' : day.formattedDate.split(' ')[0]}
                                date={day.formattedDate.split(' ').slice(1).join(' ')}
                                WeatherIcon={WeatherIcon}
                                label={weatherLabel}
                                minTemp={Math.round(day.minTemp)}
                                maxTemp={Math.round(day.maxTemp)}
                            />
                        </Grid.Col>
                    )
                })}
            </Grid>
        </Card>
    )
}
