import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Sparkles, RotateCw, Copy, Download, Upload, Wand2 } from "lucide-react";

interface ScriptEditorProps {
  script: string;
  setScript: (script: string) => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ script, setScript }) => {
  const [wordCount, setWordCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setWordCount(script.trim() ? script.trim().split(/\s+/).length : 0);
  }, [script]);

  const generateScript = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const sampleScripts = [
        "Did you know that 90% of successful content creators use this one simple trick? In today's video, I'm going to show you how to...",
        "Stop everything you're doing and listen closely. This revolutionary technique will change how you create content forever...",
        "What if I told you there's a way to double your engagement in just 24 hours? Let me show you exactly how it's done...",
        "Most people make this critical mistake when creating content. Here's what you need to do instead to stand out..."
      ];
      setScript(sampleScripts[Math.floor(Math.random() * sampleScripts.length)]);
      setIsGenerating(false);
    }, 2000);
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
        <Button 
          onClick={generateScript}
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
              <Wand2 className="w-4 h-4 mr-2" />
              AI Generate
            </>
          )}
        </Button>
      </div>
      
      <Textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here or use AI to generate one..."
        className="min-h-[300px] bg-gray-900 border-gray-700 focus:ring-purple-500 focus:border-purple-500"
      />
      
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Rewrite
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Enhance
        </Button>
      </div>
    </div>
  );
};

export default ScriptEditor;