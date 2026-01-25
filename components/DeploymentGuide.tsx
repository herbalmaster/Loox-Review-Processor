
import React from 'react';
import { BookOpen, CheckCircle, Terminal, Globe, Zap, Settings, HelpCircle, ArrowRight, List, ShieldCheck, Mail, Cpu, Instagram } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000 max-w-5xl mx-auto">
      {/* Introduction */}
      <div className="text-center space-y-6">
        <div className="bg-indigo-600 w-24 h-24 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200 mb-8 border-[6px] border-white">
          <BookOpen size={44} className="text-white" />
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">The Master <span className="text-indigo-600">Manual</span></h2>
        <p className="text-slate-500 font-bold max-w-2xl mx-auto text-lg leading-relaxed">
          Your exhaustive, end-to-end blueprint for connecting Loox reviews to Gemini and your social channels. 
          Follow every word. Skip nothing.
        </p>
      </div>

      {/* PHASE 1: PRE-FLIGHT */}
      <section className="space-y-10">
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white"><Settings size={24} /></div>
          Phase 1: Pre-Flight Configuration
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          <VerboseStep 
            num="1" 
            title="Secure Your Gemini API Key" 
            desc="You cannot think without the brain. Go to https://aistudio.google.com/. Sign in with your Google Account. Click 'Get API Key'. Click 'Create API key in new project'. Copy the key immediately to a secure note."
            icon={<Zap className="text-amber-500" />}
          />
          <VerboseStep 
            num="2" 
            title="Enable Google Search Grounding" 
            desc="In the AI Studio console, ensure your project has 'Google Search' grounding available. This allows Gemini to look up your product details if they aren't fully described in the review email."
            icon={<Globe className="text-blue-500" />}
          />
        </div>
      </section>

      {/* PHASE 2: DASHBOARD */}
      <section className="space-y-10">
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white"><Globe size={24} /></div>
          Phase 2: Deploying the Admin Hub (Vercel)
        </h3>
        
        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
          <p className="text-slate-600 font-medium leading-relaxed">
            The dashboard you are looking at right now needs to be hosted on Vercel to work as a secure production tool.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Action List</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-600 font-medium">
                  <CheckCircle size={18} className="text-indigo-500 shrink-0" />
                  Upload these files to a Private GitHub Repository.
                </li>
                <li className="flex gap-3 text-sm text-slate-600 font-medium">
                  <CheckCircle size={18} className="text-indigo-500 shrink-0" />
                  In Vercel Dashboard, select "Vite" as the Framework Preset.
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 p-6 rounded-[2rem] text-xs font-mono text-emerald-400 space-y-2 border border-slate-800">
               <p className="text-slate-500"># Set this in Vercel Env Vars</p>
               <p>API_KEY = "your_copied_gemini_key"</p>
               <p>VERCEL_GIT_COMMIT_REF = "main"</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 3: THE ENGINE */}
      <section className="space-y-10">
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white"><Cpu size={24} /></div>
          Phase 3: Building the n8n Engine
        </h3>
        
        <div className="space-y-6">
          <VerboseStep 
            num="3" 
            title="Setup Gmail Polling" 
            desc="In n8n, add a Gmail node. Use 'OAuth2' credentials. If you haven't created them, go to console.cloud.google.com -> APIs & Services -> Credentials. Create an 'OAuth 2.0 Client ID'. Set the redirect URL to your n8n redirect URL (found in the n8n credentials window)."
            icon={<Mail className="text-rose-500" />}
          />
          <VerboseStep 
            num="4" 
            title="The Extraction Code" 
            desc="Add a 'Code' node. Paste the Javascript regex from our 'n8n (Hostinger)' tab. This node is responsible for finding the Customer Name and the Star Rating inside the messy email HTML."
            icon={<Terminal className="text-slate-800" />}
          />
          <VerboseStep 
            num="5" 
            title="Gemini Reasoning Node" 
            desc="Connect the Code node to a Google Gemini node. Use the model 'gemini-3-flash-preview'. This is the fastest and cheapest for text extraction. Feed it the raw email text and ask it for a 1-sentence summary of the sentiment."
            icon={<Cpu className="text-purple-500" />}
          />
        </div>
      </section>

      {/* PHASE 4: SOCIAL */}
      <section className="space-y-10">
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white"><Instagram size={24} /></div>
          Phase 4: Social Media Handshake
        </h3>
        
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-12 text-center space-y-6">
          <h4 className="text-2xl font-black text-slate-800 tracking-tight">The Final Bridge</h4>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm leading-relaxed">
            You must choose your posting platform. Instagram requires a "Facebook Developer" app. Pinterest is simpler but requires board IDs. 
            Refer to the <strong>Social Connect</strong> tab for exact API scopes.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 font-black text-xs uppercase tracking-widest text-slate-700">Instagram Graph API</div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 font-black text-xs uppercase tracking-widest text-slate-700">Pinterest SDK</div>
          </div>
        </div>
      </section>

      {/* COMPLETION */}
      <div className="bg-indigo-600 rounded-[4rem] p-16 text-white text-center shadow-[0_50px_100px_-20px_rgba(79,70,229,0.4)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700" />
        <div className="relative z-10 space-y-8">
           <ShieldCheck size={64} className="mx-auto text-indigo-200 drop-shadow-2xl" />
           <h3 className="text-4xl font-black italic tracking-tighter uppercase">Automation Ready.</h3>
           <p className="text-indigo-100/80 font-bold max-w-lg mx-auto">
             You have the map. You have the code. You have the choice. 
             Build your system and let the AI grow your brand while you sleep.
           </p>
           <button className="bg-white text-indigo-600 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
             I am Ready to Build
           </button>
        </div>
      </div>
    </div>
  );
};

const VerboseStep = ({ num, title, desc, icon }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 flex gap-8 group hover:shadow-xl transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 p-12 opacity-5 text-slate-100 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex flex-col items-center shrink-0">
      <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-lg relative z-10">
        {num}
      </div>
      <div className="h-full w-px bg-slate-100 mt-4" />
    </div>
    <div className="relative z-10 pt-2 space-y-3">
      <div className="flex items-center gap-4">
        {icon}
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h4>
      </div>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  </div>
);

export default DeploymentGuide;
