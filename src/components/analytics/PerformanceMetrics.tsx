import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, Eye, Heart, Share2, Download } from "lucide-react";

const PerformanceMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Total Views",
      value: "124.8K",
      change: "+12.4%",
      icon: <Eye className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500"
    },
    {
      title: "Likes",
      value: "18.2K",
      change: "+8.2%",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      color: "bg-red-500"
    },
    {
      title: "Shares",
      value: "5.7K",
      change: "+15.3%",
      icon: <Share2 className="w-5 h-5 text-green-500" />,
      color: "bg-green-500"
    },
    {
      title: "Downloads",
      value: "3.4K",
      change: "+5.7%",
      icon: <Download className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.color} bg-opacity-20`}>
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetrics;