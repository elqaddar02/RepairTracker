import React from 'react';
import { User, Store } from 'lucide-react';
import Card, { CardContent } from './Card';
import Button from './Button';

interface RoleSelectionProps {
  onSelectRole: (role: 'client' | 'store') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre rôle</h2>
        <p className="text-gray-600">Comment souhaitez-vous utiliser Fixoo ?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Client Option */}
        <div
          onClick={() => onSelectRole('client')}
          className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Client</h3>
              <p className="text-gray-600 mb-4">
                Je veux faire réparer mon appareil et suivre l'avancement de la réparation
              </p>
              <Button className="w-full">Continuer en tant que client</Button>
            </CardContent>
          </Card>
        </div>

        {/* Store Option */}
        <div
          onClick={() => onSelectRole('store')}
          className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Store className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Magasin</h3>
              <p className="text-gray-600 mb-4">
                Je gère un magasin de réparation et je veux utiliser la plateforme pour mes clients
              </p>
              <Button variant="secondary" className="w-full">
                Continuer en tant que magasin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
