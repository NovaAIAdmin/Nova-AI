import React, { useState, useRef, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, Lock } from "lucide-react";

interface PayPalPaymentFormProps {
  planId: string;
  planName: string;
  price: number;
  currency: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = ({ 
  planId, 
  planName, 
  price,
  currency,
  onPaymentSuccess,
  onCancel
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const paypalRef = useRef<HTMLDivElement>(null);

  const createOrder = async (data: any, actions: any) => {
    try {
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          price,
          currency,
        }),
      });

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch('/api/capture-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const details = await response.json();
      
      if (details.status === 'COMPLETED') {
        setStep('success');
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
    }
  };

  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto bg-green-900/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
        <p className="mb-6 text-gray-300">
          You've successfully upgraded to the {planName} plan.
        </p>
        <Button onClick={onPaymentSuccess} className="w-full">
          Start Creating Videos
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="flex items-center text-xl">
          <Lock className="h-5 w-5 mr-2 text-green-500" />
          Secure Payment for {planName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="mb-6">
          <PayPalScriptProvider options={{ 
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID!,
            currency: currency
          }}>
            <PayPalButtons 
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: "vertical" }}
            />
          </PayPalScriptProvider>
        </div>
        <div className="text-center">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayPalPaymentForm;