import { FlightBooking } from "@corporate-travel-frontend/types"

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

export const validatePhoneNumber = (phoneNumber: string): boolean => {
const digitsOnly = phoneNumber.replace(/\D/g, '');
return digitsOnly.length === 10;
};

export const flightFormValidators = {
    outBoundFlight: (flightData: FlightBooking): boolean => {
        return !!(
            flightData.outBound &&
            flightData.outBound.airline && 
            flightData.outBound.originAirportIata && 
            flightData.outBound.destinationAirportIata
        );
    },

    inBoundFlight: (flightData: FlightBooking): boolean => {
        if (flightData.outBound?.oneWay) {
            return true;
        }
        return !!(
            flightData.inBound &&
            flightData.inBound.airline && 
            flightData.inBound.originAirportIata && 
            flightData.inBound.destinationAirportIata
        )
    },

    passengerDetails: (flightData: FlightBooking): boolean => {
        const { passenger } = flightData
        return !!(
            passenger?.basicInfo.firstName &&
            passenger?.basicInfo.lastName &&
            passenger?.basicInfo.dateOfBirth &&
            validateEmail(passenger?.basicInfo.email) &&
            passenger?.basicInfo.phone
        )
    }
}

export const getStepValidation = (step: number, flightData: FlightBooking): boolean => {
    switch (step) {
      case 0:
        return flightFormValidators.outBoundFlight(flightData);
      case 1:
        return flightFormValidators.inBoundFlight(flightData);
      case 2:
        return flightFormValidators.passengerDetails(flightData);
    //   case 3:
    //     return flightFormValidators.review();
      default:
        return false;
    }
  };

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
    phone: (value: string) => {
        if (!value) return 'Phone number is required';
        if (!validatePhoneNumber(value)) return 'Invalid phone number';
        return undefined;
    },
    gender: (value: string) => {
        if (!value) return 'Gender is required'
        return undefined;
    },
    dateOfBirth: (value: string) => {
        if (!value) return 'Date of Birth is required'
        return undefined;
    }
};