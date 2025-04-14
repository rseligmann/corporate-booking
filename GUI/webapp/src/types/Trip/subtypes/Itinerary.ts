export interface Itinerary {
    id: string;
    originCity: string;
    destinationCity: string;
    searchedAirports:{
      originAirports?: string[];
      destinationAirports?: string [];
    };
    startDate: Date | null;
    endDate: Date | null;
  }