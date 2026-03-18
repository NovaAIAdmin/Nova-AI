import React from "react";
import { Video, Play, MoreVertical } from "lucide-react";

const RecentProjects: React.FC = () => {
  const projects = [
    { id: 1, title: "Product Launch Teaser", date: "2 hours ago", duration: "45s", status: "Published" },
    { id: 2, title: "Tutorial: Getting Started", date: "1 day ago", duration: "2m 15s", status: "Draft" },
    { id: 3, title: "Customer Testimonial", date: "3 days ago", duration: "1m 30s", status: "Published" },
    { id: 4, title: "Behind the Scenes", date: "1 week ago", duration: "3m 45s", status: "Published" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Projects</h2>
        <button className="text-amber-500 hover:text-amber-400 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:bg-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.date} • {project.duration}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs ${
                project.status === "Published" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-yellow-500/20 text-yellow-400"
              }`}>
                {project.status}
              </span>
              <button className="p-2 rounded-lg hover:bg-gray-800">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;