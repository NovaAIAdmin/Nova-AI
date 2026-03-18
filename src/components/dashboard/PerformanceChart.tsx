import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const PerformanceChart: React.FC = () => {
  const data = [
    { name: 'Jan', views: 4000, likes: 2400, shares: 2400 },
    { name: 'Feb', views: 3000, likes: 1398, shares: 2210 },
    { name: 'Mar', views: 2000, likes: 9800, shares: 2290 },
    { name: 'Apr', views: 2780, likes: 3908, shares: 2000 },
    { name: 'May', views: 1890, likes: 4800, shares: 2181 },
    { name: 'Jun', views: 2390, likes: 3800, shares: 2500 },
    { name: 'Jul', views: 3490, likes: 4300, shares: 2100 },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Performance Overview</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-sm">
            7 Days
          </button>
          <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">
            30 Days
          </button>
          <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">
            90 Days
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                borderRadius: '0.5rem'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              stackId="1" 
              stroke="#F59E0B" 
              fill="#F59E0B" 
              fillOpacity={0.2}
            />
            <Area 
              type="monotone" 
              dataKey="likes" 
              stackId="1" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.2}
            />
            <Area 
              type="monotone" 
              dataKey="shares" 
              stackId="1" 
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Views</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Likes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Shares</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;