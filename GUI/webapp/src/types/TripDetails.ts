import { Flight } from "./Flight";
import { Hotel } from "./Hotel";
import { Guest } from "./Guest";

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