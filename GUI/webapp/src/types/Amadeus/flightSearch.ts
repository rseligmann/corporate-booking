interface Link {
    self: string;
}
  
interface Meta {
    count: number;
    links: Link;
}

interface Fee {
    amount: string;
    type: string;
}

interface Price {
    currency: string;
    total: string;
    base: string;
    fees?: Fee[];
    grandTotal?: string;
}

interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
}

interface Aircraft {
    code: string;
}

interface Operating {
    carrierCode: string;
}

interface Location {
    iataCode: string;
    terminal?: string;
    at: Date;
}

interface Segment {
    departure: Location;
    arrival: Location;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating?: Operating;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}

interface Itinerary {
    duration: string;
    segments: Segment[];
}

interface IncludedCheckedBags {
    quantity?: number;
    weight?: number;
    weightUnit?: string;
}

interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    class: string; // In TypeScript, 'class' is not a reserved keyword in interfaces
    includedCheckedBags?: IncludedCheckedBags;
}

interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: Price;
    fareDetailsBySegment: FareDetailsBySegment[];
}

interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}

interface LocationInfo {
    cityCode: string;
    countryCode: string;
}

interface Dictionaries {
    locations: Record<string, LocationInfo>;
    aircraft?: Record<string, string>;
    currencies?: Record<string, string>;
    carriers?: Record<string, string>;
}

export interface FlightOffersResponse {
    meta: Meta;
    data?: FlightOffer[];
    dictionaries?: Dictionaries;
}

export interface FlightAggregationRequest {
    originLocationCodes: string[]; // List of city/airport IATA code from which the traveler will depart, e.g. BOS for Boston
    destinationLocationCodes: string[]; // City/airport IATA code to which the traveler is going, e.g. PAR for Paris
    departureDate: string; // The date on which the traveler will depart from the origin in ISO 8601 YYYY-MM-DD format
    returnDate?: string; // The date on which the traveler will depart from the destination to return to the origin in ISO 8601 format
    adults: number; // The number of adult travelers (age 12 or older on date of departure)
    children?: number; // The number of child travelers (older than age 2 and younger than age 12 on date of departure)
    infants?: number; // The number of infant travelers (whose age is less or equal to 2 on date of departure)
    travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST"; // The minimum travel class quality for the flight
    includedAirlineCodes?: string; // Airlines to include, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X
    excludedAirlineCodes?: string; // Airlines to exclude, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X
    nonStop?: boolean; // If true, search only for non-stop flights from origin to destination
    currencyCode?: string; // The preferred currency for the flight offers, specified in ISO 4217 format, e.g. EUR
    maxPrice?: number; // Maximum price per traveler, should be a positive number with no decimals
    max?: number; // Maximum number of flight offers to return
    
    // custom fields to filter Amadeus response
    arrival_time_window_start?: string; // Earliest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00
    arrival_time_window_end?: string; // Latest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00
    return_departure_time_window_start?: string; // Earliest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00
    return_departure_time_window_end?: string; // Latest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00
    max_stops?: "ANY" | "DIRECT" | "ONE_STOP" | "TWO_STOPS"; // Maximum number of stops allowed
}
  
interface AirportPairStatistics {
    origin: string; // Departure airport/city IATA code
    destination: string; // Arrival airport/city IATA code
    flight_count: number; // Number of flights found for this pair
    average_price: number; // Average price of flights for this pair
    min_price: number; // Minimum price of flights for this pair
    max_price: number; // Maximum price of flights for this pair
    currency: string; // Currency of the prices
}
  
export interface FlightAggregationResponse {
    pair_statistics: AirportPairStatistics[]; // Statistics for each origin-destination pair
    total_flights: number; // Total number of flights across all pairs
    overall_average_price: number; // Overall average price across all flights
    currency: string; // Currency of the prices
}