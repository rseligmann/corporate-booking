import { useState } from 'react';

export interface TripData {
  id: number;
  guest: {
    name: string;
    email: string;
    type: string;
  };
  dates: {
    start: string;
    end: string;
  };
  origin: string;
  destination: string;
  status: string;
  cost: number;
}

export interface SpendingData {
  month: string;
  amount: number;
}

export interface ReportsState {
  activeTab: 'trips' | 'billing';
  dateFilter: string;
  tripData: TripData[];
  spendingData: SpendingData[];
}

export const useReportsState = () => {
  const [state, setState] = useState<ReportsState>({
    activeTab: 'trips',
    dateFilter: 'last30',
    tripData: [
      {
        id: 1,
        guest: { name: 'John Smith', email: 'john@example.com', type: 'Interview' },
        dates: { start: '2024-01-15', end: '2024-01-17' },
        origin: 'SFO',
        destination: 'NYC',
        status: 'Completed',
        cost: 1250,
      },
      {
        id: 2,
        guest: { name: 'Sarah Davis', email: 'sarah@example.com', type: 'Contract Work' },
        dates: { start: '2024-01-20', end: '2024-01-25' },
        origin: 'LAX',
        destination: 'CHI',
        status: 'In Progress',
        cost: 1800,
      },
    ],
    spendingData: [
      { month: 'Jan', amount: 12500 },
      { month: 'Feb', amount: 15800 },
      { month: 'Mar', amount: 14200 },
      { month: 'Apr', amount: 16900 },
      { month: 'May', amount: 13600 },
      { month: 'Jun', amount: 17800 },
    ],
  });

  const setActiveTab = (tab: 'trips' | 'billing') => {
    setState(prevState => ({ ...prevState, activeTab: tab }));
  };

  const setDateFilter = (filter: string) => {
    setState(prevState => ({ ...prevState, dateFilter: filter }));
  };

  return {
    state,
    setActiveTab,
    setDateFilter,
  };
};