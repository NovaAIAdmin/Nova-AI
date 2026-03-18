import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Zap, CheckCircle } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
  plan: string;
}

interface AIModelSelectorProps {
  models: Model[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  plan: string;
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
  plan
}) => (
  <Card className="bg-gray-900/50 border-gray-800">
    <CardHeader>
      <CardTitle className="flex items-center">
        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
        AI Model
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            className={`p-4 rounded-lg text-left border transition-all ${
              selectedModel === model.id
                ? "border-blue-500 bg-gradient-to-br from-blue-900/30 to-purple-900/30 shadow-lg"
                : "border-gray-700 hover:bg-gray-800/50"
            } ${model.plan !== "free" && plan === "free" ? "opacity-60" : ""}`}
            onClick={() => onSelectModel(model.id)}
            disabled={model.plan !== "free" && plan === "free"}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium flex items-center">
                  {model.name}
                  {model.plan !== "free" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {model.plan.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">{model.description}</div>
              </div>
              {selectedModel === model.id && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default AIModelSelector;