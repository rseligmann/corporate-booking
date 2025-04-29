import { FlightBooking } from "@corporate-travel-frontend/types"

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
    }
}

export const getStepValidation = (step: number, flightData: FlightBooking): boolean => {
    switch (step) {
      case 0:
        return flightFormValidators.outBoundFlight(flightData);
      case 1:
        return flightFormValidators.inBoundFlight(flightData);
    //   case 2:
    //     return flightFormValidators.preferences(formData);
    //   case 3:
    //     return flightFormValidators.review();
      default:
        return false;
    }
  };