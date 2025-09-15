import React from 'react';

export  interface BadgeProps {
  children: React.ReactNode;
  variant?: 'waiting' | 'in_progress' | 'completed' | 'cancelled' | 'pending' | 'approved' | 'blocked';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'waiting', className = '' }) => {
  const variantClasses = {
    waiting: 'bg-[rgba(255,107,53,0.08)] text-[var(--fixoo-primary)] border-[rgba(255,107,53,0.25)]',
    in_progress: 'bg-[rgba(255,107,53,0.08)] text-[var(--fixoo-primary)] border-[rgba(255,107,53,0.25)]',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
    pending: 'bg-[rgba(255,107,53,0.08)] text-[var(--fixoo-primary)] border-[rgba(255,107,53,0.25)]',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blocked: 'bg-red-50 text-red-600 border-red-200',
  } as const;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;