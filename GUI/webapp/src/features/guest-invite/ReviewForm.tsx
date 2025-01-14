import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, MapPin, Calendar, Plane, Hotel, Car, DollarSign } from 'lucide-react';
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from './EstimatedBudget';

export const ReviewForm: React.FC = () => {
  const { state } = useGuestInviteState();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
          <CardDescription>Review all details before sending invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <div className="font-medium">Guest Information</div>
                <div className="text-sm text-gray-600">{state.guestDetails.firstName} {state.guestDetails.lastName}</div>
                <div className="text-sm text-gray-600">{state.guestDetails.email}</div>
                <div className="text-sm text-gray-600">{state.guestDetails.guestType}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <div className="font-medium">Location Details</div>
                <div className="text-sm text-gray-600">From: {state.itineraryDetails.origin}</div>
                <div className="text-sm text-gray-600">To: {state.itineraryDetails.destination}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <div className="font-medium">Schedule</div>
                <div className="text-sm text-gray-600">First Meeting: {state.itineraryDetails.firstMeetingStart}</div>
                <div className="text-sm text-gray-600">Last Meeting: {state.itineraryDetails.lastMeetingEnd}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="font-medium mb-3">Travel Preferences</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Flight ({state.travelPreferences.flightCabinClass})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hotel className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Hotel ({state.travelPreferences.hotelQuality})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {state.travelPreferences.groundTransportService} ({state.travelPreferences.groundTransportClass})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Per Diem (${state.travelPreferences.perDiemAmount}/day)</span>
                </div>
              </div>
            </div>

            <EstimatedBudget />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};