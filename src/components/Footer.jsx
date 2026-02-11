import React from 'react';
import { Zap } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <Zap className="w-5 h-5 text-orange-500 fill-current" />
               <span className="font-bold text-xl tracking-tight text-gray-900">Invoke</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              The ultimate platform for organizing and sharing AI prompts. Built for the future of work.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
               <li><button onClick={() => onNavigate('spaces')} className="hover:text-indigo-600 text-left">Spaces</button></li>
               <li><button onClick={() => onNavigate('library')} className="hover:text-indigo-600 text-left">Library</button></li>
               <li><button className="hover:text-indigo-600 text-left">Extension</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
               <li><button onClick={() => onNavigate('privacy')} className="hover:text-indigo-600 text-left">Privacy Policy</button></li>
               <li><button className="hover:text-indigo-600 text-left">Terms of Service</button></li>
               <li><button className="hover:text-indigo-600 text-left">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
           <p>© 2026 Invoke Inc. All rights reserved.</p>
           <div className="flex gap-4">
              <span>Twitter</span>
              <span>GitHub</span>
              <span>Discord</span>
           </div>
        </div>
      </div>
    </footer>
  );
};