import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import RoleSelector from '../components/ui/RoleSelector';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { ClockIcon, SearchIcon, ShieldIcon } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const handleGetStarted = () => {
    setShowRoleSelector(true);
  };

  const handleRoleSelect = (role: 'client' | 'store') => {
    setShowRoleSelector(false);
    if (role === 'store') {
      navigate('/auth?tab=register&role=store');
    } else {
      // For client, show the client choice modal instead of direct registration
      navigate('/client-flow');
    }
  };

  const handleFindStores = () => {
    setShowRoleSelector(false);
    navigate('/find-stores');
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Suivez facilement la réparation de votre appareil
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fixoo vous aide à suivre et gérer les réparations d'appareils en toute simplicité. Obtenez des mises à jour en temps réel, des notifications instantanées et une plateforme sécurisée pour les clients et les magasins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
              Commencer
            </Button>
            <Link to="/track">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Track My Reparation
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi facile</h3>
              <p className="text-gray-600">Suivez l'état de votre réparation avec un simple code de suivi. Obtenez des mises à jour en temps réel sur votre appareil.</p>
            </div>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plateforme sécurisée</h3>
              <p className="text-gray-600">Vos données sont protégées par des mesures de sécurité et un chiffrement de niveau industriel.</p>
            </div>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mises à jour en temps réel</h3>
              <p className="text-gray-600">Recevez des notifications instantanées lorsque l'état de votre réparation change ou est terminé.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <Modal 
        isOpen={showRoleSelector} 
        onClose={() => setShowRoleSelector(false)}
        title="Commencer avec Fixoo"
        size="lg"
      >
        <RoleSelector 
          onSelectRole={handleRoleSelect}
          onFindStores={handleFindStores}
        />
      </Modal>
    </AppLayout>
  );
};

export default Landing;