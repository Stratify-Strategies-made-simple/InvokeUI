import React, { useState } from 'react';
import { ChevronRight, Bookmark, Heart, Plus, Copy, Pencil, Trash2, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const SpaceDetailPage = ({
  selectedSpace,
  setSelectedSpace,
  setCurrentView,
  toggleSave,
  savedItems,
  handleLike,
  user,
  setIsAddPromptModalOpen,
  setNotification,
  spacePrompts,
  handleEditClick,
  handleDeleteClick
}) => {
  const [autoCorrect, setAutoCorrect] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <button onClick={() => { setSelectedSpace(null); setCurrentView('spaces'); }} className="hover:text-indigo-600 font-medium">Spaces</button>
        <ChevronRight className="w-4 h-4" />
        <span>{selectedSpace.category}</span>
      </div>

      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedSpace.gradient} text-white shadow-xl mb-8`}>
        <div className="relative p-8 md:p-12">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 backdrop-blur-sm border border-white/10">{selectedSpace.category}</Badge>
            </div>
            <div className="flex gap-4 items-center">
              <button onClick={() => handleLike(selectedSpace)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-colors border border-white/10">
                <Heart className={`w-4 h-4 ${selectedSpace.likedBy?.includes(user?.uid) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                <span className="font-bold text-white">{selectedSpace.likes || 0}</span>
              </button>
              <button onClick={() => toggleSave(selectedSpace)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-colors border border-white/10">
                <Bookmark className={`w-5 h-5 ${savedItems.some(i => i.id === selectedSpace.id) ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{selectedSpace.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">{selectedSpace.description}</p>

          <div className="flex items-center justify-between gap-6 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={selectedSpace.authorImage || `https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedSpace.author}`}
                className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10"
                alt="author"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedSpace.author}`;
                }}
              />
              <div>
                <div className="text-xs text-white/60 uppercase font-bold tracking-wider">Created By</div>
                <div className="font-medium">{selectedSpace.author}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/20 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-xs font-bold text-white/80 tracking-wider">AI Enhance</span>
              <button onClick={() => setAutoCorrect(!autoCorrect)} className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${autoCorrect ? 'bg-green-400' : 'bg-white/20'}`}>
                <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${autoCorrect ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Prompts Collection</h2>
        <button onClick={() => user ? setIsAddPromptModalOpen(true) : setNotification({ message: 'Login needed', type: 'info' })} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Add Prompt
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {spacePrompts.map((prompt) => (
          <div key={prompt.id} className="group bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start gap-4">
              <p className="text-gray-700 leading-relaxed font-mono text-sm whitespace-pre-wrap flex-1">{prompt.content}</p>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { navigator.clipboard.writeText(prompt.content); setNotification({ message: 'Copied!', type: 'success' }); }} className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"><Copy className="w-4 h-4" /></button>

                {user && prompt.userId === user.uid && (
                  <>
                    <button onClick={() => handleEditClick(prompt)} className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteClick({ type: 'prompt', id: prompt.id })} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
              <span>Added by {prompt.author}</span>
              <div className="flex items-center gap-3">
                <button className="hover:text-indigo-600"><Sparkles className="w-4 h-4" /></button>
                <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
