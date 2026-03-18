import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, setSelectedTheme }) => {
  const themes = [
    { 
      id: "abstract-blur", 
      name: "Abstract Blur", 
      description: "Dynamic gradient motion",
      preview: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    },
    { 
      id: "cosmic-nebula", 
      name: "Cosmic Nebula", 
      description: "Starry deep space effect",
      preview: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    },
    { 
      id: "minimalist-gradient", 
      name: "Minimalist", 
      description: "Clean and modern",
      preview: "bg-gradient-to-br from-gray-900 to-gray-800"
    },
    { 
      id: "neon-grid", 
      name: "Neon Grid", 
      description: "Cyberpunk style grid",
      preview: "bg-gradient-to-br from-gray-900 to-black"
    },
    { 
      id: "ocean-depths", 
      name: "Ocean Depths", 
      description: "Underwater blue tones",
      preview: "bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900"
    },
    { 
      id: "sunset-glow", 
      name: "Sunset Glow", 
      description: "Warm orange and pink",
      preview: "bg-gradient-to-br from-orange-900 via-red-900 to-pink-900"
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5 text-amber-500" />
        Background Theme
      </h2>
      
      <RadioGroup 
        value={selectedTheme} 
        onValueChange={setSelectedTheme}
        className="space-y-3"
      >
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedTheme === theme.id
                ? "border-amber-500 bg-amber-500/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
          >
            <RadioGroupItem 
              value={theme.id} 
              id={theme.id} 
              className="sr-only" 
            />
            <Label htmlFor={theme.id} className="cursor-pointer flex items-center gap-3">
              <div className={`w-10 h-10 rounded ${theme.preview}`}></div>
              <div>
                <div className="font-medium">{theme.name}</div>
                <div className="text-sm text-gray-400">{theme.description}</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <Label className="text-gray-300 mb-2 block">Theme Effects</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="text-sm font-medium">Motion Speed</div>
            <select className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm">
              <option>Slow</option>
              <option>Medium</option>
              <option>Fast</option>
            </select>
          </div>
          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="text-sm font-medium">Overlay</div>
            <select className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm">
              <option>None</option>
              <option>Particles</option>
              <option>Glitch</option>
              <option>Scanlines</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;