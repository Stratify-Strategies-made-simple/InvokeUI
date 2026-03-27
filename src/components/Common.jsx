import React from 'react';
import { Check, FileSpreadsheet, X } from 'lucide-react';

export const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1 ${className}`}>
    {children}
  </span>
);

export const Notification = ({ message, type = 'success', onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-[60]">
    <div className={`p-1 rounded-full ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}>
      {type === 'success' ? <Check className="w-3 h-3" /> : <FileSpreadsheet className="w-3 h-3" />}
    </div>
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
      <X className="w-4 h-4" />
    </button>
  </div>
);