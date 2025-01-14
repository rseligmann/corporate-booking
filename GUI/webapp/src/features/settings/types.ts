export interface FlightPreferences {
    cabin: string;
    directOnly: boolean;
    refundable: boolean;
  }
  
  export interface HotelPreferences {
    quality: string;
  }
  
  export interface TransportPreferences {
    service: string;
    carClass: string;
  }
  
  export interface PerDiemPreferences {
    amount: number;
  }
  
  export interface Preferences {
    flight: FlightPreferences;
    hotel: HotelPreferences;
    transport: TransportPreferences;
    perDiem: PerDiemPreferences;
  }
  
  export interface GuestType {
    id: number;
    name: string;
    preferences: Preferences;
  }
  
  export interface PreferenceCardProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactElement<PreferenceChildProps> | React.ReactElement<PreferenceChildProps>[];
  }

  export interface PreferenceChildProps {
    preferences?: Preferences | null;
  }
  
  // Default preferences that can be imported and used
  export const defaultPreferences: Preferences = {
    flight: {
      cabin: 'Economy',
      directOnly: false,
      refundable: false
    },
    hotel: {
      quality: '3-star'
    },
    transport: {
      service: 'Uber',
      carClass: 'Standard'
    },
    perDiem: {
      amount: 50
    }
  };