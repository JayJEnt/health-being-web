import React from 'react';

interface LoadingProps {
  children?: React.ReactNode;
}

const LoadingComponent: React.FC<LoadingProps> = ({ children }) => {
  return (
    <div className="py-8 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-2 text-sm text-gray-600">{children || 'Loading...'}</p>
    </div>
  );
};

export default LoadingComponent;
