
import React from 'react';
import { Triangle, Github, Terminal, Copy, Globe, Info, CheckCircle, ExternalLink } from 'lucide-react';

const VercelDeploymentGuide: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 opacity-5">
           <Triangle size={200} className="fill-current" />
        </div>
        <div className="relative z-10 flex-1">
          <h2 className="text-4xl font-black mb-4 tracking-tighter italic uppercase">Deploy to <span className="text-indigo-400">Vercel</span></h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Vercel is the ultimate home for this dashboard. It handles the frontend, the API key security, and the live updates seamlessly.
          </p>
        </div>
        <div className="relative z-10">
          <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="bg-white text-slate-950 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
            <Globe size={18} /> Launch Dashboard
          </a>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <Terminal size={24} className="text-indigo-600" /> Granular Action Steps
        </h3>

        <Step 
          num="1" 
          title="Create GitHub Repository"
          desc="Vercel works best with GitHub. Create a new PRIVATE repository named 'loox-dashboard'."
          cmd="git init\ngit add .\ngit commit -m 'Initial commit'\ngit branch -M main\ngit remote add origin https://github.com/your-username/loox-dashboard.git\ngit push -u origin main"
        />

        <Step 
          num="2" 
          title="Import to Vercel"
          desc="Log into Vercel.com with GitHub. Click 'Add New' -> 'Project'. Select the 'loox-dashboard' repo you just created."
        />

        <Step 
          num="3" 
          title="Framework Configuration"
          desc="Vercel will auto-detect the framework. Ensure 'Framework Preset' is set to VITE. This is critical for our module system."
        />

        <Step 
          num="4" 
          title="Add Environment Variable (CRITICAL)"
          desc="Before clicking deploy, expand the 'Environment Variables' section. This allows Gemini to work securely without exposing your key."
          uiDetails={[
            "Key: API_KEY",
            "Value: (Your Gemini API Key from Step 1 of the Master Guide)",
            "Environment: Production, Preview, and Development"
          ]}
        />

        <Step 
          num="5" 
          title="Final Deploy"
          desc="Click 'Deploy'. After 60 seconds, your site will be live at a URL like 'loox-dashboard.vercel.app'."
        />
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] flex items-start gap-6">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
          <Info className="text-white" size={24} />
        </div>
        <div>
          <h4 className="text-lg font-black text-indigo-900 mb-2">Why private?</h4>
          <p className="text-sm text-indigo-800/80 font-medium leading-relaxed">
            Always keep your repository <strong>Private</strong>. Although your API Key is safe in the Vercel Environment variables, your proprietary extraction code and UI are for your eyes only.
          </p>
        </div>
      </div>
    </div>
  );
};

const Step = ({ num, title, desc, cmd, uiDetails }: any) => (
  <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm flex gap-6 hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black shrink-0 shadow-lg">
      {num}
    </div>
    <div className="flex-1 space-y-4">
      <div>
        <h4 className="text-lg font-black text-slate-800 tracking-tight">{title}</h4>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
      {cmd && (
        <div className="bg-slate-900 p-5 rounded-2xl group relative overflow-hidden">
          <button className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Copy size={14} />
          </button>
          <pre className="text-[11px] font-mono text-emerald-400 leading-relaxed overflow-x-auto">
            <code>{cmd}</code>
          </pre>
        </div>
      )}
      {uiDetails && (
        <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          {uiDetails.map((detail: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
              <CheckCircle size={14} className="text-emerald-500" />
              {detail}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default VercelDeploymentGuide;
