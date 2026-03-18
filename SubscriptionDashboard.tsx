import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  User, 
  Settings,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";

interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'past_due';
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  amount: number;
  currency: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  email?: string;
  expiry?: string;
}

const SubscriptionDashboard: React.FC<{ 
  onClose: () => void;
  onPlanChange: (planId: string) => void;
}> = ({ onClose, onPlanChange }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        // In a real app, this would be an API call to your backend
        const response = await fetch('/api/user/subscription');
        const data = await response.json();
        setSubscription(data.subscription);
        setPaymentMethods(data.paymentMethods);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      const response = await fetch(`/api/subscriptions/${subscription.id}/cancel`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setSubscription({
          ...subscription,
          status: 'cancelled'
        });
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  const handleResumeSubscription = async () => {
    if (!subscription) return;
    
    try {
      const response = await fetch(`/api/subscriptions/${subscription.id}/resume`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setSubscription({
          ...subscription,
          status: 'active'
        });
      }
    } catch (error) {
      console.error('Error resuming subscription:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Subscription Dashboard</h2>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>

      {subscription ? (
        <>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {subscription.planName} Plan
                    <Badge className="ml-2" variant={
                      subscription.status === 'active' ? 'default' : 
                      subscription.status === 'cancelled' ? 'destructive' : 'secondary'
                    }>
                      {subscription.status === 'active' ? 'Active' : 
                       subscription.status === 'cancelled' ? 'Cancelled' : 'Past Due'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Billed ${subscription.amount} {subscription.currency} monthly
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Next billing</p>
                  <p className="font-medium">
                    {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Start Date</p>
                    <p className="font-medium">
                      {format(new Date(subscription.startDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="font-medium">
                      ${subscription.amount} {subscription.currency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Payment Method</p>
                    <p className="font-medium">
                      {paymentMethods.length > 0 
                        ? paymentMethods[0].type === 'card' 
                          ? `${paymentMethods[0].brand} ending in ${paymentMethods[0].last4}`
                          : `PayPal (${paymentMethods[0].email})`
                        : 'None'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {subscription.status === 'active' && (
                  <Button variant="outline" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                )}
                {subscription.status === 'cancelled' && (
                  <Button onClick={handleResumeSubscription}>
                    Resume Subscription
                  </Button>
                )}
                <Button variant="secondary" onClick={() => onPlanChange('pro')}>
                  Change Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentMethods.length > 0 ? (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id} 
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center">
                        {method.type === 'card' ? (
                          <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                        ) : (
                          <Wallet className="h-5 w-5 text-gray-400 mr-3" />
                        )}
                        <div>
                          <p className="font-medium">
                            {method.type === 'card' 
                              ? `${method.brand} ending in ${method.last4}`
                              : `PayPal (${method.email})`}
                          </p>
                          {method.expiry && (
                            <p className="text-sm text-gray-400">
                              Expires {method.expiry}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No payment methods saved
                </p>
              )}
              <Button className="w-full mt-4" variant="outline">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Active Subscription</h3>
            <p className="text-gray-400 mb-6">
              You don't have an active subscription. Choose a plan to get started.
            </p>
            <Button onClick={() => onPlanChange('pro')}>
              Choose Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionDashboard;