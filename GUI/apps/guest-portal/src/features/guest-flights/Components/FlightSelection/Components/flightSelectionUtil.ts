import { FlightOffersResponse, FlightOffer } from "@corporate-travel-frontend/types"

export interface DisplayReadyFlights { 
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: string;
  stops: number;
  price: number;
  aircraft: string;
  departureAirport: string;
  arrivalAirport: string;
  roundTrip: boolean
}

const mapFlightDataToFlight = (flightOffer: FlightOffer) => {

  const itinerary = flightOffer.itineraries[0]; // outbound flight
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];
  const airlineCode = flightOffer.validatingAirlineCodes[0];
  const totalStops = itinerary.segments.length
  
  const flight: DisplayReadyFlights = {
    id: flightOffer.id,
    airline: airlineCode,
    flightNumber: firstSegment.number,
    departureTime: firstSegment.departure.at,
    arrivalTime: lastSegment.arrival.at,
    duration: itinerary.duration,
    stops: totalStops,
    price: parseFloat(flightOffer.price.total),
    aircraft: firstSegment.aircraft.code,
    departureAirport: firstSegment.departure.iataCode,
    arrivalAirport: lastSegment.arrival.iataCode,
    roundTrip: !flightOffer.oneWay
  };
  
  return flight;
};

export const getUniqueOutboundFlights = (flightData : FlightOffersResponse[] | undefined) =>{
    if (!flightData || flightData.length === 0 || !flightData[0].data) {
        return [];
    }
    const uniqueFlightSignatures = new Set();
    const uniqueFlights: DisplayReadyFlights[] = [];
  
    flightData.forEach((response) => {
      if (response.data) {
        response.data.forEach((offer) => {
          const flight = mapFlightDataToFlight(offer);
          if (flight) {
            // Create a unique signature based on departure time, arrival time, and duration
            const flightSignature = `${flight.departureTime}-${flight.arrivalTime}-${flight.duration}`;
            
            // Only add if this signature hasn't been seen before
            if (!uniqueFlightSignatures.has(flightSignature)) {
              uniqueFlightSignatures.add(flightSignature);
              uniqueFlights.push(flight);
            }
          }
        });
      }
    });
  
    return uniqueFlights;
}

// Format duration string from API format (PT2H30M) to human readable (2h 30m)
export const formatDuration = (durationStr: string) => {
  const hours = durationStr.match(/(\d+)H/);
  const minutes = durationStr.match(/(\d+)M/);
  return `${hours ? hours[1] + 'h ' : ''}${minutes ? minutes[1] + 'm' : ''}`;
};

// Format date to YYYY-MM-DD string
export const formatDateToString = (date: string | null): string => {
  if (!date) return '';
  return date.split('T')[0];
};

export const getMinutes = (durationStr: string) => {
  const hours = durationStr.match(/(\d+)H/);
  const minutes = durationStr.match(/(\d+)M/);
  return (hours ? parseInt(hours[1]) * 60 : 0) + (minutes ? parseInt(minutes[1]) : 0);
};

export const sortFlightOffers = (
  flights: DisplayReadyFlights[], 
  sortBy: 'price' | 'duration' | 'departure' | 'arrival' | 'value'
) => {

  const sortedFlights = [...flights];

  switch (sortBy) {
    case 'price':
      return sortedFlights.sort((a, b) => a.price - b.price);
      
    case 'duration':
      return sortedFlights.sort((a, b) => getMinutes(a.duration) - getMinutes(b.duration));
      
    case 'departure':
      return sortedFlights.sort((a, b) => {
        const dateA = new Date(a.departureTime).getTime();
        const dateB = new Date(b.departureTime).getTime();
        return dateA - dateB;
      });

    case 'arrival':
      return sortedFlights.sort((a, b) => {
        const dateA = new Date(a.arrivalTime).getTime();
        const dateB = new Date(b.arrivalTime).getTime();
        return dateA - dateB;
    });
      
    case 'value':
      // Sort by both price and duration (best value first)
      return sortedFlights.sort((a, b) => {

        const durationA = getMinutes(a.duration);
        const durationB = getMinutes(b.duration);
        
        // Calculate a "value score" - lower is better
        // You can adjust the weight factors to prioritize price or duration
        const priceWeight = 0.4;
        const durationWeight = 0.4;
        const stopsWeight = .3
        
        // Normalize values using the maximum in the dataset
        const maxPrice = Math.max(...sortedFlights.map(f => f.price));
        const maxDuration = Math.max(...sortedFlights.map(f => getMinutes(f.duration)));
        const maxStops = Math.max(...sortedFlights.map(f => f.stops))
        
        const valueScoreA = (a.price / maxPrice) * priceWeight + (durationA / maxDuration) * durationWeight + (a.stops/maxStops) * stopsWeight;
        const valueScoreB = (b.price / maxPrice) * priceWeight + (durationB / maxDuration) * durationWeight+ (b.stops/maxStops) * stopsWeight;
        
        return valueScoreA - valueScoreB;
      });
      
    default:
      // Default to price sorting
      return sortedFlights.sort((a, b) => a.price - b.price);
  }
};