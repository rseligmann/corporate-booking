export interface Flight {
    flightNumber: string //'UA 123'
    airline: string //'United Airlines'
    origin: string //'SFO'
    destination: string //'JFK'
    departureTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    arrivalTime: Date //'2025-03-15T10:30:00' ISO 8601 format
    price: number // 500
}