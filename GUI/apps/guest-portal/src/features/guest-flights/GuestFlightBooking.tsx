import React, { useState } from 'react';
import { Button, Card, Text } from '@mantine/core';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { FlightSelection } from './FlightSelection/FlightSelection';
import { PassengerInfo } from './PassengerInfo/PassengerInfo';
import { SeatSelection } from './SeatSelection/SeatSelection';
import { FlightReview } from './FlightReview/FlightReview';
import './GuestFlightBooking.scss';

export type BookingStep = 'outbound' | 'return' | 'passenger' | 'seats' | 'review';

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
  const [currentStep, setCurrentStep] = useState<BookingStep>('outbound');
  const [flightData, setFlightData] = useState<FlightBookingData>({
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

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as BookingStep);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as BookingStep);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'outbound':
        return (
          <FlightSelection
            type="outbound"
            onSelect={(flight) => {
              setFlightData(prev => ({ ...prev, outbound: flight }));
              handleNext();
            }}
          />
        );
      case 'return':
        return (
          <FlightSelection
            type="return"
            outboundFlight={flightData.outbound}
            onSelect={(flight) => {
              setFlightData(prev => ({ ...prev, return: flight }));
              handleNext();
            }}
          />
        );
      case 'passenger':
        return (
          <PassengerInfo
            onComplete={(data: PassengerData) => {
              setFlightData(prev => ({ ...prev, passenger: data }));
              handleNext();
            }}
          />
        );
      case 'seats':
        return (
          <SeatSelection
            outboundFlight={flightData.outbound}
            returnFlight={flightData.return}
            onComplete={(seatData: SeatSelection) => {
              setFlightData(prev => ({ ...prev, seats: seatData }));
              handleNext();
            }}
          />
        );
        case 'review':
          return flightData.outbound && 
                flightData.return && 
                flightData.passenger && 
                flightData.seats.outbound && 
                flightData.seats.return ? (
            <FlightReview
              bookingData={{
                outbound: flightData.outbound,
                return: flightData.return,
                passenger: flightData.passenger,
                seats: {
                  outbound: flightData.seats.outbound,
                  return: flightData.seats.return
                }
              }}
              onConfirm={() => {
                console.log('Booking confirmed:', flightData);
              }}
            />
          ) : null;
    }
  };

  return (
    <div className="guest-flight-booking">
      <div className="booking-header">
        <button
          onClick={handleBack}
          className="back-button"
          disabled={currentStep === 'outbound'}
        >
          <ArrowLeft />
        </button>
        <h1>Flight Selection</h1>
      </div>

      <div className="booking-progress">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${currentStep === step.id ? 'active' : ''} 
              ${getCurrentStepIndex() > index ? 'completed' : ''}`}
          >
            <div className="step-indicator">{index + 1}</div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <Card>
        <div>
          <Text>{steps.find(step => step.id === currentStep)?.title}</Text>
        </div>
        <div>
          {renderStepContent()}
        </div>
      </Card>

      <div className="booking-actions">
        {currentStep !== 'outbound' && (
          <Button
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        {currentStep !== 'review' && (
          <Button
            onClick={handleNext}
            className="next-button"
          >
            Continue
            <ChevronRight className="button-icon" />
          </Button>
        )}
      </div>
    </div>
  );
};