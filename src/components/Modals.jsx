import React, { useState } from 'react';
import { X, Trash2, Plus, Check, Pencil, Globe, Lock } from 'lucide-react';

export const DeleteModal = ({ isOpen, onClose, onConfirm, title = "Delete Item?" }) => {
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
            <input name="name" required placeholder="e.g. 3D Models" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export const AddPromptModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Add Prompt</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prompt Content</label>
            <textarea name="content" required rows="4" placeholder="Enter your prompt here..." className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Prompt
          </button>
        </form>
      </div>
    </div>
  );
};

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
            <input name="title" required placeholder="e.g. My Amazing Project" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
            <textarea name="description" required rows="2" placeholder="What is this space for?" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Create Space
          </button>
        </form>
      </div>
    </div>
  );
};

export const ManageCategoriesModal = ({ isOpen, onClose, categories, onUpdate, onDelete, user, hiddenCategoryNames, onToggleVisibility }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  if (!isOpen) return null;

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSave = (id) => {
    onUpdate(id, editName);
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-900">Manage Categories</h3>
            <p className="text-xs text-gray-500">Check boxes to show categories.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-2 overflow-y-auto flex-1 bg-gray-50/50">
          <div className="space-y-2">
            {categories.filter(cat => cat.name !== 'All').map(cat => {
              const isHidden = hiddenCategoryNames.has(cat.name);
              const isOwner = user && cat.createdBy === user.uid;
              return (
                <div key={cat.id || cat.name} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isHidden ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <input type="checkbox" checked={!isHidden} onChange={() => onToggleVisibility(cat.name)} className="w-5 h-5 border-2 border-gray-300 rounded text-indigo-600 cursor-pointer" />
                    {editingId === cat.id ? (
                      <div className="flex items-center gap-2 flex-1">
                          <input value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-2 py-1 text-sm border border-indigo-300 rounded" autoFocus />
                          <button onClick={() => handleSave(cat.id)} className="p-1 bg-green-500 text-white rounded"><Check className="w-3 h-3" /></button>
                          <button onClick={() => setEditingId(null)} className="p-1 bg-gray-300 text-gray-700 rounded"><X className="w-3 h-3" /></button>
                      </div>
                    ) : (
                      <span className={`font-medium truncate ${isHidden ? 'text-gray-500' : 'text-gray-800'}`}>{cat.name}</span>
                    )}
                  </div>
                  {!cat.isMain && !editingId && (
                    <div className="flex gap-1 ml-2 pl-2 border-l border-gray-100">
                      {isOwner ? (
                        <>
                          <button onClick={() => startEdit(cat)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => onDelete(cat.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                        </>
                      ) : (
                         <span className="text-[10px] text-gray-400 uppercase font-bold px-1">Read-only</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};