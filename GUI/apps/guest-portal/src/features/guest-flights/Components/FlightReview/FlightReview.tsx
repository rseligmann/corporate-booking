import React from 'react';
import { Alert, Button, Card } from '@mantine/core';
import { Plane, Calendar, User, MapPin, CreditCard, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './FlightReview.scss';

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

interface PassengerInfo {
    basicInfo: {
        firstName: string;
        middleName: string;
        lastName: string;
        dateOfBirth: string;
        gender: string;
        email: string;
        phone: string;
      };
      travelDocuments: {
        passportNumber: string;
        passportExpiry: string;
        passportCountry: string;
        knownTravelerNumber?: string;
        redressNumber?: string;
      };
      additionalInfo: {
        frequentFlyerNumber?: string;
        mealPreference?: string;
        specialAssistance: string[];
      };
      emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
      };
    }

interface SeatSelection {
  outbound: string;
  return: string;
}

interface FlightReviewProps {
  bookingData: {
    outbound: Flight;
    return: Flight;
    passenger: PassengerInfo;
    seats: SeatSelection;
  };
  onConfirm: () => void;
}

export const FlightReview: React.FC<FlightReviewProps> = ({
  bookingData,
  onConfirm
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderFlightSummary = (flight: Flight, type: 'outbound' | 'return', seatNumber: string) => (
    <div className="flight-summary">
      <div className="flight-header">
        <div className="flight-type">
          <Plane className="icon" />
          <span>{type === 'outbound' ? 'Outbound Flight' : 'Return Flight'}</span>
        </div>
        <div className="flight-price">${flight.price}</div>
      </div>

      <div className="flight-details">
        <div className="airline-info">
          <div className="airline-logo">
            {flight.airline.substring(0, 2)}
          </div>
          <div>
            <div className="airline-name">{flight.airline}</div>
            <div className="flight-number">{flight.flightNumber}</div>
          </div>
        </div>

        <div className="journey-details">
          <div className="time-location">
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
        </div>

        <div className="flight-extras">
          <div className="detail">
            <Calendar className="icon" />
            <span>{formatDate(flight.departureTime)}</span>
          </div>
          <div className="detail">
            <MapPin className="icon" />
            <span>Seat {seatNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPassengerInfo = (passenger: PassengerInfo) => (
    <div className="passenger-info">
      <div className="section-title">
        <User className="icon" />
        <h3>Passenger Information</h3>
      </div>

      <div className="info-grid">
        <div className="info-group">
          <label>Full Name</label>
          <div>{passenger.basicInfo.firstName} {passenger.basicInfo.lastName}</div>
        </div>
        <div className="info-group">
          <label>Date of Birth</label>
          <div>{formatDate(passenger.basicInfo.dateOfBirth)}</div>
        </div>
        <div className="info-group">
          <label>Email</label>
          <div>{passenger.basicInfo.email}</div>
        </div>
        <div className="info-group">
          <label>Phone</label>
          <div>{passenger.basicInfo.phone}</div>
        </div>
        {passenger.travelDocuments.passportNumber && (
          <>
            <div className="info-group">
              <label>Passport Number</label>
              <div>{passenger.travelDocuments.passportNumber}</div>
            </div>
            <div className="info-group">
              <label>Passport Expiry</label>
              <div>{formatDate(passenger.travelDocuments.passportExpiry)}</div>
            </div>
          </>
        )}
      </div>

      {passenger.additionalInfo.specialAssistance && passenger.additionalInfo.specialAssistance.length > 0 && (
        <div className="special-requests">
          <label>Special Requests</label>
          <div>{passenger.additionalInfo.specialAssistance.join(', ')}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flight-review">
      <Alert
        variant="info"
        title="Please Review Your Booking"
        icon={<AlertCircle />}
      >
        Check all details carefully before confirming your booking. Changes after confirmation may incur fees.
      </Alert>

      <div className="review-sections">
        {renderFlightSummary(bookingData.outbound, 'outbound', bookingData.seats.outbound)}
        {renderFlightSummary(bookingData.return, 'return', bookingData.seats.return)}
        
        <Card>
          {renderPassengerInfo(bookingData.passenger)}
        </Card>

        <div className="price-summary">
          <div className="price-row">
            <span>Outbound Flight</span>
            <span>${bookingData.outbound.price}</span>
          </div>
          <div className="price-row">
            <span>Return Flight</span>
            <span>${bookingData.return.price}</span>
          </div>
          <div className="price-row taxes">
            <span>Taxes & Fees</span>
            <span>${((bookingData.outbound.price + bookingData.return.price) * 0.1).toFixed(2)}</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>${(
              bookingData.outbound.price +
              bookingData.return.price +
              (bookingData.outbound.price + bookingData.return.price) * 0.1
            ).toFixed(2)}</span>
          </div>
        </div>

        <div className="booking-actions">
          <Button
            onClick={onConfirm}
            className="confirm-button"
          >
            <CheckCircle className="icon" />
            Confirm Booking
          </Button>
          <div className="payment-note">
            <CreditCard className="icon" />
            <span>Your payment details have been pre-authorized</span>
          </div>
        </div>
      </div>
    </div>
  );
};