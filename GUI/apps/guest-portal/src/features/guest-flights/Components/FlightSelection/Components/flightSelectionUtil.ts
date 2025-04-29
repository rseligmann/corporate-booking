import { FlightOffersResponse, FlightOffer, FlightBooking, Flights } from "@corporate-travel-frontend/types"

const mapFlightDataToFlight = (flightOffer: FlightOffer) => {

  const outBoundItinerary = flightOffer.itineraries[0]; // outbound flight
  const inBoundItinerary = flightOffer.itineraries[1];
  const travelerPricing = flightOffer.travelerPricings[0];
  const fareDetails = travelerPricing.fareDetailsBySegment;
  
  const flight: FlightBooking = {
    id: flightOffer.id,
    outBound: {
      airline: flightOffer.validatingAirlineCodes[0],
      oneWay: flightOffer.oneWay,
      departureTime: outBoundItinerary.segments[0].departure.at,
      arrivalTime: outBoundItinerary.segments[outBoundItinerary.segments.length-1].arrival.at,
      duration: outBoundItinerary.duration,
      stops: outBoundItinerary.segments.length,
      price: {
        currency: flightOffer.price.currency,
        base: parseFloat(flightOffer.price.base),
        total: parseFloat(flightOffer.price.total),
        fees: flightOffer.price.fees ? flightOffer.price.fees.map(fee => ({
          amount: parseFloat(fee.amount),
          type: fee.type
        })) : undefined,
        grandTotal: flightOffer.price.grandTotal ? parseFloat(flightOffer.price.grandTotal) : undefined,
      },
      originAirportIata: outBoundItinerary.segments[0].departure.iataCode,
      destinationAirportIata: outBoundItinerary.segments[outBoundItinerary.segments.length-1].arrival.iataCode,
      segments: outBoundItinerary.segments ?  outBoundItinerary.segments.map(segment => {
        
        const fareDetail = fareDetails.find(fd => fd.segmentId === segment.id)
        return{
          id: segment.id,
          departureAirportIata: segment.departure.iataCode,
          departureTime:segment.departure.at,
          arrivalAirportIata: segment.arrival.iataCode,
          arrivalTime: segment.arrival.at,
          carrierCode: segment.carrierCode,
          aircraftCode: segment.aircraft.code,
          duration: segment.duration,
          cabin: fareDetail?.cabin || "",
          fareBasis: fareDetail?.fareBasis || "",
          brandedFare: fareDetail?.brandedFare,
          class: fareDetail?.class,
          amenities: fareDetail?.amenities && fareDetail.amenities.length > 0 ? {
            description: fareDetail.amenities[0].description,
            isChargeable: fareDetail.amenities[0].isChargeable,
            amenityType: fareDetail.amenities[0].amenityType
          } : undefined
        };
      }): []
    }, 
    inBound: {
      airline: flightOffer.validatingAirlineCodes[1] ?? flightOffer.validatingAirlineCodes[0],
      oneWay: flightOffer.oneWay,
      departureTime: inBoundItinerary.segments[0].departure.at,
      arrivalTime: inBoundItinerary.segments[inBoundItinerary.segments.length-1].arrival.at,
      duration: inBoundItinerary.duration,
      stops: inBoundItinerary.segments.length,
      price: {
        currency: flightOffer.price.currency,
        base: parseFloat(flightOffer.price.base),
        total: parseFloat(flightOffer.price.total),
        fees: flightOffer.price.fees ? flightOffer.price.fees.map(fee => ({
          amount: parseFloat(fee.amount),
          type: fee.type
        })) : undefined,
        grandTotal: flightOffer.price.grandTotal ? parseFloat(flightOffer.price.grandTotal) : undefined,
      },
      originAirportIata: inBoundItinerary.segments[0].departure.iataCode,
      destinationAirportIata: inBoundItinerary.segments[inBoundItinerary.segments.length-1].arrival.iataCode,
      segments: inBoundItinerary.segments ?  inBoundItinerary.segments.map(segment => {
        
        const fareDetail = fareDetails.find(fd => fd.segmentId === segment.id)
        return{
          id: segment.id,
          departureAirportIata: segment.departure.iataCode,
          departureTime:segment.departure.at,
          arrivalAirportIata: segment.arrival.iataCode,
          arrivalTime: segment.arrival.at,
          carrierCode: segment.carrierCode,
          aircraftCode: segment.aircraft.code,
          duration: segment.duration,
          cabin: fareDetail?.cabin || "",
          fareBasis: fareDetail?.fareBasis || "",
          brandedFare: fareDetail?.brandedFare,
          class: fareDetail?.class,
          amenities: fareDetail?.amenities && fareDetail.amenities.length > 0 ? {
            description: fareDetail.amenities[0].description,
            isChargeable: fareDetail.amenities[0].isChargeable,
            amenityType: fareDetail.amenities[0].amenityType
          } : undefined
        };
      }): []
    },
    price:{
      currency: flightOffer.price.currency,
      base: parseFloat(flightOffer.price.base),
      total: parseFloat(flightOffer.price.total),
      fees: flightOffer.price.fees ? flightOffer.price.fees.map(fee => ({
        amount: parseFloat(fee.amount),
        type: fee.type
      })) : undefined,
      grandTotal: flightOffer.price.grandTotal ? parseFloat(flightOffer.price.grandTotal) : undefined,
    },
  }
  
  return flight;
};

export const getUniqueOutboundFlights = (flightData : FlightOffersResponse[] | undefined) =>{
    if (!flightData || flightData.length === 0 || !flightData[0].data) {
        return [];
    }
    const uniqueFlightSignatures = new Set();
    const uniqueFlights: Flights[] = []
  
    flightData.forEach((response) => {
      if (response.data) {
        response.data.forEach((offer) => {
          const flight = mapFlightDataToFlight(offer);
          if (flight) {
            // Create a unique signature based on departure time, arrival time, and duration
            const flightSignature = `${flight.outBound.departureTime}-${flight.outBound.arrivalTime}-${flight.outBound.duration}`;
            
            // Only add if this signature hasn't been seen before
            if (!uniqueFlightSignatures.has(flightSignature)) {
              uniqueFlightSignatures.add(flightSignature);
              uniqueFlights.push(flight.outBound);
            }
          }
        });
      }
    })
    return uniqueFlights;
}

export const getMatchingInboundFlightsBySignature = (flightData: FlightOffersResponse[] | undefined, selectedOutbound: Flights) => {
  if (!flightData || flightData.length === 0 || !flightData[0].data) {
    return [];
  }
  const departTime = selectedOutbound.departureTime
  const arriveTime = selectedOutbound.arrivalTime
  const outboundSignature = `${departTime}-${arriveTime}-${selectedOutbound.duration}`
  console.log(outboundSignature)
  
  const uniqueFlightSignatures = new Set()
  const matchingInboundFlights: Flights[] = []
  flightData.forEach((response) => {
    if(response.data) {
      response.data.forEach((offer) =>{
        const flight = mapFlightDataToFlight(offer)
        const flightSignature = `${flight.outBound.departureTime}-${flight.outBound.arrivalTime}-${formatDuration(flight.outBound.duration)}`;
        const inBoundflightSignature= `${flight.inBound?.departureTime}-${flight.inBound?.arrivalTime}-${flight.inBound?.duration}`
        //console.log(`raw data: ${flightSignature}`)
        if (flightSignature === outboundSignature && flight.inBound && !uniqueFlightSignatures.has(inBoundflightSignature)) {
          uniqueFlightSignatures.add(inBoundflightSignature)
          matchingInboundFlights.push(flight.inBound)
        }
      })
    }
  })
  console.log(JSON.stringify(mapFlightDataToFlight))
  return matchingInboundFlights;
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
  // flights: DisplayReadyFlights[],
  flights: Flights[], 
  sortBy: 'price' | 'duration' | 'departure' | 'arrival' | 'value'
) => {

  const sortedFlights = [...flights];

  switch (sortBy) {
    case 'price':
      return sortedFlights.sort((a, b) => a.price.total - b.price.total);
      
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
        const maxPrice = Math.max(...sortedFlights.map(f => f.price.total));
        const maxDuration = Math.max(...sortedFlights.map(f => getMinutes(f.duration)));
        const maxStops = Math.max(...sortedFlights.map(f => f.stops))
        
        const valueScoreA = (a.price.total / maxPrice) * priceWeight + (durationA / maxDuration) * durationWeight + (a.stops/maxStops) * stopsWeight;
        const valueScoreB = (b.price.total / maxPrice) * priceWeight + (durationB / maxDuration) * durationWeight+ (b.stops/maxStops) * stopsWeight;
        
        return valueScoreA - valueScoreB;
      });
      
    default:
      // Default to price sorting
      return sortedFlights.sort((a, b) => a.price.total - b.price.total);
  }
};