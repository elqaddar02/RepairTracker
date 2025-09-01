import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">RepairTracker</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Link to="/track">
              <Button variant="outline" size="sm">Track Repair</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;