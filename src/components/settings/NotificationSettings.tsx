import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Bell, Mail, Smartphone, Save } from "lucide-react";

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [teamInvites, setTeamInvites] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = () => {
    // Save logic would go here
    alert("Notification settings saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-400">Manage how and when you receive notifications</p>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Notification Channels</CardTitle>
          <CardDescription className="text-gray-400">
            Choose where you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg mr-4">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg mr-4">
                <Smartphone className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Push Notifications</h3>
                <p className="text-sm text-gray-400">Receive notifications on your devices</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Notification Types</CardTitle>
          <CardDescription className="text-gray-400">
            Select which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Project Updates</h3>
              <p className="text-sm text-gray-400">Notifications about your video projects</p>
            </div>
            <Switch
              checked={projectUpdates}
              onCheckedChange={setProjectUpdates}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Team Invitations</h3>
              <p className="text-sm text-gray-400">Notifications when you're invited to teams</p>
            </div>
            <Switch
              checked={teamInvites}
              onCheckedChange={setTeamInvites}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Billing Alerts</h3>
              <p className="text-sm text-gray-400">Notifications about billing and payments</p>
            </div>
            <Switch
              checked={billingAlerts}
              onCheckedChange={setBillingAlerts}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Marketing Emails</h3>
              <p className="text-sm text-gray-400">Product updates and promotional offers</p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Notification Schedule</CardTitle>
          <CardDescription className="text-gray-400">
            Control when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-white">Quiet Hours</h3>
              <p className="text-sm text-gray-400">
                Mute notifications during specific hours
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">From</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white">
                    <option>9:00 PM</option>
                    <option>10:00 PM</option>
                    <option>11:00 PM</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1">To</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white">
                    <option>7:00 AM</option>
                    <option>8:00 AM</option>
                    <option>9:00 AM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-white">Frequency</h3>
              <p className="text-sm text-gray-400">
                How often you receive notifications
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="instant" 
                    name="frequency" 
                    className="mr-2 h-4 w-4 text-amber-600"
                    defaultChecked
                  />
                  <label htmlFor="instant" className="text-gray-300">Instant notifications</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="daily" 
                    name="frequency" 
                    className="mr-2 h-4 w-4 text-amber-600"
                  />
                  <label htmlFor="daily" className="text-gray-300">Daily digest</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="weekly" 
                    name="frequency" 
                    className="mr-2 h-4 w-4 text-amber-600"
                  />
                  <label htmlFor="weekly" className="text-gray-300">Weekly summary</label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;