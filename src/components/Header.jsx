import React from 'react';
import { Zap, Search, Box, Database, LogOut } from 'lucide-react';

export const Header = ({ 
  user, 
  searchQuery, 
  setSearchQuery, 
  currentView, 
  setCurrentView, 
  setSelectedSpace, 
  handleLogin, 
  handleLogout 
}) => {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => { setCurrentView('spaces'); setSelectedSpace(null); }}
          >
            <Zap className="w-5 h-5 text-orange-500 fill-current" />
            <span className="font-bold text-xl tracking-tight text-gray-900">Invoke</span>
          </div>
          
          <div className="hidden md:flex relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces, authors..." 
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 transition-all bg-white" 
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => { setCurrentView('spaces'); setSelectedSpace(null); }}
                className={`flex items-center gap-1.5 text-sm font-bold ${currentView === 'spaces' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Box className="w-4 h-4" /> Spaces
              </button>
              <button 
                onClick={() => { 
                  if(user) { setCurrentView('library'); setSelectedSpace(null); } 
                  else alert('Please log in to view library'); 
                }}
                className={`flex items-center gap-1.5 text-sm font-bold ${currentView === 'library' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Database className="w-4 h-4" /> Prompt Library
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                     <div className="text-sm font-bold text-gray-900 leading-none">{user.displayName}</div>
                  </div>
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                    alt="User" 
                    className="w-8 h-8 rounded-full border border-gray-200" 
                  />
                  <button onClick={handleLogout} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-full font-medium text-sm transition-transform active:scale-95">
                Sign In
              </button>
            )}
        </div>
      </div>
    </header>
  );
};