import React, { useState } from 'react';
import { DateTimePicker } from '@mantine/dates'
import { fieldValidators } from '../../utils/formValidation';
import { Trip, SearchCityResponse } from '@/types';
import { Timeline } from '../Timeline/Timeline';
import { useServiceableAirportSearch } from '@/api/hooks';
import { CitySelect } from './Components/CitySelect';
import { AirportSelect } from './Components/AirportSelect';
import './ItineraryForm.scss';

interface ItineraryFormProps {
  itineraryData: Trip['itinerary'];
  updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({itineraryData, updateItineraryDetails}) => {

  // Origin SELECTED value
  const [selectedOriginCity, setSelectedOriginCity] = useState<SearchCityResponse>()
  // Search parament for max distance of serviceable airports to city
  const [originAirportDistance, setOriginAirportDistance] = useState("50")
  // Filters airport search to only large and medium sized hubs (L, M, S, N, None)
  const [originHubs,setOriginHubs] = useState(["L","M"])
  // API to search serviceable airports
  const { data: originAirportData, isPending: originAirportIsPending, error: originAirportError} = useServiceableAirportSearch(originHubs, selectedOriginCity?.city_id || "", Number(originAirportDistance))

  const [selectedDestinationCity, setSelectedDestinationCity] = useState<SearchCityResponse>()
  const [destinationAirportDistance, setDestinationAirportDistance] = useState("50")
  const [destinationHubs,setDestinationHubs] = useState(["L","M"])
  const { data: destinationAirportData, isPending: destinationAirportIsPending, error: destinationAirportError} = useServiceableAirportSearch(destinationHubs, selectedDestinationCity?.city_id || "", Number(destinationAirportDistance))

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const getErrorMessage = (field: string) => {
    if (!touched[field]) return undefined;
    switch (field) {
      case 'originCity':
        return fieldValidators.origin(itineraryData.originCity);
      case 'destinationCity':
        return fieldValidators.destination(itineraryData.destinationCity);
      case 'startDate':
        return fieldValidators.startDate(itineraryData.startDate);
      case 'endDate':
        return fieldValidators.endDate(itineraryData.startDate, itineraryData.endDate);
      default:
        return undefined;
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="itinerary-form">
      <div className="itinerary-form__location-group">
        <div className="form-field">
          <CitySelect 
            label='Origin Location'
            placeholder='Search origin city'
            itineraryField='originCity'
            updateItineraryDetails={updateItineraryDetails}
            setSelectedCity={setSelectedOriginCity}
            getErrorMessage={getErrorMessage}
          />
          {originAirportError ? (
            <div>Error loading airports: {originAirportError.message}</div>
          ) : originAirportData && !originAirportIsPending ? 
            <AirportSelect 
              airportData={originAirportData}
              distance={originAirportDistance}
              itineraryField='originAirports'
              setDistance={setOriginAirportDistance}
              isPending={originAirportIsPending}
              hub={originHubs}
              setHub={setOriginHubs}
              itineraryData={itineraryData}
              updateItineraryDetails={updateItineraryDetails}
            />
            : <></>
          }
        </div>
        <div className="form-field">
          <CitySelect 
            label='Destination Location'
            placeholder='Search destination city'
            itineraryField='destinationCity'
            updateItineraryDetails={updateItineraryDetails}
            setSelectedCity={setSelectedDestinationCity}
            getErrorMessage={getErrorMessage}
          />
          {destinationAirportError ? (
            <div>Error loading airports: {destinationAirportError.message}</div>
          ) : destinationAirportData && !destinationAirportIsPending ? 
            <AirportSelect 
              airportData={destinationAirportData}
              distance={destinationAirportDistance}
              itineraryField='destinationAirports'
              setDistance={setDestinationAirportDistance}
              isPending={destinationAirportIsPending}
              hub={destinationHubs}
              setHub={setDestinationHubs}
              itineraryData={itineraryData}
              updateItineraryDetails={updateItineraryDetails}
            />
            : <></>
          }
        </div>
      </div>

      <div className="itinerary-form__schedule-group">
        <div className="form-field">
          <DateTimePicker
            label="First Meeting Start"
            //type="datetime-local"
            value={itineraryData.startDate}
            onChange={(date) => updateItineraryDetails({ startDate: date })}
            placeholder="Date and Time"
            clearable
            withSeconds={false}
            valueFormat="MMM D, YYYY h:mm A"
            required
            withAsterisk
            highlightToday
            minDate={new Date()}
            error={getErrorMessage('startDate')}
            onBlur={() => handleBlur('startDate')}
          />
        </div>
        <div className="form-field">
          <DateTimePicker
            label="Last Meeting End"
            //type="datetime-local"
            value={itineraryData.endDate}
            onChange={(date) => updateItineraryDetails({ endDate: date })}
            placeholder="Date and Time"
            clearable
            withSeconds={false}
            valueFormat="MMM D, YYYY h:mm A"
            required
            withAsterisk
            highlightToday
            minDate={new Date()} 
            error={getErrorMessage('endDate')}
            onBlur={() => handleBlur('endDate')}
          />
        </div>
      </div>
      <Timeline itineraryData={itineraryData}/>
    </div>
  );
};