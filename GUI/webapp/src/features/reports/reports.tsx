import React from 'react'
import { Filter, Search, Calendar, Download, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ReportsLayout } from '@/layouts//ReportsLayout/ReportsLayout'
import { QuickStats } from '@/features/reports/QuickStats'
import { useReportsState, TripData } from '@/api/hooks/useReportsState'

const Reports: React.FC = () => {
  const { state, setActiveTab, setDateFilter } = useReportsState();

  const renderTripDetails = (trip: TripData) => (
    <div key={trip.id} className="p-4 border-b last:border-b-0">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {trip.guest.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium">{trip.guest.name}</div>
            <div className="text-sm text-gray-500">{trip.guest.email}</div>
            <span className="inline-block px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded-full mt-1">
              {trip.guest.type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-gray-900">${trip.cost}</div>
          <span className={`inline-block px-2 py-1 text-sm rounded-full mt-1 
            ${trip.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}
          >
            {trip.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{trip.dates.start} - {trip.dates.end}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{trip.origin} → {trip.destination}</span>
        </div>
      </div>
      <button className="mt-4 text-blue-600 text-sm hover:text-blue-800">
        View Full Details →
      </button>
    </div>
  );

  return (
    <ReportsLayout>
      <QuickStats />

      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('trips')}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                state.activeTab === 'trips'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trip History
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                state.activeTab === 'billing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Billing
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search trips..."
                className="pl-9 pr-4 w-64"
              />
            </div>
            <select 
              className="px-4 py-2 border rounded-lg text-sm bg-white"
              value={state.dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastYear">Last year</option>
              <option value="custom">Custom range</option>
            </select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>

        {state.activeTab === 'trips' ? (
          <Card>
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>
                View and manage all guest travel arrangements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {state.tripData.map(trip => renderTripDetails(trip))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>
                  Track your travel spending over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
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