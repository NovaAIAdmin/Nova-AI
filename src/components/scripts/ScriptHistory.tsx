import React from "react";
import { Button } from "../ui/button";
import { Clock, MoreVertical } from "lucide-react";

const ScriptHistory: React.FC = () => {
  const history = [
    { id: 1, title: "Product Launch Script", date: "2 hours ago", words: 245 },
    { id: 2, title: "Tutorial: Getting Started", date: "1 day ago", words: 312 },
    { id: 3, title: "Customer Testimonial", date: "3 days ago", words: 187 },
    { id: 4, title: "Behind the Scenes", date: "1 week ago", words: 421 },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          Script History
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="p-3 bg-gray-900/30 border border-gray-700 rounded-lg hover:bg-gray-900/50 transition-colors"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <div className="text-sm text-gray-400">
                  {item.date} • {item.words} words
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-gray-700"
      >
        Load More
      </Button>
    </div>
  );
};

export default ScriptHistory;