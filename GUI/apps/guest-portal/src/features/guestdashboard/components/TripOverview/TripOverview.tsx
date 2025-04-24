import { Card, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Trip } from '@corporate-travel-frontend/types';
import { MapPin, Calendar } from 'lucide-react';
import classes from './TripOverview.module.scss'



// Format dates as "Friday, Oct 15"
const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

interface TripOverviewProps {
    tripsData: [Trip] | undefined;
}

export const TripOverview: React.FC<TripOverviewProps> = ({tripsData}) =>{

    const [ startDate, setStartDate ] = useState('')
    const [ endDate, setEndDate ] = useState('')
    const [ originCity, setOriginCity ] = useState('')
    const [ destinationCity, setDestinationCity ] = useState('')

    useEffect(() => {
        if(tripsData && tripsData[0].itinerary.startDate && tripsData[0].itinerary.endDate &&
            tripsData[0].itinerary.origin.city.name && tripsData[0].itinerary.destination.city.name &&
            tripsData[0].itinerary.origin.city.state_id && tripsData[0].itinerary.destination.city.state_id
        ) {
            const start = new Date(tripsData[0].itinerary.startDate)
            const end = new Date(tripsData[0].itinerary.endDate)

            setStartDate(formatDate(start))
            setEndDate(formatDate(end)) 
            setOriginCity(`${tripsData[0].itinerary.origin.city.name}, ${ tripsData[0].itinerary.origin.city.state_id}`)
            setDestinationCity(`${tripsData[0].itinerary.destination.city.name}, ${tripsData[0].itinerary.destination.city.state_id}`)
        }
    },[tripsData])

    

    return(
        <Card className={classes.introOverviewCard}>
            <div className={classes.tripCardContent}>
                <div className={classes.feature}>
                    <Calendar className={classes.featureIcon}/>
                    <div>
                        <Text className={classes.featureTitle}>Trip Dates</Text>
                        <div className={classes.textGroup}>
                            <Text fw={700}>{`${startDate}`}</Text>
                            <Text> to </Text>
                            <Text fw={700}>{endDate}</Text>
                        </div>
                    </div>
                </div>
                <div className={classes.feature}>
                    <MapPin className={classes.featureIcon}/>
                    <div>
                        <Text className={classes.featureTitle}>Location</Text>
                        <div className={classes.textGroup}>
                            <Text fw={700}>{`${originCity}`}</Text>
                            <Text> → </Text>
                            <Text fw={700}>{destinationCity}</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}