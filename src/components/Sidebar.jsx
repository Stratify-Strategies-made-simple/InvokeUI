import React from 'react';
import { LayoutGrid, Star, Clock, Folder, Plus, Archive, Zap, List } from 'lucide-react';

export const Sidebar = ({ 
  user, 
  currentView, 
  setCurrentView, 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  setIsCategoryModalOpen 
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col pt-6 pb-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 shrink-0">
      {/* Logo */}
      <div 
        className="px-6 mb-8 flex items-center gap-3 cursor-pointer group"
        onClick={() => setCurrentView('home')}
      >
        <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
           <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="font-extrabold text-xl text-gray-900 tracking-tight">Invoke</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-8 no-scrollbar">
        {/* Quick Access */}
        <div>
          <div className="text-[11px] font-black text-gray-400 mb-3 px-2 uppercase tracking-wider">Quick Access</div>
          <div className="space-y-1">
            <button 
              onClick={() => { setCurrentView('table'); setSelectedCategory('All'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${currentView === 'table' && selectedCategory === 'All' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <List className={`w-4 h-4 ${currentView === 'table' && selectedCategory === 'All' ? 'text-indigo-600' : 'text-gray-400'}`} /> Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('spaces')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <LayoutGrid className="w-4 h-4 text-emerald-500" /> Grid Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('library')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentView === 'library' ? 'bg-yellow-50 text-yellow-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Star className={`w-4 h-4 ${currentView === 'library' ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-400'}`} /> Favorites
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
              <Clock className="w-4 h-4 text-sky-400" /> Recent
            </button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="text-[11px] font-black text-gray-400 mb-3 px-2 uppercase tracking-wider">Categories</div>
          <div className="space-y-1">
            {categories.filter(c => c.name !== 'All').map((cat, i) => {
              const IconColors = ['text-pink-500', 'text-purple-500', 'text-blue-500', 'text-teal-500', 'text-orange-500'];
              const iconColor = IconColors[i % IconColors.length];
              return (
              <button 
                key={cat.id || cat.name}
                onClick={() => { setCurrentView('table'); setSelectedCategory(cat.name); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${currentView === 'table' && selectedCategory === cat.name ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {cat.icon ? <cat.icon className={`w-4 h-4 ${iconColor}`} /> : <Folder className={`w-4 h-4 ${iconColor}`} />}
                <span className="truncate">{cat.name}</span>
              </button>
            )})}
            <button onClick={() => setIsCategoryModalOpen(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-all mt-2 border border-dashed border-gray-200">
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>
        </div>

        {/* Archive */}
        <div>
           <button onClick={() => setCurrentView('archive')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${currentView === 'archive' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Archive className="w-4 h-4" /> Archive
           </button>
        </div>
      </div>

      {/* User Profile Hook */}
      {user && (
        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all shadow-sm bg-white">
             <img src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`} className="w-9 h-9 rounded-full border border-gray-100" alt="avatar" />
             <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{user.displayName}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
