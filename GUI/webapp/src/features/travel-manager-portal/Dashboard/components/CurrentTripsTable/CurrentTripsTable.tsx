import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Mail, MapPin, Search } from 'lucide-react';
import { Anchor, Badge, Center, Flex, Group, Pagination, ScrollArea, Space, Stack, Table, Text, TextInput } from '@mantine/core';
import { calculateTripLength, formatStartDate, formatEndDate } from '@/lib/utils';
import { TripDetails } from '@/types';
import classes from './CurrentTripsTable.module.scss';

interface ProcessedTripData {
    id: string;
    guestName: string;
    guestEmail: string;
    tripStartDate: string;
    tripEndDate: string;
    tripLength: string;
    tripType: string;
    tripStatus: string;
    origin?: string;
    destination?: string;
    tripCost: string;
}

interface ThProps {
  children: React.ReactNode;
}

interface CurrentTripsTableProps {
    trips: TripDetails[];
}

const processTripsData = (trips: TripDetails[]): ProcessedTripData[] => {
    return trips.map((trip: TripDetails) =>{
        const tripStartDate = formatStartDate(trip.flight.outbound ? trip.flight.outbound.departureTime : trip.hotel.check_in)
        const tripEndDate = formatEndDate(trip.flight.return ? trip.flight.return.arrivalTime : trip.hotel.check_out)
        const tripLength = calculateTripLength(trip).toString()
        const tripCost = (trip.hotel.price + (trip.flight.outbound?.price || 0) + (trip.flight.return?.price || 0)).toString()
        const id = trip.id.toString()
        return{
            id,
            guestName: trip.guest.name,
            guestEmail: trip.guest.email,
            tripStartDate,
            tripEndDate,
            tripLength,
            tripType: trip.trip_type,
            tripStatus: trip.status,
            origin: trip.flight.outbound?.origin,
            destination: trip.flight.outbound?.destination,
            tripCost,
        }
    })
}

function Th({ children}: ThProps) {
  return (
    <Table.Th className={classes.th}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
          </Center>
        </Group>
    </Table.Th>
  );
}

function filterData(data: ProcessedTripData[], search: string) {
    const query = search.toLowerCase().trim();
    const searchableFields: (keyof ProcessedTripData)[] = [
        'guestName',
        'guestEmail',
        'tripStartDate',
        'tripEndDate',
        'tripLength',
        'tripType',
        'tripStatus',
        'origin',
        'destination',
      ];
    return data.filter((item) =>
        searchableFields.some((key) => {
            const value = item[key];
            return value ? value.toLowerCase().includes(query): false;
        })
    );
  }

export const CurrentTripsTable = ({ trips }: CurrentTripsTableProps) => {
    const processedTrips = processTripsData(trips);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
    const ITEMS_PER_PAGE = 10;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setCurrentPage(1); //Reset to first page when searching
    };

    // Filter data based on search
    const filteredData = filterData(processedTrips, search);

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const rows = paginatedData.map((row) => (
        <Table.Tr key={row.guestName}>
            <Table.Td>
            <Flex justify="space-between">
                <div>
                    <Group wrap="nowrap" gap="sm">
                        <Text size="md" fw={500}>{row.guestName}</Text>
                        <Badge variant="light">{row.tripType}</Badge>
                    </Group>
                    <Space h="xs"/>
                    <Group wrap="nowrap" gap="xl">
                        <div>
                            <Group wrap="nowrap" gap="xs">
                                <Mail className={classes.icon}/>
                                <Text size ="sm" c="dimmed">{row.guestEmail}</Text>
                            </Group>
                            <Space h="xs"/>
                            <Group wrap="nowrap" gap="xs">
                                <MapPin className={classes.icon}/>
                                <Text c="dimmed" size="sm" fw={500}>{row.origin}</Text>    
                                <ArrowRight className={classes.iconArrow} />
                                <Text c="dimmed" size="sm" fw={500}>{row.destination}</Text>
                            </Group>
                        </div>
                        <div>
                            <Group wrap="nowrap" gap="xs">
                                <Calendar className={classes.icon}/>
                                <Text c="dimmed" size="sm" fw={500}>{`${row.tripStartDate} - ${row.tripEndDate}`}</Text>
                            </Group>  
                            <Space h="xs"/>
                            <Group wrap="nowrap" gap="xs">
                                <Clock className={classes.icon} />
                                <Text c="dimmed" size="sm" fw={500}>{`${row.tripLength} days`}</Text>
                            </Group>
                        </div>
                    </Group>
                    <Space h="xs"/>
                    <Anchor 
                        href={`/trips/${row.id}`}
                        underline="hover"
                        fz="sm">
                        View Details
                    </Anchor>
                </div>
                <div>
                    <Stack align="flex-end" justify="flex-start" gap ="xs">
                    <Text size="lg" fw={500}>
                        ${row.tripCost}
                    </Text>
                    <Badge 
                        variant={row.tripStatus === 'In Progress' ? "transparent" : "light"}
                        size = "lg"
                        color={
                            row.tripStatus === 'Upcoming' ? 'green' : 
                            row.tripStatus === 'Pending' ? 'yellow' : 
                            'default'
                        }>
                        {row.tripStatus}
                    </Badge>
                    </Stack>
                </div>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

  return (
    <ScrollArea>
        <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<Search size={16} strokeWidth={1.5} />}
            value={search}
            onChange={handleSearchChange}
        />
        <Table.ScrollContainer minWidth={1000}>
        <Table horizontalSpacing="md" verticalSpacing="sm" miw={700}  highlightOnHover>
            <Table.Tbody>
            <Table.Tr>
                <Th>Guest</Th>
            </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
            {paginatedData.length > 0 ? (
                rows
            ) : (
                <Table.Tr>
                <Table.Td colSpan={Object.keys(processedTrips[0]).length}>
                    <Text fw={500} ta="center">
                    Nothing found
                    </Text>
                </Table.Td>
                </Table.Tr>
            )}
            </Table.Tbody>
        </Table>
        </Table.ScrollContainer>
            <Group justify="space-between" mt="md">
            <Text size="sm">
                Showing {Math.min(paginatedData.length, ITEMS_PER_PAGE)} of {filteredData.length} trips
            </Text>
            <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                size="sm"
            />
      </Group>
    </ScrollArea>
  );
}