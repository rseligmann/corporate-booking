import { useState } from 'react'
import { ActionIcon, Avatar, Badge, Collapse, Text, UnstyledButton } from '@mantine/core'
import { airlineMapping } from '@/lib/utils/AirlinesMapping'
import { FlightBooking, FlightPrice, FlightSegment } from '@corporate-travel-frontend/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDateToString } from './flightSelectionUtil';
import classes from './FlightOffer.module.scss'

type AirlineCode = keyof typeof airlineMapping;

interface FlightOfferProps{
    stops: number
    airlineCode: string
    originAirportCode: string
    destinationAirportCode: string
    departureTime: string;
    arrivalTime: string;
    tripDuration: string
    price: FlightPrice
    oneWay: boolean
    segments: FlightSegment[]
    updateFlightData: ((update: Partial<FlightBooking['outBound']>) => void) | ((update: Partial<FlightBooking['inBound']>) => void);
}

export const FlightOffer: React.FC<FlightOfferProps> = ({
    stops, 
    airlineCode,
    originAirportCode,
    destinationAirportCode,
    departureTime,
    arrivalTime,
    tripDuration,
    price,
    oneWay,
    segments,
    updateFlightData
}) => {

    const airlineInfo = airlineMapping[airlineCode as AirlineCode];

    const sameDayCheck = (new Date(arrivalTime).getDate() - new Date(departureTime).getDate());
    const numberOfStops = stops === 1 ? 'Nonstop' : stops === 2 ? '1 Stop': stops === 3 ? '2 Stops' : `${stops}`

    const [detailsOpen, setDetailsOpen] = useState(false);

    const isoTo12HourTime = (isoString: string) =>{
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const handleFlightSelect = () => {
        const flightDetails = {
            airline: airlineCode,
            oneWay: oneWay,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            duration: tripDuration,
            stops: stops,
            price:{
                currency: price.currency,
                total: price.total,
                base: price.base,
                grandTotal: price.grandTotal ?? undefined,
                fees: price.fees?? undefined,
            },
            originAirportIata: originAirportCode,
            destinationAirportIata: destinationAirportCode,
            segments: segments?.map(segment => ({
                id: segment.id,
                departureAirportIata: segment.departureAirportIata,
                departureTime: segment.departureTime,
                arrivalAirportIata: segment.arrivalAirportIata,
                arrivalTime: segment.arrivalTime,
                carrierCode: segment.carrierCode,
                aircraftCode: segment.aircraftCode,
                duration: segment.duration,
                cabin: segment.cabin,
                fareBasis: segment.fareBasis,
                brandedFare: segment.brandedFare,
                class: segment.class,
                amenities: segment.amenities
            })) ?? []
        }
        updateFlightData(flightDetails);
    }

    return(
        <UnstyledButton 
            variant='outline' 
            className={classes.button}
            onClick={handleFlightSelect}
        >
            <div className={classes.buttonContent}>
                <div className={classes.topGroup}>
                    <div className={classes.airlineInfo}>
                        <Avatar radius='sm' size='md' src={airlineInfo.logo} alt={airlineCode} />
                        <Text fw={500} className={classes.airlineLabel}>{airlineInfo.label}</Text>
                    </div>
                    <div className={classes.timelineContainer}>
                        <div className={classes.textBox}>
                            <Text fw={500} size='lg'>{isoTo12HourTime(departureTime)}</Text>
                            <Text c='dimmed' size='sm'>{originAirportCode}</Text>
                        </div>
                        <div className={classes.line} />
                        <div className={classes.textBox}>
                            <Text fw={500}>{tripDuration}</Text>
                            <Badge variant="light">{numberOfStops}</Badge>
                        </div>
                        <div className={classes.line} />
                        <div className={classes.textBox}>
                            <Text fw={500} size='lg'>
                                {isoTo12HourTime(arrivalTime)}
                                {sameDayCheck !== 0 && (
                                    <span style={{ fontSize: 'smaller', verticalAlign: 'super' }}>
                                        +{sameDayCheck}
                                    </span>
                                )}
                            </Text>
                            <Text c='dimmed' size='sm'>{destinationAirportCode}</Text>
                        </div>
                    </div>
                    <div className={classes.duration}>
                        <Text className={classes.price}>{`$${price.total}`}</Text>
                        <Text c='dimmed' size='sm'>{!oneWay ? 'roundtrip' : 'oneway'}</Text>
                    </div>
                    <ActionIcon 
                        variant="transparent" 
                        size="xl" radius="xl" 
                        className={classes.detailToggle}
                        onClick={()=>setDetailsOpen(!detailsOpen)}
                    >
                        {detailsOpen ? 
                            <ChevronUp  size={35} strokeWidth={2} /> : 
                            <ChevronDown  size={35} strokeWidth={2} />}
                    </ActionIcon>
                </div>
                <Collapse in={detailsOpen}>
                    <div className={classes.details}>
                        {/* Your expanded details content */}
                        <Text>Additional flight details go here</Text>
                    </div>
                </Collapse>
            </div>
        </UnstyledButton>
    )
}