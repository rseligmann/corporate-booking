import React from 'react';
import  Input from "@/components/Input/input";
import { Label } from "@/components/Label/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import './GuestDetailsForm.scss';

export const GuestDetailsForm: React.FC = () => {
  const { state, updateGuestDetails } = useGuestInviteState();

  return (
    <div className="guest-details-form">
      <div className="guest-details-form__name-group">
        <div className="form-field">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={state.guestDetails.firstName}
            onChange={(e) => updateGuestDetails({ firstName: e.target.value })}
            placeholder="Enter first name"
          />
        </div>
        <div className="form-field">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={state.guestDetails.lastName}
            onChange={(e) => updateGuestDetails({ lastName: e.target.value })}
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <div className="form-field">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={state.guestDetails.email}
          onChange={(e) => updateGuestDetails({ email: e.target.value })}
          placeholder="Enter work email"
        />
      </div>
      
      <div className="form-field">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={state.guestDetails.phone}
          onChange={(e) => updateGuestDetails({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div className="form-field">
        <Label htmlFor="guestType">Guest Type</Label>
        <Select
          value={state.guestDetails.guestType}
          onValueChange={(value) => updateGuestDetails({ guestType: value })}
        >
          <SelectTrigger id="guestType">
            <SelectValue placeholder="Select guest type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="contract">Contract Work</SelectItem>
            <SelectItem value="student">Student Visit</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};