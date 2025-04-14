import { Alert, Button, Card, CloseButton, Grid, Group, Space, Text, TextInput } from '@mantine/core'
import { GuestTypesResponse } from '@/types';

interface ManageGuestTypesProps {
    guestTypes: GuestTypesResponse | undefined;
    newGuestType: string;
    setNewGuestType: (value: string) => void;
    error: string | null;
    setError: (error: string | null) => void;
    handleAddGuestType: () => void;
    handleRemoveGuestType: (id: string) => void;
    isCreating?: boolean
    isDeleting?: boolean
}

export const ManageGuestTypes: React.FC<ManageGuestTypesProps> = ({
    guestTypes, 
    newGuestType,
    setNewGuestType,
    error,
    setError,
    handleAddGuestType,
    handleRemoveGuestType,
    isCreating = false,
    isDeleting = false
}) =>{

    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>Guest Types</Text>
            <Text size ="md" c="dimmed">Manage guest categories and their default preferences</Text>
            <Space h="md" />
            <Group>
                <TextInput 
                    placeholder="Enter new guest type"
                    value={newGuestType}
                    onChange={(event) => {
                        setNewGuestType(event.target.value);
                        setError(null);
                    }}
                    disabled={isCreating}
                />
                <Button
                    onClick={handleAddGuestType}
                    variant="outline"
                    loading={isCreating}
                    disabled= {isCreating}
                >
                    Add Type
                </Button>
                {/* Error message */}
                {error && (
                <Alert variant="light">
                    {error}
                </Alert>
          )}
            </Group>
            <Space h="md" />
            <Grid>
            {guestTypes?.map((type)=>(
                <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                <Card padding="xs" radius="md" withBorder>
                    <Group justify='space-between'>
                        {type.name}
                        <CloseButton 
                            onClick={()=> handleRemoveGuestType(type.guest_type_id)}
                            disabled= {isDeleting}
                        />
                    </Group>
                </Card>
                </Grid.Col>
            )
            )}
            
            </Grid>

        </Card>

    )
}