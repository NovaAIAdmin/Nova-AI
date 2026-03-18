import React from "react";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, disabled, isGenerating }) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled || isGenerating}
      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    >
      {isGenerating ? (
        <>
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          Generating...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Generate Video
        </>
      )}
    </Button>
  );
};

export default ExportButton;