// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl shadow-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
