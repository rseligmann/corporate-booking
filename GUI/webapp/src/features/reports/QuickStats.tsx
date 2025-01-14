import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickStatProps {
  title: string;
  value: string;
  subvalue?: string;
  icon?: React.ReactNode;
}

const QuickStat: React.FC<QuickStatProps> = ({ title, value, subvalue, icon }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subvalue && (
        <p className="text-xs text-gray-500 flex items-center">
          {icon}
          {subvalue}
        </p>
      )}
    </CardContent>
  </Card>
);

export const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <QuickStat
        title="This Month's Spend"
        value="$17,800"
        subvalue="+12% from last month"
        icon={<TrendingUp className="w-3 h-3 mr-1 text-green-500" />}
      />
      <QuickStat
        title="Active Trips"
        value="8"
        subvalue="3 upcoming this week"
      />
      <QuickStat
        title="Total Guests"
        value="45"
        subvalue="This month"
      />
      <QuickStat
        title="Average Trip Cost"
        value="$1,450"
        subvalue="Per guest"
      />
    </div>
  );
};