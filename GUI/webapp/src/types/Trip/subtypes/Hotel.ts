import { Address } from './Address'

export interface Hotel {
    id: string;
    bookingReference?: string;
    name: string //'Hilton'
    location: Address //'123 Main St, San Francisco, CA 94105'
    checkIn: Date //'2025-03-15T15:00:00' ISO 8601 format
    checkOut: Date //'2025-03-17T12:00:00' ISO 8601 format
    roomType: string //'King'
    price: number // 200
    bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}