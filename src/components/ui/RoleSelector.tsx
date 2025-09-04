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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Comment souhaitez-vous continuer?</h2>
        <p className="text-gray-600">Choisissez votre rôle pour commencer avec RepairTracker</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => onSelectRole('client')}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
              <UserIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Je suis un client</h3>
            <p className="text-gray-600 mb-4">J'ai besoin de réparer mon appareil et je veux suivre le processus de réparation</p>
            <Button className="w-full">Continuer en tant que client</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => onSelectRole('store')}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
              <StoreIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Je suis propriétaire de magasin</h3>
            <p className="text-gray-600 mb-4">Je veux gérer les réparations et servir les clients via mon magasin</p>
            <Button variant="secondary" className="w-full">Continuer en tant que magasin</Button>
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
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors duration-300">
            <MapPinIcon className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trouver des magasins près de moi</h3>
          <p className="text-gray-600 text-sm">Découvrez les magasins de réparation dans votre région avant de créer un compte</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelector;