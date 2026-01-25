
import React from 'react';
import { Share2, Mail, Cpu, Database, Zap, ArrowRight } from 'lucide-react';

const SimpleSetupViewer: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-indigo-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Zap size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-4 tracking-tight">The "No-Code" Power Move</h2>
          <p className="text-indigo-100 text-lg font-medium leading-relaxed mb-8">
            Forget complex server clusters. Use <strong>Make.com</strong> to build your visual automation in minutes. It handles the Gmail watching, Gemini calls, and database syncing with zero code.
          </p>
          <div className="flex gap-4">
            <a href="https://make.com" target="_blank" className="bg-white text-indigo-900 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-2">
              Start Free on Make <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard 
          number="01" 
          title="Watch Gmail" 
          icon={<Mail className="text-indigo-600" />}
          desc="Add a 'Watch Emails' module in Make. Filter for 'noreply@loox.io'. Make will wake up every time a review arrives."
        />
        <StepCard 
          number="02" 
          title="Call Gemini" 
          icon={<Cpu className="text-purple-600" />}
          desc="Use the 'HTTP' module to send the email text to Gemini. Ask it to extract data, fix orientation, and write the caption."
        />
        <StepCard 
          number="03" 
          title="Save to Sheets" 
          icon={<Database className="text-emerald-600" />}
          desc="Connect a Google Sheet. Every new review gets a row. This dashboard then reads that sheet to show you approvals."
        />
      </div>
    </div>
  );
};

const StepCard = ({ number, title, icon, desc }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <span className="text-4xl font-black text-slate-100 tabular-nums">{number}</span>
    </div>
    <h4 className="text-xl font-bold text-slate-800 mb-3">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default SimpleSetupViewer;
