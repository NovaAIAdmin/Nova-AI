import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Crown, Sparkles } from "lucide-react";

interface UpgradeSuccessProps {
  planName: string;
  credits: number;
  onClose: () => void;
  onContinue: () => void;
}

const UpgradeSuccess: React.FC<UpgradeSuccessProps> = ({ 
  planName, 
  credits, 
  onClose, 
  onContinue 
}) => {
  return (
    <Card className="bg-gray-900/50 border-gray-800 max-w-md w-full">
      <CardHeader className="text-center">
        <div className="mx-auto bg-green-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Upgrade Successful!</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-300 mb-6">
          You've successfully upgraded to the <span className="font-bold text-blue-400">{planName}</span> plan.
        </p>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Crown className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-bold text-lg">{credits} Video Credits</span>
          </div>
          <p className="text-sm text-gray-400">
            Ready to create amazing videos!
          </p>
        </div>
        
        <div className="flex items-center justify-center text-sm text-gray-400">
          <Sparkles className="h-4 w-4 mr-1" />
          <span>Enjoy premium features and priority support</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button className="w-full" onClick={onContinue}>
          Start Creating Videos
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeSuccess;