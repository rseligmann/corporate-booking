// src/pages/Dashboard/Dashboard.tsx
//import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, UserCheck, AlertCircle, Search, Filter, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card/card';
import Button  from '../../components/Button/button';
import  Input  from '../../components/Input/input';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../../components/Table/table';
import { Avatar } from '../../components/Avatar/avatar';
import './Dashboard.scss';

// Example recent trips data remains the same
const exampleTrips = [
  // ... your existing trips data
  {
    id: 1,
    guest: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    type: 'Interview',
    dates: 'May 15 - May 17, 2023',
    duration: '3 days',
    status: 'Completed',
  },
  {
    id: 2,
    guest: {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    type: 'Conference',
    dates: 'Jun 1 - Jun 5, 2023',
    duration: '5 days',
    status: 'In Progress',
  },
  {
    id: 3,
    guest: {
      name: 'Carol Davis',
      email: 'carol@example.com',
    },
    type: 'Training',
    dates: 'Jun 10 - Jun 14, 2023',
    duration: '5 days',
    status: 'Upcoming',
  },
  {
    id: 4,
    guest: {
      name: 'David Wilson',
      email: 'david@example.com',
    },
    type: 'Client Meeting',
    dates: 'May 20 - May 21, 2023',
    duration: '2 days',
    status: 'Completed',
  },
  {
    id: 5,
    guest: {
      name: 'Eva Brown',
      email: 'eva@example.com',
    },
    type: 'Interview',
    dates: 'Jun 7 - Jun 8, 2023',
    duration: '2 days',
    status: 'Upcoming',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__title-group">
            <h1 className="dashboard__title">Welcome back, Sarah</h1>
            <p className="dashboard__subtitle">Manage your guest travel arrangements</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/guest-invite'}
            className="dashboard__new-invite-btn"
          >
            <UserPlus size={20} />
            <span>New Guest Invite</span>
          </Button>
        </div>

        <div className="dashboard__stats">
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Pending Arrivals</CardTitle>
                <Clock className="stats-card__icon" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">12</div>
              <p className="stats-card__subtitle">Next arrival in 2 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Active Guests</CardTitle>
                <UserCheck className="stats-card__icon" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">8</div>
              <p className="stats-card__subtitle">3 checking out today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Requires Attention</CardTitle>
                <AlertCircle className="stats-card__icon stats-card__icon--warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">2</div>
              <p className="stats-card__subtitle stats-card__subtitle--warning">Flight delays detected</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard__trips">
          <CardHeader>
            <div className="trips-header">
              <div className="trips-header__titles">
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Overview of your latest guest arrangements</CardDescription>
              </div>
              <div className="trips-header__actions">
                <div className="search-input">
                  <Search className="search-input__icon" />
                  <Input
                    type="text"
                    placeholder="Search trips..."
                    className="search-input__field"
                  />
                </div>
                <Button variant="outline" className="filter-button">
                  <Filter />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table striped hoverable>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Guest</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Dates</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <div className="guest-info">
                        <Avatar
                            //alt={trip.guest.name}
                            //fallback={trip.guest.name.substring(0, 2)}
                            //size="sm"
                            fallback={trip.guest.name.substring(0, 2)}
                            size="sm"
                        />
                        <div className="guest-info__details">
                          <div className="guest-info__name">{trip.guest.name}</div>
                          <div className="guest-info__email">{trip.guest.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="trip-type">{trip.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="trip-dates">
                        <div className="trip-dates__range">{trip.dates}</div>
                        <div className="trip-dates__duration">{trip.duration}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`trip-status trip-status--${trip.status.toLowerCase()}`}>
                        {trip.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link to={`/trips/${trip.id}`} className="view-details-link">
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;