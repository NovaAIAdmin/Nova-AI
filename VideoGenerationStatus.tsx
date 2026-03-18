import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  CheckCircle, 
  Pause,
  Zap,
  Sparkles,
  Calendar,
  Clock
} from "lucide-react";

interface VideoGenerationStatusProps {
  progress: number;
  status: 'analyzing' | 'generating' | 'assembling' | 'completed';
  onCancel: () => void;
}

const VideoGenerationStatus: React.FC<VideoGenerationStatusProps> = ({
  progress,
  status,
  onCancel
}) => {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Generating Your Video</h3>
          <p className="text-gray-400 mb-6">This usually takes 30-60 seconds</p>
          
          <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mb-6">{progress}% complete</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg border ${
              status === "analyzing" 
                ? "border-blue-500 bg-blue-900/20" 
                : status === "completed" 
                  ? "border-green-500 bg-green-900/20" 
                  : "border-gray-700 bg-gray-800/50"
            }`}>
              <div className="flex items-center mb-2">
                {status === "analyzing" ? (
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                ) : status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-2"></div>
                )}
                <span className="text-sm font-medium">Prompt Analysis</span>
              </div>
              <p className="text-xs text-gray-400">Understanding your request</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              status === "generating" 
                ? "border-purple-500 bg-purple-900/20" 
                : status === "completed" 
                  ? "border-green-500 bg-green-900/20" 
                  : "border-gray-700 bg-gray-800/50"
            }`}>
              <div className="flex items-center mb-2">
                {status === "generating" ? (
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                ) : status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-2"></div>
                )}
                <span className="text-sm font-medium">Scene Generation</span>
              </div>
              <p className="text-xs text-gray-400">Creating visual elements</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              status === "assembling" 
                ? "border-amber-500 bg-amber-900/20" 
                : status === "completed" 
                  ? "border-green-500 bg-green-900/20" 
                  : "border-gray-700 bg-gray-800/50"
            }`}>
              <div className="flex items-center mb-2">
                {status === "assembling" ? (
                  <div className="h-2 w-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                ) : status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-2"></div>
                )}
                <span className="text-sm font-medium">Video Assembly</span>
              </div>
              <p className="text-xs text-gray-400">Compiling final output</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex items-center"
          >
            <Pause className="h-4 w-4 mr-2" />
            Cancel Generation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoGenerationStatus;