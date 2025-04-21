import React from 'react';
import { Card, Checkbox, Grid, NativeSelect, NumberInput, Space, Text } from '@mantine/core';
import { FlightPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/FlightPreferences';
import { HotelPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/HotelPreferences';
import { GroundTransportPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences';
import { getCabinClassOptions, getMaxStopsOptions, getGrondTransportOptions, getHotelRating } from '@/features/travel-manager-portal/utils'
import { Trip } from '@/types';

interface PreferencesFormProps {
  preferencesData: Trip['travelPreferences'];
  updateTravelPreferences: (update: Partial<Trip['travelPreferences']>) => void;
}

export const PreferencesForm: React.FC <PreferencesFormProps>= ({preferencesData, updateTravelPreferences}) => {
  const cabinClassOptions = getCabinClassOptions();
  const maxStopOptions = getMaxStopsOptions();
  const groundTransportOptions = getGrondTransportOptions();
  const hotelRatings=getHotelRating();

  return (
    <div>
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Flight Preferences</Text>
        <Grid>
          <Grid.Col span={{base: 12, sm: 6}}>
            <NativeSelect
              label="Cabin Class"
              value={preferencesData.flight.cabinClass}
              data={cabinClassOptions}
              onChange={(event) => updateTravelPreferences({ 
                flight: {
                  ...preferencesData.flight,
                  cabinClass: event.target.value as FlightPreferences['cabinClass']
                }
              })}
            />
          </Grid.Col>
          <Grid.Col span={{base: 12, sm: 6}}>
              <NativeSelect
                label="Maximum Stops"
                data={maxStopOptions}
                value={preferencesData.flight.maxStops}
                onChange={(event) => updateTravelPreferences({ 
                  flight: {
                    ...preferencesData.flight,
                    maxStops: event.target.value as FlightPreferences['maxStops']
                  }
                })}
              />
            </Grid.Col>
        </Grid>

        <Space h="sm" />
            
        <Checkbox
          label="Refundable tickets only"
          checked={preferencesData.flight.refundableTicket}
          onChange={(event) => updateTravelPreferences({ 
            flight: {
              ...preferencesData.flight,
              refundableTicket: event.currentTarget.checked as boolean
            }
          })}
        />
      </Card>

      <Space h="sm" />
      
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Hotel Preferences</Text>
          <div>
            <NativeSelect
              label="Hotel Quality"
              data={hotelRatings}
              value={preferencesData.hotel.minimumRating}
              onChange={(event) => updateTravelPreferences({ 
                hotel: {
                  ...preferencesData.hotel,
                  minimumRating: Number(event.target.value) as HotelPreferences['minimumRating']
                }
              })}
            />
          </div>
      </Card>
      <Space h="sm" />
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Ground Transport Preferences</Text>
          <div>
            <NativeSelect 
            label="Preferred Service"
            data={groundTransportOptions}
            value={preferencesData.groundTransport.preferredServices}
            onChange={(event) => updateTravelPreferences({
              groundTransport: {
                ...preferencesData.groundTransport,
                preferredServices: event.target.value as GroundTransportPreferences['preferredServices']
              }
            })}
            />
          </div>
          {/*<div>
            <Label htmlFor="groundTransportClass">Car Class</Label>
            <Select
              value={state.travelPreferences.groundTransportClass}
              onValueChange={(value) => updateTravelPreferences({ groundTransportClass: value })}
            >
              <SelectTrigger id="groundTransportClass">
                <SelectValue placeholder="Select car class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>*/}
      </Card>
      <Space h="sm" />
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Per Diem Preferences</Text>
          <NumberInput
            prefix="$"
            label="Per Diem Type"
            value={preferencesData.dailyPerDiem}
            onChange={(value) => updateTravelPreferences({
              dailyPerDiem: Number(value)
            })}
          />
      </Card>

      {/* <EstimatedBudget /> */}
    </div>
  );
};