
import React, { useState, useEffect } from 'react';
import { AppView, MindMapData, ResearchOutline } from './types';
import { Sidebar } from './components/Sidebar';
import { Button } from './components/Button';
import { ResearchGraph } from './components/ResearchGraph';
import { generateResearchMindMap, generateResearchOutline } from './services/geminiService';
import { COLORS, LAYOUT } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [outlineData, setOutlineData] = useState<ResearchOutline | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication Mock
  const handleSignIn = () => {
    setIsAuthenticated(true);
    setView(AppView.LANDING);
  };

  const handleStartResearch = async () => {
    if (!query) return;
    setLoading(true);
    setView(AppView.DASHBOARD);
    const [map, outline] = await Promise.all([
      generateResearchMindMap(query),
      generateResearchOutline(query)
    ]);
    setMindMapData(map);
    setOutlineData(outline);
    setLoading(false);
  };

  // Auth View
  if (view === AppView.AUTH) {
    return (
      <div className="min-h-screen bg-silk flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-morning shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-12 space-y-8 animate-fadeIn">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-hadfield mx-auto rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
            <h2 className="text-2xl font-bold tracking-tight">Research Portal</h2>
            <p className="text-sm text-cerebral font-medium">Access your enterprise intelligence environment.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-cerebral ml-1">Identity</label>
              <input type="email" placeholder="Researcher ID or Email" className="w-full px-4 py-3 bg-silk border border-morning focus:outline-none focus:ring-1 focus:ring-hadfield text-sm transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-cerebral ml-1">Credential</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-silk border border-morning focus:outline-none focus:ring-1 focus:ring-hadfield text-sm transition-all" />
            </div>
            <Button variant="primary" size="full" onClick={handleSignIn}>Authorize Session</Button>
          </div>
          <div className="pt-4 text-center">
            <button className="text-[10px] uppercase tracking-widest font-bold text-hadfield hover:underline">Forgot Identity?</button>
          </div>
        </div>
      </div>
    );
  }

  // Landing View
  if (view === AppView.LANDING) {
    return (
      <div className="min-h-screen bg-silk overflow-x-hidden">
        {/* Persistent Nav */}
        <nav className="h-24 px-12 flex items-center justify-between border-b border-morning bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-hadfield rounded flex items-center justify-center text-white font-bold">R</div>
            <span className="text-lg font-bold tracking-tight">ResearchCollab.ai</span>
          </div>
          <div className="flex items-center space-x-10 text-[11px] font-bold uppercase tracking-widest text-cerebral">
            <a href="#" className="hover:text-hadfield transition-colors">Methodology</a>
            <a href="#" className="hover:text-hadfield transition-colors">Institutions</a>
            <a href="#" className="hover:text-hadfield transition-colors">Security</a>
            <Button variant="secondary" size="sm" onClick={() => setView(AppView.AUTH)}>Sign In</Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-12 pt-32 pb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12 animate-fadeIn">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-hadfield">Institutional Research Intelligence</span>
              <h1 className="text-h1 font-bold leading-[1.1] tracking-tighter text-gray-900">
                Architectural Clarity for <span className="text-hadfield">Complex Discovery.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg font-light leading-relaxed">
                A serious workspace designed for elite research teams. Transition from data to intelligence with academic-grade tools and structural authority.
              </p>
            </div>
            <div className="max-w-md space-y-4">
              <div className="relative group">
                <input 
                  type="text"
                  placeholder="Enter a research domain or problem space..."
                  className="w-full px-8 py-6 bg-white border border-morning shadow-sm text-lg focus:outline-none focus:ring-1 focus:ring-hadfield transition-all pr-32"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartResearch()}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <Button variant="primary" size="sm" onClick={handleStartResearch} loading={loading}>Begin</Button>
                </div>
              </div>
              <p className="text-[10px] text-cerebral font-bold uppercase tracking-widest pl-2">Press enter to initialize analytical engine</p>
            </div>
          </div>
          <div className="h-[600px] bg-white border border-morning shadow-2xl relative overflow-hidden group">
            <div className="absolute top-10 left-10 z-10 space-y-1">
              <div className="w-12 h-1 bg-hadfield" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Intelligence Topology Engine v4.2</span>
            </div>
            <ResearchGraph />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white to-transparent">
              <div className="flex justify-between items-center opacity-60">
                 <span className="text-[9px] font-mono">NODE_COUNT: 42</span>
                 <span className="text-[9px] font-mono">LATENCY: 142MS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Flow: institutional Trust */}
        <div className="bg-white py-32 border-y border-morning">
           <div className="max-w-7xl mx-auto px-12">
              <div className="grid grid-cols-4 gap-12">
                 {[
                   { label: 'Citations Managed', value: '4.2M+' },
                   { label: 'Verified Sources', value: '180k' },
                   { label: 'Institutional Partners', value: '1,200+' },
                   { label: 'Precision Index', value: '99.9%' }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="text-4xl font-bold text-gray-900 tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-cerebral">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Dashboard / Workspace View
  return (
    <div className="flex h-screen bg-silk overflow-hidden font-sans">
      {/* ACTION CONTROLS (10%) - Predictable Rhythm */}
      <div className="w-[80px] shrink-0 border-r border-morning bg-white flex flex-col items-center py-10 space-y-10">
        <div className="w-10 h-10 bg-hadfield rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-hadfield/20">R</div>
        
        <nav className="flex-1 flex flex-col space-y-4">
           {[
             { view: AppView.DASHBOARD, icon: 'M4 6h16M4 12h16M4 18h16', label: 'Intel' },
             { view: AppView.MIND_MAP, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Visual' },
             { view: AppView.OUTLINE, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Draft' },
           ].map(item => (
             <button
               key={item.view}
               onClick={() => setView(item.view)}
               className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 group ${
                 view === item.view ? 'bg-hadfield text-white shadow-lg' : 'text-cerebral hover:bg-silk'
               }`}
             >
               <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
               </svg>
               <span className="text-[8px] uppercase font-bold tracking-tighter">{item.label}</span>
             </button>
           ))}
        </nav>

        <button 
          onClick={() => setView(AppView.LANDING)}
          className="w-10 h-10 flex items-center justify-center text-cerebral hover:text-hadfield transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Header - Editorial Style */}
        <header className="h-20 px-10 border-b border-morning flex items-center justify-between shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
               <span className="text-[10px] uppercase font-bold tracking-widest text-hadfield">Workspace Active</span>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">{query || 'System Default Domain'}</h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-silk flex items-center justify-center text-[10px] font-bold">JD</div>)}
             </div>
             <div className="w-px h-6 bg-morning" />
             <Button variant="primary" size="sm">Export Report</Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* MAIN WORKSPACE (60%) */}
          <section className="w-[60%] flex flex-col border-r border-morning bg-silk/30 overflow-hidden">
             <div className="flex-1 overflow-y-auto custom-scrollbar p-12">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-6">
                    <div className="w-12 h-12 border-4 border-hadfield/20 border-t-hadfield rounded-full animate-spin" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-cerebral">Synthesizing Domain Logic...</p>
                  </div>
                ) : (
                  <>
                    {view === AppView.DASHBOARD && (
                      <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
                        <div className="bg-white p-12 border border-morning shadow-sm space-y-6">
                           <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-hadfield">Intellectual Context</h3>
                           <p className="text-h2 font-bold tracking-tighter leading-tight text-gray-900">
                             Preliminary analysis reveals high topological density in <span className="underline decoration-hadfield/30 decoration-8 underline-offset-[-2px]">core thematic clusters</span>.
                           </p>
                           <p className="text-body text-gray-500 font-light leading-relaxed">
                             Our algorithm has processed 14,000 entities related to "{query}". The following visualization modules represent a structural mapping of relational data, validated against institutional archives.
                           </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-10">
                           <div className="bg-white p-8 border border-morning shadow-sm h-64 flex flex-col">
                              <span className="text-[9px] uppercase font-bold tracking-widest text-cerebral mb-auto">Node Distribution</span>
                              <div className="flex items-end space-x-2 h-32">
                                 {[40, 70, 55, 90, 30, 85, 60].map((v, i) => (
                                   <div key={i} className="flex-1 bg-hadfield/10 hover:bg-hadfield transition-colors relative group" style={{ height: `${v}%` }}>
                                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">v.{v}</div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           <div className="bg-white p-8 border border-morning shadow-sm h-64 flex flex-col">
                              <span className="text-[9px] uppercase font-bold tracking-widest text-cerebral mb-auto">Thematic Drift</span>
                              <div className="flex-1 flex items-center justify-center">
                                 <svg className="w-32 h-32 text-hadfield/20" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" className="animate-pulse" />
                                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.5" />
                                 </svg>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white p-10 border border-morning shadow-sm space-y-8">
                           <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-cerebral">Primary Institutional Refs</h3>
                           <div className="space-y-4">
                              {[1,2,3].map(i => (
                                <div key={i} className="p-6 border border-morning hover:border-hadfield transition-all group flex items-center justify-between cursor-pointer">
                                   <div className="flex items-center space-x-6">
                                      <div className="text-xs font-bold font-mono text-cerebral">0x0{i}</div>
                                      <div className="space-y-1">
                                         <div className="text-sm font-bold text-gray-900">Comparative Model of Domain Flux (202{i})</div>
                                         <div className="text-[10px] text-cerebral font-bold uppercase tracking-widest">Oxford Institutional Archive</div>
                                      </div>
                                   </div>
                                   <svg className="w-5 h-5 text-cerebral group-hover:text-hadfield transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={2} /></svg>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    )}

                    {view === AppView.MIND_MAP && (
                      <div className="h-[750px] bg-white border border-morning shadow-2xl relative overflow-hidden animate-fadeIn">
                        <div className="absolute top-8 left-8 z-10 space-y-4">
                           <div className="px-4 py-2 bg-silk border border-morning shadow-sm flex items-center space-x-3">
                              <div className="w-2 h-2 bg-hadfield rounded-full animate-pulse" />
                              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600">Dynamic Topology Active</span>
                           </div>
                           <div className="flex flex-col space-y-2">
                              <button className="w-10 h-10 bg-white border border-morning flex items-center justify-center hover:text-hadfield transition-colors shadow-sm">+</button>
                              <button className="w-10 h-10 bg-white border border-morning flex items-center justify-center hover:text-hadfield transition-colors shadow-sm">-</button>
                              <button className="w-10 h-10 bg-white border border-morning flex items-center justify-center hover:text-hadfield transition-colors shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>
                              </button>
                           </div>
                        </div>
                        <ResearchGraph interactive />
                        <div className="absolute bottom-8 right-8 z-10 p-6 bg-white/80 backdrop-blur border border-morning max-w-xs space-y-4">
                           <span className="text-[10px] uppercase font-bold tracking-widest text-hadfield">Node Properties</span>
                           <div className="space-y-2">
                              <div className="text-xs font-bold">Selected: Institutional Privacy</div>
                              <p className="text-[10px] text-gray-500 leading-relaxed font-light">Correlates highly with secondary decryption nodes and cross-border regulatory frameworks.</p>
                           </div>
                        </div>
                      </div>
                    )}

                    {view === AppView.OUTLINE && outlineData && (
                      <div className="max-w-4xl mx-auto bg-white border border-morning shadow-[0_48px_96px_-12px_rgba(0,0,0,0.05)] p-24 space-y-20 animate-fadeIn min-h-screen">
                        <div className="text-center space-y-8 pb-12 border-b-4 border-morning">
                           <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-cerebral">Formal Draft v.1.0</span>
                           <h1 className="text-h1 font-bold tracking-tighter leading-none text-gray-900">{outlineData.title}</h1>
                           <div className="flex items-center justify-center space-x-4">
                              <div className="w-8 h-px bg-morning" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-cerebral">Architected by ResearchCollab Intelligence</span>
                              <div className="w-8 h-px bg-morning" />
                           </div>
                        </div>
                        
                        <div className="space-y-24">
                           {outlineData.sections.map((section, idx) => (
                             <div key={idx} className="space-y-10">
                               <div className="flex items-baseline space-x-6">
                                 <span className="text-5xl font-bold text-hadfield/20 font-mono tracking-tighter">{String(idx + 1).padStart(2, '0')}</span>
                                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-silk pb-4 flex-1 uppercase tracking-tight">{section.heading}</h2>
                               </div>
                               <div className="pl-[76px] space-y-8">
                                  <div className="p-6 bg-silk/50 border-l-2 border-dodgeroll">
                                     <p className="text-body text-gray-600 font-light italic leading-relaxed">{section.context}</p>
                                  </div>
                                  <ul className="space-y-5">
                                     {section.subheadings.map((sub, sidx) => (
                                       <li key={sidx} className="flex items-center space-x-4 group cursor-pointer">
                                          <div className="w-2 h-2 bg-hadfield opacity-20 group-hover:opacity-100 transition-opacity" />
                                          <span className="text-lg font-medium text-gray-800 tracking-tight group-hover:text-hadfield transition-colors">{sub}</span>
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
             </div>
          </section>

          {/* CONTEXTUAL TOOLS (30%) - Elite level clarity */}
          <aside className="w-[30%] bg-white p-12 overflow-y-auto custom-scrollbar flex flex-col">
             <div className="space-y-12">
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-hadfield">Contextual Vectors</h4>
                      <button className="text-[9px] font-bold uppercase text-cerebral hover:text-hadfield transition-colors">Refresh</button>
                   </div>
                   <div className="space-y-4">
                      {['Security Integrity', 'Data Provenance', 'Relational Entropy'].map(vec => (
                        <div key={vec} className="p-5 border border-morning bg-silk/20 hover:border-hadfield transition-all group cursor-pointer">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{vec}</span>
                              <span className="text-[10px] font-mono text-hadfield font-bold">84%</span>
                           </div>
                           <div className="w-full h-1 bg-silk rounded-full overflow-hidden">
                              <div className="h-full bg-hadfield group-hover:bg-dodgeroll transition-all" style={{ width: '84%' }} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-cerebral">Analytical Thinking Process</h4>
                   <div className="bg-gray-900 p-8 rounded shadow-xl font-mono text-[11px] leading-relaxed text-green-400 space-y-4">
                      <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-gray-500">SYSTEM_ID: INTEL_CORE_04</span>
                      </div>
                      <p className="text-hadfield">> Evaluation phase: Cluster Correlation</p>
                      <p className="opacity-80">> Identifying thematic overlaps in domain "{query}"</p>
                      <p className="opacity-80">> Verification: 99.4% confidence established</p>
                      <p className="opacity-80">> Generating academic-grade outline structure...</p>
                      <p className="text-dodgeroll font-bold">> [SUCCESS] Logic environment stabilized.</p>
                      <div className="animate-pulse">_</div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-cerebral">Suggested Intelligence Paths</h4>
                   <div className="flex flex-wrap gap-2">
                      {['Bias Mitigation', 'Privacy Drift', 'Institutional Flow', 'Cross-Border Flux'].map(tag => (
                        <span key={tag} className="px-3 py-1.5 border border-morning text-[10px] font-bold uppercase tracking-widest hover:border-hadfield hover:text-hadfield transition-all cursor-pointer">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-auto pt-12 border-t border-morning">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-[10px] uppercase font-bold tracking-widest text-cerebral">Session Security</h4>
                   <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">ENCRYPTED</span>
                </div>
                <div className="flex items-center space-x-3">
                   <div className="w-2 h-2 bg-hadfield rounded-full" />
                   <span className="text-xs font-medium text-gray-500">Connected to Enterprise Mesh v.9</span>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;
