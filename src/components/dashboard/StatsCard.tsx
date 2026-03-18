import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, change }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-amber-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>
      </div>
      <p className="text-green-500 text-sm mt-3 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        {change} from last month
      </p>
    </div>
  );
};

export default StatsCard;