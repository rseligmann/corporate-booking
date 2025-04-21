import React from 'react';
import { User, MapPin, Calendar, Plane, Hotel, Car, DollarSign } from 'lucide-react';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import { Grid, Group, Space, Text } from '@mantine/core';
import { Trip } from '@/types';
import './ReviewForm.scss';

interface ReviewItemProps {
  formData: Trip;
}

const formatDateTime = (date: Date | null | undefined) => {
  return date?.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ReviewForm: React.FC<ReviewItemProps> = ({formData}) => {
  
  const SummaryItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div>
      <Group>
        {icon}
        <Text size="md" fw={700}>{title}</Text>
      </Group>   
      <Space h="xs" />
        {children}
    </div>
  );

  const PreferenceItem: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ icon, children }) => (
    <Group>
      {icon}
      <span className="preference-item__text">{children}</span>
    </Group>
  );

  return (
    <div>
      <Text size="xl" fw={700}>TripSummary</Text>
      <Text c="dimmed">Review all details before sending invitation</Text>
      <Space h="lg" />
          <div >
            <SummaryItem 
                icon={<User />} 
                title="Guest Information"
              >
                <Group>
                  <Text c="dimmed">Guest Name:</Text>
                  <Text>{formData.guest.firstName} {formData.guest.lastName}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Email:</Text>
                  <Text>{formData.guest.email}</Text> 
                </Group>
                <Group>
                  <Text c="dimmed">Phone:</Text>
                  <Text>{formData.guest.phone}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Guest Type:</Text>
                  <Text>{formData.guestType}</Text>
                </Group>
            </SummaryItem>

            <Space h="lg" />

            <SummaryItem 
                icon={<MapPin className="summary-item__icon" />} 
                title="Location Details"
              >
                <Group>
                  <Text c="dimmed">Origin:</Text>
                  <Text>{formData.itinerary.origin.city.name}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Destination:</Text>
                  <Text>{formData.itinerary.destination.city.name}</Text>
                </Group>
            </SummaryItem>

            <Space h="lg" />

            <SummaryItem 
                icon={<Calendar className="summary-item__icon" />} 
                title="Schedule"
              >
                <Group>
                  <Text c="dimmed">First Meeting:</Text>
                  <Text>{formatDateTime(formData.itinerary.startDate)}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Last Meeting:</Text>
                  <Text>{formatDateTime(formData.itinerary.endDate)}</Text>
                </Group>
            </SummaryItem>

            <Space h="lg" />

            <div>
              <Text size="md" fw={700}>Travel Preferences</Text>
              <Space h="xs" />
                <Grid>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Plane />}>
                        Flight ({formData.travelPreferences.flight.cabinClass})
                      </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Hotel />}>
                      Hotel ({formData.travelPreferences.hotel.minimumRating})
                    </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Car />}>
                      Ground Transport ({formData.travelPreferences.groundTransport.preferredServices}) 
                      {/*(state.travelPreferences.groundTransportClass)*/}
                    </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<DollarSign />}>
                      Per Diem (${formData.travelPreferences.dailyPerDiem}/day)
                    </PreferenceItem>
                  </Grid.Col>
                </Grid>
              </div>

            {/* <EstimatedBudget /> */}
          </div>
    </div>
  );
};