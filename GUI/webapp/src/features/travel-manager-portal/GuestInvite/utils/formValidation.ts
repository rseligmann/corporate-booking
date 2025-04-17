import { Trip } from '@/types';

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateDates = (startDate: Date | null, endDate: Date | null): boolean => {
    if (!endDate) return true
    if (!startDate) return true
    return new Date(endDate) > new Date(startDate);
};

export const formValidators = {
  guestDetails: (formData: Trip): boolean => {
    const { guest, guestType } = formData;
    return !!(
      guest.firstName &&
      guest.lastName &&
      guest.email &&
      guestType &&
      validateEmail(guest.email)
    );
  },

  itinerary: (formData: Trip): boolean => {
    const { itinerary } = formData;
    return !!(
      itinerary.origin.city.name &&
      itinerary.destination.city.name &&
      itinerary.startDate &&
      itinerary.endDate &&
      validateDates(itinerary.startDate, itinerary.endDate)
    );
  },

  preferences: (formData: Trip): boolean => {
    const { travelPreferences } = formData;
    return !!(
      travelPreferences.guestType &&
      travelPreferences.flight?.cabinClass
    );
  },

  review: (): boolean => true
};

export const getStepValidation = (step: number, formData: Trip): boolean => {
  switch (step) {
    case 0:
      return formValidators.guestDetails(formData);
    case 1:
      return formValidators.itinerary(formData);
    case 2:
      return formValidators.preferences(formData);
    case 3:
      return formValidators.review();
    default:
      return false;
  }
};

// Field-level validation for showing error messages
export const fieldValidators = {
  firstName: (value: string) => {
    if (!value) return 'First name is required';
    return undefined;
  },
  lastName: (value: string) => {
    if(!value) return 'Last name is required';
    return undefined;
  },
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!validateEmail(value)) return 'Invalid email format';
    return undefined;
  },
  origin: (value: string) => {
    if (!value) return 'Origin is required';
    return undefined;
  },
  destination: (value: string) => {
    if (!value) return 'Destination is required';
    return undefined;
  },
  startDate: (value: Date | null) => {
    if (!value) return 'Start date is required';
    return undefined;
  },
  endDate: (startDate: Date | null, endDate: Date | null) => {
    if (!endDate) return 'End date is required';
    if (!validateDates(startDate, endDate)) return 'End date must be after start date';
    return undefined;
  }
};