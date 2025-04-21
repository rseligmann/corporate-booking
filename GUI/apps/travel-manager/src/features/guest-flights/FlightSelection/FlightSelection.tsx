import React, { useState } from 'react';
import { Input } from '@mantine/core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Clock, Filter, Plane, Search, ArrowRight } from 'lucide-react';
import Button from '@/components/Button/button';
import './FlightSelection.scss';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  aircraft: string;
  departureAirport: string;
  arrivalAirport: string;
}

interface FlightSelectionProps {
  type: 'outbound' | 'return';
  outboundFlight?: Flight | null;
  onSelect: (flight: Flight) => void;
}

export const FlightSelection: React.FC<FlightSelectionProps> = ({
  type,
  outboundFlight,
  onSelect
}) => {
  const [sortBy, setSortBy] = useState('price');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // Example flight data - in real app, this would come from an API
  const flights: Flight[] = [
    {
      id: '1',
      airline: 'United Airlines',
      flightNumber: 'UA123',
      departureTime: '08:00',
      arrivalTime: '11:30',
      duration: '3h 30m',
      stops: 0,
      price: 299,
      aircraft: 'Boeing 737',
      departureAirport: 'SFO',
      arrivalAirport: 'JFK'
    },
    {
      id: '2',
      airline: 'Delta Airlines',
      flightNumber: 'DL456',
      departureTime: '10:15',
      arrivalTime: '13:45',
      duration: '3h 30m',
      stops: 1,
      price: 275,
      aircraft: 'Airbus A320',
      departureAirport: 'SFO',
      arrivalAirport: 'JFK'
    },
  ];

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const handleContinue = () => {
    if (selectedFlight) {
      onSelect(selectedFlight);
    }
  };

  return (
    <div className="flight-selection">
      <div className="search-filters">
        <div className="search-box">
          <Search className="search-icon" />
          <Input
            type="text"
            placeholder="Search flights..."
            className="search-input"
          />
        </div>

        <div className="filters">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="departure">Departure Time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="filter-button">
            <Filter className="icon" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <div className="flights-list">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}
            onClick={() => handleFlightSelect(flight)}
          >
            <div className="flight-header">
              <div className="airline-info">
                <div className="airline-logo">
                  {flight.airline.substring(0, 2)}
                </div>
                <div>
                  <div className="airline-name">{flight.airline}</div>
                  <div className="flight-number">{flight.flightNumber}</div>
                </div>
              </div>
              <div className="price">${flight.price}</div>
            </div>

            <div className="flight-details">
              <div className="time-info">
                <div className="departure">
                  <div className="time">{flight.departureTime}</div>
                  <div className="airport">{flight.departureAirport}</div>
                </div>

                <div className="flight-path">
                  <div className="duration">
                    <Clock className="icon" />
                    {flight.duration}
                  </div>
                  <div className="path">
                    <div className="line"></div>
                    <Plane className="plane-icon" />
                    {flight.stops > 0 && (
                      <div className="stops">{flight.stops} stop</div>
                    )}
                  </div>
                </div>

                <div className="arrival">
                  <div className="time">{flight.arrivalTime}</div>
                  <div className="airport">{flight.arrivalAirport}</div>
                </div>
              </div>

              <div className="flight-info">
                <div className="detail">
                  <span className="label">Aircraft:</span>
                  <span>{flight.aircraft}</span>
                </div>
                {flight.stops > 0 && (
                  <div className="detail warning">
                    <span>Connection required</span>
                  </div>
                )}
              </div>
            </div>

            {selectedFlight?.id === flight.id && (
              <div className="selected-indicator">
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="selection-actions">
        <Button
          onClick={handleContinue}
          disabled={!selectedFlight}
          className="continue-button"
        >
          Continue with Selected Flight
          <ArrowRight className="icon" />
        </Button>
      </div>
    </div>
  );
};