import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { 
  Key, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Sparkles
} from "lucide-react";

interface OpenAIIntegrationProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({ 
  apiKey, 
  onApiKeyChange, 
  isConnected, 
  onConnect,
  onDisconnect
}) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
            OpenAI Integration
          </div>
          {isConnected && (
            <Badge variant="secondary" className="bg-green-900/50 text-green-400">
              <CheckCircle className="mr-1 h-3 w-3" />
              Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                placeholder="sk-...your OpenAI API key"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="pr-10 bg-gray-800 border-gray-700"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? "Hide" : "Show"}
              </Button>
            </div>
            <Button 
              onClick={isConnected ? onDisconnect : onConnect}
              disabled={!apiKey.trim()}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>

        <div className="pt-2">
          <h4 className="font-medium mb-2 flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
            Important Information
          </h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Requires OpenAI account with DALL-E 3 and TTS access</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Each video generation costs approximately $0.04-$0.08</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Video generation takes 30-60 seconds</span>
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              Get your OpenAI API key
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenAIIntegration;