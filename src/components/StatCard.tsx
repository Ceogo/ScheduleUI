import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
          
          {trend && (
            <div className={`flex items-center text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;