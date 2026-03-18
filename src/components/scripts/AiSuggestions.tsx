import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sparkles, ThumbsUp, ThumbsDown, Copy, RotateCw } from "lucide-react";

interface AiSuggestionsProps {
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ suggestions, setSuggestions }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestions = () => {
    setIsGenerating(true);
    // Simulate AI suggestions
    setTimeout(() => {
      const newSuggestions = [
        "Add a surprising statistic in the first 10 seconds to hook viewers",
        "Consider using the 'before and after' storytelling technique",
        "Include a strong call-to-action at the end to boost engagement",
        "Try breaking this into a 3-part series for better retention",
        "Add a personal anecdote to make it more relatable",
        "Include a visual metaphor to explain complex concepts",
        "Consider adding a poll or question to increase interaction",
        "Try the 'problem-solution' framework for better structure"
      ];
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          AI Suggestions
        </h2>
        <Button 
          onClick={generateSuggestions}
          disabled={isGenerating}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          {isGenerating ? (
            <>
              <div className="w-3 h-3 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating
            </>
          ) : (
            <>
              <RotateCw className="w-4 h-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </div>
      
      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="p-4 bg-gray-900/30 border border-gray-700 rounded-lg"
            >
              <div className="text-gray-300 mb-3">{suggestion}</div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className="mb-3">No suggestions yet</p>
          <p className="text-sm">Generate AI suggestions to improve your script</p>
        </div>
      )}
    </div>
  );
};

export default AiSuggestions;