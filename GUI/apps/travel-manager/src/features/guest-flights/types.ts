export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    price: number;
    aircraft: string;
    departureAirport: string;
    arrivalAirport: string;
  }
  
  export interface PassengerInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    documentType?: string;
    documentNumber?: string;
  }
  
  export interface SeatSelection {
    outbound: string | null;
    return: string | null;
  }
  
  export interface FlightBookingData {
    outbound: Flight | null;
    return: Flight | null;
    passenger: PassengerInfo | null;
    seats: SeatSelection;
  }