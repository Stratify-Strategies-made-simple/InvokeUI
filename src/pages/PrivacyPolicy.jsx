import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
         <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Shield className="w-8 h-8" />
         </div>
         <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
         <p className="text-gray-500">Last updated: February 2026</p>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-600">
        <p className="lead text-xl text-gray-700 mb-8">
          At Invoke, we take your privacy seriously. This policy describes how we collect, use, and handle your data.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
        <p className="mb-4">We collect account info, content you create (prompts, spaces), and usage data.</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Contact Us</h3>
        <p className="mb-8">If you have any questions, contact us at privacy@invoke-app.com.</p>
      </div>
    </div>
  );
};
