import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn, MapPin, UserPlus, CheckCircle } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../components/layout/AppLayout';
import EnhancedStoreMap from '../components/ui/EnhancedStoreMap';
import { stores, Store } from '../data/stores';

const ClientFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 since step 1 is handled by landing page
  const [showMap, setShowMap] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]); // Step 1 is completed when reaching this page

  const steps = [
    { id: 1, title: 'Type d\'utilisateur', description: 'Choisissez votre rôle', completed: true },
    { id: 2, title: 'Mode d\'accès', description: 'Invité ou connecté', completed: false },
    { id: 3, title: 'Trouver un magasin', description: 'Explorez les magasins près de vous', completed: false }
  ];

  const handleGuestChoice = () => {
    setCompletedSteps(prev => [...prev, 2]); // Mark step 2 as completed
    setCurrentStep(3);
    setShowMap(true);
    // Request user location for better map experience
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  };

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
    // Mark step 3 as completed when a store is selected
    if (!completedSteps.includes(3)) {
      setCompletedSteps(prev => [...prev, 3]);
    }
  };

  const handleClosePopup = () => {
    setSelectedStore(null);
  };

  const handleLoginChoice = () => {
    setCompletedSteps(prev => [...prev, 2]); // Mark step 2 as completed
    navigate('/auth?tab=login&role=client');
  };

  const handleRegisterChoice = () => {
    setCompletedSteps(prev => [...prev, 2]); // Mark step 2 as completed
    navigate('/auth?tab=register&role=client');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Step navigation function
  const goToStep = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId);
      if (stepId === 2) {
        setShowMap(false);
      } else if (stepId === 3) {
        setShowMap(true);
      }
    }
  };

  const handleBackToChoices = () => {
    setCurrentStep(2);
    setShowMap(false);
    // Remove step 3 from completed steps when going back
    setCompletedSteps(prev => prev.filter(step => step !== 3));
  };

  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / steps.length) * 100;

  // Step Indicator Component
  const StepIndicator = () => (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progression: {completedSteps.length}/{steps.length} étapes
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Circles */}
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isAccessible = step.id <= currentStep || isCompleted;
          
          return (
            <div key={step.id} className="flex items-center">
              <div 
                onClick={() => goToStep(step.id)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white shadow-lg cursor-pointer hover:bg-green-600' 
                    : isCurrent
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                    : isAccessible
                    ? 'bg-orange-100 border-orange-300 text-orange-600 hover:bg-orange-200 cursor-pointer'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="ml-3 text-left">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted 
                    ? 'text-green-600' 
                    : isCurrent 
                    ? 'text-orange-600' 
                    : isAccessible
                    ? 'text-orange-500'
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs transition-colors duration-300 ${
                  isCompleted || isCurrent || isAccessible ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : isCurrent ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (showMap) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button 
                variant="outline" 
                onClick={handleBackToChoices}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour</span>
              </Button>
            </div>
            
            <StepIndicator />
            
            {/* Completion Message */}
            {completedSteps.length === steps.length && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <p className="text-green-700 font-medium">
                    Félicitations ! Vous avez terminé toutes les étapes. Vous pouvez maintenant explorer les magasins.
                  </p>
                </div>
              </div>
            )}
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MapPin className="h-8 w-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-900">Trouver des magasins près de vous</h1>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez des magasins de réparation de confiance près de chez vous. 
                Vous pouvez continuer en tant qu'invité ou vous connecter pour plus de fonctionnalités.
              </p>
            </div>
          </div>

          {/* Enhanced Map Component */}
          <EnhancedStoreMap
            stores={stores}
            userLocation={userLocation}
            onSelectStore={handleStoreSelect}
            selectedStore={selectedStore}
            onClosePopup={handleClosePopup}
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Button>
          </div>
          
          <StepIndicator />
          
          {/* Completion Message */}
          {completedSteps.length === steps.length && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-green-700 font-medium">
                  Félicitations ! Vous avez terminé toutes les étapes. Choisissez votre mode d'accès pour continuer.
                </p>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Continuer en tant que client</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez comment vous souhaitez continuer pour trouver et réserver des services de réparation
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Guest Option */}
          <div
            onClick={handleGuestChoice}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Continuer en tant qu'invité</h3>
                <p className="text-gray-600 mb-4">
                  Explorez les magasins près de vous et trouvez des services de réparation sans créer de compte
                </p>
                <Button className="w-full">Voir la carte des magasins</Button>
              </CardContent>
            </Card>
          </div>

          {/* Login Option */}
          <div
            onClick={handleLoginChoice}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <LogIn className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">J'ai un compte</h3>
                <p className="text-gray-600 mb-4">
                  Connectez-vous à votre compte existant pour accéder à vos réparations et plus de fonctionnalités
                </p>
                <Button variant="secondary" className="w-full">
                  Se connecter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Register Option */}
        <div className="mt-8">
          <div
            onClick={handleRegisterChoice}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-300">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Créer un nouveau compte</h3>
                <p className="text-gray-600 text-sm">
                  Inscrivez-vous pour suivre vos réparations, recevoir des notifications et accéder à plus de fonctionnalités
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientFlow;