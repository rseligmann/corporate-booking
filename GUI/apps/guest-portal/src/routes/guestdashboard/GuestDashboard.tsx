import React from 'react';
import './GuestDashboard.scss';
import { MapPin, Calendar, AlertCircle, ChevronRight, Plane, Building2, Car, Receipt, HelpCircle } from 'lucide-react';
import { Card } from '@mantine/core';
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
  guestName: string;
  tripDates: {
    start: string;
    end: string;
  };
  location: {
    origin: string;
    destination: string;
  };
  weather?: {
    temperature: string;
    condition: string;
    icon: string;
  };
  tripStatus: TripStatus;
  onActionClick: (action: string) => void;
}

const GuestDashboard: React.FC<GuestDashboardProps> = ({
  guestName,
  tripDates,
  location,
  weather,
  tripStatus,
  onActionClick
}) => {
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

  const calculateDaysUntilTrip = () => {
    const start = new Date(tripDates.start);
    const today = new Date();
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="guest-dashboard">
        <div className="introduction-section">
        <Card>
          <div className="intro-content">
            <div className="intro-header">
              <div className="welcome-info">
                <h1>Welcome, {guestName}</h1>
                <p className="trip-countdown">{calculateDaysUntilTrip()} days until your trip</p>
                <p className="intro-description">
                  This is your personal dashboard for managing all aspects of your upcoming visit. Here's what you can do:
                </p>
              </div>
              {weather && (
                <div className="weather-widget">
                  <img src={weather.icon} alt={weather.condition} />
                  <div className="weather-details">
                    <span className="temperature">{weather.temperature}</span>
                    <span className="condition">{weather.condition}</span>
                  </div>
                </div>
              )}
            </div>
            <ul className="intro-features">
              <li>
                <Plane className="feature-icon" />
                <span>Book flights</span>
              </li>
              <li>
                <Building2 className="feature-icon" />
                <span>View hotel details</span>
              </li>
              <li>
                <Car className="feature-icon" />
                <span>Set up ground transportation</span>
              </li>
              <li>
                <Receipt className="feature-icon" />
                <span>Submit travel expenses</span>
              </li>
            </ul>
            <p className="intro-help">
              <HelpCircle className="help-icon" />
              Need help? Contact your travel coordinator or click the support button in the top right corner.
            </p>
          </div>
        </Card>
      </div>

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