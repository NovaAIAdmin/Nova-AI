import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera, User, Mail, Lock, Globe, Save } from "lucide-react";

const AccountSettings: React.FC = () => {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [timezone, setTimezone] = useState("America/New_York");
  const [avatar, setAvatar] = useState("");

  const handleSave = () => {
    // Save logic would go here
    alert("Account settings saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Account Settings</h2>
        <p className="text-gray-400">Manage your profile information and preferences</p>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Profile Information</CardTitle>
          <CardDescription className="text-gray-400">
            Update your profile details and avatar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatar} />
                <AvatarFallback className="bg-gray-700 text-2xl text-white">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full bg-amber-600 hover:bg-amber-700 p-2 h-8 w-8"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Profile Photo</h3>
              <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size of 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Security</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your password and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Password</h3>
              <p className="text-sm text-gray-400">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Active Sessions</h3>
              <p className="text-sm text-gray-400">Manage devices that are logged in</p>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;