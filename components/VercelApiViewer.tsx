
import React from 'react';
import { Triangle, Github, Globe, ShieldCheck, Terminal, ArrowUpRight, Info } from 'lucide-react';

const VercelApiViewer: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
      <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl shadow-xl shadow-slate-300">
            <Triangle size={24} className="text-white fill-current" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Host UI on Vercel</h3>
            <p className="text-sm text-slate-500 font-medium">Free, high-performance hosting for your admin dashboard.</p>
          </div>
        </div>
        <a 
          href="https://vercel.com/new" 
          target="_blank"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
        >
          <Globe size={18} /> Launch to Vercel
        </a>
      </div>

      <div className="p-10">
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-10 flex items-start gap-4">
          <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600 shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 mb-1">Framework Preset Detected: Vite</h4>
            <p className="text-sm text-indigo-800/80 leading-relaxed">
              If Vercel detects <strong>Vite</strong>, that is correct! This app uses a modern ESM architecture that Vercel's Vite preset handles perfectly. <strong>Do not change it back to 'Create React App'</strong>—Vite is faster and fully supported.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">1</div>
              <div>
                <h5 className="font-bold text-slate-800 mb-1 text-lg">Push to GitHub</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Upload your project files to a private GitHub repository. Vercel will auto-connect to this repo.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">2</div>
              <div>
                <h5 className="font-bold text-slate-800 mb-1 text-lg">Configure Env Variables</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">In Vercel Settings &gt; Environment Variables, add <code>API_KEY</code> with your Google AI Studio key.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">3</div>
              <div>
                <h5 className="font-bold text-slate-800 mb-1 text-lg">Vite Preset Deploy</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Select 'Vite' as the framework preset if prompted. Your <code>index.html</code> at the root serves as the entry point.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 relative shadow-2xl border border-slate-800">
            <div className="flex gap-1.5 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="font-mono text-[12px] text-slate-400 space-y-4">
              <div className="flex gap-2">
                <span className="text-indigo-400 font-bold">$</span>
                <p className="text-slate-300">git add .</p>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-400 font-bold">$</span>
                <p className="text-slate-300">git commit -m "Deploy to Vercel"</p>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-400 font-bold">$</span>
                <p className="text-slate-300">git push origin main</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800">
                <p className="text-emerald-400 flex items-center gap-2 italic">
                  <ArrowUpRight size={14} /> Auto-detecting Vite...
                </p>
                <p className="text-emerald-400/60 mt-1">Deployment Live 🚀</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-500 p-5 rounded-3xl shadow-xl shadow-emerald-200/50">
              <ShieldCheck className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VercelApiViewer;
