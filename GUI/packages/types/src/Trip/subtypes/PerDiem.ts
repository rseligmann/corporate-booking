import { Expense } from './Expense'
export interface PerDiem {
    id: string;
    dailyRate: number;
    startDate: Date;
    endDate: Date;
    totalAmount: number;
    //currency: string;
    status: 'pending' | 'approved' | 'paid';
    expenses?: Expense[];
  }