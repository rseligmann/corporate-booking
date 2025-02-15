import { Card, Checkbox, NativeSelect, NumberInput, Space, Text } from '@mantine/core';
import { useEffect } from 'react';
import { getCabinClassOptions, getMaxStopsOptions, getGrondTransportOptions, getHotelRating } from '../../utils';
import { GuestTypePreferences } from '@/types';

interface GuestTypePreferencesFormProps {
    selectedGuestType: string;
    guestTypePreferences: GuestTypePreferences[];
    updateGuestTypePreferences: (updatePreferences: GuestTypePreferences[]) => void;
    updateGuestTypeState: (guestType: string) => void; 
}

export const GuestTypePreferencesForm: React.FC<GuestTypePreferencesFormProps> = ({
    selectedGuestType, guestTypePreferences, updateGuestTypePreferences, updateGuestTypeState
}) => {

  useEffect(() => {
    const currentPreferences = guestTypePreferences.find(p => p.guestType === selectedGuestType);
    if (!currentPreferences && guestTypePreferences.length > 0) {
        // If current selection doesn't exist anymore, select the first available
        updateGuestTypeState(guestTypePreferences[0].guestType);
    }
}, [guestTypePreferences, selectedGuestType, updateGuestTypeState]);


    const currentPreferences = guestTypePreferences.find(p => p.guestType === selectedGuestType);
    const cabinClassOptions = getCabinClassOptions();
    const maxStopOptions = getMaxStopsOptions();
    const groundTransportOptions = getGrondTransportOptions();
    const hotelRatings=getHotelRating();

    const handlePreferenceUpdate = (
        category: 'flight' | 'hotel' | 'groundTransport',
        field: string,
        value: any
      ) => {
        if (!currentPreferences) return;
    
        const updatedPreferences = guestTypePreferences.map(pref => {
          if (pref.guestType === selectedGuestType) {
            return {
              ...pref,
              [category]: {
                ...pref[category],
                [field]: value
              }
            };
          }
          return pref;
        });
    
        updateGuestTypePreferences(updatedPreferences);
      };
    
      const handlePerDiemUpdate = (value: number) => {
        if (!currentPreferences) return;
    
        const updatedPreferences = guestTypePreferences.map(pref => {
          if (pref.guestType === selectedGuestType) {
            return {
              ...pref,
              dailyPerDiem: value
            };
          }
          return pref;
        });
    
        updateGuestTypePreferences(updatedPreferences);
      };

    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>Travel Preferences</Text>
            <Text size ="md" c="dimmed">Customize travel preferences for the selected guest type</Text>
            <Space h="md" />
            <Card padding="lg" radius="md" withBorder>
                <Text size ="lg" fw={700}>Flight Preferences</Text>
                <Space h="sm" />
                <NativeSelect 
                    label="Default Cabin Class"
                    value={currentPreferences?.flight.cabinClass}
                    data ={cabinClassOptions}
                    onChange={(value) => handlePreferenceUpdate('flight', 'cabinClass', value)}
                />
                <Space h="sm" />
                <NativeSelect 
                    label="Maximum Stops"
                    value={currentPreferences?.flight.maxStops}
                    data ={maxStopOptions}
                    onChange={(value) => handlePreferenceUpdate('flight', 'maxStops', value)}
                />
                <Space h="sm" />
                <Checkbox
                    checked={currentPreferences?.flight.refundableTicket}
                    label="Refundable tickets only"
                    onChange={(value) => handlePreferenceUpdate('flight', 'refundableTicket',value.currentTarget.checked)}
                />
            </Card>
            <Space h="md" />
            <Card padding="lg" radius="md" withBorder>
                <Text size ="lg" fw={700}>Hotel Preferences</Text>
                <Space h="sm" />
                <NativeSelect 
                    label="Default Hotel Quality"
                    value={currentPreferences?.hotel.minimumRating}
                    data ={hotelRatings}
                    onChange={(value) => handlePreferenceUpdate('hotel', 'minimumRating', value)}
                />
            </Card>
            <Space h="md" />
            <Card padding="lg" radius="md" withBorder>
                <Text size ="lg" fw={700}>Ground Transport</Text>
                <Space h="sm" />
                <NativeSelect 
                    label="Preferred Service"
                    value={currentPreferences?.groundTransport.preferredServices}
                    data ={groundTransportOptions}
                    onChange={(value) => handlePreferenceUpdate('groundTransport', 'preferredServices', value)}
                />
            </Card>
            <Space h="md" />
            <Card padding="lg" radius="md" withBorder>
                <Text size ="lg" fw={700}>Per Diem</Text>
                <Space h="sm" />
                <NumberInput
                prefix="$"
                label="Default Daily Amount"
                value={currentPreferences?.dailyPerDiem}
                onChange={(value) => handlePerDiemUpdate(Number(value))}
                />
            </Card>
        </Card>
    )
}