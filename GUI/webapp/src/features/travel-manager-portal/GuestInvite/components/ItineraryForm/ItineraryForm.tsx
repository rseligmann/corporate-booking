import React, { useState } from 'react';
import { TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { fieldValidators } from '../../utils/formValidation';
import { Trip } from '@/types';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import { Timeline } from '../Timeline/Timeline';
import './ItineraryForm.scss';

interface ItineraryFormProps {
  itineraryData: Trip['itinerary'];
  updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({itineraryData, updateItineraryDetails}) => {

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const getErrorMessage = (field: string) => {
    if (!touched[field]) return undefined;
    switch (field) {
      case 'origin':
        return fieldValidators.origin(itineraryData.origin);
      case 'destination':
        return fieldValidators.destination(itineraryData.destination);
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
          <TextInput
            label="Origin Location"
            required
            withAsterisk
            value={itineraryData.origin}
            onChange={(e) => updateItineraryDetails({ origin: e.target.value })}
            placeholder="City or airport code"
            error={getErrorMessage('origin')}
            onBlur={() => handleBlur('origin')}
          />
        </div>
        <div className="form-field">
          <TextInput
            label="Destination Location"
            required
            withAsterisk
            value={itineraryData.destination}
            onChange={(e) => updateItineraryDetails({ destination: e.target.value })}
            placeholder="City or airport code"
            error={getErrorMessage('destination')}
            onBlur={() => handleBlur('destination')}
          />
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

      <EstimatedBudget />
      <Timeline itineraryData={itineraryData}/>
    </div>
  );
};