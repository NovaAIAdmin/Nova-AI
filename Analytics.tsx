import React from "react";
import PerformanceMetrics from "../components/analytics/PerformanceMetrics";
import EngagementChart from "../components/analytics/EngagementChart";
import PlatformBreakdown from "../components/analytics/PlatformBreakdown";
import AudienceDemographics from "../components/analytics/AudienceDemographics";

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400">Track your video performance and audience engagement</p>
      </div>

      <PerformanceMetrics />
      <EngagementChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformBreakdown />
        <AudienceDemographics />
      </div>
    </div>
  );
};

export default Analytics;