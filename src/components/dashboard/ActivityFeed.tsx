import React from "react";
import { User, Video, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const ActivityFeed: React.FC = () => {
  const activities = [
    { id: 1, user: "Alex Johnson", action: "published a new video", time: "2 min ago", icon: Video, color: "text-amber-500" },
    { id: 2, user: "Sarah Miller", action: "liked your video", time: "15 min ago", icon: ThumbsUp, color: "text-green-500" },
    { id: 3, user: "Mike Chen", action: "commented on your video", time: "1 hour ago", icon: MessageCircle, color: "text-blue-500" },
    { id: 4, user: "Emma Davis", action: "shared your video", time: "3 hours ago", icon: Share2, color: "text-purple-500" },
    { id: 5, user: "Team", action: "completed monthly report", time: "1 day ago", icon: User, color: "text-rose-500" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${activity.color} bg-gray-900/50`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-white">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-center text-amber-500 hover:text-amber-400 text-sm font-medium">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;