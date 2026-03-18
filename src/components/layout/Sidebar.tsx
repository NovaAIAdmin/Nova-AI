import React from "react";
import { 
  Home, 
  Video, 
  FileText, 
  Mic, 
  Layout, 
  BarChart3, 
  Users, 
  Settings,
  Zap,
  Calendar,
  MessageCircle,
  Image,
  Globe,
  Palette,
  TrendingUp,
  RotateCw,
  Target,
  Eye,
  Clock,
  Workflow,
  Brain
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Video Studio", href: "/studio", icon: Video },
    { name: "AI Scripts", href: "/scripts", icon: FileText },
    { name: "Voice Studio", href: "/voices", icon: Mic },
    { name: "Templates", href: "/templates", icon: Layout },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Team", href: "/team", icon: Users },
    { name: "AI Pipelines", href: "/pipelines", icon: Workflow },
    { name: "Content Calendar", href: "/calendar", icon: Calendar },
    { name: "Comments", href: "/comments", icon: MessageCircle },
    { name: "Thumbnails", href: "/thumbnails", icon: Image },
    { name: "Translate", href: "/translate", icon: Globe },
    { name: "Brand Kit", href: "/brand", icon: Palette },
    { name: "Trending", href: "/trending", icon: TrendingUp },
    { name: "Rewriter", href: "/rewriter", icon: RotateCw },
    { name: "AI Scripts", href: "/aiscripts", icon: Target },
    { name: "Insights", href: "/insights", icon: Eye },
    { name: "Scheduler", href: "/scheduler", icon: Clock },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            Nova AI Studio
          </h1>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"></div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <div className="w-5 h-5"></div>
        </button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border-l-4 border-amber-500"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.name}</span>}
                  {item.name === "AI Assistant" && (
                    <span className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-xs px-2 py-0.5 rounded-full">
                      <Zap className="w-3 h-3 inline mr-1" />
                      Pro
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <span className="font-bold">U</span>
            </div>
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <div className="font-medium flex items-center gap-1">
                User Name
              </div>
              <div className="text-xs text-gray-400">Enterprise Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;