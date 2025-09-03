import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Clock, Languages } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import RoleSelector from '../components/ui/RoleSelector';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useI18n } from '../i18n';

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
      navigate('/auth?tab=register&role=client');
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
            Track your device repair easily
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            RepairTracker helps you track and manage device repairs with ease. Get real-time updates, instant notifications, and a secure platform for both customers and stores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Link to="/track">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Track My Repair
              </Button>
            </Link>
          </div>
        </div>
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Tracking</h3>
              <p className="text-gray-600">Track your repair status with a simple tracking code. Get real-time updates on your device.</p>
            </div>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600">Your data is protected with industry-standard security measures and encryption.</p>
            </div>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Get instant notifications when your repair status changes or is completed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <Modal 
        isOpen={showRoleSelector} 
        onClose={() => setShowRoleSelector(false)}
        title="Get Started with RepairTracker"
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