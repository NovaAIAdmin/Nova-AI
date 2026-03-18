import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EngagementChart: React.FC = () => {
  const data = [
    { name: 'Mon', views: 4000, likes: 2400, shares: 1200 },
    { name: 'Tue', views: 3000, likes: 1398, shares: 900 },
    { name: 'Wed', views: 2000, likes: 9800, shares: 800 },
    { name: 'Thu', views: 2780, likes: 3908, shares: 1100 },
    { name: 'Fri', views: 1890, likes: 4800, shares: 700 },
    { name: 'Sat', views: 2390, likes: 3800, shares: 1500 },
    { name: 'Sun', views: 3490, likes: 4300, shares: 1800 },
  ];

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Engagement Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
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
                itemStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Bar dataKey="views" name="Views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="likes" name="Likes" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" name="Shares" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;