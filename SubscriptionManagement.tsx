import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  CreditCard, 
  Calendar, 
  Pause, 
  Play, 
  XCircle, 
  AlertCircle,
  CheckCircle
} from "lucide-react";
import PlanUsage from "./PlanUsage";
import BillingHistory from "./BillingHistory";

interface SubscriptionManagementProps {
  plan: string;
  status: 'active' | 'paused' | 'cancelled';
  nextBillingDate: string;
  billingRecords: any[];
  onManagePayment: () => void;
  onCancelSubscription: () => void;
  onResumeSubscription: () => void;
  onChangePlan: () => void;
}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  plan,
  status,
  nextBillingDate,
  billingRecords,
  onManagePayment,
  onCancelSubscription,
  onResumeSubscription,
  onChangePlan
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
              Subscription Details
            </span>
            <Badge className={getStatusColor()}>
              <span className="flex items-center">
                {getStatusIcon()}
                <span className="ml-1 capitalize">{status}</span>
              </span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium">{plan.toUpperCase()} Plan</div>
              <div className="text-sm text-gray-400">Billed monthly</div>
            </div>
            <Button variant="outline" onClick={onChangePlan}>
              Change Plan
            </Button>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium">Next Billing Date</div>
              <div className="text-sm text-gray-400">{nextBillingDate}</div>
            </div>
            <Button variant="outline" onClick={onManagePayment}>
              Update Payment
            </Button>
          </div>
          
          <div className="flex space-x-3 pt-2">
            {status === 'active' && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCancelConfirm(true)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Subscription
              </Button>
            )}
            
            {status === 'paused' && (
              <Button 
                className="flex-1"
                onClick={onResumeSubscription}
              >
                <Play className="h-4 w-4 mr-2" />
                Resume Subscription
              </Button>
            )}
            
            {status === 'cancelled' && (
              <Button 
                className="flex-1"
                onClick={onChangePlan}
              >
                <Play className="h-4 w-4 mr-2" />
                Reactivate Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <PlanUsage 
        plan={plan}
        creditsUsed={12}
        creditsTotal={50}
        videosGenerated={8}
        minutesGenerated={4}
        resetDate={nextBillingDate}
      />
      
      <BillingHistory billingRecords={billingRecords} />
      
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-800 max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <AlertCircle className="h-5 w-5 mr-2" />
                Cancel Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Are you sure you want to cancel your {plan.toUpperCase()} subscription? 
                You will lose access to premium features at the end of your billing period.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Your account will be downgraded to the free plan with limited features.
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  Keep Subscription
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    onCancelSubscription();
                    setShowCancelConfirm(false);
                  }}
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;