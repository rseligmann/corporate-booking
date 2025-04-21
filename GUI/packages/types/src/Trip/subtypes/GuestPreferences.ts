export interface FlightPreference {
    preferences_id?: string;
    cabin_class_id: string;
    max_stops_id: string;
    refundable_ticket: boolean;
  }
  
  export interface HotelPreference {
    preferences_id?: string;
    minimum_rating_id: string;
  }
  
  export interface GroundTransportPreference {
    preferences_id?: string;
    preferred_services_id: string;
  }
  
  export interface GuestTypePreference {
    preferences_id?: string;
    flight_preferences_id: string;
    hotel_preferences_id: string;
    ground_transport_preferences_id: string;
    guest_type: string;
    daily_per_diem: number | null;
  }
  
  export interface CombinedPreferences {
    flight_preferences: FlightPreference;
    hotel_preferences: HotelPreference;
    ground_transport_preferences: GroundTransportPreference;
    guest_type: string;
    daily_per_diem: number | null;
  }
  
  export interface GuestTypeWithDetails extends GuestTypePreference {
    flight_preferences?: FlightPreference;
    hotel_preferences?: HotelPreference;
    ground_transport_preferences?: GroundTransportPreference;
  }
  
  // Enum types for select options
  export enum CabinClassType {
    ECONOMY = "ECONOMY",
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY",
    BUSINESS = "BUSINESS",
    FIRST = "FIRST"
  }
  
  export enum MaxStopsType {
    DIRECT = "DIRECT",
    ONE_STOP = "ONE_STOP",
    TWO_STOPS = "TWO_STOPS",
    ANY = "ANY"
  }
  
  export enum HotelRatingType {
    ONE_STAR = "ONE_STAR",
    TWO_STAR = "TWO_STAR",
    THREE_STAR = "THREE_STAR",
    FOUR_STAR = "FOUR_STAR",
    FIVE_STAR = "FIVE_STAR"
  }
  
  export enum TransportServiceType {
    UBER = "UBER",
    LYFT = "LYFT"
  }
  
  // Helper functions to get display names for enum values
  export const getCabinClassDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [CabinClassType.ECONOMY]: "Economy",
      [CabinClassType.PREMIUM_ECONOMY]: "Premium Economy",
      [CabinClassType.BUSINESS]: "Business",
      [CabinClassType.FIRST]: "First Class"
    };
    return lookup[value] || value;
  };
  
  export const getMaxStopsDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [MaxStopsType.DIRECT]: "Direct Flights Only",
      [MaxStopsType.ONE_STOP]: "Maximum 1 Stop",
      [MaxStopsType.TWO_STOPS]: "Maximum 2 Stops",
      [MaxStopsType.ANY]: "Any Number of Stops"
    };
    return lookup[value] || value;
  };
  
  export const getHotelRatingDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [HotelRatingType.ONE_STAR]: "1 Star (Minimum)",
      [HotelRatingType.TWO_STAR]: "2 Stars (Minimum)",
      [HotelRatingType.THREE_STAR]: "3 Stars (Minimum)",
      [HotelRatingType.FOUR_STAR]: "4 Stars (Minimum)",
      [HotelRatingType.FIVE_STAR]: "5 Stars (Minimum)"
    };
    return lookup[value] || value;
  };
  
  export const getTransportServiceDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [TransportServiceType.UBER]: "Uber",
      [TransportServiceType.LYFT]: "Lyft"
    };
    return lookup[value] || value;
  };