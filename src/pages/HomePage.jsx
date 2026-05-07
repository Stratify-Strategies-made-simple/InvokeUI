import React from 'react';
import { Sparkles, ArrowRight, Users, Database, Zap } from 'lucide-react';

/**
 * HomePage Component
 */
export const HomePage = ({ onNavigate, onLogin }) => {
  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Knowledge Base for the AI Era</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-6">
                Your AI Team,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                  Ready to Hire
                </span>
              </h1>
              <p className="text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
                Browse specialized AI agents, configure their behavior, and deploy production-ready teams in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("agents")}
                  className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-200 flex items-center gap-2"
                >
                  Browse Agents <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    console.log("Sign In clicked");
                    if (onLogin) onLogin();
                    else alert("Login function not connected");
                  }}
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-background rounded-full font-bold text-lg transition-all cursor-pointer relative z-30"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-full p-8 md:p-12 relative z-10">
                <img
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=Work&backgroundColor=transparent"
                  alt="Team collaborating"
                  className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">
              Everything you need to master AI
            </h2>
            <p className="text-lg text-text-muted">
              Simplify your workflow with tools designed for the modern creator.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">
                Pre-trained Specialists
              </h3>
              <p className="text-text-muted leading-relaxed">
                Choose from a marketplace of agents pre-configured for Advisory, Engineering, Finance, and more.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">
                Custom Knowledge
              </h3>
              <p className="text-text-muted leading-relaxed">
                Feed your agents specific documentation, internal wiki URLs, or connect directly to your Knowledge Base.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">
                Instant Deployment
              </h3>
              <p className="text-text-muted leading-relaxed">
                Deploy your tuned agent teams instantly via REST API, native SDK, or Webhook triggers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
