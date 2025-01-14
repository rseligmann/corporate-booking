import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';

export const GuestDetailsForm: React.FC = () => {
  const { state, updateGuestDetails } = useGuestInviteState();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={state.guestDetails.firstName}
            onChange={(e) => updateGuestDetails({ firstName: e.target.value })}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={state.guestDetails.lastName}
            onChange={(e) => updateGuestDetails({ lastName: e.target.value })}
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={state.guestDetails.email}
          onChange={(e) => updateGuestDetails({ email: e.target.value })}
          placeholder="Enter work email"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={state.guestDetails.phone}
          onChange={(e) => updateGuestDetails({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div>
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