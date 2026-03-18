import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface VideoPreviewProps {
  prompt: string;
  selectedTheme: string;
  selectedVoice: string;
  isPreviewing: boolean;
  onPreviewStart: () => void;
  onPreviewStop: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  prompt,
  selectedTheme,
  selectedVoice,
  isPreviewing,
  onPreviewStart,
  onPreviewStop
}) => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const segmentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Split prompt into segments (simplified for demo)
  const segments = prompt 
    ? prompt.split('. ').filter(s => s.trim().length > 0).map(s => s.trim() + '.')
    : ["Enter a prompt to generate your AI video", "Your content will appear here", "Select voice and theme to customize"];

  // Theme classes mapping
  const themeClasses: Record<string, string> = {
    "abstract-blur": "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-x",
    "cosmic-nebula": "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-pulse-slow",
    "minimalist": "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    "neon-grid": "bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 bg-[length:40px_40px] animate-grid-move",
    "default": "bg-gradient-to-br from-gray-900 to-black"
  };

  // Voice mapping for speech synthesis
  const voiceMap: Record<string, string> = {
    "calm-male": "Google UK English Male",
    "energetic-female": "Google UK English Female",
    "robotic": "Microsoft David - English (United States)",
    "warm-narrator": "Google US English"
  };

  // Handle preview start
  const handleStartPreview = () => {
    if (segments.length === 0) return;
    
    setIsPlaying(true);
    onPreviewStart();
    setCurrentSegment(0);
    
    // Speak first segment
    speakSegment(0);
    
    // Set up timer for next segments
    if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
    segmentTimerRef.current = setTimeout(nextSegment, 3500);
  };

  // Handle preview stop
  const handleStopPreview = () => {
    setIsPlaying(false);
    onPreviewStop();
    
    if (segmentTimerRef.current) {
      clearTimeout(segmentTimerRef.current);
      segmentTimerRef.current = null;
    }
    
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      speechSynthesisRef.current = null;
    }
  };

  // Speak current segment
  const speakSegment = (index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(segments[index]);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1;
      
      // Try to set voice
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === voiceMap[selectedVoice]);
      if (voice) utterance.voice = voice;
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Move to next segment
  const nextSegment = () => {
    setCurrentSegment(prev => {
      const next = (prev + 1) % segments.length;
      
      // Speak next segment
      speakSegment(next);
      
      // Set timer for following segment
      if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
      segmentTimerRef.current = setTimeout(nextSegment, 3500);
      
      return next;
    });
  };

  // Reset preview
  const handleReset = () => {
    handleStopPreview();
    setCurrentSegment(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (segmentTimerRef.current) clearTimeout(segmentTimerRef.current);
      if (speechSynthesisRef.current) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <Card className="bg-gray-900/50 border-gray-800 shadow-xl overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Preview Display */}
        <div 
          className={`relative flex-1 flex items-center justify-center p-6 transition-all duration-1000 ${
            themeClasses[selectedTheme] || themeClasses.default
          }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          {/* Text Display */}
          <div className="relative z-10 text-center max-w-2xl">
            <div className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-500 animate-fade-in">
              {segments[currentSegment] || "Enter a prompt to begin"}
            </div>
            
            {isPreviewing && (
              <div className="flex justify-center space-x-2 mt-4">
                {[...Array(segments.length)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentSegment ? "w-8 bg-white" : "w-2 bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Preview Controls Overlay */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {isPreviewing ? (
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleStopPreview}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Pause className="h-4 w-4 mr-1" />
                Stop
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleStartPreview}
                disabled={!prompt.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleReset}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-800/50 p-3 border-t border-gray-700 text-sm text-gray-400">
          <div className="flex justify-between">
            <div>
              {isPreviewing 
                ? `Playing segment ${currentSegment + 1} of ${segments.length}` 
                : "Ready to preview"}
            </div>
            <div>
              Voice: {voiceMap[selectedVoice] || "Default"} | Theme: {selectedTheme}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;