import { useState } from 'react';

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestType: string;
}

export interface ItineraryDetails {
  origin: string;
  destination: string;
  firstMeetingStart: string;
  lastMeetingEnd: string;
}

export interface TravelPreferences {
  flightCabinClass: string;
  directFlightsPreferred: boolean;
  refundableTicketsOnly: boolean;
  hotelQuality: string;
  groundTransportService: string;
  groundTransportClass: string;
  perDiemAmount: number;
}

export interface GuestInviteState {
  currentStep: number;
  guestDetails: GuestDetails;
  itineraryDetails: ItineraryDetails;
  travelPreferences: TravelPreferences;
}

const initialState: GuestInviteState = {
  currentStep: 1,
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guestType: '',
  },
  itineraryDetails: {
    origin: '',
    destination: '',
    firstMeetingStart: '',
    lastMeetingEnd: '',
  },
  travelPreferences: {
    flightCabinClass: 'Economy',
    directFlightsPreferred: false,
    refundableTicketsOnly: false,
    hotelQuality: '3-star',
    groundTransportService: 'Uber',
    groundTransportClass: 'Standard',
    perDiemAmount: 0,
  },
};

export const useGuestInviteState = () => {
  const [state, setState] = useState<GuestInviteState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prevState => ({ ...prevState, currentStep: step }));
  };

  const updateGuestDetails = (details: Partial<GuestDetails>) => {
    setState(prevState => ({
      ...prevState,
      guestDetails: { ...prevState.guestDetails, ...details },
    }));
  };

  const updateItineraryDetails = (details: Partial<ItineraryDetails>) => {
    setState(prevState => ({
      ...prevState,
      itineraryDetails: { ...prevState.itineraryDetails, ...details },
    }));
  };

  const updateTravelPreferences = (preferences: Partial<TravelPreferences>) => {
    setState(prevState => ({
      ...prevState,
      travelPreferences: { ...prevState.travelPreferences, ...preferences },
    }));
  };

  return {
    state,
    setCurrentStep,
    updateGuestDetails,
    updateItineraryDetails,
    updateTravelPreferences,
  };
};