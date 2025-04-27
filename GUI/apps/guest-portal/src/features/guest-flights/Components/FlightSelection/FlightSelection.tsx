import React, { useEffect, useState } from 'react';
import { Button, Input, Loader, Select, Text } from '@mantine/core';
import { FlightOffer } from './Components/FlightOffer';
import { getUniqueOutboundFlights } from './Components/flightOfferUtil';
import { FlightAggregationRequest, Trip } from '@corporate-travel-frontend/types';
import { useMultiAirportFlightOffers } from '@corporate-travel-frontend/api/hooks';
import { Filter, Search, ArrowRight } from 'lucide-react';
import './FlightSelection.scss';

interface FlightSelectionProps {
  type: 'outbound' | 'return';
  tripsData: [Trip] | undefined;
}

// Format date to YYYY-MM-DD string
const formatDateToString = (date: string | null): string => {
  if (!date) return '';
  return date.split('T')[0];
};

// Format duration string from API format (PT2H30M) to human readable (2h 30m)
const formatDuration = (durationStr: string) => {
  const hours = durationStr.match(/(\d+)H/);
  const minutes = durationStr.match(/(\d+)M/);
  return `${hours ? hours[1] + 'h ' : ''}${minutes ? minutes[1] + 'm' : ''}`;
};

export const FlightSelection: React.FC<FlightSelectionProps> = ({type,tripsData}) => {
  
  const [ flightSearch, setFlightSearch ] = useState<FlightAggregationRequest>()

  useEffect(() => {
    if(
      tripsData &&
      tripsData[0].itinerary.origin.searchedAirports && 
      tripsData[0].itinerary.destination.searchedAirports &&
      tripsData[0].itinerary.startDate &&
      tripsData[0].itinerary.endDate &&
      tripsData[0].itinerary.origin.searchedAirports?.length > 0 &&
      tripsData[0].itinerary.destination.searchedAirports?.length > 0 
    ){
      const newFlightSearch: FlightAggregationRequest = {
        originLocationCodes:  tripsData[0].itinerary.origin.searchedAirports,
        destinationLocationCodes:  tripsData[0].itinerary.destination.searchedAirports,
        departureDate: formatDateToString(String(tripsData[0].itinerary.startDate)),
        returnDate: formatDateToString(String(tripsData[0].itinerary.endDate)),
        adults: 1,
        travelClass: tripsData[0].travelPreferences.flight.cabinClass,
        currencyCode: 'USD',
        //arrival_time_window_end: formData.itinerary.startDate.toISOString().slice(0,-5),
        //return_departure_time_window_start: formData.itinerary.endDate.toISOString().slice(0,-5),
        max_stops: tripsData[0].travelPreferences.flight.maxStops
      }
      setFlightSearch(newFlightSearch)
    }
  }, [tripsData])

  const { data: flightData, isPending: flightIsPending, isSuccess: flightIsSuccess, error: flightError } = useMultiAirportFlightOffers(flightSearch)
  // get unique outbound flights so we don't display duplicate outbound flights
  const outboundFlights = getUniqueOutboundFlights(flightData)
  
  const renderAllFlightOffers = () => {
    return outboundFlights.map((flight, index) => {
      return (
            <FlightOffer
              key={`${index}-${flight.id}`} 
              stops={flight.stops}
              airlineCode={flight.airline}
              originAirportCode={flight.departureAirport}
              destinationAirportCode={flight.arrivalAirport}
              departureTime={new Date(flight.departureTime)}
              arrivalTime={new Date(flight.arrivalTime)}
              tripDuration={formatDuration(flight.duration)}
              price={flight?.price}
              roundtrip={flight?.roundTrip}
            />
        );
    })
  }

  const [sortBy, setSortBy] = useState('price');
  // const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // const handleFlightSelect = (flight: Flight) => {
  //   setSelectedFlight(flight);
  // };

  // const handleContinue = () => {
  //   if (selectedFlight) {
  //     onSelect(selectedFlight);
  //   }
  // };

  return (
    <div className="flight-selection">
      <div className="search-filters">
        <div className="search-box">
          <Search className="search-icon" />
          <Input
            type="text"
            placeholder="Search flights..."
            className="search-input"
          />
        </div>

        <div className="filters">
          <Select 
            value={sortBy} 
            onChange={value =>setSortBy(value as string)}
            placeholder="Sort by..."
            data={[
              {value:'price', label:'Price'},
              {value:'duration', label:'Duration'},
              {value:'departure', label:'Departure'}
            ]}
            />

          <Button variant="outline" className="filter-button">
            <Filter className="icon" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <div className="flights-list">
        {flightIsPending ? (
          <Loader/>
        ) : flightError ? (
          <div>Error loading flights: {flightError.message}</div>
        ) : flightIsSuccess ? (
          renderAllFlightOffers()
        ) : <></>
        }
      </div>

      <div className="selection-actions">
        <Button

          // disabled={!selectedFlight}
          className="continue-button"
        >
          Continue with Selected Flight
          <ArrowRight className="icon" />
        </Button>
      </div>
    </div>
  );
};