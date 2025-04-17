import {useState, useEffect} from 'react';
import { Grid, Group, Select } from '@mantine/core'
import { AirportPill } from './AirportPill';
import { SearchServiceableAirportsResponse, Trip } from "@/types";

interface AirportSelectProps{
    airportData: SearchServiceableAirportsResponse[];
    distance: string;
    itineraryField: string;
    setDistance: (update: string)=> void;
    isPending: boolean;
    hub: string[];
    setHub: (update: string[]) => void;
    itineraryData: Trip['itinerary'];
    updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
}


export const AirportSelect: React.FC<AirportSelectProps> = ({
    airportData, 
    distance, 
    itineraryField, 
    setDistance, 
    isPending, 
    hub, 
    setHub,
    itineraryData,
    updateItineraryDetails}) => {
    
    const[serviceableAirportsResponse, setServiceableAirportsResponse] = useState<SearchServiceableAirportsResponse[]>([])
    const field = itineraryField as 'origin' | 'destination';
    
    useEffect (() =>{
        if (airportData&& !isPending) {
            setServiceableAirportsResponse(airportData);
            const updatedItinerary = { ...itineraryData };
            updatedItinerary[field] = {
                ...updatedItinerary[field],
                searchedAirports: airportData.map((airport) => airport.iata)
            }
            updateItineraryDetails(updatedItinerary)
        }
      }, [airportData, isPending])

    const handleHubChange = (value: string) => {
        if(value === 'Hubs Only'){
            setHub(["L","M"])
        }else{
            setHub([])
        }
    }

    const handleRemove = (airportId: string) => {
        setServiceableAirportsResponse((current) => {
            const updatedAirports = current.filter((airport) => airport.airport_id !== airportId)
            const updatedItinerary = { ...itineraryData};
            updatedItinerary[field] = {
                ...updatedItinerary[field],
                searchedAirports: updatedAirports.map((airport) => airport.iata)
            };
            updateItineraryDetails(updatedItinerary)

            return updatedAirports
        })
    }

    return(
        <Grid>
            <Grid.Col span={{base: 12, sm:9, lg: 10}}>
                <Group>
                    {serviceableAirportsResponse.map((airport) => (
                        <AirportPill key={airport.airport_id} airportData={airport} onRemove={() => handleRemove(airport.airport_id)}/>
                    ))}
                </Group>
            </Grid.Col>
            <Grid.Col span={{base: 12, sm:3, lg: 2}}>
                <Select
                    size='xs'
                    data={[
                            {value: "50", label: 'Within 50 miles'},
                            {value: "100", label: 'Within 100 miles'},
                            {value: "150", label: 'Within 150 miles'},
                            {value: "200", label: 'Within 200 miles'}
                        ]}
                    value={distance}
                    onChange={(value) => setDistance(value || "50")}
                />
                <Select
                    size='xs'
                    data={[
                            'Hubs Only','All Airports'
                        ]}
                    value={hub.length > 1 ? 'Hubs Only' : 'All Airports'}
                    onChange={(value) => handleHubChange(value || 'Hubs Only')}
                />
            </Grid.Col>
        </Grid>
    )
}