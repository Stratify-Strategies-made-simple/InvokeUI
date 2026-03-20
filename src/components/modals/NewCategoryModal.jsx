import React from 'react';
import { X, Plus } from 'lucide-react';

export const NewCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Add Category</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
            <input name="name" required placeholder="e.g. 3D Models" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </form>
      </div>
    </div>
  );
};
