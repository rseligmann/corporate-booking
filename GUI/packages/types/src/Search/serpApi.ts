type FlightType = 1 | 2 | 3; // 1: Round trip (default), 2: One way, 3: Multi-city
type TravelClass = 1 | 2 | 3 | 4; // 1: Economy (default), 2: Premium economy, 3: Business, 4: First
type StopsOption = 0 | 1 | 2 | 3; // 0: Any number of stops (default), 1: Nonstop only, 2: 1 stop or fewer, 3: 2 stops or fewer
type SortByOption = 1 | 2 | 3 | 4 | 5 | 6; // 1: Top flights (default), 2: Price, 3: Departure time, 4: Arrival time, 5: Duration, 6: Emissions
type EmissionsOption = 1; // 1: Less emissions only

export interface serpApiFlightsRequest {
    // Search Query
    departure_id?: string[];
    arrival_id?: string[];

    // Localization
    gl?: "us"; // Two-letter country code ('us' is United States)
    currency?: "USD"; // Currency code (default: USD)
    hl?: "en"; // Two-letter language code ('en' is English)

    // Advanced Google Flights Parameters
    type?: FlightType;
    outbound_date?: string; // YYYY-MM-DD format
    return_date?: string; // YYYY-MM-DD format, required if type is 1 (Round trip)
    travel_class?: TravelClass;
    show_hidden?: boolean;
    deep_search?: boolean;

    // Number of Passengers
    adults?: number; // Default: 1
    children?: number; // Default: 0
    infants_in_seat?: number; // Default: 0
    infants_on_lap?: number; // Default: 0

    // Sorting
    sort_by?: SortByOption;

    // Advanced Filters
    stops?: StopsOption;
    exclude_airlines?: string; // Comma-separated airline codes or alliances
    include_airlines?: string; // Comma-separated airline codes or alliances
    bags?: number; // Default: 0
    max_price?: number; // Default: unlimited
    outbound_times?: string; // Time range for outbound flight
    return_times?: string; // Time range for return flight, only for Round trip
    emissions?: EmissionsOption;
    layover_duration?: string; // Layover duration range in minutes (e.g., "90,330")
    exclude_conns?: string; // Comma-separated airport codes to exclude for connections
    max_duration?: number; // Maximum flight duration in minutes

    // Next Flights
    departure_token?: string; // Token to get return flights (cannot be used with booking_token)

    // Booking Flights
    booking_token?: string; // Token to get booking options (cannot be used with departure_token)

    // Serpapi Parameters
    no_cache?: boolean; // Force fetch even if cached version exists
    async?: boolean; // Submit search asynchronously
    zero_trace?: boolean; // Enterprise only: Skip storing search data
    output?: "json" | "html"; // Output format (default: json)
}