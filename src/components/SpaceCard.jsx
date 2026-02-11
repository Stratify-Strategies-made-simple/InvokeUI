import React from 'react';
import { Lock, Bookmark, Trash2, Heart } from 'lucide-react';

// Defined locally to ensure self-contained rendering
const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1 ${className}`}>
    {children}
  </span>
);

export const SpaceCard = ({ card, user, savedItems, toggleSave, handleDeleteClick, setSelectedSpace }) => {
  const isOwner = user && (card.userId === user.uid);
  const isPrivate = card.visibility === 'private';

  return (
    <div 
      onClick={() => setSelectedSpace(card)}
      className={`group relative flex flex-col h-[240px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${card.gradient}`}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
         <div className="flex gap-1 flex-wrap pr-8">
            <Badge className="bg-white/20 backdrop-blur-sm text-white">{card.category}</Badge>
            {isPrivate && <Badge className="bg-black/40 backdrop-blur-sm text-yellow-300"><Lock className="w-2 h-2" /></Badge>}
         </div>
         
         <button 
           onClick={(e) => { e.stopPropagation(); toggleSave(card); }}
           className="p-1.5 rounded-full bg-black/10 hover:bg-white text-white hover:text-indigo-600 backdrop-blur-sm transition-colors"
         >
           <Bookmark className={`w-4 h-4 ${savedItems.some(i => i.id === card.id) ? 'fill-current' : ''}`} />
         </button>

         {isOwner && (
           <button 
             onClick={(e) => { e.stopPropagation(); handleDeleteClick({type: 'space', id: card.id}); }}
             className="absolute top-0 left-[-4px] p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
             style={{left: 'auto', right: '35px'}}
           >
              <Trash2 className="w-3 h-3" />
           </button>
         )}
      </div>

      <div className="mt-auto p-5 text-white relative z-0">
         <h3 className="text-xl font-bold mb-1 leading-tight">{card.title}</h3>
         <p className="text-sm text-white/80 line-clamp-1 mb-4">{card.description}</p>
         
         <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <div className="flex items-center gap-2">
               <img src={card.authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${card.author}`} className="w-5 h-5 rounded-full border border-white/30" alt="avatar"/>
               <span className="text-xs font-bold text-white/90 truncate max-w-[100px]">{card.author}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
               <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-white/20" /> {card.likes || 0}</span>
            </div>
         </div>
      </div>
    </div>
  );
};