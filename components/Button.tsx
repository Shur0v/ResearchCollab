
import React from 'react';
import { COLORS } from '../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: `bg-[${COLORS.PRIMARY}] text-white hover:bg-opacity-90 shadow-sm border border-[${COLORS.PRIMARY}]`,
    secondary: `bg-white text-[${COLORS.PRIMARY}] border border-[${COLORS.LAYER}] hover:border-[${COLORS.PRIMARY}]`,
    ghost: `bg-transparent text-[${COLORS.STRUCTURAL}] hover:text-[${COLORS.PRIMARY}] hover:bg-[${COLORS.LAYER}]`,
    accent: `bg-[${COLORS.ACCENT}] text-white hover:bg-opacity-90`,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm tracking-wide uppercase',
    lg: 'px-10 py-5 text-base font-semibold uppercase tracking-widest',
    full: 'w-full py-4 text-sm font-semibold uppercase tracking-wider'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
