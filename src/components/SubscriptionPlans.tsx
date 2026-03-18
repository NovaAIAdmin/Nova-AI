import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check, Sparkles, Crown, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  icon: React.ReactNode;
}

const SubscriptionPlans: React.FC<{ onSelectPlan: (planId: string) => void }> = ({ onSelectPlan }) => {
  const plans: Plan[] = [
    {
      id: "free",
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out AI video generation",
      features: [
        "1 video per day",
        "30-second videos",
        "Basic quality",
        "Watermarked output",
        "Community support"
      ],
      buttonText: "Get Started",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      id: "pro",
      name: "Creator",
      price: "$19/month",
      description: "For content creators and small businesses",
      features: [
        "10 videos per day",
        "60-second videos",
        "HD quality (1080p)",
        "No watermarks",
        "Priority generation",
        "Email support"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: "business",
      name: "Business",
      price: "$49/month",
      description: "For agencies and professional use",
      features: [
        "Unlimited videos",
        "2-minute videos",
        "4K quality",
        "No watermarks",
        "Fastest generation",
        "Custom branding",
        "Dedicated support",
        "API access"
      ],
      buttonText: "Contact Sales",
      icon: <Crown className="h-6 w-6" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative overflow-hidden ${plan.popular ? 'border-blue-500 border-2' : 'border-gray-800'}`}
        >
          {plan.popular && (
            <Badge className="absolute top-4 right-4 bg-blue-600">
              MOST POPULAR
            </Badge>
          )}
          <CardHeader className="text-center">
            <div className="mx-auto bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              {plan.icon}
            </div>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.id !== "free" && <span className="text-gray-400">/month</span>}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant={plan.popular ? "default" : "outline"}
              onClick={() => onSelectPlan(plan.id)}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;