import React from 'react';
import { Building2, Calendar, MapPin, Users, Check, Clock } from 'lucide-react';
import { Card, Button, Text } from "@mantine/core";
import './GuestHotel.scss';

interface HotelDetails {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  confirmationNumber: string;
  status: 'confirmed' | 'pending' | 'completed';
  amenities: string[];
  importantInfo: string[];
}

const GuestHotel: React.FC = () => {
  // This would eventually come from your API
  const hotelDetails: HotelDetails = {
    name: "Hilton Downtown",
    address: "123 Business District, New York, NY 10001",
    checkIn: "Feb 15, 2024 - 3:00 PM",
    checkOut: "Feb 20, 2024 - 11:00 AM",
    roomType: "King Bed Business Suite",
    confirmationNumber: "HT123456789",
    status: "confirmed",
    amenities: [
      "Free Wi-Fi",
      "Business Center",
      "24/7 Fitness Center",
      "Room Service",
      "Airport Shuttle"
    ],
    importantInfo: [
      "Photo ID required at check-in",
      "Credit card required for incidentals",
      "Non-smoking property",
      "Early check-in subject to availability"
    ]
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-badge--confirmed';
      case 'completed':
        return 'status-badge--completed';
      default:
        return 'status-badge--pending';
    }
  };

  return (
    <div className="guest-hotel">
      <div className="guest-hotel__header">
        <h1>Hotel Details</h1>
        <span className={`status-badge ${getStatusBadgeClass(hotelDetails.status)}`}>
          {hotelDetails.status === 'confirmed' && <Check size={16} />}
          {hotelDetails.status === 'pending' && <Clock size={16} />}
          {hotelDetails.status.charAt(0).toUpperCase() + hotelDetails.status.slice(1)}
        </span>
      </div>

      <div className="guest-hotel__content">
        <Card className="hotel-summary">
          <div>
            <div>
              <Building2 className="card-icon" />
              {hotelDetails.name}
            </div>
          </div>
          <div>
            <div className="hotel-summary__details">
              <div className="detail-item">
                <MapPin className="detail-icon" />
                <p>{hotelDetails.address}</p>
              </div>
              
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <div>
                  <p>Check-in: {hotelDetails.checkIn}</p>
                  <p>Check-out: {hotelDetails.checkOut}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <Users className="detail-icon" />
                <p>{hotelDetails.roomType}</p>
              </div>
            </div>

            <div className="confirmation-number">
              Confirmation Number: <strong>{hotelDetails.confirmationNumber}</strong>
            </div>

            <div className="action-buttons">
              <Button variant="default">
                Add to Calendar
              </Button>
              <Button variant="outline">
                View on Map
              </Button>
            </div>
          </div>
        </Card>

        <div className="hotel-info-grid">
          <Card>
            <div>
              <Text>Amenities</Text>
            </div>
            <div>
              <ul className="amenities-list">
                {hotelDetails.amenities.map((amenity, index) => (
                  <li key={index}>
                    <Check className="list-icon" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <div>
              <Text>Important Information</Text>
            </div>
            <div>
              <ul className="info-list">
                {hotelDetails.importantInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuestHotel;