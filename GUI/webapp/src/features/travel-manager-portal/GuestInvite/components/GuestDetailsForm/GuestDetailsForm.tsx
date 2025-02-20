import React, { ChangeEvent, useEffect, useState } from 'react';
import { NativeSelect, TextInput } from '@mantine/core'
import { Trip } from '@/types';
import { fieldValidators } from '../../utils/formValidation';
import './GuestDetailsForm.scss';

interface GuestDetailsFormProps{
  guestTypes: string[];
  guestData: Trip['guest'];
  guestTypeData: string;
  updateGuestDetails: (update: Partial<Trip['guest']>) => void;
  updateGuestTypeAndPreferences: (guestType: string) => void;
}

export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({guestTypes, guestData, guestTypeData, updateGuestDetails, updateGuestTypeAndPreferences}) => {

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize guest type on mount if it's not already set
  useEffect(() => {
    if (!guestTypeData && guestTypes.length > 0) {
      const defaultGuestType = guestTypes[0];
      updateGuestTypeAndPreferences(defaultGuestType);
    }
  }, []);

  const getErrorMessage = (field: string) => {
    if (!touched[field]) return undefined;
    switch (field) {
      case 'firstName':
        return fieldValidators.firstName(guestData.firstName);
      case 'lastName':
        return fieldValidators.lastName(guestData.lastName);
      case 'email':
        return fieldValidators.email(guestData.email);
      default:
        return undefined;
    }
  };
  
  const handleGuestTypeChange=(event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue=event.target.value
    updateGuestTypeAndPreferences(newValue)
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="guest-details-form">
      <div className="guest-details-form__name-group">
        <div className="form-field">
          <TextInput
            label="First Name"
            required
            withAsterisk
            value={guestData.firstName}
            onChange={(e) => updateGuestDetails({ firstName: e.target.value })}
            placeholder="Enter first name"
            error={getErrorMessage('firstName')}
            onBlur={() => handleBlur('firstName')}
          />
        </div>
        <div className="form-field">
          <TextInput
            label="Last Name"
            required
            withAsterisk
            value={guestData.lastName}
            onChange={(e) => updateGuestDetails({ lastName: e.target.value })}
            placeholder="Enter last name"
            error={getErrorMessage('lastName')}
            onBlur={() => handleBlur('lastName')}
          />
        </div>
      </div>
      
      <div className="form-field">
        <TextInput
          label="Email"
          required
          withAsterisk
          type="email"
          value={guestData.email}
          onChange={(e) => updateGuestDetails({ email: e.target.value })}
          placeholder="Enter work email"
          error={getErrorMessage('email')}
          onBlur={() => handleBlur('email')}
        />
      </div>
      
      <div className="form-field">
        <TextInput
          label="Phone Number"
          value={guestData.phone}
          onChange={(e) => updateGuestDetails({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div className="form-field">
        <NativeSelect
          label="Guest Type"
          required
          withAsterisk
          data={guestTypes}
          value={guestTypeData}
          onChange={handleGuestTypeChange}
        />
      </div>
    </div>
  );
};