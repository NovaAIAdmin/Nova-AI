import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, CreditCard, DollarSign } from "lucide-react";

interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
  method: string;
}

interface BillingHistoryProps {
  billingRecords: BillingRecord[];
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ billingRecords }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-900/50 text-green-400">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-900/50 text-yellow-400">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-900/50 text-red-400">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
          Billing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {billingRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="h-12 w-12 mx-auto mb-3" />
            <p>No billing history yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {billingRecords.map((record) => (
              <div 
                key={record.id} 
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-gray-700 p-2 rounded-lg mr-4">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{record.plan} Plan</div>
                    <div className="text-sm text-gray-400">{record.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">${record.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">{record.method}</div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingHistory;