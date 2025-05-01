import { Badge, Card, Text } from "@mantine/core"
import { Trip } from "@corporate-travel-frontend/types"
import { airlineMapping } from '@/lib/utils/AirlinesMapping'
import { FlightBooking } from "@corporate-travel-frontend/types"
import classes from './FlightTotal.module.scss'

type AirlineCode = keyof typeof airlineMapping;

interface FlightTotalProps {
    flightData: FlightBooking
    tripsData: Trip[] | undefined
}

const isoToDateFormat = (isoString: string | undefined) =>{
    if(isoString){
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }else{
        return "ERROR: date not defined"
    }
}
const isoToTimeFormat = (isoString: string | undefined) =>{
    if(isoString){
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }else{
        return "ERROR: date not defined"
    }
}

const stopsFormat = (stops: number | undefined) => {
    if (stops){
        const numberOfStops = stops === 1 ? 'Nonstop' : stops === 2 ? '1 Stop': stops === 3 ? '2 Stops' : `${stops}`
        return numberOfStops
    }else{
        return "ERROR: stops not defined"
    }
}

export const FlightTotal: React.FC<FlightTotalProps> = ({flightData, tripsData}) => {
    
    const tripType = flightData.outBound.oneWay ? "One Way" : "Round Trip"
    const outBoundOriginAirport = flightData.outBound.originAirportIata
    const outBoundDestinationAirport = flightData.outBound.destinationAirportIata
    const outBoundSameDayCheck = (new Date(flightData.outBound.arrivalTime).getDate() - new Date(flightData.outBound.departureTime).getDate()) === 0;
    const outBoundAirline = airlineMapping[flightData.outBound.airline as AirlineCode];

    const originCity = tripsData?.[0].itinerary.origin.city.name
    const destinationCity = tripsData?.[0].itinerary.destination.city.name

    const inBoundOriginAirport = flightData?.inBound?.originAirportIata
    const inBoundDestinationAirport = flightData?.inBound?.destinationAirportIata
    const inBoundSameDayCheck = flightData?.inBound?.arrivalTime && flightData?.inBound?.departureTime
        ? (new Date(flightData.inBound.arrivalTime).getDate() - new Date(flightData.inBound.departureTime).getDate()) === 0
        : false;
    const inBoundAirline = airlineMapping[flightData?.inBound?.airline as AirlineCode];

    return(
        <Card withBorder className={classes.card}>
            <Text className={classes.title}>{tripType}</Text>
            <Card withBorder className={classes.flightCard}>
                <Badge className={classes.badge}>{outBoundAirline.label}</Badge>
                <Text className={classes.titleText}>
                    {`${originCity} ${outBoundOriginAirport} to ${destinationCity} ${outBoundDestinationAirport}`}
                </Text>
                <Text className={classes.smallFont}>
                    {outBoundSameDayCheck ? 
                    `${isoToDateFormat(flightData.outBound.departureTime)} to ${isoToTimeFormat(flightData.outBound.arrivalTime)} - ${stopsFormat(flightData.outBound.stops)}` 
                    : `${isoToDateFormat(flightData.outBound.departureTime)} to ${isoToDateFormat(flightData.outBound.arrivalTime)} - ${stopsFormat(flightData.outBound.stops)}`}
                </Text>  
            </Card>
            <Card withBorder className={classes.flightCard}>
                <Badge className={classes.badge}>{inBoundAirline.label}</Badge>
                <Text className={classes.titleText}>
                    {`${destinationCity} ${inBoundOriginAirport} to ${originCity} ${inBoundDestinationAirport}`}
                </Text>
                <Text className={classes.smallFont}>
                    {inBoundSameDayCheck ? 
                    `${isoToDateFormat(flightData.inBound?.departureTime)} to ${isoToTimeFormat(flightData.inBound?.arrivalTime)} - ${stopsFormat(flightData.inBound?.stops)}` 
                    : `${isoToDateFormat(flightData.inBound?.departureTime)} to ${isoToDateFormat(flightData.inBound?.arrivalTime)} - ${stopsFormat(flightData.inBound?.stops)}`}
                </Text>  
            </Card>
            <div className={classes.fareCard}>
                <div className={classes.farePrice}>
                    <Text className={classes.smallFont}>Fare:</Text>
                    <Text className={classes.smallFont}>{flightData.price.base}</Text>
                </div>
                <div className={classes.farePrice}>
                    <Text className={classes.titleText}>Total:</Text>
                    <Text className={classes.titleText}>{flightData.price.total}</Text>
                </div>
            </div>

        </Card>
    )
}