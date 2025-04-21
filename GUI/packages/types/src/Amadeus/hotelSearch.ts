// Type for ratings literal union
export type HotelRating = "1" | "2" | "3" | "4" | "5";

// Interface for HotelCustomSearchRequest
export interface HotelCustomSearchRequest {
  latitude: number;
  longitude: number;
  radius: number;
  ratings?: HotelRating[];
  checkInDate?: string; // Using string for date format YYYY-MM-DD
  checkOutDate?: string; // Using string for date format YYYY-MM-DD
}

// Interface for HotelAggregationResponse
export interface HotelAggregationResponse {
  total_hotels: number;
  total_available_hotels: number;
  overall_average_night_price: number;
  overall_average_total_price: number;
  currency: string;
}