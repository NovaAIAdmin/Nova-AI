import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { CheckCircle } from "lucide-react";

interface EmailPreferences {
  paymentSuccess: boolean;
  paymentFailed: boolean;
  subscriptionRenewal: boolean;
  videoGeneration: boolean;
  marketing: boolean;
}

const EmailNotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    paymentSuccess: true,
    paymentFailed: true,
    subscriptionRenewal: true,
    videoGeneration: true,
    marketing: false
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // In a real app, fetch user preferences from backend
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/user/email-preferences');
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        console.error('Error fetching email preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, save preferences to backend
      await fetch('/api/user/email-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving email preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: keyof EmailPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
        <CardDescription>
          Choose which emails you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Payment Success</Label>
            <p className="text-sm text-gray-400">
              Confirmations for successful payments
            </p>
          </div>
          <Switch
            checked={preferences.paymentSuccess}
            onCheckedChange={() => togglePreference('paymentSuccess')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Payment Failed</Label>
            <p className="text-sm text-gray-400">
              Notifications when payments fail
            </p>
          </div>
          <Switch
            checked={preferences.paymentFailed}
            onCheckedChange={() => togglePreference('paymentFailed')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Subscription Renewal</Label>
            <p className="text-sm text-gray-400">
              Reminders before your subscription renews
            </p>
          </div>
          <Switch
            checked={preferences.subscriptionRenewal}
            onCheckedChange={() => togglePreference('subscriptionRenewal')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Video Generation</Label>
            <p className="text-sm text-gray-400">
              Updates on video generation progress
            </p>
          </div>
          <Switch
            checked={preferences.videoGeneration}
            onCheckedChange={() => togglePreference('videoGeneration')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Marketing & Updates</Label>
            <p className="text-sm text-gray-400">
              Product updates and special offers
            </p>
          </div>
          <Switch
            checked={preferences.marketing}
            onCheckedChange={() => togglePreference('marketing')}
          />
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="w-full"
          >
            {saving ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Saving...
              </>
            ) : (
              'Save Preferences'
            )}
          </Button>
          {saved && (
            <div className="flex items-center justify-center mt-3 text-green-500">
              <CheckCircle className="h-4 w-4 mr-1" />
              Preferences saved successfully
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailNotificationSettings;