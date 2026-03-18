import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface AIPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const AIPromptInput: React.FC<AIPromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the video you want to create... (e.g., 'A futuristic cityscape at sunset with flying cars')"
          className="w-full min-h-[150px] p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          disabled={disabled}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {value.length}/500
        </div>
      </div>
      <Button 
        className="w-full" 
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        size="lg"
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Generate Video
      </Button>
    </div>
  );
};

export default AIPromptInput;