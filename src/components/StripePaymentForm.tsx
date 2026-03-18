import React, { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js";
import { Button } from "../components/ui/button";

// Make sure to add your Stripe publishable key to your .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "");

interface StripePaymentFormProps {
  planId: string;
  priceId: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  planId,
  priceId,
  onPaymentSuccess,
  onCancel
}) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        setStripe(stripeInstance);
        
        // Call your backend to create a checkout session
        const response = await fetch("/api/stripe/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            planId,
            successUrl: `${window.location.origin}/payment-success`,
            cancelUrl: `${window.location.origin}/payment-cancelled`,
          }),
        });
        
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        setLoading(false);
      }
    };

    initializeStripe();
  }, [priceId, planId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stripe || !clientSecret) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to initialize payment. Please try again.</p>
        <Button onClick={onCancel} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-1">
      <EmbeddedCheckoutProvider
        stripe={stripe}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      
      <div className="mt-4 text-center">
        <Button variant="outline" onClick={onCancel}>
          Cancel Payment
        </Button>
      </div>
    </div>
  );
};

export default StripePaymentForm;