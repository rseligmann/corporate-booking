import { GroundTransportPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences";

export const getGrondTransportOptions = () => {

    type GroundServices = NonNullable<GroundTransportPreferences['preferredServices']>;
    
    const groundServices: GroundServices[] = ['uber', 'lyft'];
    
    return groundServices.map(services => ({
      value: services,
      label: services
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }));
};
