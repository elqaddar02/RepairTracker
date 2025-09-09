import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import GuestSearch from '../components/ui/GuestSearch';
import AppLayout from '../components/layout/AppLayout';
import { stores, Store } from '../data/stores';

const GuestPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleBackToClientChoice = () => {
    navigate('/client-choice');
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    // Here you could show a modal or navigate to a booking page
    console.log('Selected store:', store);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              onClick={handleBackToClientChoice}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </Button>
          </div>
        </div>

        <GuestSearch 
          stores={stores}
          onSelectStore={handleSelectStore}
        />
      </div>
    </AppLayout>
  );
};

export default GuestPage;
