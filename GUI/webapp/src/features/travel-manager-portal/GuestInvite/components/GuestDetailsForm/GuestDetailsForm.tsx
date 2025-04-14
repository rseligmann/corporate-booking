import React, { useState } from 'react';
import { Loader, TextInput, Select } from '@mantine/core'
import { Trip, GuestTypesResponse  } from '@/types';
import { fieldValidators } from '../../utils/formValidation';
import './GuestDetailsForm.scss';

interface GuestDetailsFormProps{
  guestTypeData: GuestTypesResponse | undefined;
  guestData: Trip['guest'];
  updateGuestDetails: (update: Partial<Trip['guest']>) => void;
  updateGuestTypeAndPreferences: (guestType: string) => void;
  isGuestTypeDataPending: boolean;
  isGuestTypeDataError: Error| null;
}

interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}

export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({
  guestTypeData, 
  guestData, 
  updateGuestDetails, 
  updateGuestTypeAndPreferences, 
  isGuestTypeDataPending, 
  isGuestTypeDataError
}) => {

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedGuestType, setSelectedGuestType] = useState<GuestTypeSelection | null>(null);

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
  
  const handleGuestTypeChange=(value: string | null) =>{
    if (value) {
      const selectedType = guestTypeData?.find(type => type.guest_type_id === value)
      if (selectedType) {
        updateGuestTypeAndPreferences(selectedType.guest_type_id)
        setSelectedGuestType(selectedType)
      }
    }
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
        <Select
          label="Guest Type"
          placeholder="Select Guest Type"
          required
          withAsterisk
          data={guestTypeData?.map(t => ({value: t.guest_type_id, label: t.name}))}
          leftSection={isGuestTypeDataPending ? <Loader size={16}/> : null}
          value={selectedGuestType?.guest_type_id || null}
          onChange={handleGuestTypeChange}
          error={isGuestTypeDataError?.message}
        />
      </div>
    </div>
  );
};