import { Card, Grid, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Trip } from '@corporate-travel-frontend/types';
import { MapPin, Clock, Calendar } from 'lucide-react';
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
    const [ tripDuration, setTripDuration ] = useState(0)

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

            start.setHours(0, 0, 0, 0)
            end.setHours(0, 0, 0, 0)

            const diffTime = Math.abs(start.getTime() - end.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            setTripDuration(diffDays)
        }
    },[tripsData])

    

    return(
        <Card className={classes.introOverviewCard}>
            {/* <div className={classes.tripCardContent}> */}
            <Grid>
                <Grid.Col span={{base: 12, md: 4}}>
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
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 4}}>
                    <div className={classes.feature}>
                        <Clock className={classes.featureIcon}/>
                        <div>
                            <Text className={classes.featureTitle}>Trip Duration</Text>
                            <div className={classes.textGroup}>
                                <Text fw={700}>{`${tripDuration} days`}</Text>
                            </div>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 4}}>
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
                </Grid.Col>
            </Grid>
            {/* </div> */}
        </Card>
    )
}