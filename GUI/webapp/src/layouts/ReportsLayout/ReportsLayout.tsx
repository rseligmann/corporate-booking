import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportsLayoutProps {
  children: React.ReactNode;
}

export const ReportsLayout: React.FC<ReportsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">Track and analyze your travel expenses</p>
        </div>
        {children}
      </div>
    </div>
  );
};