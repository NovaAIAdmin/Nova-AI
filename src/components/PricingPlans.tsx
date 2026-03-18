import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Crown, Zap, Users, BarChart3, Shield } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

interface PricingPlansProps {
  plans: PricingPlan[];
  currentPlan: string;
  onUpgrade: (planId: string) => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans, currentPlan, onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "crypto">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onUpgrade(selectedPlan);
      setIsProcessing(false);
    }, 2000);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "free": return <Star className="h-5 w-5" />;
      case "pro": return <Zap className="h-5 w-5" />;
      case "business": return <Users className="h-5 w-5" />;
      case "enterprise": return <Crown className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price}/month`;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden ${
              plan.popular 
                ? "border-blue-500 border-2 shadow-lg shadow-blue-500/20" 
                : "border-gray-700"
            } ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                {getPlanIcon(plan.id)}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-2xl font-bold mt-2">
                {formatPrice(plan.price)}
              </CardDescription>
              <p className="text-sm text-gray-400 mt-1">
                {plan.credits} video credits
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={currentPlan === plan.id ? "secondary" : plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? (
                  "Current Plan"
                ) : plan.price === 0 ? (
                  "Get Started"
                ) : (
                  "Select Plan"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && selectedPlan !== currentPlan && selectedPlan !== "free" && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              Enter your payment details to upgrade to the {plans.find(p => p.id === selectedPlan)?.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Payment Method</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-3 rounded-lg border text-center ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="font-medium">Credit Card</div>
                  <div className="text-xs text-gray-400 mt-1">Visa, Mastercard</div>
                </button>
                <button
                  className={`p-3 rounded-lg border text-center ${
                    paymentMethod === "paypal"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="font-medium">PayPal</div>
                  <div className="text-xs text-gray-400 mt-1">PayPal account</div>
                </button>
                <button
                  className={`p-3 rounded-lg border text-center ${
                    paymentMethod === "crypto"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => setPaymentMethod("crypto")}
                >
                  <div className="font-medium">Crypto</div>
                  <div className="text-xs text-gray-400 mt-1">BTC, ETH, USDC</div>
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <div className="bg-blue-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.2 18c-.3-.3-.5-.7-.5-1.1V6.4c0-.4.2-.8.5-1.1.3-.3.7-.5 1.1-.5h9.6c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1v1.2c0 .4-.2.8-.5 1.1-.3.3-.7.5-1.1.5H8.8v1.6h7.9c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1v1.2c0 .4-.2.8-.5 1.1-.3.3-.7.5-1.1.5H8.8v1.7h8.7c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1v1.2c0 .4-.2.8-.5 1.1-.3.3-.7.5-1.1.5H8.3c-.4 0-.8-.2-1.1-.5-.3-.3-.5-.7-.5-1.1V18z"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Pay with PayPal</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You will be redirected to PayPal to complete your payment
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue to PayPal
                </Button>
              </div>
            )}

            {paymentMethod === "crypto" && (
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Amount to pay:</span>
                    <span className="font-medium">
                      ${(plans.find(p => p.id === selectedPlan)?.price || 0).toFixed(2)} USD
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equivalent in ETH:</span>
                    <span className="font-medium">0.0012 ETH</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Wallet Address</label>
                  <div className="flex">
                    <input
                      type="text"
                      value="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                      readOnly
                      className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white"
                    />
                    <Button variant="outline" className="rounded-l-none">
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Send exactly 0.0012 ETH to this address to complete your purchase
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Plan:</span>
                <span className="font-medium">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Video Credits:</span>
                <span className="font-medium">
                  {plans.find(p => p.id === selectedPlan)?.credits}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2 mt-2">
                <span>Total:</span>
                <span>
                  ${(plans.find(p => p.id === selectedPlan)?.price || 0).toFixed(2)}/month
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleUpgrade}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name}`
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PricingPlans;