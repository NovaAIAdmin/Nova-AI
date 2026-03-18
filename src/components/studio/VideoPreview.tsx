import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ScriptSegment } from "../../types";
import { Play, Pause, RotateCw, Settings } from "lucide-react";

interface VideoPreviewProps {
  segments: ScriptSegment[];
  currentSegmentIndex: number;
  isPreviewing: boolean;
  setIsPreviewing: (previewing: boolean) => void;
  setCurrentSegmentIndex: (index: number) => void;
  selectedTheme: string;
  selectedVoice: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  segments,
  currentSegmentIndex,
  isPreviewing,
  setIsPreviewing,
  setCurrentSegmentIndex,
  selectedTheme,
  selectedVoice
}) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPreviewing && segments.length > 0) {
      if (timer) clearTimeout(timer);
      
      const nextTimer = setTimeout(() => {
        if (currentSegmentIndex < segments.length - 1) {
          setCurrentSegmentIndex(currentSegmentIndex + 1);
        } else {
          setIsPreviewing(false);
          setCurrentSegmentIndex(0);
        }
      }, segments[currentSegmentIndex]?.duration || 3000);
      
      setTimer(nextTimer);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPreviewing, currentSegmentIndex, segments, setCurrentSegmentIndex, setIsPreviewing, timer]);

  const handlePlayPause = () => {
    setIsPreviewing(!isPreviewing);
  };

  const handleReset = () => {
    setIsPreviewing(false);
    setCurrentSegmentIndex(0);
    if (timer) clearTimeout(timer);
  };

  const getThemeClass = () => {
    switch (selectedTheme) {
      case "abstract-blur":
        return "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900";
      case "cosmic-nebula":
        return "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900";
      case "minimalist-gradient":
        return "bg-gradient-to-br from-gray-900 to-gray-800";
      case "neon-grid":
        return "bg-gradient-to-br from-gray-900 to-black";
      case "ocean-depths":
        return "bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900";
      case "sunset-glow":
        return "bg-gradient-to-br from-orange-900 via-red-900 to-pink-900";
      default:
        return "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900";
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Video Preview</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
      
      <div className={`relative rounded-xl overflow-hidden aspect-[9/16] ${getThemeClass()} flex items-center justify-center`}>
        {segments.length > 0 ? (
          <div className="text-center px-4">
            <div className="text-2xl font-bold text-white mb-4 animate-fade-in">
              {segments[currentSegmentIndex]?.text}
            </div>
            <div className="text-sm text-gray-300">
              Segment {currentSegmentIndex + 1} of {segments.length}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="mb-2">No content to preview</div>
            <div className="text-sm">Add a script and split into segments</div>
          </div>
        )}
        
        {isPreviewing && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ 
                  width: `${((segments[currentSegmentIndex]?.duration || 3000) - (timer ? 0 : 0)) / (segments[currentSegmentIndex]?.duration || 3000) * 100}%`,
                  transition: `width ${(segments[currentSegmentIndex]?.duration || 3000) / 1000}s linear`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={handleReset}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button 
          onClick={handlePlayPause}
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
        >
          {isPreviewing ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Play Preview
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;