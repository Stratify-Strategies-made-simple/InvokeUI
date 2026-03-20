import React from 'react';
import { Check, FileSpreadsheet, X } from 'lucide-react';

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
