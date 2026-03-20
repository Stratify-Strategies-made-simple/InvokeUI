import React from 'react';
import { LayoutGrid, Plus, Settings, Search } from 'lucide-react';
import { SpaceCard } from '../components/SpaceCard';

export const SpacesPage = ({
  setIsModalOpen,
  setIsCategoryModalOpen,
  setIsManageCategoryModalOpen,
  visibleCategories,
  selectedCategory,
  setSelectedCategory,
  filteredCards,
  user,
  savedItems,
  toggleSave,
  handleDeleteClick,
  setSelectedSpace
}) => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
       <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white"><LayoutGrid className="w-6 h-6" /></div>
                <h1 className="text-2xl font-bold text-gray-900">Spaces</h1>
             </div>
             <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Space</button>
                <button onClick={() => setIsCategoryModalOpen(true)} className="px-4 py-2 border border-gray-200 text-gray-700 font-bold rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Category</button>
             </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar items-center">
             <button onClick={() => setIsManageCategoryModalOpen(true)} className="p-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-full"><Settings className="w-4 h-4" /></button>
             <div className="w-px h-6 bg-gray-200 mx-1 flex-shrink-0"></div>
             {visibleCategories.map((cat) => (
                <button key={cat.id || cat.name} onClick={() => setSelectedCategory(cat.name)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${selectedCategory === cat.name ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}>
                   {cat.icon && cat.isMain && <cat.icon className="w-4 h-4" />}
                   {cat.name}
                </button>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.length === 0 ? (
            <div className="py-24 text-center col-span-full border-2 border-dashed border-gray-200 rounded-2xl">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No spaces found</h3>
            </div>
          ) : (
            filteredCards.map((card) => (
               <SpaceCard key={card.id} card={card} user={user} savedItems={savedItems} toggleSave={toggleSave} handleDeleteClick={handleDeleteClick} setSelectedSpace={setSelectedSpace} />
            ))
          )}
       </div>
    </div>
  );
};
