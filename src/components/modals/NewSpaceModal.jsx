import React from 'react';
import { X, Plus, Globe, Lock } from 'lucide-react';

export const NewSpaceModal = ({ isOpen, onClose, onSubmit, availableCategories }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Create New Space</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Space Name</label>
            <input name="title" required placeholder="e.g. My Amazing Project" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
            <textarea name="description" required rows="2" placeholder="What is this space for?" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
               <select name="category" className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white">
                 {availableCategories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                 {availableCategories.length <= 1 && <option value="Uncategorized">Uncategorized</option>}
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gradient Theme</label>
               <select name="gradient" className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white">
                 <option value="from-blue-600 to-purple-600">Blue & Purple</option>
                 <option value="from-pink-500 to-rose-500">Pink & Rose</option>
                 <option value="from-orange-500 to-red-500">Orange & Red</option>
                 <option value="from-emerald-500 to-teal-600">Emerald & Teal</option>
                 <option value="from-indigo-500 to-cyan-500">Indigo & Cyan</option>
                 <option value="from-gray-700 to-gray-900">Dark Mode</option>
               </select>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Visibility</label>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="visibility" value="public" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="flex items-center gap-1.5 text-sm text-gray-700"><Globe className="w-3 h-3" /> Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="visibility" value="private" className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="flex items-center gap-1.5 text-sm text-gray-700"><Lock className="w-3 h-3" /> Private</span>
                </label>
             </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Create Space
          </button>
        </form>
      </div>
    </div>
  );
};
