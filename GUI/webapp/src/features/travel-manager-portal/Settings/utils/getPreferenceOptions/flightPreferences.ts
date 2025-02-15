import { FlightPreferences } from "@/types/GuestTypePreferences/subtypes/FlightPreferences";

export const getCabinClassOptions = () => {

    type CabinClass = NonNullable<FlightPreferences['cabinClass']>;
    
    const cabinClasses: CabinClass[] = ['any', 'economy', 'premium-economy', 'business', 'first'];
    
    return cabinClasses.map(cabinClass => ({
      value: cabinClass,
      label: cabinClass
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }));
};

export const getMaxStopsOptions = () => {

    type MaxStops = NonNullable<FlightPreferences['maxStops']>;
    
    const maxStopOptions: MaxStops[] = ['any', 'nonstop', '1-stop', '2-stops'];
    
    return maxStopOptions.map(maxStopOption => ({
      value: maxStopOption,
      label: maxStopOption
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }));
  };
