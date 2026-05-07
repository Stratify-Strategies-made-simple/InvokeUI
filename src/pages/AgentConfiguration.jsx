import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  Database,
  Globe,
  UploadCloud,
  FileText,
  CheckCircle2,
  Box,
  Settings,
  Cpu,
  Brain,
  ShieldAlert,
  Terminal,
  Code,
  Zap,
  Play,
  ArrowRight,
  ArrowLeft,
  Link,
  Plus
} from 'lucide-react';

const AgentConfiguration = ({ pack, onNavigate, user, setNotification }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Data Ingestion State
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState([]);

  // Step 2: Pack Builder State
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [memoryType, setMemoryType] = useState('shared');

  // Step 3: Behavior Config State
  const [intelligence, setIntelligence] = useState(70);
  const [autonomy, setAutonomy] = useState(50);
  const [costCeiling, setCostCeiling] = useState(30);
  const [speed, setSpeed] = useState(80);
  const [personality, setPersonality] = useState('Professional');
  const [guardrails, setGuardrails] = useState({
    pii: true,
    hallucination: true,
    budget: false,
    approval: false
  });

  // Step 4: Simulation & Deploy State
  const [simStatus, setSimStatus] = useState('idle'); // idle, running, complete
  const [simLogs, setSimLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Auto-scroll simulation logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simLogs]);

  // Mock Scraper
  const handleScrape = () => {
    if (!scrapeUrl) return;
    setIsScraping(true);
    setTimeout(() => {
      setScrapedData([...scrapedData, { url: scrapeUrl, pages: Math.floor(Math.random() * 50) + 5, type: 'web' }]);
      setScrapeUrl("");
      setIsScraping(false);
      if (setNotification) setNotification({ message: "Successfully extracted knowledge", type: "success" });
    }, 2000);
  };

  // Run Simulation
  const runSimulation = () => {
    setSimStatus('running');
    setSimLogs(['[SYSTEM] Initializing Agent Pack...']);
    
    const steps = [
      '[SYSTEM] Allocating memory spaces...',
      '[AGENT] Advisory Intelligence Agent online.',
      `[AGENT] Applying personality profile: ${personality}`,
      `[CONFIG] Intelligence set to ${intelligence}%, Autonomy ${autonomy}%`,
      '[SYSTEM] Connecting tools & APIs...',
      '[DATA] Indexing provided knowledge sources...',
      '[GUARDRAIL] Verifying PII protection boundaries...',
      '[SYSTEM] Running test query: "Analyze market trends"...',
      '[AGENT] Processing query. Searching web...',
      '[AGENT] Generating response based on knowledge base.',
      '[SYSTEM] Simulation complete. Team is ready for deployment.'
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setSimLogs(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setSimStatus('complete');
        if (setNotification) setNotification({ message: "Simulation successful!", type: "success" });
      }
    }, 800);
  };

  const steps = [
    { num: 1, title: "Knowledge", icon: Database },
    { num: 2, title: "Skills & Tools", icon: Box },
    { num: 3, title: "Behavior", icon: Brain },
    { num: 4, title: "Deploy", icon: Zap }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans text-gray-900">
      {/* Header / Progress Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Configure Team</h1>
              <p className="text-sm text-gray-500">{pack.length} agents selected</p>
            </div>
            
            {/* Steps Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className={`flex items-center gap-2 ${currentStep >= s.num ? "text-indigo-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep === s.num ? "bg-indigo-600 text-white" : 
                      currentStep > s.num ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {currentStep > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className="font-bold text-sm">{s.title}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 h-px ${currentStep > s.num ? "bg-indigo-600" : "bg-gray-200"}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        
        {/* STEP 1: KNOWLEDGE INGESTION */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Feed Your Agents</h2>
              <p className="text-gray-500">Provide the data and context your agents need to perform their tasks accurately.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Web Scraper */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe className="w-5 h-5" /></div>
                  <h3 className="font-bold text-gray-900">Web Scraping</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Extract knowledge from any public URL.</p>
                <div className="flex gap-2">
                  <input 
                    type="url" 
                    placeholder="https://example.com/docs" 
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                  <button 
                    onClick={handleScrape}
                    disabled={isScraping || !scrapeUrl}
                    className="px-4 py-2 bg-gray-900 text-white font-bold rounded-lg text-sm hover:bg-black disabled:opacity-50 flex items-center gap-2"
                  >
                    {isScraping ? <span className="animate-pulse">Scraping...</span> : "Scrape"}
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><UploadCloud className="w-5 h-5" /></div>
                  <h3 className="font-bold text-gray-900">Document Upload</h3>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-900">Click or drag files here</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOCX, CSV up to 50MB</p>
                </div>
              </div>
            </div>

            {/* Integrations */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Knowledge Base Integrations</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {['Notion', 'Google Drive', 'Confluence'].map(integration => (
                  <div key={integration} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center"><Link className="w-4 h-4 text-gray-500"/></div>
                      <span className="font-bold text-sm">{integration}</span>
                    </div>
                    <button className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-200">Connect</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingested Data List */}
            {scrapedData.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                <h3 className="font-bold text-indigo-900 mb-4 text-sm uppercase tracking-wider">Indexed Sources</h3>
                <div className="space-y-2">
                  {scrapedData.map((data, i) => (
                    <div key={i} className="bg-white border border-indigo-100 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <div>
                          <div className="text-sm font-bold text-gray-900 truncate max-w-[300px]">{data.url}</div>
                          <div className="text-xs text-gray-500">{data.pages} pages • {data.type}</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PACK BUILDER */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Build Your Pack</h2>
              <p className="text-gray-500">Equip your team with specific skills, external tools, and memory architectures.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Skills & Tools */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-indigo-600" /> Core Skills</h3>
                  <div className="space-y-2">
                    {['Web Research', 'Document Analysis', 'Data Extraction', 'Code Generation'].map(skill => (
                      <label key={skill} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-indigo-300">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                        <span className="text-sm font-medium text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Link className="w-5 h-5 text-indigo-600" /> External Tools</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'SerpAPI', desc: 'Google Search' },
                      { name: 'Browserless', desc: 'Web scraping' },
                      { name: 'Pinecone', desc: 'Vector DB' },
                      { name: 'Slack', desc: 'Notifications' }
                    ].map(tool => (
                      <label key={tool.name} className="flex flex-col gap-1 p-3 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-indigo-300 relative">
                        <input type="checkbox" className="absolute top-3 right-3 w-4 h-4 text-indigo-600 rounded" />
                        <span className="text-sm font-bold text-gray-900">{tool.name}</span>
                        <span className="text-xs text-gray-500">{tool.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Memory Config */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-600" /> Memory Layers</h3>
                <div className="space-y-3">
                  {[
                    { id: 'shared', title: 'Shared Memory', desc: 'Agents can access each other\'s context and findings.' },
                    { id: 'long', title: 'Long-term Memory', desc: 'Persistent memory across sessions stored in Vector DB.' },
                    { id: 'short', title: 'Short-term', desc: 'Session context only (clears after 24h).' }
                  ].map(mem => (
                    <div 
                      key={mem.id}
                      onClick={() => setMemoryType(mem.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        memoryType === mem.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900">{mem.title}</span>
                        {memoryType === mem.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <p className="text-sm text-gray-500">{mem.desc}</p>
                    </div>
                  ))}
                  <button className="w-full p-3 border border-dashed border-gray-300 text-gray-600 text-sm font-bold rounded-xl hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Add Custom Memory Layer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BEHAVIOR CONFIG */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Behavior & Tuning</h2>
              <p className="text-gray-500">Fine-tune intelligence, autonomy, and establish safety guardrails.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><Settings className="w-5 h-5 text-indigo-600" /> Performance Tuning</h3>
                
                {[
                  { label: "Intelligence Level", value: intelligence, set: setIntelligence },
                  { label: "Autonomy", value: autonomy, set: setAutonomy },
                  { label: "Cost Ceiling", value: costCeiling, set: setCostCeiling },
                  { label: "Response Speed", value: speed, set: setSpeed }
                ].map(slider => (
                  <div key={slider.label}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-gray-700">{slider.label}</label>
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{slider.value}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={slider.value}
                      onChange={(e) => slider.set(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {/* Personality */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4"><Brain className="w-5 h-5 text-indigo-600" /> Personality</h3>
                  <select 
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 font-medium text-sm mb-4"
                  >
                    <option value="Professional">Professional (Formal, precise)</option>
                    <option value="Friendly">Friendly (Warm, approachable)</option>
                    <option value="Concise">Concise (Brief, direct)</option>
                    <option value="Detailed">Detailed (Thorough, comprehensive)</option>
                    <option value="Creative">Creative (Innovative, out-of-box)</option>
                    <option value="Custom">Custom Persona...</option>
                  </select>
                  <button className="w-full py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                    Inject Custom Prompt (Coming Soon)
                  </button>
                </div>

                {/* Guardrails */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4"><ShieldAlert className="w-5 h-5 text-red-500" /> Guardrails</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'pii', label: 'PII Protection', desc: 'Block personal data exposure' },
                      { id: 'hallucination', label: 'Hallucination Check', desc: 'Verify facts before output' },
                      { id: 'budget', label: 'Budget Alerts', desc: 'Notify on cost thresholds' },
                      { id: 'approval', label: 'Human Approval', desc: 'Require sign-off for actions' }
                    ].map(rail => (
                      <div key={rail.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{rail.label}</div>
                          <div className="text-xs text-gray-500">{rail.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={guardrails[rail.id]} 
                            onChange={() => setGuardrails({...guardrails, [rail.id]: !guardrails[rail.id]})}
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SIMULATION & DEPLOY */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulation & Deployment</h2>
              <p className="text-gray-500">Test your agent configuration before generating deployment credentials.</p>
            </div>

            {/* Terminal Simulator */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-mono text-gray-400">invoke-simulator.exe</span>
                </div>
                {simStatus === 'idle' && (
                  <button 
                    onClick={runSimulation}
                    className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-md hover:bg-green-500/30 transition-colors"
                  >
                    <Play className="w-3 h-3" /> Run Simulation
                  </button>
                )}
                {simStatus === 'complete' && (
                  <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                    <CheckCircle2 className="w-3 h-3" /> Simulation Passed
                  </span>
                )}
              </div>
              <div className="p-4 h-64 overflow-y-auto font-mono text-xs text-green-400 leading-relaxed bg-[#0a0a0a]">
                {simLogs.length === 0 ? (
                  <span className="text-gray-600">Ready. Click 'Run Simulation' to test configuration.</span>
                ) : (
                  simLogs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Deployment Options */}
            <div className={`transition-all duration-700 ${simStatus === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Deployment Ready</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border-2 border-indigo-600 shadow-md relative">
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">Recommended</div>
                  <Code className="w-6 h-6 text-indigo-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">SDK Integration</h4>
                  <p className="text-xs text-gray-500 mb-4">Native libraries for Node.js, Python, and Go.</p>
                  <button className="w-full py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100">View Docs</button>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-300">
                  <Globe className="w-6 h-6 text-gray-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">REST API</h4>
                  <p className="text-xs text-gray-500 mb-4">Direct API access with full control via standard HTTP.</p>
                  <button className="w-full py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100">Generate Key</button>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-300">
                  <Zap className="w-6 h-6 text-gray-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">Webhook Trigger</h4>
                  <p className="text-xs text-gray-500 mb-4">Event-driven automation triggered by external systems.</p>
                  <button className="w-full py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100">Setup URL</button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-900 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400">Quick Start (Node.js)</span>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">Copy Code</button>
                </div>
                <pre className="text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  {`import { InvokeThoughts } from '@invoke/sdk';\n\nconst client = new InvokeThoughts({ apiKey: process.env.INVOKE_API_KEY });\n\nconst result = await client.teams.run({\n  team: 'pack-${pack.map(p => p.id).join('-').substring(0, 8)}',\n  task: 'Analyze competitor pricing strategies'\n});\n\nconsole.log(result.output);`}
                </pre>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Footer Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-[1000px] mx-auto px-4 py-4 flex items-center justify-between">
          {currentStep > 1 ? (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('agents')}
              className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          )}

          {currentStep < totalSteps ? (
            <button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('home')}
              disabled={simStatus !== 'complete'}
              className="px-8 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" /> Finish Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentConfiguration;
