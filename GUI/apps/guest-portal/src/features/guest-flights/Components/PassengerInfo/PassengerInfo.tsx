import React, {useState} from 'react';
import { Card, Select } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { FlightBooking, Passenger } from '@corporate-travel-frontend/types';
import { fieldValidators } from '../../utils/flightFormValidation';
import classes from './PassengerInfo.module.scss';

interface PassengerInfoProps {
  updatePassengerFlightData: (update: Partial<Passenger['basicInfo']>) => void;
  flightData: FlightBooking
}

export const PassengerInfo: React.FC<PassengerInfoProps> = ({ updatePassengerFlightData, flightData }) => {
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const getErrorMessage = (field: string) => {
    if(!touched[field]) return undefined;
    switch(field) {
      case 'firstName':
        return fieldValidators.firstName(flightData.passenger?.basicInfo.firstName || "")
        case 'lastName':
        return fieldValidators.lastName(flightData.passenger?.basicInfo.lastName || "");
      case 'email':
        return fieldValidators.email(flightData.passenger?.basicInfo.email || "");
      case 'phone':
        return fieldValidators.phone(flightData.passenger?.basicInfo.phone || "");
      case 'gender':
        return fieldValidators.gender(flightData.passenger?.basicInfo.gender || "");
      case 'dateOfBirth':
          return fieldValidators.dateOfBirth(flightData.passenger?.basicInfo.dateOfBirth || "");
      default:
        return undefined;
    }
  }

  return (
      <Card withBorder className={classes.card} >
            <h3>Traveler Information</h3>
            <div className={classes.formRow}>
              <TextInput
                label="First Name"
                value={flightData.passenger?.basicInfo.firstName}
                placeholder='Enter first name'
                onChange={e => updatePassengerFlightData({ firstName: e.target.value})}
                error={getErrorMessage('firstName')}
                required
                onBlur={() => handleBlur('firstName')}
              />
              <TextInput
                label="Middle Name"
                placeholder='Enter middle name'
                value={flightData.passenger?.basicInfo.middleName}
                onChange={e => updatePassengerFlightData({ middleName: e.target.value})}
              />
              <TextInput
                label="Last Name"
                value={flightData.passenger?.basicInfo.lastName}
                onChange={e => updatePassengerFlightData({ lastName: e.target.value})}
                error={getErrorMessage('lastName')}
                required
                onBlur={() => handleBlur('lastName')}
              />
            </div>

            <div className={classes.formRow}>
              <TextInput
                type="date"
                label="Date of Birth"
                value={flightData.passenger?.basicInfo.dateOfBirth}
                onChange={e => updatePassengerFlightData({ dateOfBirth: e.target.value})}
                error={getErrorMessage('dateOfBirth')}
                required
              />
              <Select
                value={flightData.passenger?.basicInfo.gender}
                label="Gender"
                required
                onChange={value => updatePassengerFlightData({gender: value || undefined})}
                placeholder="Select Gender"
                error={getErrorMessage('gender')}
                data={[
                  {value: 'M', label: 'Male'},
                  {value: 'F', label: 'Female'},
                  {value: 'X', label: 'Non-binary'}
                ]}
                onBlur={() => handleBlur('gender')}
              />
            </div>

            <div className={classes.formRow}>
              <TextInput
                type="email"
                label="Email Address"
                placeholder='Enter email address'
                value={flightData.passenger?.basicInfo.email}
                onChange={e => updatePassengerFlightData({ email: e.target.value})}
                error={getErrorMessage('email')}
                required
                onBlur={() => handleBlur('email')}
              />
              <TextInput
                type="tel"
                label="Phone Number"
                placeholder='Enter phone number'
                value={flightData.passenger?.basicInfo.phone}
                onChange={e => updatePassengerFlightData({ phone: e.target.value})}
                error={getErrorMessage('phone')}
                required
                onBlur={() => handleBlur('phone')}
              />
            </div>
      </Card>
  )
};