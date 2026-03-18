import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Play, Video } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
  onDownload: () => void;
  onReset: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onDownload,
  onReset
}) => {
  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-contain"
              autoPlay
              loop
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Video className="h-12 w-12" />
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs">
            0:30
          </div>
        </div>
        <div className="p-4 flex flex-col sm:flex-row justify-between gap-3">
          <Button onClick={onDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download MP4
          </Button>
          <Button variant="outline" onClick={onReset} className="flex-1">
            <Play className="h-4 w-4 mr-2" />
            Create Another
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;