import { FlightPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/FlightPreferences";

export const getCabinClassOptions = () => {

    type CabinClass = NonNullable<FlightPreferences['cabinClass']>;
    
    const cabinClasses: CabinClass[] = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
    
    return cabinClasses.map(cabinClass => ({
      value: cabinClass,
      label: cabinClass
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ')
    }));
};

export const getMaxStopsOptions = () => {

    type MaxStops = NonNullable<FlightPreferences['maxStops']>;
    
    const maxStopOptions: MaxStops[] = ['ANY', 'DIRECT', 'ONE_STOP', 'TWO_STOPS'];
    
    return maxStopOptions.map(maxStopOption => ({
      value: maxStopOption,
      label: maxStopOption
        .split('_')
        .map(word => word.charAt(0)+ word.slice(1).toLowerCase())
        .join(' ')
    }));
  };
