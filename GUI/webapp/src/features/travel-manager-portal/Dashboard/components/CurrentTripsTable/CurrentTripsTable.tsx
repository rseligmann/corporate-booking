import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, ChevronsUpDown} from 'lucide-react';
import { Anchor, Avatar, Badge, Center, Group, Pagination, ScrollArea, Table, Text, TextInput, UnstyledButton,} from '@mantine/core';
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
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

interface CurrentTripsTableProps {
    trips: TripDetails[];
}

const processTripsData = (trips: TripDetails[]): ProcessedTripData[] => {
    return trips.map((trip: TripDetails) =>{
        const tripStartDate = formatStartDate(trip.flight.outbound ? trip.flight.outbound.departureTime : trip.hotel.check_in)
        const tripEndDate = formatEndDate(trip.flight.return ? trip.flight.return.arrivalTime : trip.hotel.check_out)
        const tripLength = calculateTripLength(trip).toString()
        const id = trip.id.toString()
        return{
            id,
            guestName: trip.guest.name,
            guestEmail: trip.guest.email,
            tripStartDate,
            tripEndDate,
            tripLength,
            tripType: trip.trip_type,
            tripStatus: trip.status
        }
    })
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : ChevronsUpDown;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} strokeWidth={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(processedTrips: ProcessedTripData[], search: string) {
    const query = search.toLowerCase().trim();
    const searchableFields: (keyof ProcessedTripData)[] = [
        'guestName',
        'guestEmail',
        'tripStartDate',
        'tripEndDate',
        'tripLength',
        'tripType',
        'tripStatus'
      ];
    return processedTrips.filter((item) =>
      searchableFields.some((key) => item[key].toLowerCase().includes(query))
    );
  }

function sortData(
    processedTrips: ProcessedTripData[],
    payload: { sortBy: keyof ProcessedTripData | null; reversed: boolean; search: string }
    ) {
        const { sortBy } = payload;

        if (!sortBy) {
            return filterData(processedTrips, payload.search);
        }

        return filterData(
            [...processedTrips].sort((a, b) => {
            if (sortBy === 'tripStartDate') {
                const dateA = new Date(a.tripStartDate).getTime();
                const dateB = new Date(b.tripStartDate).getTime();
                return payload.reversed ? dateB - dateA : dateA - dateB;
            }
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
            }),
            payload.search
        );
}

export const CurrentTripsTable = ({ trips }: CurrentTripsTableProps) => {
    const processedTrips = processTripsData(trips);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(processedTrips);
    const [sortBy, setSortBy] = useState<keyof ProcessedTripData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
    const ITEMS_PER_PAGE = 10;

    const setSorting = (field: keyof ProcessedTripData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(processedTrips, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(processedTrips, { sortBy, reversed: reverseSortDirection, search: value }));
        setCurrentPage(1); //Reset to first page when searching
    };

    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const rows = paginatedData.map((row) => (
        <Table.Tr key={row.guestName}>
            <Table.Td>
                <Group wrap="nowrap" gap="sm">
                        <Avatar size = "sm" name={row.guestName} />
                    <div>
                        <Text size="sm" fw={500}>{row.guestName}</Text>
                        <Text size ="sm" c="dimmed">{row.guestEmail}</Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge variant="light">{row.tripType}</Badge>
            </Table.Td>
            <Table.Td>
                <Group wrap="nowrap" gap="sm">
                    <div>
                    <Text size="sm">{`${row.tripStartDate} - ${row.tripEndDate}`}</Text>
                    <Text size="sm" c="dimmed">{`${row.tripLength} days`}</Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge 
                    variant={row.tripStatus === 'In Progress' ? "transparent" : "light"} 
                    color={
                        row.tripStatus === 'Upcoming' ? 'green' : 
                        row.tripStatus === 'Pending' ? 'yellow' : 
                        'default'
                    }>
                    {row.tripStatus}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor 
                    href={`/trips/${row.id}`}
                    underline="hover"
                    fz="sm">
                    View Details
                </Anchor>
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
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700}  highlightOnHover>
            <Table.Tbody>
            <Table.Tr>
                <Th
                sorted={sortBy === 'guestName'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('guestName')}
                >
                Guest
                </Th>
                <Th
                sorted={sortBy === 'tripType'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('tripType')}
                >
                Type
                </Th>
                <Th
                sorted={sortBy === 'tripStartDate'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('tripStartDate')}
                >
                Date
                </Th>
                <Th
                sorted={sortBy === 'tripStatus'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('tripStatus')}
                >
                Status
                </Th>
                <Table.Th>
                    <Text fw={500} fz="sm">Actions</Text>
                </Table.Th>
            </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
            {rows.length > 0 ? (
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
                Showing {Math.min(paginatedData.length, ITEMS_PER_PAGE)} of {sortedData.length} trips
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