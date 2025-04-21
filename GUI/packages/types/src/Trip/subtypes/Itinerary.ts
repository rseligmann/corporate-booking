interface City {
  id?: string;
  name?: string;
  state_id?: string;
  lat?: number;
  lng?: number;
  ranking?: number
}

export interface Itinerary {
  id: string;
  origin:{
    city: City,
    searchedAirports?: string[]
  }
  destination:{
    city: City,
    searchedAirports?: string[]
  }
  startDate: Date | null;
  endDate: Date | null;
}

// export interface Itinerary {
//     id: string;
//     originCity: string;
//     destinationCity: string;
//     searchedAirports:{
//       originAirports?: string[];
//       destinationAirports?: string [];
//     };
//     startDate: Date | null;
//     endDate: Date | null;
//   }