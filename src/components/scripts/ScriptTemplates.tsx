import React from "react";
import { Button } from "../ui/button";
import { 
  TrendingUp, 
  Lightbulb, 
  Target, 
  Users, 
  ShoppingCart, 
  Zap,
  Play,
  Star,
  ThumbsUp
} from "lucide-react";

interface ScriptTemplatesProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const ScriptTemplates: React.FC<ScriptTemplatesProps> = ({
  selectedTemplate,
  setSelectedTemplate
}) => {
  const templates = [
    { id: "trending", name: "Trending Topics", icon: TrendingUp, color: "from-purple-500 to-indigo-500" },
    { id: "viral", name: "Viral Hooks", icon: Zap, color: "from-amber-500 to-orange-500" },
    { id: "storytelling", name: "Storytelling", icon: Lightbulb, color: "from-blue-500 to-cyan-500" },
    { id: "testimonial", name: "Testimonials", icon: ThumbsUp, color: "from-green-500 to-emerald-500" },
    { id: "tutorial", name: "How-to Guide", icon: Play, color: "from-rose-500 to-pink-500" },
    { id: "product", name: "Product Launch", icon: ShoppingCart, color: "from-teal-500 to-cyan-500" },
    { id: "audience", name: "Audience Building", icon: Users, color: "from-violet-500 to-purple-500" },
    { id: "conversion", name: "Conversion Focused", icon: Target, color: "from-amber-500 to-yellow-500" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Script Templates</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center ${
                selectedTemplate === template.id
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-700/50"
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${template.color} flex items-center justify-center mb-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-center">{template.name}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h3 className="font-medium mb-3">Custom Templates</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-700 flex-1"
          >
            Save Current Script
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-700"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScriptTemplates;