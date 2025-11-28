'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';

// Dynamically import AppKitButton to avoid SSR issues
const AppKitButton = dynamic(
  () => import('@reown/appkit/react').then(mod => ({ default: mod.AppKitButton })),
  { ssr: false }
);

import EmergencyAlert from './EmergencyAlert';
import ResponseMap from './ResponseMap';
import ResourcePanel from './ResourcePanel';
import TransactionTracker from './TransactionTracker';
import AdminPanel from './AdminPanel';

export default function DashboardContent() {
  const { isConnected, address } = useAccount();
  const [emergencies, setEmergencies] = useState<any[]>([]);
  const [activeEmergency, setActiveEmergency] = useState<any>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">ReactiAid</h1>
          <p className="text-xl mb-8">Please connect your wallet to access the emergency response system</p>
          <AppKitButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ReactiAid</h1>
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Operational
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Responder: {address?.slice(0, 8)}...{address?.slice(-6)}
              </span>
              <AppKitButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <EmergencyAlert 
              emergency={activeEmergency}
              onAcknowledge={() => setActiveEmergency(null)}
            />
            
            <ResponseMap emergencies={emergencies} />
            
            <TransactionTracker />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ResourcePanel />
            <AdminPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

