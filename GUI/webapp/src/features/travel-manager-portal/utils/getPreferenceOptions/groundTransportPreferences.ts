import { GroundTransportPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences";

export const getGrondTransportOptions = () => {

    type GroundServices = NonNullable<GroundTransportPreferences['preferredServices']>;
    
    const groundServices: GroundServices[] = ['UBER', 'LYFT'];
    
    return groundServices.map(services => ({
      value: services,
      label: services
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ')
    }));
};
