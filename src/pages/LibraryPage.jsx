import React from 'react';
import { FileSpreadsheet, Bookmark, Trash2 } from 'lucide-react';

export const LibraryPage = ({ savedItems, setSelectedSpace, setCurrentView, toggleSave }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in">
       <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm"><FileSpreadsheet className="w-4 h-4" /> Export CSV</button>
       </div>
       {savedItems.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-gray-200"><Bookmark className="w-10 h-10 text-indigo-300 mx-auto mb-6" /><h3 className="text-xl font-bold">Library Empty</h3></div>
       ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
             {savedItems.map((item, idx) => (
                <div key={item.id} className={`p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 ${idx !== savedItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold`}>{item.title.charAt(0)}</div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                         <div className="flex gap-2 text-xs text-gray-500 mt-1"><span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{item.category}</span></div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button onClick={() => { setSelectedSpace(item); setCurrentView('spaces'); }} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100">Open</button>
                      <button onClick={() => toggleSave(item)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
};
