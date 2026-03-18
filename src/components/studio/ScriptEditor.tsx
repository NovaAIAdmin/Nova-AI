import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScriptSegment } from "../../types";
import { Sparkles, RotateCw, Copy, Download, Upload } from "lucide-react";

interface ScriptEditorProps {
  script: string;
  setScript: (script: string) => void;
  segments: ScriptSegment[];
  setSegments: (segments: ScriptSegment[]) => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({
  script,
  setScript,
  segments,
  setSegments
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setWordCount(script.trim() ? script.trim().split(/\s+/).length : 0);
  }, [script]);

  const splitIntoSegments = () => {
    if (!script.trim()) return;
    
    const words = script.split(/\s+/);
    const segmentLength = 30; // Approx 3-5 seconds per segment
    const newSegments: ScriptSegment[] = [];
    
    for (let i = 0; i < words.length; i += segmentLength) {
      const segmentWords = words.slice(i, i + segmentLength);
      newSegments.push({
        id: `seg-${i / segmentLength + 1}`,
        text: segmentWords.join(" "),
        duration: Math.min(5000, Math.max(2000, segmentWords.length * 100))
      });
    }
    
    setSegments(newSegments);
  };

  const generateAiSuggestions = () => {
    setIsGenerating(true);
    // Simulate AI suggestions
    setTimeout(() => {
      const suggestions = [
        "Did you know that videos with a hook in the first 3 seconds get 3x more views?",
        "Try adding a call-to-action at the end to increase engagement",
        "Consider breaking this into a series for better audience retention",
        "Adding statistics can increase credibility by 40%"
      ];
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Script Editor</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {wordCount} words • {Math.ceil(wordCount / 150)} min read
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={splitIntoSegments}
            disabled={!script.trim()}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Split Segments
          </Button>
          <Button 
            onClick={generateAiSuggestions}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Suggestions
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here..."
        className="min-h-[200px] bg-gray-900 border-gray-700 focus:ring-amber-500 focus:border-amber-500"
      />
      
      {segments.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Segments Preview</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {segments.map((segment, index) => (
              <div 
                key={segment.id} 
                className="p-3 bg-gray-900/30 border border-gray-700 rounded-lg"
              >
                <div className="text-xs text-gray-500 mb-1">
                  Segment {index + 1} • {Math.round(segment.duration / 1000)}s
                </div>
                <div className="text-gray-300">{segment.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptEditor;