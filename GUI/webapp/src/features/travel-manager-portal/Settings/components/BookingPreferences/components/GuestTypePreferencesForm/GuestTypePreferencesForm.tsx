import { Card, Checkbox, LoadingOverlay, NativeSelect, NumberInput, Space, Text } from '@mantine/core';
import { getCabinClassOptions, getMaxStopsOptions, getGrondTransportOptions, getHotelRating } from '@/features/travel-manager-portal/utils'
import { CreateGuestTypeResponse } from '@/types/Trip/subtypes';
import { useUpdateGuestType } from '@/api/hooks/useGuestPreferences';
import { Loader } from 'lucide-react';

interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}

interface GuestTypePreferencesFormProps {
    guestTypePreferences: CreateGuestTypeResponse | undefined;
    selectedGuestType: GuestTypeSelection | null;
    isSuccess: boolean
    isPending: boolean
    apiError: (Error | null)

}

export const GuestTypePreferencesForm: React.FC<GuestTypePreferencesFormProps> = ({
    guestTypePreferences, selectedGuestType,/*updateGuestTypePreferences, updateGuestTypeState*/ isSuccess, isPending, apiError
}) => {

    const updateGuestTypePreferenceMutation = useUpdateGuestType();
    const cabinClassOptions = getCabinClassOptions();
    const maxStopOptions = getMaxStopsOptions();
    const groundTransportOptions = getGrondTransportOptions();
    const hotelRatings=getHotelRating();

    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
          <LoadingOverlay visible={isPending && Boolean(selectedGuestType?.guest_type_id)}/>
          <div>
            {!selectedGuestType?.guest_type_id ? (
              <div><Text>Select Guest Type to edit preferences</Text></div>
            ) :
             apiError ?(
              <div>Error loading guest type details: {apiError.message}</div>
            ): isSuccess && guestTypePreferences ? (
              <>
                <Text size ="lg" fw={700}>Travel Preferences</Text>
                <Text size ="md" c="dimmed">Customize travel preferences for the selected guest type</Text>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Flight Preferences</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Default Cabin Class"
                        value={guestTypePreferences?.flight.cabinClass}
                        data ={cabinClassOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{cabinClass: event.target.value as "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST"}}
                        })}
                        error={apiError}
                        disabled={updateGuestTypePreferenceMutation.isPending}
                        leftSection={updateGuestTypePreferenceMutation.isPending ? <Loader/> : null}
                        
                    />
                    <Space h="sm" />
                    <NativeSelect 
                        label="Maximum Stops"
                        value={guestTypePreferences?.flight.maxStops}
                        data ={maxStopOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{maxStops: event.target.value as 'ANY' | 'DIRECT' | 'ONE_STOP' | 'TWO_STOPS'}}
                        })}
                        error={apiError}
                        disabled={updateGuestTypePreferenceMutation.isPending}
                        leftSection={updateGuestTypePreferenceMutation.isPending ? <Loader/> : null}
                    />
                    <Space h="sm" />
                    <Checkbox
                        checked={guestTypePreferences?.flight.refundableTicket}
                        label="Refundable tickets only"
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{refundableTicket: event.currentTarget.checked}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Hotel Preferences</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Default Hotel Quality"
                        value={guestTypePreferences?.hotel.minimumRating}
                        data ={hotelRatings}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {hotel:{minimumRating: parseInt(event.target.value,10) as 1 | 2 | 3 | 4 | 5}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Ground Transport</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Preferred Service"
                        value={guestTypePreferences?.groundTransport.preferredServices}
                        data ={groundTransportOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {groundTransport:{preferredServices: event.target.value as "UBER" | "LYFT"}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Per Diem</Text>
                    <Space h="sm" />
                    <NumberInput
                    prefix="$"
                    label="Default Daily Amount"
                    value={guestTypePreferences?.dailyPerDiem}
                    onChange={(value) => updateGuestTypePreferenceMutation.mutate({
                      guest_type_id: guestTypePreferences.id,
                      updateData: { dailyPerDiem: Number(value)}
                    })}
                    error={apiError}
                    />
                </Card>
            </>
            ): (
              <div></div>
            )}
            </div>
        </Card>
    )
}