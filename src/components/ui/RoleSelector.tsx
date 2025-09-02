import React from 'react';
import { User, Store, MapPin } from 'lucide-react';
import Card, { CardContent } from './Card';
import Button from './Button';

interface RoleSelectorProps {
  onSelectRole: (role: 'client' | 'store') => void;
  onFindStores: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole, onFindStores }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to continue?</h2>
        <p className="text-gray-600">Choose your role to get started with RepairTracker</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => onSelectRole('client')}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Client</h3>
            <p className="text-gray-600 mb-4">I need to repair my device and want to track the repair process</p>
            <Button className="w-full">Continue as Client</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => onSelectRole('store')}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
              <Store className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">I'm a Store Owner</h3>
            <p className="text-gray-600 mb-4">I want to manage repairs and serve customers through my store</p>
            <Button variant="secondary" className="w-full">Continue as Store</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={onFindStores}>
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors duration-300">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Stores Near Me</h3>
          <p className="text-gray-600 text-sm">Discover repair stores in your area before creating an account</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelector;