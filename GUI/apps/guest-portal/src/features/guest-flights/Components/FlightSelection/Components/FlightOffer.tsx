import { useState } from 'react'
import { ActionIcon, Avatar, Badge, Collapse, Text, UnstyledButton } from '@mantine/core'
import { airlineMapping } from '@/lib/utils/AirlinesMapping'
import { ChevronDown, ChevronUp } from 'lucide-react';
import classes from './FlightOffer.module.scss'

type AirlineCode = keyof typeof airlineMapping;

interface FlightOfferProps{
    stops: number
    airlineCode: string
    originAirportCode: string
    destinationAirportCode: string
    departureTime: Date
    arrivalTime: Date
    tripDuration: string
    price: number
    roundtrip: boolean
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
    roundtrip
}) => {

    const airlineInfo = airlineMapping[airlineCode as AirlineCode];

    const sameDayCheck = (arrivalTime.getDate() - departureTime.getDate());
    const numberOfStops = stops === 1 ? 'Nonstop' : stops === 2 ? '1 Stop': stops === 3 ? '2 Stops' : `${stops}`

    const [detailsOpen, setDetailsOpen] = useState(false);

    return(
        <UnstyledButton variant='outline' className={classes.button}>
            <div className={classes.buttonContent}>
                <div className={classes.topGroup}>
                    <div className={classes.airlineInfo}>
                        <Avatar radius='sm' size='md' src={airlineInfo.logo} alt={airlineCode} />
                        <Text fw={500} className={classes.airlineLabel}>{airlineInfo.label}</Text>
                    </div>
                    <div className={classes.timelineContainer}>
                        <div className={classes.textBox}>
                            <Text fw={500} size='lg'>{departureTime.toLocaleTimeString(undefined, {timeStyle:'short'})}</Text>
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
                                {arrivalTime.toLocaleTimeString(undefined, {timeStyle:'short'})}
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
                        <Text className={classes.price}>{`$${price}`}</Text>
                        <Text c='dimmed' size='sm'>{roundtrip ? 'roundtrip' : 'oneway'}</Text>
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