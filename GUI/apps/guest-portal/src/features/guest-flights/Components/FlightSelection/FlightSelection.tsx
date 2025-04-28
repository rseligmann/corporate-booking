import React, { useEffect, useState } from 'react';
import { Card, Loader, Select, Text } from '@mantine/core';
import { FlightOffer } from './Components/FlightOffer';
import { formatDateToString, formatDuration, getMinutes, getUniqueOutboundFlights, sortFlightOffers } from './Components/flightSelectionUtil';
import { FlightAggregationRequest, Trip } from '@corporate-travel-frontend/types';
import { useMultiAirportFlightOffers } from '@corporate-travel-frontend/api/hooks';
import { DropdownSlider } from './Components/DropDownSlider/DropDownSlider';
import { DropdownRangeSlider } from './Components/DropDownRangeSlider/DropDownRangeSlider';
import classes from './FlightSelection.module.scss';

interface FlightSelectionProps {
  type: 'outbound' | 'return';
  tripsData: [Trip] | undefined;
}

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
  // Get unique outbound flights so we don't display duplicate outbound flights
  const outboundFlights = getUniqueOutboundFlights(flightData)
  
  // Fliter state variables
  const [sortBy, setSortBy] = useState('value');
  const [stopsFilter, setStopsFilter] = useState<string>();
  const [originAirportFilter, setOriginAirportFilter] = useState<string>();
  const [destAirportFilter, setDestAirportFilter] = useState<string>();
  const [airlineFilter, setAirlineFilter] = useState<string>();

  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>(2000)
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>()

  const [departureTimeRange, setDepartureTimeRange] = useState<[number, number]>();
  const [minDepartureTime, setMinDepartureTime] = useState<number>(0);
  const [maxDepartureTime, setMaxDepartureTime] = useState<number>(24)

  const [arrivalTimeRange, setArrivalTimeRange] = useState<[number, number]>();
  const [minArrivalTime, setMinArrivalTime] = useState<number>(0);
  const [maxArrivalTime, setMaxArrivalTime] = useState<number>(24)

  const [maxDuration, setMaxDuration] = useState<number>(24 * 60); // 24 hours in minutes

  // Get unique options for select filters
  const uniqueOriginAirports = [...new Set(outboundFlights.map(flight => flight.departureAirport))];
  const uniqueDestAirports = [...new Set(outboundFlights.map(flight => flight.arrivalAirport))];
  const uniqueAirlines = [...new Set(outboundFlights.map(flight => flight.airline))];

  

  // Update price range when flights data changes
  useEffect(() => {
    if (outboundFlights.length > 0) {
      const minPrice = Math.min(...outboundFlights.map(flight => flight.price));
      const maxPrice = Math.max(...outboundFlights.map(flight => flight.price));
      
      const departureHours = outboundFlights.map(flight => 
        new Date(flight.departureTime).getHours()
      );
      const minDepartureTime = Math.min(...departureHours)
      const maxDepartureTime =Math.max(...departureHours)

      const arrivalHours = outboundFlights.map(flight => 
        new Date(flight.arrivalTime).getHours()
      );
      const minArrivalTime = Math.min(...arrivalHours);
      const maxArrivalTime = Math.max(...arrivalHours);

      setMinPrice(minPrice)
      setMaxPrice(maxPrice)
      setMinDepartureTime(minDepartureTime);
      setMaxDepartureTime(maxDepartureTime);
      setMinArrivalTime(minArrivalTime);
      setMaxArrivalTime(maxArrivalTime)
    }
  }, [outboundFlights]);

  const applyFilters = () => {
    if (!outboundFlights.length) return [];

    return outboundFlights.filter(flight => {
      if (stopsFilter && stopsFilter !== '') {
        const numStops = parseInt(stopsFilter);
        if (flight.stops !== numStops + 1) return false; // +1 because stops is actually segments
      }

      if (originAirportFilter && flight.departureAirport !== originAirportFilter) return false;
      if (destAirportFilter && flight.arrivalAirport !== destAirportFilter) return false;
      if (airlineFilter && flight.airline !== airlineFilter) return false;
      if (maxPriceFilter && flight.price > maxPriceFilter) return false;

      const departureHour = new Date(flight.departureTime).getHours();
      if ((departureTimeRange && departureHour < departureTimeRange[0]) || (departureTimeRange && departureHour > departureTimeRange[1])) return false;

      const arrivalHour = new Date(flight.arrivalTime).getHours();
      if ((arrivalTimeRange && arrivalHour < arrivalTimeRange[0]) || (arrivalTimeRange && arrivalHour > arrivalTimeRange[1])) return false;

      const durationMinutes = getMinutes(flight.duration);
      if (durationMinutes > maxDuration) return false;

      return true;
    });
  };
  
  const renderAllFlightOffers = () => {

    const filteredFlights = applyFilters();
    const sortedFlights = sortFlightOffers(filteredFlights, sortBy as 'price' | 'duration' | 'departure' | 'arrival' | 'value')

    return sortedFlights.map((flight, index) => {
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
    <div>
      <Card padding="lg" withBorder className={classes.card}>
        <div className={classes.filterContainer}>  
          <Select 
            value={stopsFilter} 
            variant='filled'
            onChange={value =>setStopsFilter(value as string)}
            placeholder="Stops"
            data={[
              {value: '', label: 'Stops'},
              {value: '0', label: 'Nonstop'},
              {value:'1', label:'1 Stop'},
              {value:'2', label:'2 Stops'},
            ]}
            classNames={{root: classes.filter, input: classes.filter__stops}}
          />
          <Select 
            value={originAirportFilter} 
            variant='filled'
            onChange={value => setOriginAirportFilter(value as string)}
            placeholder="Origin airport"
            data={[
              {value: '', label: 'Any'},
              ...uniqueOriginAirports.map(airport => ({
                value: airport,
                label: airport
              }))
            ]}
            classNames={{root: classes.filter, input: classes.filter__origin}}
          />
          <Select 
            value={destAirportFilter} 
            variant='filled'
            onChange={value => setDestAirportFilter(value as string)}
            placeholder="Destination airport"
            data={[
              {value: '', label: 'Any'},
              ...uniqueDestAirports.map(airport => ({
                value: airport,
                label: airport
              }))
            ]}
            classNames={{root: classes.filter, input: classes.filter__destination}}
          />
          <Select 
            value={airlineFilter} 
            variant='filled'
            onChange={value => setAirlineFilter(value as string)}
            placeholder="Airlines"
            data={[
              {value: '', label: 'Any'},
              ...uniqueAirlines.map(airline => ({
                value: airline,
                label: airline
              }))
            ]}
            classNames={{root: classes.filter, input: classes.filter__airline}}
          />
          <DropdownSlider
            min={minPrice}
            max={maxPrice}
            step={50}
            value={maxPriceFilter}
            onChange={setMaxPriceFilter}
            placeholder='Price'
          />
          <DropdownRangeSlider
            min={minDepartureTime}
            max={maxDepartureTime}
            step={1}
            value={departureTimeRange}
            onChange={setDepartureTimeRange}
            minRange={1}
            placeholder='Departure Time'
          />
          <DropdownRangeSlider
            min={minArrivalTime}
            max={maxArrivalTime}
            step={1}
            value={arrivalTimeRange}
            onChange={setArrivalTimeRange}
            minRange={1}
            placeholder='Arrival Time'
          />
        </div>
      </Card>
      <Card shadow ="xs" padding="lg" radius="md" withBorder>
        <div className={classes.titleContainer}>
          <Text size='lg' fw={700}> Departing Flights</Text>
          <Select 
          leftSection={<Text className={classes.sortText}>Sort by </Text>}
          leftSectionWidth={55}
          classNames={{input: classes.input}}
          value={sortBy} 
          onChange={value =>setSortBy(value as string)}
          placeholder="Sort by..."
          data={[
            {value: 'value', label: 'top flights'},
            {value:'price', label:'price'},
            {value:'arrival', label:'arrival time'},
            {value:'departure', label:'departure time'},
            {value:'duration', label:'duration'}
          ]}
        />
        </div>
        <div className={classes.flightsList}>
          {flightIsPending ? (
            <Loader/>
          ) : flightError ? (
            <div>Error loading flights: {flightError.message}</div>
          ) : flightIsSuccess ? (
            renderAllFlightOffers()
          ) : <></>
          }
        </div>
      </Card>
    </div>
  );
};