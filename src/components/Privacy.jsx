import React from 'react';
import { Shield, Globe } from 'lucide-react';

export const PrivacyPolicy = () => {
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
          At Invoke, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our prompt management tools.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account, create a Space, or save a prompt. This includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
           <li>Account information (name, email address, profile picture).</li>
           <li>Content you create (prompts, descriptions, space titles).</li>
           <li>Usage data (interactions with features, likes, saves).</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
        <p className="mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
           <li>To provide and maintain the Invoke service.</li>
           <li>To personalize your experience and improve our features.</li>
           <li>To communicate with you about updates and support.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h3>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Contact Us</h3>
        <p className="mb-8">
          If you have any questions about this Privacy Policy, please contact us at privacy@invoke-app.com.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-start gap-4">
           <Globe className="w-6 h-6 text-gray-400 mt-1" />
           <div>
              <h4 className="font-bold text-gray-900">Global Privacy Compliance</h4>
              <p className="text-sm text-gray-500 mt-1">We adhere to GDPR and CCPA standards to ensure your rights are protected regardless of your location.</p>
           </div>
        </div>
      </div>
    </div>
  );
};