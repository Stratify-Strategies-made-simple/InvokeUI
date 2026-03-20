import React from 'react';

export const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1 ${className}`}>
    {children}
  </span>
);
