export interface SearchCityResponse {
    city_id: string;
    city: string;
    state_id: string;
    lat: number;
    lng: number;
    ranking: number
}

export interface SearchServiceableAirportsResponse {
  airport_serviceability_id: string;
  city_id: string;
  airport_id: string;
  iata: string;
  airport_name: string;
  distance_miles: number;
  hub: string;
}