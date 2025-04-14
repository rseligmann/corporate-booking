export type FlightPreferences = {
    cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    maxStops?: 'ANY' | 'DIRECT' | 'ONE_STOP' | 'TWO_STOPS';
    refundableTicket?: boolean;
};