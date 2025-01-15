import React from 'react'
import { Filter, Search, Calendar, Download, MapPin } from 'lucide-react'
import Button from "@/components/Button/button"
import Input from "@/components/Input/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ReportsLayout } from '@/layouts//ReportsLayout/ReportsLayout'
import { QuickStats } from '@/features/reports/QuickStats/QuickStats'
import { useReportsState, TripData } from '@/api/hooks/useReportsState'
import './Reports.scss';

const Reports: React.FC = () => {
  const { state, setActiveTab, setDateFilter } = useReportsState();

  const renderTripDetails = (trip: TripData) => (
    <div key={trip.id} className="trip-details">
      <div className="trip-details__header">
        <div className="trip-details__guest">
          <div className="trip-details__avatar">
            <span>{trip.guest.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="trip-details__guest-info">
            <div className="trip-details__guest-name">{trip.guest.name}</div>
            <div className="trip-details__guest-email">{trip.guest.email}</div>
            <span className="trip-details__guest-type">{trip.guest.type}</span>
          </div>
        </div>
        <div className="trip-details__cost">
          <div className="trip-details__cost-value">${trip.cost}</div>
          <span className={`trip-details__status trip-details__status--${trip.status.toLowerCase()}`}>
            {trip.status}
          </span>
        </div>
      </div>
      <div className="trip-details__meta">
        <div className="trip-details__dates">
          <Calendar className="trip-details__icon" />
          <span>{trip.dates.start} - {trip.dates.end}</span>
        </div>
        <div className="trip-details__location">
          <MapPin className="trip-details__icon" />
          <span>{trip.origin} → {trip.destination}</span>
        </div>
      </div>
      <button className="trip-details__view-more">
        View Full Details →
      </button>
    </div>
  );

  return (
    <ReportsLayout>
      <QuickStats />

      <div className="reports">
        <nav className="reports__tabs">
          <button
            onClick={() => setActiveTab('trips')}
            className={`reports__tab ${state.activeTab === 'trips' ? 'reports__tab--active' : ''}`}
          >
            Trip History
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`reports__tab ${state.activeTab === 'billing' ? 'reports__tab--active' : ''}`}
          >
            Billing
          </button>
        </nav>
        

        {/* Filters */}
        <div className="reports__filters">
          <div className="reports__filters-left">
            <div className="reports__search">
              <Search className="reports__search-icon" />
              <Input
                type="text"
                placeholder="Search trips..."
                className="reports__search-input"
              />
            </div>
            <select 
              className="reports__date-filter"
              value={state.dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastYear">Last year</option>
              <option value="custom">Custom range</option>
            </select>
            <Button variant="outline" className="reports__filter-button">
              <Filter className="reports__button-icon" />
              <span>More Filters</span>
            </Button>
          </div>
          <Button variant="outline" className="reports__export-button">
            <Download className="reports__button-icon" />
            <span>Export</span>
          </Button>
        </div>

        {state.activeTab === 'trips' ? (
          <Card>
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>View and manage all guest travel arrangements</CardDescription>
            </CardHeader>
            <CardContent className="reports__trips">
              {state.tripData.map(trip => renderTripDetails(trip))}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="reports__spending">
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>Track your travel spending over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="reports__chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={state.spendingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Billing details cards remain unchanged */}
          </>
        )}
      </div>
    </ReportsLayout>
  );
};

export default Reports;