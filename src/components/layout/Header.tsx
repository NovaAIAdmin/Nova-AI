import React, { useState } from "react";
import { Bell, Search, Menu, Sparkles, Crown } from "lucide-react";
import { useNotification } from "../../contexts/NotificationContext";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { notifications } = useNotification();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-800 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {searchOpen ? (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
                onBlur={() => setSearchOpen(false)}
                autoFocus
              />
            </div>
          ) : (
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all">
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">AI Assistant</span>
          </button>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-800">
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
                {notifications.length}
              </div>
            )}
          </button>
          
          <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
            Upgrade
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <span className="font-bold text-sm">U</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">User Name</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                Enterprise
                <Crown className="w-3 h-3 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;