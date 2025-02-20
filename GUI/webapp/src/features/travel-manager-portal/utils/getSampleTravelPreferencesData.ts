import { GuestTypePreferences } from "@/types";

export function getSampleTravelPreferencesData(): GuestTypePreferences[] {
    return [
        {
            guestType: "intern",
            flight: {
                cabinClass: "economy",
                maxStops: '2-stops',
                refundableTicket: false
            },
            hotel: {
                minimumRating: 3
            },
            groundTransport: {
                preferredServices: "lyft"
            },
            dailyPerDiem: 75,
            id: "1"
        },
        {
            guestType: "contractor",
            flight: {
                cabinClass: "economy",
                maxStops: '1-stop',
                refundableTicket: true
            },
            hotel: {
                minimumRating: 3
            },
            groundTransport: {
                preferredServices: "uber"
            },
            dailyPerDiem: 100,
            id: "2"
        },
        {
            guestType: "interview",
            flight: {
                cabinClass: "premium-economy",
                maxStops: '1-stop',
                refundableTicket: true
            },
            hotel: {
                minimumRating: 4
            },
            groundTransport: {
                preferredServices: "uber"
            },
            dailyPerDiem: 125,
            id: "3"
        },
        {
            guestType: "visitor",
            flight: {
                cabinClass: "economy",
                maxStops: 'nonstop',
                refundableTicket: false
            },
            hotel: {
                minimumRating: 3
            },
            groundTransport: {
                preferredServices: "lyft"
            },
            dailyPerDiem: 85,
            id: "4"
        },
        {
            guestType: "other",
            flight: {
                cabinClass: "economy",
                maxStops: '2-stops',
                refundableTicket: false
            },
            hotel: {
                minimumRating: 3
            },
            groundTransport: {
                preferredServices: "uber"
            },
            dailyPerDiem: 80,
            id: "5"
        }
    ];
}