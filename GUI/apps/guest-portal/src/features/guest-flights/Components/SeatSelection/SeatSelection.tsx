import React, { useState } from 'react';
import { Button, Card, Text } from '@mantine/core';
import { Info } from 'lucide-react';
import './SeatSelection.scss';

interface Seat {
  id: string;
  row: number;
  column: string;
  type: 'standard' | 'exit' | 'preferred' | 'bassinet';
  available: boolean;
  price?: number;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  departureAirport: string;
  arrivalAirport: string;
}

interface SeatSelectionProps {
  outboundFlight: Flight | null;
  returnFlight: Flight | null;
  onComplete: (seatData: { outbound: string | null; return: string | null }) => void;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  outboundFlight,
  returnFlight,
  onComplete
}) => {
  const [selectedSeats, setSelectedSeats] = useState<{
    outbound: string | null;
    return: string | null;
  }>({
    outbound: null,
    return: null
  });
  const [currentFlight, setCurrentFlight] = useState<'outbound' | 'return'>('outbound');

  // Example seat map data - in real app, this would come from an API
  const generateSeatMap = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = 30;
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let row = 1; row <= rows; row++) {
      for (let col of columns) {
        const isExit = row === 15 || row === 16;
        const isPreferred = row <= 5;
        seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          type: isExit ? 'exit' : isPreferred ? 'preferred' : 'standard',
          available: Math.random() > 0.3, // Randomly mark some seats as unavailable
          price: isPreferred ? 25 : isExit ? 15 : 0
        });
      }
    }
    return seats;
  };

  const seatMap = generateSeatMap();

  const handleSeatSelect = (seat: Seat) => {
    if (!seat.available) return;

    setSelectedSeats(prev => ({
      ...prev,
      [currentFlight]: prev[currentFlight] === seat.id ? null : seat.id
    }));
  };

  const handleContinue = () => {
    if (currentFlight === 'outbound' && returnFlight) {
      setCurrentFlight('return');
    } else {
      onComplete(selectedSeats);
    }
  };

  const renderSeatMap = () => {
    const rows = Array.from(new Set(seatMap.map(seat => seat.row))).sort((a, b) => a - b);
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
      <div className="seat-map">
        <div className="seat-labels">
          <div className="row-labels">
            {rows.map(row => (
              <div key={row} className="row-number">{row}</div>
            ))}
          </div>
          <div className="seat-grid">
            {rows.map(row => (
              <div key={row} className="seat-row">
                {columns.map(col => {
                  const seat = seatMap.find(s => s.row === row && s.column === col);
                  if (!seat) return null;

                  return (
                    <button
                      key={`${row}${col}`}
                      className={`seat ${seat.type} ${
                        !seat.available ? 'unavailable' : ''
                      } ${
                        selectedSeats[currentFlight] === seat.id ? 'selected' : ''
                      }`}
                      onClick={() => handleSeatSelect(seat)}
                      disabled={!seat.available}
                      title={`Seat ${row}${col}${
                        seat.price ? ` (+$${seat.price})` : ''
                      }`}
                    >
                      <span className="seat-label">{col}</span>
                      {(seat.price ?? 0) > 0 && <span className="seat-price">${seat.price}</span>}
                    </button>
                  );
                })}
                {row % 1 === 0 && <div className="aisle" />}
              </div>
            ))}
          </div>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="seat-example standard"></div>
            <span>Standard Seat</span>
          </div>
          <div className="legend-item">
            <div className="seat-example preferred"></div>
            <span>Preferred Seat (+$25)</span>
          </div>
          <div className="legend-item">
            <div className="seat-example exit"></div>
            <span>Exit Row (+$15)</span>
          </div>
          <div className="legend-item">
            <div className="seat-example unavailable"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    );
  };

  const currentFlightData = currentFlight === 'outbound' ? outboundFlight : returnFlight;

  return (
    <div className="seat-selection">
      <Card>
        <div>
          <Text>
            Select your seat - {currentFlight === 'outbound' ? 'Outbound' : 'Return'} Flight
          </Text>
          <div className="flight-info">
            <span>{currentFlightData?.airline} {currentFlightData?.flightNumber}</span>
            <span>{currentFlightData?.departureAirport} → {currentFlightData?.arrivalAirport}</span>
          </div>
        </div>
        <div>
          <div className="info-banner">
            <Info className="icon" />
            <p>
              Select your preferred seat from the available options below. 
              Exit row seats have extra legroom but require you to assist in emergencies.
            </p>
          </div>

          {renderSeatMap()}

          <div className="selection-actions">
            {selectedSeats[currentFlight] && (
              <div className="selected-seat-info">
                Selected Seat: {selectedSeats[currentFlight]}
              </div>
            )}
            <Button
              onClick={handleContinue}
              disabled={!selectedSeats[currentFlight]}
            >
              {currentFlight === 'outbound' && returnFlight 
                ? 'Continue to Return Flight'
                : 'Confirm Seat Selection'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};