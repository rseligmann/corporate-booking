import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import { Label } from "@/components/Label/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select";
import { Checkbox } from "@/components/Checkbox/checkbox";
import Input from "@/components/Input/input";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './PreferencesForm.scss';

export const PreferencesForm: React.FC = () => {
  const { state, updateTravelPreferences } = useGuestInviteState();

  return (
    <div className="preferences-form">
      <Card>
        <CardHeader>
          <CardTitle >Flight Details</CardTitle>
        </CardHeader>
        <CardContent className="preferences-section">
          <div className="form-field">
            <Label htmlFor="flightCabinClass">Cabin Class</Label>
            <Select
              value={state.travelPreferences.flightCabinClass}
              onValueChange={(value) => updateTravelPreferences({ flightCabinClass: value })}
            >
              <SelectTrigger id="flightCabinClass">
                <SelectValue placeholder="Select cabin class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="checkbox-group">
            <div className="checkbox-field">
              <Checkbox
                id="directFlights"
                checked={state.travelPreferences.directFlightsPreferred}
                onCheckedChange={(checked) => 
                  updateTravelPreferences({ directFlightsPreferred: checked as boolean })
                }
              />
              <Label htmlFor="directFlights" className="ml-2">Direct flights preferred</Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="refundableTickets"
                checked={state.travelPreferences.refundableTicketsOnly}
                onCheckedChange={(checked) => 
                  updateTravelPreferences({ refundableTicketsOnly: checked as boolean })
                }
              />
              <Label htmlFor="refundableTickets" className="ml-2">Refundable tickets only</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Hotel Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="hotelQuality">Hotel Quality</Label>
            <Select
              value={state.travelPreferences.hotelQuality}
              onValueChange={(value) => updateTravelPreferences({ hotelQuality: value })}
            >
              <SelectTrigger id="hotelQuality">
                <SelectValue placeholder="Select hotel quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-star">⭐⭐⭐ 3-star hotels</SelectItem>
                <SelectItem value="4-star">⭐⭐⭐⭐ 4-star hotels</SelectItem>
                <SelectItem value="5-star">⭐⭐⭐⭐⭐ 5-star hotels</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Ground Transport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="groundTransportService">Preferred Service</Label>
            <Select
              value={state.travelPreferences.groundTransportService}
              onValueChange={(value) => updateTravelPreferences({ groundTransportService: value })}
            >
              <SelectTrigger id="groundTransportService">
                <SelectValue placeholder="Select preferred service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uber">Uber</SelectItem>
                <SelectItem value="Lyft">Lyft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="groundTransportClass">Car Class</Label>
            <Select
              value={state.travelPreferences.groundTransportClass}
              onValueChange={(value) => updateTravelPreferences({ groundTransportClass: value })}
            >
              <SelectTrigger id="groundTransportClass">
                <SelectValue placeholder="Select car class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Per Diem</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="perDiemAmount">Daily Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <Input
                id="perDiemAmount"
                type="number"
                className="pl-8"
                value={state.travelPreferences.perDiemAmount}
                onChange={(e) => updateTravelPreferences({ perDiemAmount: Number(e.target.value) })}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <EstimatedBudget />
    </div>
  );
};