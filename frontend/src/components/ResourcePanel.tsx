import { DollarSign, Package, Users, Truck } from 'lucide-react';

export default function ResourcePanel() {
  const resources = [
    { name: 'Emergency Funds', value: '$250,000', icon: DollarSign, color: 'text-green-600' },
    { name: 'Medical Supplies', value: '1,200 units', icon: Package, color: 'text-blue-600' },
    { name: 'Response Teams', value: '45 available', icon: Users, color: 'text-purple-600' },
    { name: 'Transport Units', value: '18 vehicles', icon: Truck, color: 'text-orange-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
      
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <resource.icon className={`h-5 w-5 mr-3 ${resource.color}`} />
              <div>
                <div className="font-medium text-gray-900">{resource.name}</div>
                <div className="text-sm text-gray-600">Available: {resource.value}</div>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              Deploy
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-medium text-gray-900 mb-2">Recent Allocations</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Medical supplies to Region A</span>
            <span className="text-green-600">+$25,000</span>
          </div>
          <div className="flex justify-between">
            <span>Emergency shelter setup</span>
            <span className="text-green-600">+$15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}