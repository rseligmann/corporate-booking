import React, { ChangeEvent } from 'react';
import { Notification, Card, NativeSelect, Space, Text } from '@mantine/core';

interface SelectGuestTypeProps {
    guestTypes: string[];
    selectedGuestType: string;
    updateGuestTypeState: (newValue: string) => void;
}

export const SelectGuestType: React.FC<SelectGuestTypeProps> = ({guestTypes, selectedGuestType, updateGuestTypeState}) => {

    const handleChange =(event: ChangeEvent<HTMLSelectElement>) =>{
        const newValue = event.target.value
        updateGuestTypeState(newValue)
    }

    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>Guest Type Preferences</Text>
            <Text size ="md" c="dimmed">Configure travel preferences for each guest type</Text>
            <Space h="md" />
            <NativeSelect 
                label="Select Guest Type"
                data ={guestTypes}
                onChange={handleChange}
            />
            <Space h="xs" />
            <Notification withCloseButton={false}>
                {/*`Editing preferences for ${selectedGuestType}`*/}
                Editing preferences for <Text span size="sm" fw={700}>{selectedGuestType}</Text>
            </Notification>

        </Card>
    )
}