import { Address } from './Address'
export interface GroundTransport {
    id: string;
    type: 'uber' | 'lyft';
    voucherID?: string;
    pickupLocation: Address;
    dropoffLocation: Address;
    estimatedPrice?: number;
    actualPrice?: number;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  }