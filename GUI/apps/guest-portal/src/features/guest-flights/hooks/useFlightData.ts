import { useState, useEffect, useCallback } from 'react' 
import { FlightBooking } from "@corporate-travel-frontend/types";

const initialFlightData: FlightBooking={
    id: "",
    outBound: {
        id: "",
        airline:"",
        oneWay: false,
        departureTime: "",
        arrivalTime: "",
        duration: "",
        stops: 0,
        price: {
            currency: "",
            total: 0,
            base: 0,
        },
        originAirportIata: "",
        destinationAirportIata: "",
        segments: [{
            id: "",
            departureAirportIata: "",
            departureTime: "",
            arrivalAirportIata: "",
            arrivalTime: "",
            carrierCode: "",
            aircraftCode: "",
            duration: "",
            cabin: "",
        }]
    },
    price: {
        currency: "",
        total: 0,
        base: 0,
    },
    bookingReference:"",
    bookingStatus: "pending",
}

export const useFlightData = () => {
    const [ flightData, setFlightData ] = useState<FlightBooking>(() => {
        const savedFlightData = localStorage.getItem('flightBookingFormData');
        if (savedFlightData){
            return JSON.parse(savedFlightData)
        }
        return initialFlightData
    })

    // Save to localStorage whenever form data changes
    useEffect(() => {
        localStorage.setItem('flightBookingFormData', JSON.stringify(flightData))
    }, [flightData]);

    useEffect(() => {
        console.log("Flight data after update:", flightData);
    }, [flightData]);
  
    //Cleanup function to clear form data from localStorage
    const clearFlightData= useCallback(()=>{
        localStorage.removeItem('guestInviteFormData');
        localStorage.removeItem('guestInviteCurrentStep');
        setFlightData(initialFlightData);
    }, []);
    
    const updateOutboundFlight = (details: Partial<FlightBooking['outBound']>) => {
        setFlightData(prevData => ({
            ...prevData,
            outBound: { ...prevData.outBound, ...details},
        }));
    };

    const updateInboundFlight = (details: Partial<FlightBooking['inBound']>) => {
        setFlightData(prevData => ({
            ...prevData,
            inBound: { 
                ...(prevData.inBound || {
                    id: "",
                    airline:"",
                    oneWay: false,
                    departureTime: "",
                    arrivalTime: "",
                    duration: "",
                    stops: 0,
                    price: {
                        currency: "",
                        total: 0,
                        base: 0,
                    },
                    originAirportIata: "",
                    destinationAirportIata: "",
                    segments: []
                }),
                ...details
            }
        }));
    };

    const updatePrice = (details: Partial<FlightBooking>['price']) => {
        setFlightData(prevData => ({
            ...prevData,
            price: {...prevData.price, ...details},
        }))
    };

    const updateBookingReference = (reference: string) => {
        setFlightData(prevData => ({
            ...prevData,
            bookingReference: reference
        }))
    };

    return{
        flightData,
        clearFlightData,
        updateOutboundFlight,
        updateInboundFlight,
        updatePrice,
        updateBookingReference
    }
}
                