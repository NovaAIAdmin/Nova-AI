import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Share2, Instagram, Youtube, Tiktok } from "lucide-react";

interface SocialMediaIntegrationProps {
  autoPostEnabled: boolean;
  schedule: string;
  onAutoPostChange: (enabled: boolean) => void;
  onScheduleChange: (schedule: string) => void;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  autoPostEnabled,
  schedule,
  onAutoPostChange,
  onScheduleChange
}) => {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="h-5 w-5 mr-2 text-purple-500" />
          Social Media
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Auto-post to Social</h3>
            <p className="text-sm text-gray-400">Automatically share your videos</p>
          </div>
          <Switch
            checked={autoPostEnabled}
            onCheckedChange={onAutoPostChange}
          />
        </div>

        {autoPostEnabled && (
          <div className="space-y-4 pt-2">
            <div>
              <Label>Post Schedule</Label>
              <Select value={schedule} onValueChange={onScheduleChange}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Post Immediately</SelectItem>
                  <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                  <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
                  <SelectItem value="custom">Custom Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="h-16 flex-col gap-1">
                <Instagram className="h-5 w-5" />
                <span className="text-xs">Instagram</span>
              </Button>
              <Button variant="outline" size="sm" className="h-16 flex-col gap-1">
                <Youtube className="h-5 w-5" />
                <span className="text-xs">YouTube</span>
              </Button>
              <Button variant="outline" size="sm" className="h-16 flex-col gap-1">
                <Tiktok className="h-5 w-5" />
                <span className="text-xs">TikTok</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;