import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Key, 
  Copy, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Save,
  AlertTriangle,
  Trash2
} from "lucide-react";

const ApiSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState("sk_live_51J...");
  const [showKey, setShowKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [permissions, setPermissions] = useState({
    read: true,
    write: true,
    delete: false
  });

  const apiKeys = [
    { id: 1, name: "Production Key", key: "sk_live_51J...", lastUsed: "2 hours ago", status: "active" },
    { id: 2, name: "Development Key", key: "sk_test_51J...", lastUsed: "1 day ago", status: "active" },
    { id: 3, name: "Mobile App Key", key: "sk_app_51J...", lastUsed: "1 month ago", status: "inactive" },
  ];

  const handleGenerateKey = () => {
    if (newKeyName.trim()) {
      // In a real app, this would call an API to generate a new key
      alert(`New API key generated for: ${newKeyName}`);
      setNewKeyName("");
    }
  };

  const togglePermission = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">API Settings</h2>
        <p className="text-gray-400">Manage your API keys and access permissions</p>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your API keys for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">Active Keys</h3>
              <Button 
                onClick={() => setNewKeyName("")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                <Key className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Key</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {apiKeys.map((key) => (
                    <tr key={key.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {key.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {key.key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {key.lastUsed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          key.status === "active" 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-gray-500/20 text-gray-500"
                        }`}>
                          {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4 text-gray-400" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="w-4 h-4 text-gray-400" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-amber-900/20 border border-amber-800 rounded-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-amber-500 font-medium">Security Notice</h4>
                <p className="text-amber-200 text-sm mt-1">
                  Never share your API keys in client-side code or public repositories. 
                  Keys with restricted permissions are recommended for client-side use.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Create New API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Generate a new key for accessing the API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keyName" className="text-gray-300">Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g. Mobile App, Backend Service"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white">Permissions</h3>
            <p className="text-sm text-gray-400">
              Select the permissions for this API key
            </p>
            
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer"
                onClick={() => togglePermission('read')}
              >
                <div>
                  <h4 className="font-medium text-white">Read Access</h4>
                  <p className="text-sm text-gray-400">View videos, templates, and analytics</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${permissions.read ? 'bg-amber-600' : 'bg-gray-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${permissions.read ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </div>
              </div>
              
              <div 
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer"
                onClick={() => togglePermission('write')}
              >
                <div>
                  <h4 className="font-medium text-white">Write Access</h4>
                  <p className="text-sm text-gray-400">Create and edit videos and templates</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${permissions.write ? 'bg-amber-600' : 'bg-gray-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${permissions.write ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </div>
              </div>
              
              <div 
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer"
                onClick={() => togglePermission('delete')}
              >
                <div>
                  <h4 className="font-medium text-white">Delete Access</h4>
                  <p className="text-sm text-gray-400">Delete videos, templates, and projects</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${permissions.delete ? 'bg-amber-600' : 'bg-gray-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${permissions.delete ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleGenerateKey}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Key className="w-4 h-4 mr-2" />
              Generate API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">API Documentation</CardTitle>
          <CardDescription className="text-gray-400">
            Access resources and guides for integrating with our API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <h3 className="font-medium text-white mb-2">Getting Started</h3>
              <p className="text-sm text-gray-400 mb-3">Learn how to authenticate and make your first API call</p>
              <Button variant="link" className="p-0 h-auto text-amber-500">
                View Guide
              </Button>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <h3 className="font-medium text-white mb-2">Endpoints</h3>
              <p className="text-sm text-gray-400 mb-3">Complete reference for all available API endpoints</p>
              <Button variant="link" className="p-0 h-auto text-amber-500">
                View Docs
              </Button>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <h3 className="font-medium text-white mb-2">SDKs</h3>
              <p className="text-sm text-gray-400 mb-3">Official libraries for popular programming languages</p>
              <Button variant="link" className="p-0 h-auto text-amber-500">
                Download SDKs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiSettings;