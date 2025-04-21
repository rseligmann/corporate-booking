import React, { useState } from 'react';
import { DollarSign, Upload, Clock, FileCheck } from 'lucide-react';
import { Button, Card, Text } from '@mantine/core';
import { Input } from '@mantine/core';
import './GuestExpenses.scss';

interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
}

interface GuestExpensesProps {
  perDiem: {
    dailyAmount: number;
    totalAvailable: number;
    remainingDays: number;
  };
  expenses: Expense[];
  onUploadReceipt: (file: File) => Promise<void>;
  onSubmitExpense: (expense: Omit<Expense, 'id' | 'status'>) => Promise<void>;
}

const GuestExpenses: React.FC<GuestExpensesProps> = ({
  perDiem,
  expenses,
  onUploadReceipt,
  onSubmitExpense
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await onUploadReceipt(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.date || !newExpense.category) return;

    try {
      await onSubmitExpense({
        date: newExpense.date,
        amount: Number(newExpense.amount),
        category: newExpense.category
      });
      setNewExpense({ date: '', amount: '', category: '', description: '' });
    } catch (error) {
      console.error('Failed to submit expense:', error);
    }
  };

  const totalSubmitted = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = perDiem.totalAvailable - totalSubmitted;

  return (
    <div className="guest-expenses">
      <div className="guest-expenses__overview">
        <Card>
          <div>
            <Text>Expense Overview</Text>
            <Text>Track your travel expenses and per diem</Text>
          </div>
          <div>
            <div className="expense-stats">
              <div className="stat-item">
                <DollarSign className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Daily Per Diem</span>
                  <span className="stat-value">${perDiem.dailyAmount}</span>
                </div>
              </div>
              <div className="stat-item">
                <Clock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Remaining Days</span>
                  <span className="stat-value">{perDiem.remainingDays}</span>
                </div>
              </div>
              <div className="stat-item">
                <FileCheck className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Remaining Budget</span>
                  <span className="stat-value">${remainingBudget}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="guest-expenses__actions">
        <Card>
          <div>
            <Text>Submit New Expense</Text>
          </div>
          <div>
            <form onSubmit={handleSubmitExpense} className="expense-form">
              <div className="expense-form__fields">
                <div className="form-field">
                  <label>Date</label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Amount</label>
                  <Input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <Input
                    type="text"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    placeholder="e.g., Meals, Transport"
                    required
                  />
                </div>
              </div>
              
              <div className="receipt-upload">
                <input
                  type="file"
                  id="receipt"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('receipt')?.click()}
                >
                  <Upload className="button-icon" />
                  Select Receipt
                </Button>
                {selectedFile && (
                  <div className="selected-file">
                    <span>{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="default"
                      onClick={handleUpload}
                      loading={isUploading}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </div>

              <Button type="submit" variant="default" className="submit-button">
                Submit Expense
              </Button>
            </form>
          </div>
        </Card>
      </div>

      <div className="guest-expenses__history">
        <Card>
          <div>
            <Text>Expense History</Text>
          </div>
          <div>
            <div className="expense-list">
              {expenses.map((expense) => (
                <div key={expense.id} className={`expense-item status-${expense.status}`}>
                  <div className="expense-item__details">
                    <span className="expense-date">{expense.date}</span>
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-amount">${expense.amount}</span>
                  </div>
                  <div className="expense-item__status">
                    {expense.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuestExpenses;