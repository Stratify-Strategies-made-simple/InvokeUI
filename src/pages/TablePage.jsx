import React from 'react';
import { Search, Folder, MoreHorizontal, ChevronDown, User, TrendingUp, Star } from 'lucide-react';

export const TablePage = ({
  filteredCards,
  setSelectedSpace,
  savedItems,
  toggleSave,
  handleDeleteClick,
  setIsModalOpen
}) => {
  const recentCards = filteredCards.slice(0, 3);
  const allCards = filteredCards;
  const pinnedCards = savedItems; 

  // Pastel, soft colors for categories
  const getCategoryColor = (name) => {
     const colors = ['bg-pink-50 text-pink-600', 'bg-violet-50 text-violet-600', 'bg-blue-50 text-blue-600', 'bg-emerald-50 text-emerald-600', 'bg-amber-50 text-amber-600'];
     return colors[name.length % colors.length];
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-screen">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
         <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search spaces, tags, categories... Cmd + K" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50/50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-gray-700"
            />
         </div>
         <button onClick={() => setIsModalOpen?.(true)} className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all">
            + New Space
         </button>
      </div>

      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-2 text-gray-900 font-bold text-xl">
            <Folder className="w-5 h-5 text-indigo-500" /> All Spaces
         </div>
         <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-1">Sort: Recent <ChevronDown className="w-3 h-3 text-gray-400"/></button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-1">Filter: Tags <ChevronDown className="w-3 h-3 text-gray-400"/></button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-1">Group: Category <ChevronDown className="w-3 h-3 text-gray-400"/></button>
         </div>
      </div>

      {/* Pinned Section */}
      {pinnedCards.length > 0 && (
         <div className="mb-10">
            <h3 className="text-gray-900 font-bold text-[15px] mb-4">Pinned</h3>
            <div className="flex gap-4 flex-wrap">
               {pinnedCards.map(card => (
                  <div key={card.id} onClick={() => setSelectedSpace(card)} className={`w-64 p-5 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between h-36 bg-gradient-to-br ${card.gradient} text-white`}>
                     <div className="flex justify-between items-start">
                        <span className={`text-[10px] px-3 py-1.5 rounded-xl font-extrabold uppercase bg-white/20 backdrop-blur-sm border border-white/20`}>{card.category}</span>
                        <div className="flex gap-2 text-white/80">
                           <Star className="w-5 h-5 fill-yellow-300 text-yellow-300 drop-shadow-md" />
                           <MoreHorizontal className="w-5 h-5 hover:text-white" />
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold text-white text-[16px] truncate drop-shadow-sm mb-0.5">{card.title}</h4>
                        <div className="text-xs text-white/90 flex items-center gap-1 mt-0.5 truncate font-medium">{card.author} <span className="text-white/60">&gt;</span></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* Recently Used */}
      {recentCards.length > 0 && (
         <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
               <h3 className="text-gray-900 font-bold text-[15px]">Recently Used</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
               {recentCards.map((card, idx) => (
                  <div key={card.id} className={`flex items-center px-4 py-3 hover:bg-gray-50/50 cursor-pointer transition-colors ${idx !== recentCards.length - 1 ? 'border-b border-gray-50' : ''}`}>
                     <div className="w-10 flex justify-center"><input type="checkbox" className="rounded border-gray-200 text-indigo-500 focus:ring-indigo-500" /></div>
                     <div className="flex-[2] flex items-center gap-3">
                        <div className={`w-8 h-8 rounded shrink-0 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                           <Folder className="w-3.5 h-3.5 text-white/90" />
                        </div>
                        <span onClick={() => setSelectedSpace(card)} className="text-[15px] font-bold text-gray-800 hover:text-indigo-600 transition-colors">{card.title}</span>
                     </div>
                     <div className="w-32 text-xs text-gray-500">2d ago</div>
                     <div className="w-20 text-right pr-4 text-gray-400 flex justify-end gap-2">
                        <MoreHorizontal className="w-4 h-4 hover:text-gray-700 transition-colors" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* All Spaces */}
      <div>
         <h3 className="text-gray-900 font-bold text-[15px] mb-4">All Spaces</h3>
         <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
               <div className="w-10 flex justify-center"><input type="checkbox" className="rounded border-gray-200" /></div>
               <div className="flex-[2] pl-1">Name</div>
               <div className="flex-[1.5] flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors">Category <ChevronDown className="w-3 h-3" /></div>
               <div className="w-40">Author</div>
               <div className="w-40">Trends</div>
               <div className="w-24 text-right pr-6">Actions</div>
            </div>
            
            {allCards.map((card, idx) => (
               <div key={card.id} className={`flex items-center px-4 py-3 hover:bg-gray-50/50 cursor-pointer transition-colors ${idx !== allCards.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-10 flex justify-center"><input type="checkbox" className="rounded border-gray-200 text-indigo-500 focus:ring-indigo-500" /></div>
                  <div className="flex-[2] flex items-center gap-3 pl-1" onClick={() => setSelectedSpace(card)}>
                     <div className={`w-8 h-8 rounded shrink-0 bg-gradient-to-br ${card.gradient}`}></div>
                     <span className="text-[15px] font-bold text-gray-800 hover:text-indigo-600 truncate transition-colors">{card.title}</span>
                  </div>
                  <div className="flex-[1.5] flex">
                     <span className={`text-[11px] px-2 py-1 rounded-md font-medium ${getCategoryColor(card.category)}`}>
                        {card.category}
                     </span>
                  </div>
                  <div className="w-40 text-xs text-gray-600 flex items-center gap-2 pr-4 truncate">
                     <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                     <span className="truncate">{card.author}</span>
                  </div>
                  <div className="w-40 text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                     <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {card.likes || 0} Likes
                  </div>
                  <div className="w-24 flex justify-end gap-3 pr-4 text-gray-400">
                     <button onClick={() => toggleSave(card)}><Star className={`w-4 h-4 transition-colors hover:text-yellow-500 ${savedItems.some(i => i.id === card.id) ? 'fill-yellow-400 text-yellow-500' : ''}`} /></button>
                     <button onClick={() => handleDeleteClick({type: 'space', id: card.id})}><MoreHorizontal className="w-4 h-4 hover:text-gray-700 transition-colors" /></button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
