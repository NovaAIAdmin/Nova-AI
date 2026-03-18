import React from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Volume2 } from "lucide-react";

interface VoiceSelectorProps {
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, setSelectedVoice }) => {
  const voices = [
    { id: "calm-male", name: "Calm Male", description: "Smooth and professional" },
    { id: "energetic-female", name: "Energetic Female", description: "Upbeat and engaging" },
    { id: "robotic", name: "Robotic", description: "Futuristic and precise" },
    { id: "warm-narrator", name: "Warm Narrator", description: "Friendly and storytelling" },
    { id: "deep-voice", name: "Deep Voice", description: "Authoritative and commanding" },
    { id: "child-voice", name: "Child Voice", description: "Playful and innocent" }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-amber-500" />
        Voice Selection
      </h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-gray-300 mb-2 block">Voice Type</Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="bg-gray-900 border-gray-700 focus:ring-amber-500">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {voices.map((voice) => (
                <SelectItem 
                  key={voice.id} 
                  value={voice.id}
                  className="focus:bg-amber-500/10"
                >
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-gray-300 mb-2 block">Voice Preview</Label>
          <RadioGroup 
            value={selectedVoice} 
            onValueChange={setSelectedVoice}
            className="grid grid-cols-2 gap-3"
          >
            {voices.map((voice) => (
              <div 
                key={voice.id} 
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedVoice === voice.id
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <RadioGroupItem 
                  value={voice.id} 
                  id={voice.id} 
                  className="sr-only" 
                />
                <Label htmlFor={voice.id} className="cursor-pointer">
                  <div className="font-medium">{voice.name}</div>
                  <div className="text-sm text-gray-400">{voice.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <Label className="text-gray-300 mb-2 block">Voice Settings</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-400 mb-1">Speed</Label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                defaultValue="1" 
                className="w-full"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1">Pitch</Label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                defaultValue="1" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;