import { Card, Space, Text } from '@mantine/core'
import classes from './WeatherCard.module.scss'
import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

interface WeatherCardProps{
    day: string;
    date: string;
    WeatherIcon: ComponentType<LucideProps>;
    label: string;
    minTemp: number;
    maxTemp: number;

}

export const WeatherCard: React.FC<WeatherCardProps> = ({day, date, WeatherIcon, label, minTemp, maxTemp}) =>{
    return(
        <Card className={classes.weatherCard}>
            <div className={classes.weatherContent}>
                <Text size='sm' fw={500}>{day}</Text>
                <Text size='xs' c='dimmed'>{date}</Text>

                <Space h='xs'/>

                <WeatherIcon className={classes.icon}/>

                <Space h='xs'/>

                <div className={classes.weatherLabel}>
                    <Text size='xs' fw={500}>{label}</Text>
                </div>

                <Space h='xs'/>

                <div className={classes.temps}>
                    <Text c='blue' fw={700}>{`${maxTemp}°`}</Text>
                    <Text c='dimmed'>{`${minTemp}°`}</Text>
                </div>
            </div>
        </Card>
    )
}