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