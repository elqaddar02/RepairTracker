import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import RoleSelection from '../components/ui/RoleSelection';
import AppLayout from '../components/layout/AppLayout';

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'client' | 'store') => {
    if (role === 'store') {
      navigate('/auth?tab=register&role=store');
    } else {
      navigate('/client-choice');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

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
        </div>

        <RoleSelection onSelectRole={handleSelectRole} />
      </div>
    </AppLayout>
  );
};

export default RoleSelectionPage;
