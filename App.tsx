import React, { useState, useEffect } from "react";
import { Play, Download, User, LogOut, Settings, Video, Sparkles, History, Shield, Palette, Music, Mic, Type, Image } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Textarea } from "./components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import TextInput from "./components/TextInput";
import VoiceSelector from "./components/VoiceSelector";
import ThemeSelector from "./components/ThemeSelector";
import VideoPreview from "./components/VideoPreview";
import ExportButton from "./components/ExportButton";

const App: React.FC = () => {
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("calm-male");
  const [selectedTheme, setSelectedTheme] = useState("abstract-blur");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [segments, setSegments] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    setWordCount(script.trim() ? script.trim().split(/\s+/).length : 0);
  }, [script]);

  const handlePreview = () => {
    if (!script.trim() || wordCount > 500) return;
    
    // Split script into segments (simplified for demo)
    const words = script.split(" ");
    const segmentLength = Math.ceil(words.length / 4);
    const newSegments = [];
    
    for (let i = 0; i < words.length; i += segmentLength) {
      newSegments.push(words.slice(i, i + segmentLength).join(" "));
    }
    
    setSegments(newSegments);
    setIsPreviewing(true);
  };

  const handleStopPreview = () => {
    setIsPreviewing(false);
  };

  const handleExport = () => {
    if (credits <= 0) return;
    
    setIsGenerating(true);
    // Simulate export process
    setTimeout(() => {
      setIsGenerating(false);
      setCredits(prev => prev - 1);
      alert("Video exported successfully! In a real app, this would download a video file.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900/90 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg shadow-lg">
              <Video className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              FacelessAI
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Templates</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">{credits} credits</span>
            </div>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-700">U</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Create Professional Faceless Videos
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Generate engaging videos for social media without showing your face. Perfect for YouTube Shorts, TikTok, and Instagram Reels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Controls */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-900/50 border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Sparkles className="h-6 w-6 mr-3 text-blue-500" />
                  Create Your Video Script
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TextInput 
                  value={script}
                  onChange={setScript}
                  wordCount={wordCount}
                />
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-400">
                    {wordCount}/500 words
                  </div>
                  <Button 
                    onClick={handlePreview}
                    disabled={!script.trim() || wordCount > 500 || isPreviewing}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-6 py-3 text-base font-medium shadow-lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Preview Video
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VoiceSelector 
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
              />
              
              <ThemeSelector 
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
            </div>
          </div>
          
          {/* Right Column - Preview and Export */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <History className="h-6 w-6 mr-3 text-amber-500" />
                  Video Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPreviewing ? (
                  <VideoPreview 
                    segments={segments}
                    selectedTheme={selectedTheme}
                    selectedVoice={selectedVoice}
                    onStop={handleStopPreview}
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700 shadow-inner">
                    <div className="text-center p-6">
                      <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 mx-auto flex items-center justify-center mb-4">
                        <Video className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Video Preview</h3>
                      <p className="text-gray-400 max-w-xs mx-auto">
                        Enter your script and click "Preview Video" to see your creation
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Download className="h-6 w-6 mr-3 text-green-500" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center mb-2">
                        <Image className="h-5 w-5 text-blue-400 mr-2" />
                        <h3 className="font-medium">Resolution</h3>
                      </div>
                      <Select defaultValue="1080p">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="720p">720p HD</SelectItem>
                          <SelectItem value="1080p">1080p Full HD</SelectItem>
                          <SelectItem value="4k">4K Ultra HD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center mb-2">
                        <Type className="h-5 w-5 text-amber-400 mr-2" />
                        <h3 className="font-medium">Aspect Ratio</h3>
                      </div>
                      <Select defaultValue="9:16">
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">1:1 Square</SelectItem>
                          <SelectItem value="9:16">9:16 Vertical</SelectItem>
                          <SelectItem value="16:9">16:9 Horizontal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center mb-2">
                        <Mic className="h-5 w-5 text-purple-400 mr-2" />
                        <h3 className="font-medium">Voice Style</h3>
                      </div>
                      <div className="text-sm text-gray-300 capitalize">
                        {selectedVoice.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center mb-2">
                        <Palette className="h-5 w-5 text-pink-400 mr-2" />
                        <h3 className="font-medium">Theme</h3>
                      </div>
                      <div className="text-sm text-gray-300 capitalize">
                        {selectedTheme.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  
                  <ExportButton 
                    isGenerating={isGenerating}
                    onExport={handleExport}
                    disabled={!script.trim() || credits <= 0}
                    credits={credits}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
                  <Video className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">FacelessAI</h2>
              </div>
              <p className="text-gray-400">
                Create professional videos without showing your face. Perfect for content creators and marketers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2023 FacelessAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;