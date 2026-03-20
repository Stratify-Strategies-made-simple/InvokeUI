import React from 'react';
import { Trash2 } from 'lucide-react';

export const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6 text-sm">Are you sure? This action cannot be undone.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm">Yes, Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
