import React, { useState } from "react";
import SimpleModal from "./SimpleModal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, CreditCard, Lock } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  price: string;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  planId, 
  planName, 
  price,
  onPaymentSuccess
}) => {
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onPaymentSuccess();
    }, 2000);
  };

  const handleReset = () => {
    setStep('payment');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    onClose();
  };

  if (step === 'success') {
    return (
      <SimpleModal isOpen={isOpen} onClose={handleReset} title="Payment Successful">
        <div className="text-center py-4">
          <div className="mx-auto bg-green-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="mb-4 text-gray-300">
            You've successfully upgraded to the {planName} plan.
          </p>
          <Button onClick={handleReset} className="w-full">
            Start Creating Videos
          </Button>
        </div>
      </SimpleModal>
    );
  }

  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title={`Upgrade to ${planName}`}>
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center text-lg">
            <Lock className="h-5 w-5 mr-2 text-green-500" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="card"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="0000 0000 0000 0000"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Processing...
                  </>
                ) : (
                  `Pay ${price}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

export default PaymentModal;