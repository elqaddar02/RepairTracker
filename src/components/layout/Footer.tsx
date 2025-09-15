import React from 'react';
import { Wrench } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200/70">
      <div className="h-[2px] w-full" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,107,53,0.25), rgba(255,179,71,0.25))' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Wrench className="h-6 w-6" style={{ color: 'var(--fixoo-primary)' }} />
            <span
              className="text-lg font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FF6B35, #FFB347)' }}
            >
              Fixoo
            </span>
          </div>
          <div className="text-sm text-gray-600">
            © 2025 Fixoo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;