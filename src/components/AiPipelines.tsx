import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Zap,
  Sparkles,
  Cpu,
  Workflow,
  GitBranch,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  type: "script" | "voice" | "visual" | "enhancement";
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  settings: Record<string, any>;
}

interface Pipeline {
  id: string;
  name: string;
  description: string;
  steps: PipelineStep[];
  createdAt: Date;
  lastRun: Date | null;
  isActive: boolean;
}

const AiPipelines: React.FC = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "Viral Short Creator",
      description: "Creates trending shorts with optimized scripts",
      steps: [
        { id: "s1", name: "Script Generation", type: "script", status: "completed", progress: 100, settings: {} },
        { id: "s2", name: "Voice Selection", type: "voice", status: "completed", progress: 100, settings: {} },
        { id: "s3", name: "Visual Enhancement", type: "visual", status: "running", progress: 65, settings: {} },
        { id: "s4", name: "Final Optimization", type: "enhancement", status: "pending", progress: 0, settings: {} }
      ],
      createdAt: new Date(2023, 5, 15),
      lastRun: new Date(2023, 5, 20),
      isActive: true
    },
    {
      id: "2",
      name: "Educational Series",
      description: "Creates educational content with clear explanations",
      steps: [
        { id: "s1", name: "Content Research", type: "script", status: "completed", progress: 100, settings: {} },
        { id: "s2", name: "Script Structuring", type: "script", status: "completed", progress: 100, settings: {} },
        { id: "s3", name: "Narration Setup", type: "voice", status: "completed", progress: 100, settings: {} },
        { id: "s4", name: "Visual Design", type: "visual", status: "pending", progress: 0, settings: {} }
      ],
      createdAt: new Date(2023, 5, 10),
      lastRun: null,
      isActive: false
    }
  ]);

  const [activePipeline, setActivePipeline] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const [newPipelineDescription, setNewPipelineDescription] = useState("");

  const runPipeline = (pipelineId: string) => {
    setActivePipeline(pipelineId);
    setIsRunning(true);
    
    // Simulate pipeline execution
    const pipeline = pipelines.find(p => p.id === pipelineId);
    if (pipeline) {
      const updatedSteps = [...pipeline.steps];
      
      // Simulate step execution
      updatedSteps.forEach((step, index) => {
        setTimeout(() => {
          step.status = "running";
          step.progress = 30;
          
          setTimeout(() => {
            step.progress = 70;
            
            setTimeout(() => {
              step.status = "completed";
              step.progress = 100;
              
              // Update pipeline state
              setPipelines(prev => prev.map(p => 
                p.id === pipelineId 
                  ? { ...p, steps: updatedSteps, lastRun: new Date() } 
                  : p
              ));
              
              // If last step, stop running
              if (index === updatedSteps.length - 1) {
                setIsRunning(false);
              }
            }, 1000);
          }, 800);
        }, index * 2000);
      });
    }
  };

  const createNewPipeline = () => {
    if (!newPipelineName.trim()) return;
    
    const newPipeline: Pipeline = {
      id: `p${pipelines.length + 1}`,
      name: newPipelineName,
      description: newPipelineDescription,
      steps: [
        { id: "s1", name: "Script Analysis", type: "script", status: "pending", progress: 0, settings: {} },
        { id: "s2", name: "Voice Optimization", type: "voice", status: "pending", progress: 0, settings: {} },
        { id: "s3", name: "Visual Enhancement", type: "visual", status: "pending", progress: 0, settings: {} }
      ],
      createdAt: new Date(),
      lastRun: null,
      isActive: false
    };
    
    setPipelines([...pipelines, newPipeline]);
    setNewPipelineName("");
    setNewPipelineDescription("");
  };

  const deletePipeline = (pipelineId: string) => {
    setPipelines(pipelines.filter(p => p.id !== pipelineId));
  };

  const getStatusIcon = (status: PipelineStep["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "running": return <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />;
      case "failed": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-slate-600"></div>;
    }
  };

  const getTypeColor = (type: PipelineStep["type"]) => {
    switch (type) {
      case "script": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "voice": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "visual": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "enhancement": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Workflow className="w-6 h-6 text-amber-500" />
          AI Pipelines
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => document.getElementById("create-pipeline-modal")?.classList.remove("hidden")}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Pipeline
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold">Your Pipelines</h3>
          <div className="space-y-3">
            {pipelines.map((pipeline) => (
              <div 
                key={pipeline.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activePipeline === pipeline.id
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
                }`}
                onClick={() => setActivePipeline(pipeline.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {pipeline.name}
                      {pipeline.isActive && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {pipeline.description}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePipeline(pipeline.id);
                    }}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    {pipeline.steps.filter(s => s.status === "completed").length} of {pipeline.steps.length} steps
                  </div>
                  <div className="text-slate-400">
                    {pipeline.lastRun 
                      ? `Last run: ${pipeline.lastRun.toLocaleDateString()}` 
                      : "Never run"}
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="bg-amber-500 h-1.5 rounded-full" 
                    style={{ 
                      width: `${(pipeline.steps.filter(s => s.status === "completed").length / pipeline.steps.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pipeline Details */}
        <div className="lg:col-span-2">
          {activePipeline ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold">
                    {pipelines.find(p => p.id === activePipeline)?.name}
                  </h3>
                  <p className="text-slate-400 mt-1">
                    {pipelines.find(p => p.id === activePipeline)?.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => runPipeline(activePipeline)}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Pipeline
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-amber-500" />
                  Pipeline Steps
                </h4>
                
                <div className="space-y-3">
                  {pipelines.find(p => p.id === activePipeline)?.steps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className="p-4 rounded-lg border border-slate-700 bg-slate-900/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{step.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getTypeColor(step.type)}`}>
                              {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {getStatusIcon(step.status)}
                          <div className="text-sm text-slate-400">
                            {step.status === "running" ? `${step.progress}%` : 
                             step.status === "completed" ? "Completed" : 
                             step.status === "failed" ? "Failed" : "Pending"}
                          </div>
                        </div>
                      </div>
                      
                      {step.status === "running" && (
                        <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full" 
                            style={{ width: `${step.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h4 className="font-medium mb-3">Pipeline Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Execution Mode</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option>Automatic</option>
                      <option>Manual Approval</option>
                      <option>Scheduled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Output Format</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option>MP4 (1080x1920)</option>
                      <option>MP4 (720x1280)</option>
                      <option>WebM (1080x1920)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">AI Enhancement Level</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option>Standard</option>
                      <option>Enhanced</option>
                      <option>Maximum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Auto-publish Platforms</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                      <option>None</option>
                      <option>YouTube Shorts</option>
                      <option>TikTok</option>
                      <option>Instagram Reels</option>
                      <option>All Platforms</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
              <Cpu className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select a Pipeline</h3>
              <p className="text-slate-400">
                Choose a pipeline from the list to view details and run it
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Pipeline Modal */}
      <div 
        id="create-pipeline-modal" 
        className="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Create New Pipeline
            </h3>
            <button 
              onClick={() => document.getElementById("create-pipeline-modal")?.classList.add("hidden")}
              className="p-1 rounded hover:bg-slate-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Pipeline Name</label>
              <input
                type="text"
                value={newPipelineName}
                onChange={(e) => setNewPipelineName(e.target.value)}
                placeholder="e.g., Viral Content Creator"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Description</label>
              <textarea
                value={newPipelineDescription}
                onChange={(e) => setNewPipelineDescription(e.target.value)}
                placeholder="Describe what this pipeline does..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Template</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Blank Pipeline</option>
                <option>Viral Short Creator</option>
                <option>Educational Series</option>
                <option>Product Showcase</option>
                <option>Storytelling Narrative</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-700 flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById("create-pipeline-modal")?.classList.add("hidden")}
              className="border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={createNewPipeline}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              Create Pipeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPipelines;