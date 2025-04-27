import { FlightOffersResponse, FlightOffer } from "@corporate-travel-frontend/types"

interface DisplayReadyFlights { 
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