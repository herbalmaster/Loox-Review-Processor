
import React from 'react';
import { Layers, Server, Cloud, CheckCircle, AlertTriangle, Zap, ShoppingBag } from 'lucide-react';

const ArchitecturalOverview: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Layers size={300} />
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-black mb-6 tracking-tighter italic uppercase">The Decision <span className="text-indigo-400">Matrix</span></h2>
          <p className="text-indigo-100/80 text-lg font-medium leading-relaxed max-w-2xl">
            Choosing the right engine for your automation depends on your technical comfort level and the volume of reviews you process daily.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Option 1: n8n + Vercel */}
        <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm flex flex-col hover:shadow-xl transition-all border-t-[12px] border-t-indigo-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-50 p-4 rounded-[1.5rem]"><Server className="text-indigo-600" size={32} /></div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">The "Pro-Creator" Path</h3>
              <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">n8n (Hostinger) + Vercel Dashboard</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-1">
            <p className="text-slate-600 font-medium leading-relaxed">
              Best for small to medium e-commerce brands who already have Hostinger or a small VPS. It uses a "Low-Code" visual builder.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Pros</h4>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Visual "drag and drop" workflow building.</li>
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Low monthly cost (uses your existing Hostinger VPS).</li>
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Extremely easy to debug visually.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Cons</h4>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-600"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Limited by your VPS RAM/CPU.</li>
                <li className="flex gap-2 text-sm text-slate-600"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> You are responsible for the VPS staying online.</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100">
             <div className="flex items-center gap-3 text-indigo-600 font-black text-sm italic">
               <ShoppingBag size={18} /> Recommended for 1-50 reviews/day
             </div>
          </div>
        </div>

        {/* Option 2: Pure Google Cloud */}
        <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm flex flex-col hover:shadow-xl transition-all border-t-[12px] border-t-slate-900">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-[1.5rem]"><Cloud className="text-slate-900" size={32} /></div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">The "Enterprise" Path</h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Google Cloud Functions + Pub/Sub + Firestore</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-1">
            <p className="text-slate-600 font-medium leading-relaxed">
              Best for established stores with high volume. It is "Serverless"—meaning it only costs money when it runs, and can scale to millions.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Pros</h4>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Infinite scale. Handles thousands of reviews instantly.</li>
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Zero maintenance. Google manages the servers.</li>
                <li className="flex gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Industrial grade security (IAM).</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">Cons</h4>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-600"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Requires coding knowledge (Node.js/Python).</li>
                <li className="flex gap-2 text-sm text-slate-600"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Complex setup (IAM, Pub/Sub, Workflows).</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
             <div className="flex items-center gap-3 text-slate-900 font-black text-sm italic">
               <Zap size={18} fill="currentColor" /> Recommended for 50+ reviews/day
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturalOverview;
