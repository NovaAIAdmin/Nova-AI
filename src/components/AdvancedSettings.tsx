import React from "react";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Settings } from "lucide-react";

interface AdvancedSettingsProps {
  settings: {
    speed: number;
    volume: number;
    backgroundMusic: boolean;
    musicVolume: number;
    textEffect: string;
    fontFamily: string;
    textSize: number;
    textColor: string;
    backgroundColor: string;
  };
  onChange: (settings: any) => void;
  disabled: boolean;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ settings, onChange, disabled }) => {
  const textEffects = [
    { id: "none", name: "None" },
    { id: "glow", name: "Glow" },
    { id: "shadow", name: "Drop Shadow" },
    { id: "outline", name: "Outline" },
    { id: "neon", name: "Neon" }
  ];

  const fontFamilies = [
    { id: "sans", name: "Sans Serif" },
    { id: "serif", name: "Serif" },
    { id: "mono", name: "Monospace" },
    { id: "display", name: "Display" },
    { id: "handwriting", name: "Handwriting" }
  ];

  const handleSettingChange = (key: string, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Advanced Settings
        </CardTitle>
        <CardDescription>Fine-tune your video generation parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="flex justify-between">
                <span>Speech Speed: {settings.speed}x</span>
              </Label>
              <Slider
                value={[settings.speed]}
                onValueChange={(value) => handleSettingChange('speed', value[0])}
                max={2}
                min={0.5}
                step={0.1}
                disabled={disabled}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="flex justify-between">
                <span>Volume: {settings.volume}%</span>
              </Label>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => handleSettingChange('volume', value[0])}
                max={100}
                min={0}
                step={1}
                disabled={disabled}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Background Music</Label>
              <Switch
                checked={settings.backgroundMusic}
                onCheckedChange={(checked) => handleSettingChange('backgroundMusic', checked)}
                disabled={disabled}
              />
            </div>

            {settings.backgroundMusic && (
              <div>
                <Label className="flex justify-between">
                  <span>Music Volume: {settings.musicVolume}%</span>
                </Label>
                <Slider
                  value={[settings.musicVolume]}
                  onValueChange={(value) => handleSettingChange('musicVolume', value[0])}
                  max={100}
                  min={0}
                  step={1}
                  disabled={disabled}
                  className="mt-2"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label>Text Effect</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {textEffects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => handleSettingChange('textEffect', effect.id)}
                    className={`py-2 px-3 rounded-md text-sm transition-colors ${
                      settings.textEffect === effect.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    disabled={disabled}
                  >
                    {effect.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Font Family</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {fontFamilies.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleSettingChange('fontFamily', font.id)}
                    className={`py-2 px-3 rounded-md text-sm transition-colors ${
                      settings.fontFamily === font.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    disabled={disabled}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="flex justify-between">
                <span>Text Size: {settings.textSize}px</span>
              </Label>
              <Slider
                value={[settings.textSize]}
                onValueChange={(value) => handleSettingChange('textSize', value[0])}
                max={100}
                min={20}
                step={2}
                disabled={disabled}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Text Color</Label>
                <div className="flex items-center mt-2">
                  <Input
                    type="color"
                    value={settings.textColor}
                    onChange={(e) => handleSettingChange('textColor', e.target.value)}
                    className="w-10 h-10 p-1 rounded-md border-gray-700 bg-gray-800"
                    disabled={disabled}
                  />
                  <span className="ml-2 text-sm">{settings.textColor}</span>
                </div>
              </div>

              <div>
                <Label>Background Color</Label>
                <div className="flex items-center mt-2">
                  <Input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                    className="w-10 h-10 p-1 rounded-md border-gray-700 bg-gray-800"
                    disabled={disabled}
                  />
                  <span className="ml-2 text-sm">{settings.backgroundColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;