// src/components/AdminPanel.tsx
import { useState } from 'react';
import { Settings, Shield, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useTriggerDisaster } from '../hooks/useDisasterOracle';

export default function AdminPanel() {
  const [disasterType, setDisasterType] = useState('0');
  const [severity, setSeverity] = useState('5');
  const [location, setLocation] = useState('');
  
  const {
    trigger,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  } = useTriggerDisaster();

  const handleTriggerTest = async () => {
    if (!location || !severity || !isConnected) {
      return;
    }

    try {
      await trigger({
        type: parseInt(disasterType),
        severity: BigInt(severity),
        location: location,
      });
    } catch (error) {
      console.error('Failed to trigger disaster:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Admin Controls
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disaster Type
          </label>
          <select
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="0">Earthquake</option>
            <option value="1">Flood</option>
            <option value="2">Wildfire</option>
            <option value="3">Hurricane</option>
            <option value="4">Tornado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location coordinates"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handleTriggerTest}
          disabled={isPending || isConfirming || !location || !isConnected}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          <Activity className="h-4 w-4 mr-2" />
          {isConfirming ? 'Confirming...' : isPending ? 'Triggering...' : 'Test Emergency Trigger'}
        </button>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex items-center">
            <XCircle className="h-4 w-4 mr-2" />
            Error: {error.message || 'Transaction failed'}
          </div>
        )}

        {isSuccess && hash && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Transaction successful! Hash: {hash.slice(0, 10)}...
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          System Status
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Reactive Network</span>
            <span className="text-green-600">Connected</span>
          </div>
          <div className="flex justify-between">
            <span>Oracle Feeds</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Fund Vault</span>
            <span className="text-green-600">$250,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}