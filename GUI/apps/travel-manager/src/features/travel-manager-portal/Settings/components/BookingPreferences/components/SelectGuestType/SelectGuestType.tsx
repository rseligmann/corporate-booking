import React from 'react';
//import { useAllGuestTypes } from '@/api/hooks/useGuestPreferences';
import { GuestTypesResponse } from '@/types';
//import { useAuth } from '@/contexts/AuthContext';
import { Notification, Card, Select, Space, Text } from '@mantine/core';

interface GuestTypeSelection {
    guest_type_id: string;
    name: string;
  }

interface SelectGuestTypeProps {
    guestTypes: GuestTypesResponse | undefined;
    selectedGuestType: GuestTypeSelection | null;
    updateGuestTypeState: (newValue: GuestTypeSelection | null ) => void;
    isPending: boolean;
    apiError: (Error | null);
    isSuccess: boolean;
}

export const SelectGuestType: React.FC<SelectGuestTypeProps> = ({guestTypes, selectedGuestType, updateGuestTypeState, isPending, apiError, isSuccess }) => {
    // const { authState } = useAuth();
    // const companyId = authState.user?.company_id || '';
    // const {data: allGuestTypes, isSuccess, isPending, error: apiError} = useAllGuestTypes(companyId)

    const handleChange =(value: string | null) =>{
        if (value) {
            const selectedType = guestTypes?.find(type => type.guest_type_id === value)
            if (selectedType) {
                updateGuestTypeState({
                    guest_type_id: selectedType.guest_type_id,
                    name: selectedType.name
                })
            } else{
                updateGuestTypeState(null)
            }
        }
    }

    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <div>
                {isPending ? (
                    <div>Loadind guest types...</div>
                ): apiError ? (
                    <div>Error loading guest types: {apiError.message}</div>
                ): isSuccess ? (
                    <>
                        <Text size ="lg" fw={700}>Guest Type Preferences</Text>
                        <Text size ="md" c="dimmed">Configure travel preferences for each guest type</Text>
                        <Space h="md" />
                        <Select 
                            label="Select Guest Type"
                            placeholder='Select Guest Type'
                            data ={guestTypes?.map(t => ({value: t.guest_type_id, label: t.name}))}
                            value={selectedGuestType?.guest_type_id || null}
                            onChange={handleChange}
                        />
                        <Space h="xs" />
                        {selectedGuestType ? (
                        <Notification withCloseButton={false}>
                            {/*`Editing preferences for ${selectedGuestType}`*/}
                            Editing preferences for <Text span size="sm" fw={700}>{selectedGuestType.name}</Text>
                        </Notification>
                        ):<></>}
                    </>

                ): (
                    <div>No guest types available</div>
                )}
            </div>
        </Card>
    )
}