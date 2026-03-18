import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Crown } from "lucide-react";

interface CreditsMeterProps {
  credits: number;
  plan: string;
  onUpgrade: () => void;
}

const CreditsMeter: React.FC<CreditsMeterProps> = ({ credits, plan, onUpgrade }) => (
  <Card className="bg-gray-900/50 border-gray-800">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Video Credits</h3>
        <Badge variant="secondary" className={credits > 0 ? "bg-green-900/50" : "bg-red-900/50"}>
          {credits} remaining
        </Badge>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
          style={{ width: `${Math.min(100, credits * 20)}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        {plan === "free" 
          ? "Upgrade for more credits" 
          : `Renews in ${Math.floor(Math.random() * 30)} days`}
      </p>
      <Button 
        className="w-full" 
        variant={plan === "free" ? "default" : "outline"}
        onClick={onUpgrade}
      >
        {plan === "free" ? (
          <>
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
          </>
        ) : (
          "Manage Subscription"
        )}
      </Button>
    </CardContent>
  </Card>
);

export default CreditsMeter;