import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import AuthenticatedHeader from './AuthenticatedHeader';
import Footer from './Footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {user ? <AuthenticatedHeader /> : <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;