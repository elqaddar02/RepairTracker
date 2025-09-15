import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import AppLayout from '../components/layout/AppLayout';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/role-selection');
  };

  const handleTrackRepair = () => {
    navigate('/track');
  };

  return (
    <AppLayout>
      <div className="relative overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(closest-side, #FF6B35, transparent)' }}
            animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
            style={{ background: 'radial-gradient(closest-side, #FFB347, transparent)' }}
            animate={{ x: [0, -40, 20, 0], y: [0, -10, 25, 0], scale: [1, 0.97, 1.04, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex flex-col items-center justify-center text-center py-16">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="mb-16"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FF6B35, #FFB347)' }}
            >
              Welcome to Fixoo
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
              className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--fixoo-text)' }}
            >
              Find trusted repair stores near you
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
                Commencer
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={handleTrackRepair}>
                Track My Reparation
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FFE2D6' }}>
                  <Search className="h-6 w-6" style={{ color: 'var(--fixoo-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi facile</h3>
                <p className="text-gray-600">Suivez l'état de votre réparation avec un simple code de suivi. Obtenez des mises à jour en temps réel sur votre appareil.</p>
              </div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FFE2D6' }}>
                  <Shield className="h-6 w-6" style={{ color: 'var(--fixoo-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plateforme sécurisée</h3>
                <p className="text-gray-600">Vos données sont protégées par des mesures de sécurité et un chiffrement de niveau industriel.</p>
              </div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-sm min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FFE2D6' }}>
                  <Clock className="h-6 w-6" style={{ color: 'var(--fixoo-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mises à jour en temps réel</h3>
                <p className="text-gray-600">Recevez des notifications instantanées lorsque l'état de votre réparation change ou est terminé.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
