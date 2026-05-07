import React, { useState } from 'react';
import {
  Globe,
  Zap,
  Code,
  Copy,
  Check,
  RefreshCw,
  Terminal
} from 'lucide-react';

const EndpointsPage = ({ setNotification }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const endpoints = [
    {
      id: 1,
      name: "Advisory Team API",
      type: "REST",
      status: "Active",
      url: "https://api.invoke.ai/v1/teams/pack-adv-1",
      key: "invk_live_a8f9...3b2c",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: 2,
      name: "Engineering Review Webhook",
      type: "Webhook",
      status: "Active",
      url: "https://api.invoke.ai/hooks/github/review",
      key: "whsec_9d8f...1a2b",
      icon: Zap,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    if (setNotification) {
      setNotification({ message: "Copied to clipboard!", type: "success" });
    }
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-4">
            <Terminal className="w-4 h-4" />
            <span>Developer Hub</span>
          </div>
          <h1 className="text-3xl font-bold text-text-main mb-2">API & Endpoints</h1>
          <p className="text-text-muted max-w-2xl">
            Manage your active integrations. All underlying infrastructure and data processing is handled automatically by Invoke.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-text-main">Active Deployments</h2>
            
            {endpoints.map(endpoint => {
              const Icon = endpoint.icon;
              return (
                <div key={endpoint.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${endpoint.bg}`}>
                        <Icon className={`w-6 h-6 ${endpoint.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main text-lg">{endpoint.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                            {endpoint.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {endpoint.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted uppercase mb-1">Endpoint URL</label>
                      <div className="flex gap-2">
                        <code className="flex-1 px-3 py-2 bg-background border border-gray-200 rounded-lg text-sm text-gray-800 font-mono truncate">
                          {endpoint.url}
                        </code>
                        <button 
                          onClick={() => handleCopy(endpoint.url, `${endpoint.id}-url`)}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-background flex items-center gap-2"
                        >
                          {copiedKey === `${endpoint.id}-url` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-muted uppercase mb-1">Authentication Key</label>
                      <div className="flex gap-2">
                        <code className="flex-1 px-3 py-2 bg-background border border-gray-200 rounded-lg text-sm text-gray-800 font-mono truncate">
                          {endpoint.key}
                        </code>
                        <button 
                          onClick={() => handleCopy(endpoint.key, `${endpoint.id}-key`)}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-background flex items-center gap-2"
                        >
                          {copiedKey === `${endpoint.id}-key` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="bg-primary-600 rounded-2xl p-6 text-white shadow-lg">
              <Code className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="font-bold text-xl mb-2">SDK Integration</h3>
              <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                Connect your Invoke agents directly to your codebase with our native SDKs. Zero complex orchestration required.
              </p>
              <div className="space-y-3">
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">
                  Node.js Docs
                </button>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">
                  Python Docs
                </button>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">
                  Go Docs
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-text-main mb-2">Need help?</h3>
              <p className="text-sm text-text-muted mb-4">Read our documentation on deploying agent teams securely to production.</p>
              <a href="#" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View Deployment Guide <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Assuming ChevronRight wasn't imported initially, importing it here for the guide link
import { ChevronRight } from 'lucide-react';

export default EndpointsPage;
