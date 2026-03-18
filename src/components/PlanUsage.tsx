import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart3, Video, Zap, Clock } from "lucide-react";

interface PlanUsageProps {
  plan: string;
  creditsUsed: number;
  creditsTotal: number;
  videosGenerated: number;
  minutesGenerated: number;
  resetDate: string;
}

const PlanUsage: React.FC<PlanUsageProps> = ({ 
  plan, 
  creditsUsed, 
  creditsTotal, 
  videosGenerated, 
  minutesGenerated,
  resetDate
}) => {
  const usagePercentage = Math.min(100, (creditsUsed / creditsTotal) * 100);
  
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
            Plan Usage
          </span>
          <Badge variant="secondary">{plan.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Video Credits</span>
            <span className="text-sm">{creditsUsed}/{creditsTotal}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full" 
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Resets on {resetDate}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <Video className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-bold">{videosGenerated}</div>
            <div className="text-xs text-gray-400">Videos</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <div className="text-lg font-bold">{minutesGenerated}</div>
            <div className="text-xs text-gray-400">Minutes</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-lg font-bold">{creditsTotal - creditsUsed}</div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanUsage;