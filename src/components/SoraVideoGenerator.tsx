import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Check, Zap, Video } from "lucide-react";

interface SoraVideoGeneratorProps {
  prompt: string;
  onVideoGenerated: (url: string) => void;
}

const SoraVideoGenerator: React.FC<SoraVideoGeneratorProps> = ({ 
  prompt, 
  onVideoGenerated 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, title: "Prompt Analysis", description: "Understanding your request", icon: Check },
    { id: 2, title: "Scene Generation", description: "Creating visual elements", icon: Zap },
    { id: 3, title: "Video Assembly", description: "Compiling final output", icon: Video }
  ];

  useEffect(() => {
    if (!prompt) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate video generation completion
          setTimeout(() => {
            // In a real app, this would be the actual generated video URL
            onVideoGenerated("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
          }, 500);
          return 100;
        }
        return prev + 5;
      });
      
      // Update current step based on progress
      if (progress >= 66) {
        setCurrentStep(2);
      } else if (progress >= 33) {
        setCurrentStep(1);
      } else {
        setCurrentStep(0);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [prompt, onVideoGenerated, progress]);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Generating Your Video</h3>
          <p className="text-gray-400 mb-6">This usually takes 30-60 seconds</p>
          
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400">{progress}% complete</p>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = progress > (index + 1) * 33;
              
              return (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-lg transition-all ${
                    isActive 
                      ? "bg-blue-900/30 border border-blue-700" 
                      : isCompleted 
                        ? "bg-green-900/20 border border-green-700" 
                        : "bg-gray-800/50"
                  }`}
                >
                  <div className={`flex items-center mb-2 ${
                    isCompleted ? "text-green-500" : isActive ? "text-blue-500" : "text-gray-500"
                  }`}>
                    <Icon className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoraVideoGenerator;