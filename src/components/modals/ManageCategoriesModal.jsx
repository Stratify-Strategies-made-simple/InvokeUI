import React, { useState } from 'react';
import { X, Check, Pencil, Trash2 } from 'lucide-react';

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
