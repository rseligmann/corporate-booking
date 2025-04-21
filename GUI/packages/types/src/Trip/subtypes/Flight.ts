export interface Flight {
    id: string
    bookingReference: string
    flightNumber: string //'UA 123'
    airline: string //'United Airlines'
    origin: {
        airport: string //'SFO'
        terminal?: string
        gate?: string
    } 
    destination: {
        airport: string //'JFK'
        terminal?: string
        gate?: string
    } 
    departureTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    arrivalTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    price: number // 500
    bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}