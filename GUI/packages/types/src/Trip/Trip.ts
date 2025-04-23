import { GroundTransport, GuestProfile, GuestTypePreferences, Flight, Hotel, Itinerary, PerDiem} from "./subtypes"

export interface Trip {
    id: string //1
    guest: GuestProfile
    guestType: string
    status: string// 'Completed'
    travelPreferences: GuestTypePreferences;
    itinerary: Itinerary
    flights?:{
        outbound?: Flight
        return?: Flight
    }
    hotel?: Hotel;
    groundTransport?: GroundTransport[];
    perDiem?: PerDiem;
    created: Date;
    modified: Date;
    userId?: string; // Reference to admin user
    companyId?: string;
    estimatedBudget?: number;
    bookedBudget?: number;
    actualSpend?: number;
}

export interface CreateTripResponse{
    id: string
}