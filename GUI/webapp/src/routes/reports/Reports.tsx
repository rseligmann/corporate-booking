import React from 'react'
import { Filter, Search, Calendar, Download, MapPin } from 'lucide-react'
import Button from "@/components/Button/button"
import { Input } from "@/components/Input"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ReportsLayout } from '@/layouts//ReportsLayout/ReportsLayout'
import { QuickStats } from '@/features/reports/QuickStats/QuickStats'
import { useReportsState, TripData } from '@/api/hooks/useReportsState'
import './Reports.scss';

const ReportsPage: React.FC = () => {
  const { state, setActiveTab, setDateFilter } = useReportsState();

  const renderTripDetails = (trip: TripData) => (
    <div key={trip.id} className="trip-details">
      <div className="trip-header">
        <div className="guest-info">
          <div className="avatar">
            <span>{trip.guest.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="guest-details">
            <div className="guest-name">{trip.guest.name}</div>
            <div className="guest-email">{trip.guest.email}</div>
            <span className="guest-type">{trip.guest.type}</span>
          </div>
        </div>
        <div className="trip-cost">
          <div className="cost-amount">${trip.cost}</div>
          <span className={`status-badge ${trip.status.toLowerCase()}`}>
            {trip.status}
          </span>
        </div>
      </div>
      <div className="trip-metadata">
        <div className="metadata-item">
          <Calendar className="icon" />
          <span>{trip.dates.start} - {trip.dates.end}</span>
        </div>
        <div className="metadata-item">
          <MapPin className="icon" />
          <span>{trip.origin} → {trip.destination}</span>
        </div>
      </div>
      <button className="view-details">
        View Full Details →
      </button>
    </div>
  );

  return (
    <ReportsLayout>
      <QuickStats />

      <div className="reports-container">
        <div className="tabs-container">
          <nav>
            <button
              onClick={() => setActiveTab('trips')}
              className={`tab-button ${state.activeTab === 'trips' ? 'active' : ''}`}
            >
              Trip History
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`tab-button ${state.activeTab === 'billing' ? 'active' : ''}`}
            >
              Billing
            </button>
          </nav>
        </div>

        <div className="filters-section">
          <div className="search-filters">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <Input
                type="text"
                placeholder="Search trips..."
                className="search-input"
              />
            </div>
            <select 
              className="date-filter"
              value={state.dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastYear">Last year</option>
              <option value="custom">Custom range</option>
            </select>
            <Button variant="outline" className="filter-button">
              <Filter className="icon" />
              <span>More Filters</span>
            </Button>
          </div>
          <Button variant="outline" className="export-button">
            <Download className="icon" />
            <span>Export</span>
          </Button>
        </div>

        {state.activeTab === 'trips' ? (
          <Card className="trips-card">
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>
                View and manage all guest travel arrangements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="trips-list">
                {state.tripData.map(trip => renderTripDetails(trip))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="spending-card">
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>
                  Track your travel spending over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="chart-container">
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
          </>
        )}
      </div>
    </ReportsLayout>
  );
};

export default ReportsPage;