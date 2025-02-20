import { LoyaltyProgram } from "./LoyaltyProgram"
import { Address } from './Address'

export interface GuestProfile {
    id: string
    firstName: string //'Alice',
    lastName: string //'Johnson'
    email: string //'alice@example.com',
    phone?: string
    dataOfBirth?: Date
    gender?: string;
    address?: Address;
    nationality?: string;
    passportNumber?: string;
    passportExpiryDate?: Date;
    dietaryRestrictions?: string[];
    accessibilityNeeds?: string[];
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
    loyaltyPrograms?: LoyaltyProgram[];
}