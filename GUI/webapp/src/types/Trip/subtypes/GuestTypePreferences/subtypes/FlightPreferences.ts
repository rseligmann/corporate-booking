export type FlightPreferences = {
    cabinClass?: 'any' | 'economy' | 'premium-economy' | 'business' | 'first';
    maxStops?: 'any' | 'nonstop' | '1-stop' | '2-stops';
    refundableTicket?: boolean;
};