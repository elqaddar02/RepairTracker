import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AppLayout;