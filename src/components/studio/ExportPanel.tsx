import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScriptSegment } from "../../types";
import { Download, Share2, Video, FileText } from "lucide-react";

interface ExportPanelProps {
  isPreviewing: boolean;
  segments: ScriptSegment[];
  isGenerating?: boolean;
  generatedVideo?: Blob | null;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  isPreviewing,
  segments,
  isGenerating = false,
  generatedVideo = null
}) => {
  const [exportFormat, setExportFormat] = useState("mp4");
  const [resolution, setResolution] = useState("1080x1920");

  const handleExport = () => {
    // Simulate export process
    alert("Export started! In a real app, this would generate your video.");
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Export Video</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Format</label>
          <select 
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="mp4">MP4 (Recommended)</option>
            <option value="mov">MOV</option>
            <option value="avi">AVI</option>
            <option value="webm">WebM</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-2">Resolution</label>
          <select 
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="1080x1920">1080x1920 (9:16 Vertical)</option>
            <option value="1920x1080">1920x1080 (16:9 Horizontal)</option>
            <option value="720x1280">720x1280 (9:16 Vertical)</option>
            <option value="1280x720">1280x720 (16:9 Horizontal)</option>
          </select>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-medium">Video Details</div>
              <div className="text-sm text-gray-400">
                {segments.length} segments • ~{Math.ceil(segments.reduce((acc, seg) => acc + seg.duration, 0) / 1000)}s
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Script
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleExport}
            disabled={isPreviewing || segments.length === 0 || isGenerating}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Video...
              </>
            ) : generatedVideo ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Video
              </>
            )}
          </Button>
          
          {generatedVideo && (
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Re-export
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;