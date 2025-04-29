import React, { useState, useCallback } from 'react';
import { useNavigate}  from 'react-router-dom'
import { Button, Card, Space, Text } from '@mantine/core';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { FlightReview , FlightSelection, PassengerInfo, ProgressStepper, SeatSelection } from './Components';
import { useAuthGuest } from '@/contexts/AuthContextGuest';
import { useGuestFlightState, useFlightData } from './hooks';
import { getStepValidation } from './utils/flightFormValidation';
import { useGetGuestTrips } from '@corporate-travel-frontend/api/hooks';
import classes from './GuestFlightBooking.module.scss';

export type BookingStep = 'outbound' | 'return' | 'passenger' | 'seats' | 'review';

const formatDate = (date: Date | undefined | null) => {
  if(!date) return ''
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  aircraft: string;
  departureAirport: string;
  arrivalAirport: string;
}

export interface PassengerData {
  basicInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
  };
  travelDocuments: {
    passportNumber: string;
    passportExpiry: string;
    passportCountry: string;
    knownTravelerNumber?: string;
    redressNumber?: string;
  };
  additionalInfo: {
    frequentFlyerNumber?: string;
    mealPreference?: string;
    specialAssistance: string[];
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
};

export interface SeatSelection {
  outbound: string | null;
  return: string | null;
}

export interface FlightBookingData {
  outbound: Flight | null;
  return: Flight | null;
  passenger: PassengerData| null;
  seats: SeatSelection;
}

export const GuestFlightBooking: React.FC = () => {

  const { authState } = useAuthGuest()
  const userId = authState.user?.user_id || '';
  const { data: tripsData, isSuccess: isTripsSuccess, isPending: isTripsPending, error: tripsError } = useGetGuestTrips(userId)

  const [currentStepTemp, setCurrentStep] = useState<BookingStep>('outbound');
  const [flightDataTemp, setFlightData] = useState<FlightBookingData>({
    outbound: null,
    return: null,
    passenger: null,
    seats: {
      outbound: null,
      return: null
    }
  });

  const steps = [
    { id: 'outbound', title: 'Outbound Flight' },
    { id: 'return', title: 'Return Flight' },
    { id: 'passenger', title: 'Passenger Details' },
    { id: 'seats', title: 'Seat Selection' },
    { id: 'review', title: 'Review & Confirm' }
  ];

  const { flightData, clearFlightData, updateOutboundFlight, updateInboundFlight, updatePrice, updateBookingReference } = useFlightData();
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStepTemp);



  const { currentStep, nextStep, prevStep, step, clearCurrentStep } = useGuestFlightState([
    <FlightSelection
      type="outbound"
      updateOutboundFlightData={updateOutboundFlight}
      updateReturnFlightData={updateInboundFlight}
      tripsData={tripsData}
      selectedFlightData={flightData}
    />,
    <FlightSelection
      type="return"
      updateOutboundFlightData={updateOutboundFlight}
      updateReturnFlightData={updateInboundFlight}
      tripsData={tripsData}
      selectedFlightData={flightData}
    />,
    <PassengerInfo
      onComplete={(data: PassengerData) => {
        setFlightData(prev => ({ ...prev, passenger: data }));
        handleNext();
      }}
      flightData={flightData}
    />,
    <SeatSelection
      outboundFlight={flightDataTemp.outbound}
      returnFlight={flightDataTemp.return}
      onComplete={(seatData: SeatSelection) => {
        setFlightData(prev => ({ ...prev, seats: seatData }));
        handleNext();
      }}
    />,
    // <FlightReview
    //   bookingData={{
    //     outbound: flightData.outbound,
    //     return: flightData.return,
    //     passenger: flightData.passenger,
    //     seats: {
    //       outbound: flightData.seats.outbound,
    //       return: flightData.seats.return
    //     }
    //   }}
    //   onConfirm={() => {
    //     console.log('Booking confirmed:', flightData);
    //   }}
    // />

  ])

  const canProceed = useCallback((step: number): boolean => {
    try{
      return getStepValidation(step, flightData);
    }
    catch (error) {
      console.error("Validation error:", error);
      return false
    }
  }, [flightData]);

  const navigate = useNavigate();
  const totalSteps = 5;
  
  const originCity = tripsData?.[0].itinerary.origin.city.name
  const originState = tripsData?.[0].itinerary.origin.city.state_id
  const destinationCity = tripsData?.[0].itinerary.destination.city.name
  const destinationState = tripsData?.[0].itinerary.destination.city.state_id
  const startDate = formatDate(new Date(tripsData?.[0].itinerary.startDate || ''))
  const endDate = formatDate(new Date(tripsData?.[0].itinerary.startDate || ''))
  
  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as BookingStep);
    }
  };

  const handleBack = () => {
    clearFlightData()
    navigate('/dashboard')
  };

  return (
    <div className={classes.guestFlightBooking}>
      <div className={classes.bookingHeader}>
        <button
          onClick={handleBack}
          className={classes.backButton}
        >
          <ArrowLeft />
        </button>
        <h1 className={classes.bookingHeader__h1}>Flight Selection</h1>
      </div>

      <ProgressStepper currentStep={currentStep} />
      <Space h="xl" />
      <div className={classes.guestFlightBooking__bookingActions}>
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={prevStep}
          >
            Previous
          </Button>
        )}
        <div className={classes.guestFlightBooking__primaryAction}>
          {currentStep <= totalSteps ? (
            <Button
              onClick={nextStep}
              rightSection={<ChevronRight size={14}/>}
              disabled={!canProceed(currentStep)}
            >
              <span>Continue</span>
            </Button>
          ) : (
            <Button
              // onClick={handleSendInvite}
              // loading={createTripMutation.isPending}
              // disabled={createTripMutation.isPending}
            >
                {/* <span>{createTripMutation.isPending ? 'Sending...' : 'Send Invite'}</span> */}
            </Button>
          )}
        </div>
      </div>
      <div className={classes.bookingHeader}>
        <Text fw={700} size='xl'>{`${originCity}, ${originState} to ${destinationCity}, ${destinationState}`}</Text>
        <Text>{`${startDate} to ${endDate}`}</Text>
      </div>
      {/* <Space h="md" /> */}
      {/* <Card shadow ="xs" padding="lg" radius="md" withBorder> */}
      <div>
        {step}
      </div>
      {/* </Card> */}
    </div>
  );
};