import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import Card, { CardContent } from './Card';
import Button from './Button';

interface ClientChoiceProps {
  onLogin: () => void;
  onContinueAsGuest: () => void;
}

const ClientChoice: React.FC<ClientChoiceProps> = ({ onLogin, onContinueAsGuest }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Comment souhaitez-vous continuer ?</h2>
        <p className="text-gray-600">Choisissez votre mode d'accès pour trouver des services de réparation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Login Option */}
        <div
          onClick={onLogin}
          className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <LogIn className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Login</h3>
              <p className="text-gray-600 mb-4">
                Connectez-vous à votre compte existant pour accéder à vos réparations et plus de fonctionnalités
              </p>
              <Button className="w-full">Se connecter</Button>
            </CardContent>
          </Card>
        </div>

        {/* Continue as Guest Option */}
        <div
          onClick={onContinueAsGuest}
          className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                <UserPlus className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Continue as Guest</h3>
              <p className="text-gray-600 mb-4">
                Explorez les magasins près de vous et trouvez des services de réparation sans créer de compte
              </p>
              <Button variant="secondary" className="w-full">
                Continuer en tant qu'invité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientChoice;
