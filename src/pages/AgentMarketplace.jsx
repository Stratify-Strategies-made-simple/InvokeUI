import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Star,
  Download,
  Plus,
  Check,
  ShieldCheck,
  Zap,
  TrendingUp,
  Brain,
  MessageSquare,
  FileCode,
  DollarSign,
  Scale,
  Target,
  Box,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const AGENTS = [
  {
    id: "adv-1",
    name: "Strategic Insight AI",
    role: "Advisory Intelligence Agent",
    category: "Advisory",
    rating: 4.9,
    downloads: "12k",
    description: "Strategic insights, market research, and decision-support analysis tailored for executives.",
    icon: TrendingUp,
    gradient: "from-blue-600 to-primary-600"
  },
  {
    id: "eng-1",
    name: "CodeReview Pro",
    role: "Engineering Code Review Agent",
    category: "Engineering",
    rating: 4.8,
    downloads: "45k",
    description: "Automated code quality checks, security vulnerability scanning, and PR reviews.",
    icon: FileCode,
    gradient: "from-slate-700 to-slate-900"
  },
  {
    id: "eng-2",
    name: "Data Pipeline Architect",
    role: "Technology Data Agent",
    category: "Engineering",
    rating: 4.7,
    downloads: "8k",
    description: "Design and optimize data pipelines and scalable processing systems.",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: "fin-1",
    name: "FinModeler",
    role: "Finance Analysis Agent",
    category: "Finance",
    rating: 4.9,
    downloads: "18k",
    description: "Financial modeling, reporting automation, and predictive budget analysis.",
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "cx-1",
    name: "SupportOps AI",
    role: "Client Support Agent",
    category: "Client Experience",
    rating: 4.6,
    downloads: "32k",
    description: "Intelligent customer interaction, ticket triage, and support workflows automation.",
    icon: MessageSquare,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: "leg-1",
    name: "Compliance Check",
    role: "Legal Compliance Agent",
    category: "Legal",
    rating: 4.9,
    downloads: "5k",
    description: "Contract analysis, risk mitigation, and automated regulatory compliance checks.",
    icon: Scale,
    gradient: "from-amber-600 to-orange-700"
  },
  {
    id: "mkt-1",
    name: "Content Maestro",
    role: "Marketing Content Agent",
    category: "Marketing",
    rating: 4.8,
    downloads: "28k",
    description: "SEO-optimized content creation, campaign messaging, and social media scheduling.",
    icon: Target,
    gradient: "from-purple-500 to-fuchsia-600"
  },
  {
    id: "prod-1",
    name: "DocuGenius",
    role: "Product Documentation Agent",
    category: "Product",
    rating: 4.7,
    downloads: "15k",
    description: "Automated technical documentation generation and product guide updates.",
    icon: Box,
    gradient: "from-primary-400 to-blue-500"
  }
];

const CATEGORIES = ["All", "Advisory", "Engineering", "Finance", "Client Experience", "Legal", "Marketing", "Product"];

const AgentMarketplace = ({ user, setNotification, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pack, setPack] = useState([]);

  const filteredAgents = useMemo(() => {
    return AGENTS.filter((agent) => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agent.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const togglePackItem = (agent) => {
    if (pack.find(item => item.id === agent.id)) {
      setPack(pack.filter(item => item.id !== agent.id));
      if (setNotification) {
        setNotification({ message: `Removed ${agent.name} from pack`, type: "info" });
      }
    } else {
      setPack([...pack, agent]);
      if (setNotification) {
        setNotification({ message: `Added ${agent.name} to pack`, type: "success" });
      }
    }
  };

  const handleConfigure = () => {
    if (pack.length === 0) {
      if (setNotification) setNotification({ message: "Add at least one agent to your pack first", type: "info" });
      return;
    }
    if (setNotification) {
      setNotification({ message: "Taking you to configuration builder...", type: "success" });
    }
    if (onNavigate) {
      onNavigate('configure_agent', pack);
    }
  };

  return (
    <div className="bg-background min-h-screen relative pb-32">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-16 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6">
              <Brain className="w-4 h-4" />
              <span>Your AI Team, Ready to Hire</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight mb-6">
              Build your ultimate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                Agent Workforce
              </span>
            </h1>
            <p className="text-lg text-text-muted mb-8 max-w-2xl leading-relaxed">
              Browse specialized AI agents, feed them your knowledge, configure their behavior, and deploy production-ready teams in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by role, skill, or agent name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none shadow-sm transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-[20%] w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-4 no-scrollbar items-center">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                selectedCategory === category 
                  ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-background"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        {filteredAgents.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-main mb-2">No agents found</h3>
            <p className="text-text-muted">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map(agent => {
              const isPacked = pack.some(p => p.id === agent.id);
              const Icon = agent.icon;
              
              return (
                <div 
                  key={agent.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                    isPacked ? "border-primary-500 shadow-md ring-1 ring-primary-500" : "border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300"
                  }`}
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-inner`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {agent.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {agent.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-text-main mt-2 mb-1 leading-tight">{agent.name}</h3>
                    <div className="text-sm font-medium text-text-muted mb-3">{agent.role}</div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                      {agent.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <Download className="w-3.5 h-3.5" />
                        {agent.downloads} deploys
                      </div>
                      <button
                        onClick={() => togglePackItem(agent)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all ${
                          isPacked 
                            ? "bg-primary-50 text-primary-700 hover:bg-primary-100" 
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        {isPacked ? (
                          <>
                            <Check className="w-4 h-4" /> Selected
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Add to Pack
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Pack Builder */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-500 z-50 ${pack.length > 0 ? "translate-y-0" : "translate-y-full"}`}>
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-primary-100 text-primary-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {pack.length}
            </div>
            <div>
              <div className="font-bold text-text-main">Your Agent Pack</div>
              <div className="text-xs text-text-muted">Ready to configure and deploy</div>
            </div>
            <div className="hidden lg:flex items-center gap-2 ml-6 pl-6 border-l border-gray-200">
              {pack.slice(0, 4).map(agent => {
                const Icon = agent.icon;
                return (
                  <div key={`pack-${agent.id}`} className="relative group cursor-pointer">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center border-2 border-white shadow-sm hover:-translate-y-1 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                      {agent.name}
                    </div>
                  </div>
                );
              })}
              {pack.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm text-xs font-bold text-gray-600">
                  +{pack.length - 4}
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleConfigure}
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-200 transition-all active:scale-95"
          >
            Configure Team <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentMarketplace;
