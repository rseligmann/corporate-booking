import React from 'react';
import { Input } from "@/components/Input"; 
import { Label } from "@/components/Label/label";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './ItineraryForm.scss';

export const ItineraryForm: React.FC = () => {
  const { state, updateItineraryDetails } = useGuestInviteState();

  return (
    <div className="itinerary-form">
      <div className="itinerary-form__location-group">
        <div className="form-field">
          <Label htmlFor="origin">Origin Location</Label>
          <Input
            id="origin"
            value={state.itineraryDetails.origin}
            onChange={(e) => updateItineraryDetails({ origin: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
        <div className="form-field">
          <Label htmlFor="destination">Destination Location</Label>
          <Input
            id="destination"
            value={state.itineraryDetails.destination}
            onChange={(e) => updateItineraryDetails({ destination: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
      </div>

      <div className="itinerary-form__schedule-group">
        <div className="form-field">
          <Label htmlFor="firstMeetingStart">First Meeting Start</Label>
          <Input
            id="firstMeetingStart"
            type="datetime-local"
            value={state.itineraryDetails.firstMeetingStart}
            onChange={(e) => updateItineraryDetails({ firstMeetingStart: e.target.value })}
          />
        </div>
        <div className="form-field">
          <Label htmlFor="lastMeetingEnd">Last Meeting End</Label>
          <Input
            id="lastMeetingEnd"
            type="datetime-local"
            value={state.itineraryDetails.lastMeetingEnd}
            onChange={(e) => updateItineraryDetails({ lastMeetingEnd: e.target.value })}
          />
        </div>
      </div>

      <EstimatedBudget />
    </div>
  );
};