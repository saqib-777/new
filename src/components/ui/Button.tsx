import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 ${className}`}
    >
      {children}
    </button>
  );
};
