import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = ({
  label,
  error,
  helper,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: InputProps) => {
  const inputClasses = `
    block w-full rounded-md border-gray-300 shadow-sm
    focus:border-primary-500 focus:ring-primary-500
    disabled:bg-gray-50 disabled:text-gray-500
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${className}
  `;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          className={inputClasses}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};