export interface Flight {
    id: string
    bookingReference: string
    flightNumber: string //'UA 123'
    airline: string //'United Airlines'
    origin: {
        airport: string //'SFO'
        terminal?: string
        gate?: string
    } 
    destination: {
        airport: string //'JFK'
        terminal?: string
        gate?: string
    } 
    departureTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    arrivalTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    price: number // 500
    bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}

export interface FlightBooking {
    id?: string;
    outBound: Flights;
    inBound?: Flights;
    price: FlightPrice;
    bookingReference?: string;
    bookingStatus?: string;
}

export interface Flights {
    id?: string;
    airline: string;
    oneWay: boolean;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    price: FlightPrice;
    originAirportIata: string;
    destinationAirportIata: string;
    segments: FlightSegment[];
}

export interface FlightSegment {
    id: string;
    departureAirportIata: string;
    departureTime: string;
    arrivalAirportIata: string;
    arrivalTime: string;
    carrierCode: string;
    aircraftCode: string;
    duration: string;
    cabin: string;
    fareBasis?: string;
    brandedFare?: string;
    class?: string;
    amenities?: Amenity
}

export interface FlightPrice {
    currency: string;
    total: number;
    base: number;
    fees?: Fee[];
    grandTotal?: number
}

interface Fee {
    amount: number;
    type: string
}

interface Amenity {
    description: string;
    isChargeable: boolean;
    amenityType: string;
}