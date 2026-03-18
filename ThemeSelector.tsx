import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const themes = [
    { 
      id: "abstract-blur", 
      name: "Abstract Blur", 
      description: "Soft gradients with motion blur effect",
      preview: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    },
    { 
      id: "cosmic-nebula", 
      name: "Cosmic Nebula", 
      description: "Starry space with colorful gas clouds",
      preview: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    },
    { 
      id: "minimalist", 
      name: "Minimalist", 
      description: "Clean and simple with subtle movement",
      preview: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    },
    { 
      id: "neon-grid", 
      name: "Neon Grid", 
      description: "Futuristic grid with glowing lines",
      preview: "bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900"
    },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800 shadow-xl h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Palette className="h-5 w-5 mr-2 text-purple-500" />
          Visual Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedTheme} onValueChange={onThemeChange} className="space-y-4">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              className={`flex items-center space-x-4 p-4 rounded-xl border transition-all cursor-pointer ${
                selectedTheme === theme.id 
                  ? "border-purple-500 bg-purple-900/20" 
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <RadioGroupItem value={theme.id} id={theme.id} className="h-5 w-5" />
              <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg mr-3 ${theme.preview}`} />
                  <div>
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm text-gray-400">{theme.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;