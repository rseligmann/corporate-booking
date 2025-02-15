export interface Hotel {
    name: string //'Hilton'
    location: string //'123 Main St, San Francisco, CA 94105'
    check_in: Date //'2025-03-15T15:00:00' ISO 8601 format
    check_out: Date //'2025-03-17T12:00:00' ISO 8601 format
    room_type: string //'King'
    price: number // 200
}