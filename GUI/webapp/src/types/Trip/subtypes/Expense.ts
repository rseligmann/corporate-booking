export interface Expense {
    id: string;
    category: string;
    amount: number;
    date: Date;
    receipt?: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
  }