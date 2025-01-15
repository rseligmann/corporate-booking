import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import './EstimatedBudget.scss';

export const EstimatedBudget: React.FC = () => {
  return (
    <Card className="estimated-budget">
      <CardHeader>
        <CardTitle>Estimated Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="estimated-budget__grid">
          <div className="budget-item">
            <div className="budget-item__label">Average Flight</div>
            <div className="budget-item__value">$450</div>
          </div>
          <div className="budget-item">
            <div className="budget-item__label">Average Hotel</div>
            <div className="budget-item__value">$320</div>
          </div>
          <div className="budget-item">
            <div className="budget-item__label">Total Estimate</div>
            <div className="budget-item__value">$770</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};