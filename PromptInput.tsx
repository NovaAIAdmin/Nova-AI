import React from "react";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  wordCount?: number;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, wordCount = 0 }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <Textarea
          placeholder="Describe your video concept... (e.g., 'A futuristic cityscape at sunset with flying cars and neon lights, cinematic 4K style')"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] bg-gray-800/50 border-gray-700 text-lg p-6 pl-16 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {wordCount}/300 words
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-400 mb-1">Prompt Tips</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Be specific about scene details</li>
              <li>• Include visual style (e.g. cinematic)</li>
              <li>• Mention lighting and atmosphere</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-amber-400 mb-1">Best Practices</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use descriptive adjectives</li>
              <li>• Specify camera angles/movements</li>
              <li>• Include subject actions</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-400 mb-1">Example Prompts</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• "Underwater coral reef with colorful fish"</li>
              <li>• "Cyberpunk street market at night"</li>
              <li>• "Mountain landscape with aurora borealis"</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptInput;