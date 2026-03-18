import React from "react";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  wordCount?: number;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, wordCount = 0 }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Enter your video script here... (e.g., 'Welcome to our channel! Today we'll explore the future of AI technology and how it's transforming our daily lives.')"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] bg-gray-800/50 border-gray-700 text-lg p-6 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {wordCount}/500 words
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-400 mb-1">Script Tips</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Keep sentences short and clear</li>
              <li>• Use active voice for better engagement</li>
              <li>• Include calls-to-action</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-amber-400 mb-1">Best Practices</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 150-300 words for optimal length</li>
              <li>• Include keywords naturally</li>
              <li>• Match tone to your audience</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-400 mb-1">Platform Guidelines</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Vertical: 9:16 for Shorts/Reels</li>
              <li>• Horizontal: 16:9 for YouTube</li>
              <li>• Keep key info in safe zone</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextInput;