import React from 'react';
import { X, Check } from 'lucide-react';

export const EditPromptModal = ({ isOpen, onClose, onSubmit, initialContent }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Edit Prompt</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prompt Content</label>
            <textarea 
              name="content" 
              defaultValue={initialContent} 
              required 
              rows="6" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm transition-all" 
            />
          </div>
          <div className="flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50">Cancel</button>
             <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
               <Check className="w-4 h-4" /> Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
