import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, UserPlus, LogIn, Phone, Star } from 'lucide-react';
import { stores, Store } from '../data/stores';
import StoreMap from '../components/ui/StoreMap';
import Modal from '../components/ui/Modal';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppLayout from '../components/layout/AppLayout';

const StoreFinder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showStoreDetails, setShowStoreDetails] = useState(false);
  const [showClientOptions, setShowClientOptions] = useState(false);

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setShowStoreDetails(true);
  };

  const handleChooseStore = () => {
    setShowStoreDetails(false);
    setShowClientOptions(true);
  };

  const handleClientChoice = (choice: 'login' | 'register') => {
    // Store the selected store in localStorage for later use
    if (selectedStore) {
      localStorage.setItem('selectedStore', JSON.stringify(selectedStore));
    }
    navigate(`/auth?tab=${choice}&role=client`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-gray-900">Trouver des magasins de réparation</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez des magasins de réparation de confiance près de chez vous. Parcourez les emplacements, comparez les services et choisissez le magasin parfait pour vos besoins de réparation d'appareils.
            </p>
          </div>
        </div>

        <StoreMap 
          stores={stores}
          onSelectStore={handleSelectStore}
          selectedStore={selectedStore}
        />

        {/* Store Details Modal */}
        <Modal 
          isOpen={showStoreDetails} 
          onClose={() => setShowStoreDetails(false)}
          title="Détails du magasin"
          size="lg"
        >
          {selectedStore && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedStore.name}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Adresse</p>
                        <p className="text-gray-600">{selectedStore.address}, {selectedStore.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">Téléphone</p>
                        <p className="text-gray-600">{selectedStore.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-gray-900">{selectedStore.rating}</span>
                        <span className="text-gray-600">note</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Services offerts</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedStore.services.map((service) => (
                      <Badge key={service} variant="completed" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3">Heures d'ouverture</h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(selectedStore.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize text-gray-600">{day}:</span>
                        <span className="text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleChooseStore}
                  className="flex-1"
                >
                  Choisir ce magasin
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowStoreDetails(false)}
                  className="flex-1"
                >
                  Continuer à chercher
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Client Options Modal */}
        <Modal 
          isOpen={showClientOptions} 
          onClose={() => setShowClientOptions(false)}
          title="Continuer en tant que client"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600">
                Vous avez sélectionné <strong>{selectedStore?.name}</strong>. Comment souhaitez-vous continuer?
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group" onClick={() => handleClientChoice('login')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors duration-300">
                    <LogIn className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">J'ai un compte</h3>
                  <p className="text-gray-600 text-sm">Connectez-vous à votre compte existant</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group" onClick={() => handleClientChoice('register')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors duration-300">
                    <UserPlus className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Créer un nouveau compte</h3>
                  <p className="text-gray-600 text-sm">S'inscrire en tant que nouveau client</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default StoreFinder;