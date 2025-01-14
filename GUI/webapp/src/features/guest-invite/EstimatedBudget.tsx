import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EstimatedBudget: React.FC = () => {
  return (
    <Card className="bg-gray-50 border-dashed">
      <CardHeader>
        <CardTitle className="text-sm">Estimated Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">Average Flight</div>
            <div className="text-lg font-medium">$450</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Average Hotel</div>
            <div className="text-lg font-medium">$320</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Estimate</div>
            <div className="text-lg font-medium">$770</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};