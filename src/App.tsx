import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import TrackRepair from './pages/TrackRepair';
import Auth from './pages/Auth';
import ClientDashboard from './pages/ClientDashboard';
import StoreDashboard from './pages/StoreDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { I18nProvider } from './i18n';
import StoreFinder from './pages/StoreFinder';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  switch (user.role) {
    case 'client':
      return <Navigate to="/client/dashboard" replace />;
    case 'store':
      return <Navigate to="/store/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/track" element={<TrackRepair />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/find-stores" element={<StoreFinder />} />
              
              {/* Dashboard Router */}
              <Route path="/dashboard" element={<DashboardRouter />} />
              
              {/* Protected Routes */}
              <Route 
                path="/client/dashboard" 
                element={
                  <ProtectedRoute requiredRole="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/store/dashboard" 
                element={
                  <ProtectedRoute requiredRole="store">
                    <StoreDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;