import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { 
  Palette, 
  Upload, 
  Plus, 
  Trash2, 
  Download,
  Save,
  Eye
} from "lucide-react";

interface BrandKit {
  colors: string[];
  fonts: string[];
  logo: string;
  slogan: string;
}

interface BrandKitManagerProps {
  brandKit: BrandKit;
  setBrandKit: (brandKit: BrandKit) => void;
}

const BrandKitManager: React.FC<BrandKitManagerProps> = ({ brandKit, setBrandKit }) => {
  const [newColor, setNewColor] = useState("");
  const [newFont, setNewFont] = useState("");

  const addColor = () => {
    if (newColor && !brandKit.colors.includes(newColor)) {
      setBrandKit({
        ...brandKit,
        colors: [...brandKit.colors, newColor]
      });
      setNewColor("");
    }
  };

  const removeColor = (color: string) => {
    setBrandKit({
      ...brandKit,
      colors: brandKit.colors.filter(c => c !== color)
    });
  };

  const addFont = () => {
    if (newFont && !brandKit.fonts.includes(newFont)) {
      setBrandKit({
        ...brandKit,
        fonts: [...brandKit.fonts, newFont]
      });
      setNewFont("");
    }
  };

  const removeFont = (font: string) => {
    setBrandKit({
      ...brandKit,
      fonts: brandKit.fonts.filter(f => f !== font)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Palette className="w-6 h-6 text-amber-500" />
          Brand Kit Manager
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Brand Colors</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
            {brandKit.colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-lg border border-slate-700 mb-1" 
                  style={{ backgroundColor: color }}
                ></div>
                <div className="text-xs text-slate-400 truncate w-full text-center">
                  {color}
                </div>
                <button 
                  onClick={() => removeColor(color)}
                  className="text-red-500 hover:text-red-400 mt-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              placeholder="Color code (e.g. #FF5733)"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="flex-1 bg-slate-900 border-slate-700"
            />
            <Button onClick={addColor} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Fonts */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Brand Fonts</h3>
          <div className="space-y-3 mb-4">
            {brandKit.fonts.map((font, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-slate-900 rounded-lg"
              >
                <div className="font-medium" style={{ fontFamily: font }}>
                  {font}
                </div>
                <button 
                  onClick={() => removeFont(font)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Font name"
              value={newFont}
              onChange={(e) => setNewFont(e.target.value)}
              className="flex-1 bg-slate-900 border-slate-700"
            />
            <Button onClick={addFont} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Logo */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Brand Logo</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="border-2 border-dashed border-slate-700 rounded-xl h-48 flex items-center justify-center">
              {brandKit.logo ? (
                <img 
                  src={brandKit.logo} 
                  alt="Brand Logo" 
                  className="max-h-40 max-w-full"
                />
              ) : (
                <div className="text-center text-slate-500">
                  <Upload className="w-12 h-12 mx-auto mb-2" />
                  <p>Upload your logo</p>
                  <p className="text-sm mt-1">PNG, JPG, SVG (max 5MB)</p>
                </div>
              )}
            </div>
            <Button className="w-full mt-4 bg-slate-700 hover:bg-slate-600">
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
          </div>
          
          <div className="flex-1">
            <Label className="text-sm text-slate-400 mb-2 block">Preview</Label>
            <div className="bg-slate-900 rounded-xl p-6 h-48 flex items-center justify-center">
              {brandKit.logo ? (
                <img 
                  src={brandKit.logo} 
                  alt="Logo Preview" 
                  className="max-h-32"
                />
              ) : (
                <div className="text-slate-500 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-2" />
                  <p>Logo preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Slogan */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Brand Slogan</h3>
        <Textarea
          value={brandKit.slogan}
          onChange={(e) => setBrandKit({ ...brandKit, slogan: e.target.value })}
          placeholder="Enter your brand slogan..."
          className="min-h-[100px] bg-slate-900 border-slate-700 focus:ring-amber-500"
        />
        <div className="mt-4 flex justify-end">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Save className="w-4 h-4 mr-2" />
            Save Slogan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandKitManager;