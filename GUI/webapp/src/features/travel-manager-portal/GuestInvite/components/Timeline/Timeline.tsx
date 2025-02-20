import classes from './Timeline.module.scss'
import { Card, Text } from '@mantine/core'
import { Trip } from '@/types'

interface TimelineProps{
    itineraryData: Trip['itinerary']
}
export const Timeline: React.FC<TimelineProps> = ({itineraryData}) => {
    
    if (!itineraryData.startDate || !itineraryData.endDate) {
        return
    }

    const firstMeeting = new Date(itineraryData.startDate);
    const lastMeeting = new Date(itineraryData.endDate);

    // Set arrival window start to 8 AM on the day of first meeting
    const arrivalWindowStart = new Date(firstMeeting);
    arrivalWindowStart.setHours(8, 0, 0, 0);
  
    // Calculate transfer time arrival (buffer before meeting)
    const transferTimeArrivalEnd = new Date(firstMeeting);
    const transferTimeArrivalStart = new Date(firstMeeting);
    transferTimeArrivalStart.setHours(transferTimeArrivalStart.getHours() - 2); // Example: 2-hour buffer
    
    // Calculate departure window
    const transferTimeDepartureStart = new Date(lastMeeting);
    const transferTimeDepartureEnd = new Date(lastMeeting);
    transferTimeDepartureEnd.setHours(transferTimeDepartureEnd.getHours() + 2); // Example: 2-hour buffer
    
    const departureWindowStart = new Date(transferTimeDepartureEnd);
    const departureWindowEnd = new Date(lastMeeting);
    departureWindowEnd.setHours(23, 59, 59, 999); // End of the day
    
    // Calculate check-in time (1 PM on arrival day)
    const checkInTime = new Date(firstMeeting);
    checkInTime.setHours(13, 0, 0, 0);
    
    // Calculate check-out time (11 AM on departure day)
    const checkOutTime = new Date(lastMeeting);
    checkOutTime.setHours(11, 0, 0, 0);
    
    // Calculate max stay in days
    const maxStay = Math.ceil(
        (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60 * 24)
    );

    
    return (
        <Card padding="lg" radius="md" withBorder>
            <Text size='lg' fw={700}>Itinerary Timeline</Text>

        </Card>
    )
}