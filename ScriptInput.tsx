import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, Type } from "lucide-react";

interface ScriptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ value, onChange, disabled }) => {
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 500;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    if (words <= maxWords) {
      onChange(text);
      setWordCount(words);
    }
  };

  const splitIntoSegments = (text: string): string[] => {
    const words = text.trim().split(/\s+/);
    const segments: string[] = [];
    const wordsPerSegment = 75; // ~3-5 seconds per segment
    
    for (let i = 0; i < words.length; i += wordsPerSegment) {
      segments.push(words.slice(i, i + wordsPerSegment).join(' '));
    }
    
    return segments;
  };

  const segments = splitIntoSegments(value);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Script Input
        </CardTitle>
        <CardDescription>
          Enter your video script (max {maxWords} words)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            value={value}
            onChange={handleTextChange}
            placeholder="Enter your script here... Write in a conversational tone for best results."
            className="min-h-[200px] bg-gray-800/50 border-gray-700 resize-none"
            disabled={disabled}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {wordCount}/{maxWords} words
          </div>
        </div>
        
        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Type className="mr-2 h-4 w-4 text-blue-400" />
            <Label className="text-sm font-medium">Script Analysis</Label>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Segments</p>
              <p className="font-medium">{segments.length}</p>
            </div>
            <div>
              <p className="text-gray-400">Estimated Duration</p>
              <p className="font-medium">{segments.length * 4}s</p>
            </div>
            <div>
              <p className="text-gray-400">Words</p>
              <p className="font-medium">{wordCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptInput;