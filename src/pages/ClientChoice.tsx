import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import ClientChoice from '../components/ui/ClientChoice';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';

const ClientChoicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth?tab=login&role=client');
  };

  const handleContinueAsGuest = () => {
    navigate('/guest');
  };

  const handleBackToRoleSelection = () => {
    navigate('/role-selection');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              onClick={handleBackToRoleSelection}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <ClientChoice 
            onLogin={handleLogin}
            onContinueAsGuest={handleContinueAsGuest}
          />
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ClientChoicePage;
