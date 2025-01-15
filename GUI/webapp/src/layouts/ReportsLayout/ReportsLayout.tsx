import React from 'react';
import './ReportsLayout.scss';
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card/card";

interface ReportsLayoutProps {
  children: React.ReactNode;
}

export const ReportsLayout: React.FC<ReportsLayoutProps> = ({ children }) => {
  return (
    <div className="reports-layout">
      <div className="reports-layout__container">
        <div className="reports-layout__header">
          <h1 className="reports-layout__title">Reports</h1>
          <p className="reports-layout__subtitle">Track and analyze your travel expenses</p>
        </div>
        {children}
      </div>
    </div>
  );
};