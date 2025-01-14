import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from './EstimatedBudget';

export const ItineraryForm: React.FC = () => {
  const { state, updateItineraryDetails } = useGuestInviteState();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="origin">Origin Location</Label>
          <Input
            id="origin"
            value={state.itineraryDetails.origin}
            onChange={(e) => updateItineraryDetails({ origin: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
        <div>
          <Label htmlFor="destination">Destination Location</Label>
          <Input
            id="destination"
            value={state.itineraryDetails.destination}
            onChange={(e) => updateItineraryDetails({ destination: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstMeetingStart">First Meeting Start</Label>
          <Input
            id="firstMeetingStart"
            type="datetime-local"
            value={state.itineraryDetails.firstMeetingStart}
            onChange={(e) => updateItineraryDetails({ firstMeetingStart: e.target.value })}
          />
        </div>
        <div>
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