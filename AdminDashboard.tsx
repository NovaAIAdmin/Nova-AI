import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { 
  Users, 
  Video, 
  CheckCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit, 
  RotateCcw,
  BarChart3,
  Calendar,
  Clock
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  plan: string;
}

interface Video {
  id: string;
  userId: string;
  title: string;
  date: string;
  duration: string;
  model: string;
}

interface AdminDashboardProps {
  users: User[];
  videos: Video[];
  onResetUserCredits: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
  onAddUser: () => void;
  onGenerateReport: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users,
  videos,
  onResetUserCredits,
  onDeleteUser,
  onEditUser,
  onAddUser,
  onGenerateReport
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <Shield className="h-5 w-5 mr-2 text-red-500" />
            Admin Dashboard
          </CardTitle>
          <Button onClick={onGenerateReport} variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-4 rounded-lg border border-blue-800/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-gray-400">Total Users</div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 rounded-lg border border-purple-800/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{videos.length}</div>
                <div className="text-sm text-gray-400">Videos Generated</div>
              </div>
              <Video className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-4 rounded-lg border border-green-800/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-gray-400">Server Status</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 p-4 rounded-lg border border-amber-800/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User Management</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 bg-gray-800 border-gray-700 w-40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button onClick={onAddUser} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add User
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-700">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">{user.credits} credits</Badge>
                  <Badge variant={user.plan === "admin" ? "default" : "outline"} className="text-xs">
                    {user.plan}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onEditUser(user.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onResetUserCredits(user.id)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    {user.plan !== "admin" && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Recent Video Generation</h3>
          <div className="space-y-3">
            {videos.slice(0, 5).map((video) => (
              <div key={video.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <div className="font-medium">{video.title}</div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {video.date} • 
                    <Clock className="h-3 w-3 ml-2 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{video.model}</Badge>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;