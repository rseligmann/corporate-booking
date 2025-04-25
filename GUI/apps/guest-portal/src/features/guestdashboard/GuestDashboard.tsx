import React from 'react';
import { IntroCard, WeatherForecast, TripOverview } from '@/features/guestdashboard/components';
import { useAuthGuest } from '@/contexts/AuthContextGuest';
import { useGetGuestTrips } from '@corporate-travel-frontend/api/hooks'
import { AlertCircle, ChevronRight } from 'lucide-react';
import { Card, Space } from '@mantine/core';
import { Button } from '@mantine/core';
import classes from './GuestDashboard.module.scss';

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
  tripStatus: TripStatus;
}

const GuestDashboard: React.FC<GuestDashboardProps> = ({
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
        return classes.statusConfirmed;
      case 'completed':
        return classes.statusCompleted;
      case 'in-progress':
        return classes.statusInProgress;
      default:
        return classes.statusPending;
    }
  };

  return (
    <div className={classes.guestDashboard}>
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

      <div className={classes.actionCards}>
        <Card className={classes.card}>
          <div className={`${classes.actionItem} ${getStatusClass(tripStatus.flight.status)}`}>
            <div className={classes.actionContent}>
              <h3>Flight Booking</h3>
              <p>{tripStatus.flight.details || 'Action required'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/flights'}
              rightSection={<ChevronRight className={classes.actionButtonIcon}/>}
            >
              <span>Manage Flight</span>
            </Button>
          </div>
        </Card>

        <Card className={classes.card}>
          <div className={`${classes.actionItem}  ${getStatusClass(tripStatus.hotel.status)}`}>
            <div className={classes.actionContent}>
              <h3>Hotel Booking</h3>
              <p>{tripStatus.hotel.details || 'View accommodation details'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/hotel'}
              rightSection={<ChevronRight className={classes.actionButtonIcon}/>}
            >
              <span>Manage Hotel</span>
            </Button>
          </div>
        </Card>

        <Card className={classes.card}>
          <div className={`${classes.actionItem}  ${getStatusClass(tripStatus.transport.status)}`}>
            <div className={classes.actionContent}>
              <h3>Ground Transport</h3>
              <p>{tripStatus.transport.details || 'Set up transportation'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/transport'}
              rightSection={<ChevronRight className={classes.actionButtonIcon}/>}
            >
              <span>Arrange Transport</span>
            </Button>
          </div>
        </Card>

        <Card className={classes.card}>
          <div className={`${classes.actionItem}  ${getStatusClass(tripStatus.expenses.status)}`}>
            <div className={classes.actionContent}>
              <h3>Expenses</h3>
              <p>{tripStatus.expenses.details || 'Track your expenses'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/expenses'}
              rightSection={<ChevronRight className={classes.actionButtonIcon}/>}
            >
              <span>Manage Expenses</span>
            </Button>
          </div>
        </Card>
      </div>

      <Space h='md'/>

      <WeatherForecast
        tripsData = {tripsData}
      />

      <Space h='md'/>

      <Card className={classes.card}>
          <div className={classes.notificationHeader}>
            <AlertCircle className={classes.notificationIcon} />
            <h3>Important Reminders</h3>
          </div>
          <ul className={classes.notificationList}>
            <li className={classes.notificationItem}>Complete your flight booking at least 2 weeks before departure</li>
            <li className={classes.notificationItem}>Download required travel apps before your trip</li>
            <li className={classes.notificationItem}>Submit expenses within 30 days of trip completion</li>
          </ul>
      </Card>
    </div>
  );
};

export default GuestDashboard;