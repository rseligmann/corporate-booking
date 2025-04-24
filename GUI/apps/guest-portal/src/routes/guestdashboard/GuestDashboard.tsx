import React from 'react';
import './GuestDashboard.scss';
import { IntroCard, WeatherForecast, TripOverview } from '@/features/guestdashboard/components';
import { useAuthGuest } from '@/contexts/AuthContextGuest';
import { useGetGuestTrips } from '@corporate-travel-frontend/api/hooks'
import { MapPin, Calendar, AlertCircle, ChevronRight } from 'lucide-react';
import { Card, Space } from '@mantine/core';
import { Button } from '@mantine/core';

interface TripStatus {
  flight: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  hotel: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  transport: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  expenses: {
    status: 'pending' | 'in-progress' | 'submitted';
    details?: string;
  };
}

interface GuestDashboardProps {
  tripDates: {
    start: string;
    end: string;
  };
  location: {
    origin: string;
    destination: string;
  };
  tripStatus: TripStatus;
}

const GuestDashboard: React.FC<GuestDashboardProps> = ({
  tripDates,
  location,
  tripStatus,
}) => {

  const { authState } = useAuthGuest()
  const userFirstName = authState.user?.first_name || '';
  const userLastName = authState.user?.last_name || '';
  const userId = authState.user?.user_id || '';

  const { data: tripsData, isSuccess: isTripsSuccess, isPending: isTripsPending, error: tripsError } = useGetGuestTrips(userId)

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="guest-dashboard">
      <IntroCard
        firstName = {userFirstName}
        lastName = {userLastName}
        tripsData = {tripsData}
      />

      <Space h='md'/>

      <TripOverview
        tripsData={tripsData}
      />

      <Space h='md'/>

      <div className="trip-overview">
        <Card>
          <div className="trip-details">
            <div className="detail-item">
              <Calendar className="icon" />
              <div className="detail-content">
                <span className="label">Trip Dates</span>
                <span className="value">{tripDates.start} - {tripDates.end}</span>
              </div>
            </div>
            <div className="detail-item">
              <MapPin className="icon" />
              <div className="detail-content">
                <span className="label">Location</span>
                <span className="value">{location.origin} → {location.destination}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="action-cards">
        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.flight.status)}`}>
            <div className="action-content">
              <h3>Flight Booking</h3>
              <p>{tripStatus.flight.details || 'Action required'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/flights'}
              className="action-button"
            >
              <span>Manage Flight</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>

        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.hotel.status)}`}>
            <div className="action-content">
              <h3>Hotel Details</h3>
              <p>{tripStatus.hotel.details || 'View accommodation details'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/hotel'}
              className="action-button"
            >
              <span>View Hotel</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>

        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.transport.status)}`}>
            <div className="action-content">
              <h3>Ground Transport</h3>
              <p>{tripStatus.transport.details || 'Set up transportation'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/transport'}
              className="action-button"
            >
              <span>Arrange Transport</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>

        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.expenses.status)}`}>
            <div className="action-content">
              <h3>Expenses</h3>
              <p>{tripStatus.expenses.details || 'Track your expenses'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/expenses'}
              className="action-button"
            >
              <span>Manage Expenses</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>
      </div>

      <WeatherForecast
        tripsData = {tripsData}
      />

      <Space h='md'/>

      <div className="notifications">
        <Card>
          <div className="notification-header">
            <AlertCircle className="icon" />
            <h3>Important Reminders</h3>
          </div>
          <ul className="notification-list">
            <li>Complete your flight booking at least 2 weeks before departure</li>
            <li>Download required travel apps before your trip</li>
            <li>Submit expenses within 30 days of trip completion</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default GuestDashboard;