// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface ResponseMapProps {
  emergencies: any[];
}

export default function ResponseMap({ emergencies }: ResponseMapProps) {
  // Simple static map for demo - in production, use react-leaflet
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        Emergency Response Map
      </h3>
      
      <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center relative">
        {/* This would be a real map in production */}
        <div className="text-center text-gray-500">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p>Interactive Emergency Response Map</p>
          <p className="text-sm">Showing {emergencies.length} active emergencies</p>
        </div>
        
        {/* Emergency markers */}
        {emergencies.map((emergency, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
          />
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {emergencies.slice(0, 3).map((emergency, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">
                  {emergency.location}
                </div>
                <div className="text-sm text-gray-600">
                  Severity: {emergency.severity}/10
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                emergency.severity >= 8 ? 'bg-red-100 text-red-800' :
                emergency.severity >= 5 ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {emergency.severity >= 8 ? 'Critical' : 
                 emergency.severity >= 5 ? 'High' : 'Medium'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}