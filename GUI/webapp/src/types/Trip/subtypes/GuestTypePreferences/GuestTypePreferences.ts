import { FlightPreferences } from './subtypes/FlightPreferences';
import { HotelPreferences } from './subtypes/HotelPreferences';
import { GroundTransportPreferences } from './subtypes/GroundTransportPreferences';

export type GuestTypePreferences = {
    guestType: string;
    flight: FlightPreferences;
    hotel: HotelPreferences;
    groundTransport: GroundTransportPreferences;
    dailyPerDiem?: number;
    id: string;
};

export type GuestTypes = {
    guest_type_id: string;
    name: string;
    company_id: string;
    user_id: string;
};

export type GuestTypesResponse = [GuestTypes]

export type CreateGuestType = {
    name: string;
    company_id: string;
    user_id: string;
}

export type CreateGuestTypeResponse = {	
    id: string;
    guestType: string;
    flight: FlightPreferences
    hotel: HotelPreferences
    groundTransport: GroundTransportPreferences
    dailyPerDiem: number;
}

export type DeleteGuestType ={
    guest_type_id: string;
}

export type UpdateGuestType = {	
    guestType?: string;
    flight?: FlightPreferences
    hotel?: HotelPreferences
    groundTransport?: GroundTransportPreferences
    dailyPerDiem?: number;
}