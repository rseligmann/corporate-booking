import React, { useState } from 'react';
import { Card } from '@/components/Card/card';
import { TextInput } from '@mantine/core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox/checkbox';
import Button from '@/components/Button/button';
import './PassengerInfo.scss';

interface PassengerData {
  basicInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
  };
  travelDocuments: {
    passportNumber: string;
    passportExpiry: string;
    passportCountry: string;
    knownTravelerNumber?: string;
    redressNumber?: string;
  };
  additionalInfo: {
    frequentFlyerNumber?: string;
    mealPreference?: string;
    specialAssistance: string[];
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface PassengerInfoProps {
  onComplete: (data: PassengerData) => void;
}

export const PassengerInfo: React.FC<PassengerInfoProps> = ({ onComplete }) => {
  const [activeSection, setActiveSection] = useState<string>('basic');
  const [formData, setFormData] = useState<PassengerData>({
    basicInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: ''
    },
    travelDocuments: {
      passportNumber: '',
      passportExpiry: '',
      passportCountry: '',
      knownTravelerNumber: '',
      redressNumber: ''
    },
    additionalInfo: {
      frequentFlyerNumber: '',
      mealPreference: '',
      specialAssistance: []
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  const updateFormData = (section: keyof PassengerData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const sections = [
    { id: 'basic', title: 'Basic Information' },
    { id: 'documents', title: 'Travel Documents' },
    { id: 'additional', title: 'Additional Information' },
    { id: 'emergency', title: 'Emergency Contact' }
  ];

  const mealOptions = [
    { value: 'regular', label: 'Regular Meal' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'diabetic', label: 'Diabetic' }
  ];

  const specialAssistanceOptions = [
    { id: 'wheelchair', label: 'Wheelchair Assistance' },
    { id: 'visual', label: 'Visual Assistance' },
    { id: 'hearing', label: 'Hearing Assistance' },
    { id: 'elderly', label: 'Elderly Assistance' }
  ];

  return (
    <form onSubmit={handleSubmit} className="passenger-info">
      <div className="section-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <Card className="form-section">
        {activeSection === 'basic' && (
          <div className="section-content">
            <h3>Basic Information</h3>
            <div className="form-row">
              <TextInput
                label="First Name"
                value={formData.basicInfo.firstName}
                onChange={e => updateFormData('basicInfo', 'firstName', e.target.value)}
                required
              />
              <TextInput
                label="Middle Name"
                value={formData.basicInfo.middleName}
                onChange={e => updateFormData('basicInfo', 'middleName', e.target.value)}
              />
              <TextInput
                label="Last Name"
                value={formData.basicInfo.lastName}
                onChange={e => updateFormData('basicInfo', 'lastName', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <TextInput
                type="date"
                label="Date of Birth"
                value={formData.basicInfo.dateOfBirth}
                onChange={e => updateFormData('basicInfo', 'dateOfBirth', e.target.value)}
                required
              />
              <Select
                value={formData.basicInfo.gender}
                onValueChange={value => updateFormData('basicInfo', 'gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="X">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-row">
              <TextInput
                type="email"
                label="Email Address"
                value={formData.basicInfo.email}
                onChange={e => updateFormData('basicInfo', 'email', e.target.value)}
                required
              />
              <TextInput
                type="tel"
                label="Phone Number"
                value={formData.basicInfo.phone}
                onChange={e => updateFormData('basicInfo', 'phone', e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {activeSection === 'documents' && (
          <div className="section-content">
            <h3>Travel Documents</h3>
            <div className="form-row">
              <TextInput
                label="Passport Number"
                value={formData.travelDocuments.passportNumber}
                onChange={e => updateFormData('travelDocuments', 'passportNumber', e.target.value)}
                required
              />
              <TextInput
                type="date"
                label="Passport Expiry Date"
                value={formData.travelDocuments.passportExpiry}
                onChange={e => updateFormData('travelDocuments', 'passportExpiry', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <Select
                value={formData.travelDocuments.passportCountry}
                onValueChange={value => updateFormData('travelDocuments', 'passportCountry', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Issuing Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="form-row">
              <TextInput
                label="Known Traveler Number (Optional)"
                value={formData.travelDocuments.knownTravelerNumber}
                onChange={e => updateFormData('travelDocuments', 'knownTravelerNumber', e.target.value)}
              />
              <TextInput
                label="Redress Number (Optional)"
                value={formData.travelDocuments.redressNumber}
                onChange={e => updateFormData('travelDocuments', 'redressNumber', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeSection === 'additional' && (
          <div className="section-content">
            <h3>Additional Information</h3>
            <div className="form-row">
              <TextInput
                label="Frequent Flyer Number (Optional)"
                value={formData.additionalInfo.frequentFlyerNumber}
                onChange={e => updateFormData('additionalInfo', 'frequentFlyerNumber', e.target.value)}
              />
              <Select
                value={formData.additionalInfo.mealPreference}
                onValueChange={value => updateFormData('additionalInfo', 'mealPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Meal Preference" />
                </SelectTrigger>
                <SelectContent>
                  {mealOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="special-assistance">
              <h4>Special Assistance</h4>
              <div className="checkbox-group">
                {specialAssistanceOptions.map(option => (
                  <label key={option.id} className="checkbox-label">
                    <Checkbox
                      checked={formData.additionalInfo.specialAssistance.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const newAssistance = checked
                          ? [...formData.additionalInfo.specialAssistance, option.id]
                          : formData.additionalInfo.specialAssistance.filter(id => id !== option.id);
                        updateFormData('additionalInfo', 'specialAssistance', newAssistance);
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'emergency' && (
          <div className="section-content">
            <h3>Emergency Contact</h3>
            <div className="form-row">
              <TextInput
                label="Full Name"
                value={formData.emergencyContact.name}
                onChange={e => updateFormData('emergencyContact', 'name', e.target.value)}
                required
              />
              <Select
                value={formData.emergencyContact.relationship}
                onValueChange={value => updateFormData('emergencyContact', 'relationship', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <TextInput
                type="tel"
                label="Phone Number"
                value={formData.emergencyContact.phone}
                onChange={e => updateFormData('emergencyContact', 'phone', e.target.value)}
                required
              />
            </div>
          </div>
        )}
      </Card>

      <div className="form-actions">
        <Button type="submit" className="submit-button">
          Save and Continue
        </Button>
      </div>
    </form>
  );
};