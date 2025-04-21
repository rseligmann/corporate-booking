import React from 'react';
import { MapPin, Car, Clock, AlertCircle } from 'lucide-react';
import { Button, Card, Text } from "@mantine/core";
import './GuestTransport.scss';

interface TransportLocation {
  type: 'pickup' | 'dropoff';
  name: string;
  address: string;
  time: string;
  instructions?: string;
}

interface TransportVoucher {
  code: string;
  service: 'Uber' | 'Lyft';
  status: 'pending' | 'active' | 'used';
  validFrom: string;
  validUntil: string;
  maxAmount: number;
}

interface GuestTransportProps {
  locations: TransportLocation[];
  vouchers: TransportVoucher[];
  onActivateVoucher: (code: string) => void;
  onLaunchApp: (service: string) => void;
}

const GuestTransport: React.FC<GuestTransportProps> = ({
  locations,
  vouchers,
  onActivateVoucher,
  onLaunchApp
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'used':
        return 'status-used';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="guest-transport">
      <div className="transport-header">
        <h1>Ground Transport</h1>
        <p>Manage your transportation arrangements</p>
      </div>

      <div className="transport-overview">
        <Card>
          <div>
            <Text>Transport Schedule</Text>
          </div>
          <div>
            <div className="location-timeline">
              {locations.map((location, index) => (
                <div key={index} className="location-item">
                  <div className="location-icon">
                    <MapPin className="icon" />
                  </div>
                  <div className="location-details">
                    <div className="location-type">
                      {location.type === 'pickup' ? 'Pick-up' : 'Drop-off'}
                    </div>
                    <h3 className="location-name">{location.name}</h3>
                    <p className="location-address">{location.address}</p>
                    <div className="location-time">
                      <Clock className="icon" />
                      {formatTime(location.time)}
                    </div>
                    {location.instructions && (
                      <p className="location-instructions">{location.instructions}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="transport-vouchers">
        <Card>
          <div>
            <Text>Transport Vouchers</Text>
          </div>
          <div>
            {vouchers.map((voucher, index) => (
              <div key={index} className={`voucher-item ${getStatusClass(voucher.status)}`}>
                <div className="voucher-info">
                  <div className="voucher-service">
                    <Car className="icon" />
                    {voucher.service}
                  </div>
                  <div className="voucher-code">
                    Code: <span>{voucher.code}</span>
                  </div>
                  <div className="voucher-validity">
                    Valid {formatTime(voucher.validFrom)} - {formatTime(voucher.validUntil)}
                  </div>
                  <div className="voucher-amount">
                    Up to ${voucher.maxAmount}
                  </div>
                </div>
                <div className="voucher-actions">
                  {voucher.status === 'pending' && (
                    <Button
                      onClick={() => onActivateVoucher(voucher.code)}
                      variant="default"
                    >
                      Activate Voucher
                    </Button>
                  )}
                  {voucher.status === 'active' && (
                    <Button
                      onClick={() => onLaunchApp(voucher.service)}
                      variant="outline"
                    >
                      Open {voucher.service}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="transport-info">
        <Card>
          <div>
            <div className="info-header">
              <AlertCircle className="icon" />
              <h3>Important Information</h3>
            </div>
            <ul className="info-list">
              <li>Vouchers must be activated before your first ride</li>
              <li>Each voucher has a maximum value and validity period</li>
              <li>Download the service provider's app before your trip</li>
              <li>Contact support if you have any issues with your vouchers</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuestTransport;