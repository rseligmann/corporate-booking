export interface Itinerary {
    id: string;
    origin: string;
    destination: string;
    startDate: Date | null;
    endDate: Date | null;
  }