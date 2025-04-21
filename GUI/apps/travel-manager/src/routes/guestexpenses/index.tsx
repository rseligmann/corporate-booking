import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestExpenses from './GuestExpenses';

const mockExpenses = [
    {
      id: '1',
      date: '2024-01-20',
      amount: 45.50,
      category: 'Meals',
      status: 'approved' as const
    },
    {
      id: '2',
      date: '2024-01-21',
      amount: 25.00,
      category: 'Transport',
      status: 'pending' as const
    }
  ];
  
  const mockPerDiem = {
    dailyAmount: 75,
    totalAvailable: 375,
    remainingDays: 5
  };
  
  export const GuestExpensesPage: FC = () => {
    const [expenses, setExpenses] = useState(mockExpenses);
    const [perDiem] = useState(mockPerDiem);
  
    const handleUploadReceipt = async (file: File) => {
      // Simulated upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Receipt uploaded:', file.name);
    };
  
    const handleSubmitExpense = async (expense: any) => {
      // Simulated submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExpense = {
        id: String(Date.now()),
        ...expense,
        status: 'pending' as const
      };
  
      setExpenses(prev => [...prev, newExpense]);
      console.log('Expense submitted:', newExpense);
    };
  
    return (
      <>
        <Helmet>
          <title>Expenses | TravelPortal</title>
          <meta name="description" content="Manage your travel expenses" />
        </Helmet>
        <GuestExpenses
          perDiem={perDiem}
          expenses={expenses}
          onUploadReceipt={handleUploadReceipt}
          onSubmitExpense={handleSubmitExpense}
        />
      </>
    );
  };
  
  export default GuestExpensesPage;