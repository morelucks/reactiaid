// src/components/TransactionTracker.tsx
import { ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TransactionTracker() {
  const transactions = [
    {
      hash: '0x1a2b3c...d4e5f6',
      type: 'Fund Release',
      status: 'completed',
      amount: '$50,000',
      timestamp: '2 minutes ago',
      chain: 'Optimism'
    },
    {
      hash: '0x2b3c4d...e5f6g7',
      type: 'Resource Dispatch',
      status: 'pending',
      amount: 'Medical Supplies',
      timestamp: '5 minutes ago',
      chain: 'Reactive Network'
    },
    {
      hash: '0x3c4d5e...f6g7h8',
      type: 'Disaster Alert',
      status: 'completed',
      amount: 'Severity 8',
      timestamp: '10 minutes ago',
      chain: 'Ethereum Sepolia'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Live Transaction Feed</h3>
      
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(tx.status)}
              <div>
                <div className="font-medium text-sm">{tx.type}</div>
                <div className="text-xs text-gray-500">{tx.hash}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium text-sm">{tx.amount}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{tx.chain}</span>
                <span>•</span>
                <span>{tx.timestamp}</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}