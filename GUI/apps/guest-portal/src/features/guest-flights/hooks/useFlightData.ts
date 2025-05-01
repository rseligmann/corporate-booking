import { useState, useEffect, useCallback } from 'react' 
import { Flight, FlightBooking, Passenger, FlightPrice } from "@corporate-travel-frontend/types";
import { useAuthGuest } from '@/contexts/AuthContextGuest';
import { useGetGuestTrips } from '@corporate-travel-frontend/api/hooks';

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

    const { authState } = useAuthGuest()
    const userId = authState.user?.user_id || '';
    const { data: tripsData, isSuccess: isTripsSuccess, isPending: isTripsPending, error: tripsError } = useGetGuestTrips(userId)


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

    // Effect to update flight data with guest information
    useEffect(() => {
        if(tripsData && isTripsSuccess){
            setFlightData(prevData => ({
                ...prevData,
                passenger: { 
                    basicInfo: {
                        firstName: tripsData[0].guest.firstName,
                        lastName: tripsData[0].guest.lastName,
                        phone: tripsData[0].guest.phone || "",
                        email: tripsData[0].guest.email,
                        gender: ""
                    }
                }
            }))
        }
    }, [tripsData])
  
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

    const updatePassengerBasicInfo = (details: Partial<Passenger['basicInfo']>) => {
        setFlightData(prevData => {
            if (prevData.passenger){
                return{
                    ...prevData,
                    passenger: {
                        ...prevData.passenger,
                        basicInfo: {
                            ...prevData.passenger.basicInfo,
                            ...details
                        }
                    }
                };
            }
            return prevData;
        });
    }

    const updatePrice = (details: Partial<FlightPrice>) => {
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
        updateBookingReference,
        updatePassengerBasicInfo
    }
}
                