import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Mic } from "lucide-react";

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onVoiceChange }) => {
  const voices = [
    { id: "calm-male", name: "Calm Male", description: "Smooth and professional" },
    { id: "energetic-female", name: "Energetic Female", description: "Upbeat and engaging" },
    { id: "robotic", name: "Robotic", description: "Futuristic AI voice" },
    { id: "warm-narrator", name: "Warm Narrator", description: "Friendly and inviting" },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800 shadow-xl h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Mic className="h-5 w-5 mr-2 text-blue-500" />
          Voice Style
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedVoice} onValueChange={onVoiceChange}>
          <SelectTrigger className="bg-gray-800 border-gray-700 h-12 text-lg">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {voices.map((voice) => (
              <SelectItem 
                key={voice.id} 
                value={voice.id}
                className="py-2 hover:bg-gray-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{voice.name}</span>
                  <span className="text-sm text-gray-400">{voice.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-amber-400 mb-2">Voice Preview</h3>
          <p className="text-sm text-gray-300">
            Selected voice will narrate your AI-generated video. Each voice has been optimized 
            for different content types and audience engagement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceSelector;