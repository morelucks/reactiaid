import { AlertTriangle, MapPin, Clock, Users } from 'lucide-react';

interface EmergencyAlertProps {
  emergency: any;
  onAcknowledge: () => void;
}

export default function EmergencyAlert({ emergency, onAcknowledge }: EmergencyAlertProps) {
  if (!emergency) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <div className="text-gray-500">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Active Emergencies</h3>
          <p className="text-sm">System monitoring for disaster events...</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'bg-red-500';
    if (severity >= 5) return 'bg-orange-500';
    if (severity >= 3) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getDisasterType = (type: number) => {
    const types = ['Earthquake', 'Flood', 'Wildfire', 'Hurricane', 'Tornado'];
    return types[type] || 'Unknown';
  };

  return (
    <div className={`border-l-4 ${getSeverityColor(emergency.severity)} border-l-4 bg-white rounded-r-lg shadow-sm p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {getDisasterType(emergency.type)} Alert
            </h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {emergency.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(emergency.timestamp).toLocaleTimeString()}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Severity: {emergency.severity}/10
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onAcknowledge}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Acknowledge
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-800 font-medium">Funds Allocated</div>
          <div className="text-lg font-bold text-blue-900">$50,000 USDT</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-800 font-medium">Responders Assigned</div>
          <div className="text-lg font-bold text-green-900">12 Teams</div>
        </div>
      </div>
    </div>
  );
}