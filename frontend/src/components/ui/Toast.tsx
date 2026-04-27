import React, { useEffect } from 'react';
import { cn } from './Button';

interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, variant = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className={cn(
        "px-4 py-3 rounded-md shadow-lg border text-sm font-medium",
        {
          "bg-green-50 text-green-900 border-green-200": variant === 'success',
          "bg-red-50 text-red-900 border-red-200": variant === 'error',
          "bg-blue-50 text-blue-900 border-blue-200": variant === 'info',
        }
      )}>
        {message}
      </div>
    </div>
  );
};
