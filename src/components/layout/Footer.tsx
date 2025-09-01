import React from 'react';
import { Wrench } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Wrench className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">RepairTracker</span>
          </div>
          <div className="text-sm text-gray-400">
            © 2025 RepairTracker. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;