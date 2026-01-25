
import React from 'react';
import { Triangle, Github, Globe, ShieldCheck, Terminal } from 'lucide-react';

const VercelApiViewer: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
      <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl shadow-xl shadow-slate-200">
            <Triangle size={24} className="text-white fill-current" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Host UI on Vercel</h3>
            <p className="text-sm text-slate-500 font-medium">Free, fast, and takes exactly 60 seconds.</p>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
          <Github size={18} /> Deploy with GitHub
        </button>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-5">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0">1</div>
            <div>
              <h5 className="font-bold text-slate-800 mb-1">Push to GitHub</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Create a private repository and upload these files. Vercel will automatically detect the React app.</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0">2</div>
            <div>
              <h5 className="font-bold text-slate-800 mb-1">Add API Key</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">In Vercel Settings &gt; Environment Variables, add <code>API_KEY</code> with your Google AI Studio key.</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0">3</div>
            <div>
              <h5 className="font-bold text-slate-800 mb-1">Go Live</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Vercel gives you a custom <code>.vercel.app</code> link instantly. Your personal dashboard is ready.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 relative shadow-2xl">
          <div className="flex gap-1.5 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="font-mono text-[11px] text-slate-400 space-y-3">
            <p className="text-emerald-400"># Install Vercel CLI</p>
            <p><span className="text-indigo-400">npm</span> install -g vercel</p>
            <p className="text-emerald-400 mt-6"># Deploy current directory</p>
            <p><span className="text-indigo-400">vercel</span> --prod</p>
            <p className="text-slate-500 mt-6">// Vercel will prompt for your project name.</p>
            <p className="text-slate-500">// Deployment finished! 🚀</p>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-emerald-500 p-4 rounded-2xl shadow-xl shadow-emerald-200">
            <ShieldCheck className="text-white" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VercelApiViewer;
