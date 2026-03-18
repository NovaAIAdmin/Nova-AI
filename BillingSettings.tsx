import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Edit3
} from "lucide-react";

const BillingSettings: React.FC = () => {
  const [plan, setPlan] = useState("pro");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$19",
      period: "per month",
      features: [
        "Up to 10 videos/month",
        "720p resolution",
        "Basic templates",
        "Email support"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "Professional",
      price: "$49",
      period: "per month",
      features: [
        "Up to 50 videos/month",
        "1080p resolution",
        "Premium templates",
        "Priority support",
        "Team collaboration"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Unlimited videos",
        "4K resolution",
        "Custom templates",
        "24/7 dedicated support",
        "Advanced analytics",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  const currentPlan = plans.find(p => p.id === plan);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Billing & Subscription</h2>
        <p className="text-gray-400">Manage your subscription plan and payment methods</p>
      </div>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
          <CardDescription className="text-gray-400">
            You're currently on the {currentPlan?.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-gray-800/30 rounded-lg">
            <div>
              <h3 className="text-lg font-medium text-white">{currentPlan?.name} Plan</h3>
              <p className="text-gray-400">
                {currentPlan?.price} {currentPlan?.period} 
                <span className="ml-2 text-sm">(Renews on June 15, 2023)</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Plan
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                Cancel Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Subscription Plans</CardTitle>
          <CardDescription className="text-gray-400">
            Choose the plan that works best for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((planItem) => (
              <div 
                key={planItem.id}
                className={`border rounded-lg p-6 relative ${
                  planItem.popular 
                    ? "border-amber-500 bg-gradient-to-br from-amber-900/20 to-orange-900/20" 
                    : "border-gray-700 bg-gray-800/30"
                }`}
              >
                {planItem.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{planItem.name}</h3>
                <div className="my-4">
                  <span className="text-3xl font-bold text-white">{planItem.price}</span>
                  {planItem.period && <span className="text-gray-400"> {planItem.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {planItem.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => setPlan(planItem.id)}
                  className={`w-full ${
                    planItem.popular
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  variant={plan === planItem.id ? "default" : "outline"}
                >
                  {plan === planItem.id ? "Current Plan" : "Select Plan"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Payment Method</CardTitle>
          <CardDescription className="text-gray-400">
            Update your billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-500/20 rounded-lg mr-3">
                    <CreditCard className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Visa ending in 4242</p>
                    <p className="text-sm text-gray-400">Expires 12/2025</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                    Remove
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-gray-300">Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                Save Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
          <CardDescription className="text-gray-400">
            View your past invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">May 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Professional Plan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$49.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-500">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="link" className="text-amber-500 p-0 h-auto">
                      Download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Apr 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Professional Plan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$49.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-500">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="link" className="text-amber-500 p-0 h-auto">
                      Download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Mar 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Professional Plan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$49.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-500">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="link" className="text-amber-500 p-0 h-auto">
                      Download
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;