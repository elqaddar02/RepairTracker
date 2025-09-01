import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'waiting' | 'in_progress' | 'completed' | 'cancelled' | 'pending' | 'approved' | 'blocked';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'waiting', className = '' }) => {
  const variantClasses = {
    waiting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    pending: 'bg-orange-100 text-orange-800 border-orange-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    blocked: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;