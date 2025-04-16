// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ type = 'text', value, onChange, placeholder, className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
    />
  );
};
