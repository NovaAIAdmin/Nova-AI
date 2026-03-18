import React, { useState } from "react";
import TemplateCategories from "../components/templates/TemplateCategories";
import TemplateGrid from "../components/templates/TemplateGrid";
import TemplateUploader from "../components/templates/TemplateUploader";

const TemplateLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Template Library</h1>
        <p className="text-gray-400">Browse and customize video templates</p>
      </div>

      <TemplateCategories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TemplateGrid 
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
        <div>
          <TemplateUploader />
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;