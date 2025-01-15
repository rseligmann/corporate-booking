import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card/card";
import { User, MapPin, Calendar, Plane, Hotel, Car, DollarSign } from 'lucide-react';
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './ReviewForm.scss';

export const ReviewForm: React.FC = () => {
  const { state } = useGuestInviteState();

  const SummaryItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="summary-item">
      {icon}
      <div className="summary-item__content">
        <div className="summary-item__title">{title}</div>
        {children}
      </div>
    </div>
  );

  const PreferenceItem: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ icon, children }) => (
    <div className="preference-item">
      {icon}
      <span className="preference-item__text">{children}</span>
    </div>
  );

  return (
    <div className="review-form">
      <Card>
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
          <CardDescription>Review all details before sending invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="review-form__content">
            <SummaryItem 
                icon={<User className="summary-item__icon" />} 
                title="Guest Information"
              >
                <div className="summary-item__detail">
                  {state.guestDetails.firstName} {state.guestDetails.lastName}
                </div>
                <div className="summary-item__detail">{state.guestDetails.email}</div>
                <div className="summary-item__detail">{state.guestDetails.guestType}</div>
            </SummaryItem>

            <SummaryItem 
                icon={<MapPin className="summary-item__icon" />} 
                title="Location Details"
              >
                <div className="summary-item__detail">From: {state.itineraryDetails.origin}</div>
                <div className="summary-item__detail">To: {state.itineraryDetails.destination}</div>
            </SummaryItem>

            <SummaryItem 
                icon={<Calendar className="summary-item__icon" />} 
                title="Schedule"
              >
                <div className="summary-item__detail">
                  First Meeting: {state.itineraryDetails.firstMeetingStart}
                </div>
                <div className="summary-item__detail">
                  Last Meeting: {state.itineraryDetails.lastMeetingEnd}
                </div>
            </SummaryItem>

            <div className="preferences-section">
                <div className="preferences-section__title">Travel Preferences</div>
                <div className="preferences-section__grid">
                  <PreferenceItem icon={<Plane className="preference-item__icon" />}>
                      Flight ({state.travelPreferences.flightCabinClass})
                    </PreferenceItem>
                    <PreferenceItem icon={<Hotel className="preference-item__icon" />}>
                      Hotel ({state.travelPreferences.hotelQuality})
                    </PreferenceItem>
                    <PreferenceItem icon={<Car className="preference-item__icon" />}>
                      {state.travelPreferences.groundTransportService} (
                      {state.travelPreferences.groundTransportClass})
                    </PreferenceItem>
                    <PreferenceItem icon={<DollarSign className="preference-item__icon" />}>
                      Per Diem (${state.travelPreferences.perDiemAmount}/day)
                    </PreferenceItem>
                </div>
              </div>

            <EstimatedBudget />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};