import { Alert, Button, Card, CloseButton, Grid, Group, Space, Text, TextInput } from '@mantine/core'
import { GuestTypePreferences  } from "@/types";

interface ManageGuestTypesProps {
    guestTypePreferences: GuestTypePreferences[];
    newGuestType: string;
    setNewGuestType: (value: string) => void;
    error: string | null;
    setError: (error: string | null) => void;
    handleAddGuestType: () => void;
    handleRemoveGuestType: (id: number) => void;
}

export const ManageGuestTypes: React.FC<ManageGuestTypesProps> = ({
    guestTypePreferences, 
    newGuestType,
    setNewGuestType,
    error,
    setError,
    handleAddGuestType,
    handleRemoveGuestType
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
                />
                <Button
                    onClick={handleAddGuestType}
                    variant="outline"
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
            {guestTypePreferences.map((type)=>(
                <Grid.Col span={{ base: 6, md: 3, lg: 2 }}>
                <Card padding="xs" radius="md" withBorder>
                    <Group justify='space-between'>
                        {type.guestType}
                        <CloseButton 
                            onClick={()=> handleRemoveGuestType(type.id)}
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