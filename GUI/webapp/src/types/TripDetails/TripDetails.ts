import { Flight } from "./subtypes/Flight";
import { Hotel } from "./subtypes/Hotel";
import { Guest } from "./subtypes/Guest";

export interface TripDetails {
    id: number //1
    guest: Guest
    flight:{
        outbound?: Flight
        return?: Flight
    }
    hotel: Hotel;
    trip_type: string //'Interview',
    status: string// 'Completed',
}