import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const AudienceDemographics: React.FC = () => {
  const data = [
    { name: '13-17', value: 12, color: '#8B5CF6' },
    { name: '18-24', value: 35, color: '#3B82F6' },
    { name: '25-34', value: 28, color: '#10B981' },
    { name: '35-44', value: 15, color: '#F59E0B' },
    { name: '45-54', value: 7, color: '#EF4444' },
    { name: '55+', value: 3, color: '#6B7280' },
  ];

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Audience Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }} 
                formatter={(value) => [`${value}%`, 'Audience']}
              />
              <Bar dataKey="value" name="Audience %" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceDemographics;