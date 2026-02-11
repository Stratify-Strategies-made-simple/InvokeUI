import React from 'react';
import { Sparkles, ArrowRight, Database, Users, Lightbulb } from 'lucide-react';

// 1. We added 'onLogin' to the props list below
export const HomePage = ({ onNavigate, onLogin }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Added relative and z-20 to ensure this sits ABOVE the images/blobs */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Knowledge Base for the AI Era</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                Organize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Prompts</span> in one place.
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                Stop losing your best prompts. Invoke helps teams and creators organize, discover, and share their AI workflows effectively.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('spaces')}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  Explore Spaces <ArrowRight className="w-5 h-5" />
                </button>
                
                {/* 2. This button now uses the onLogin function */}
                <button 
                  onClick={() => {
                    console.log("Sign In clicked");
                    if (onLogin) onLogin();
                    else alert("Login function not connected");
                  }} 
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full font-bold text-lg transition-all cursor-pointer relative z-30"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Visual: Notion-style illustration via Dicebear */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8 md:p-12 relative z-10">
                 <img 
                   src="https://api.dicebear.com/9.x/notionists/svg?seed=Work&backgroundColor=transparent" 
                   alt="Team collaborating" 
                   className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                 />
              </div>
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to master AI</h2>
            <p className="text-lg text-gray-500">Simplify your workflow with tools designed for the modern creator.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Centralized Library</h3>
              <p className="text-gray-500 leading-relaxed">
                Save prompts from ChatGPT, Midjourney, and more into structured, searchable Spaces.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-500 leading-relaxed">
                Discover workflows from other experts. Fork, edit, and improve prompts together.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Enhancement</h3>
              <p className="text-gray-500 leading-relaxed">
                Use our integrated tools to automatically refine and improve your prompt structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Visual */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-2xl font-bold text-gray-900 mb-12">Join thousands of creators</h2>
           <div className="flex justify-center items-center gap-8 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using avatars to represent community */}
              <div className="flex -space-x-4">
                 {[1,2,3,4,5].map(i => (
                    <img key={i} className="w-16 h-16 rounded-full border-4 border-white" src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i*55}`} alt="User" />
                 ))}
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center font-bold text-gray-500">+2k</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};