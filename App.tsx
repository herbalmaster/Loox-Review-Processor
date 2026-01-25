
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Settings, 
  Mail, 
  Image as ImageIcon, 
  History,
  AlertCircle,
  ChevronRight,
  Database,
  Cloud,
  PlayCircle,
  Workflow,
  Cpu
} from 'lucide-react';
import { LooxReview, SystemLog } from './types';
import ReviewCard from './components/ReviewCard';
import SimpleSetupViewer from './components/SimpleSetupViewer';
import VercelApiViewer from './components/VercelApiViewer';
import SenseCheckPanel from './components/SenseCheckPanel';
import Simulator from './components/Simulator';

const MOCK_REVIEWS: LooxReview[] = [
  {
    id: '1',
    productName: 'Eco-Friendly Yoga Mat',
    customerName: 'Sarah J.',
    rating: 5,
    reviewText: 'Absolutely love the texture and the fact that it is sustainable! Best purchase this year.',
    generatedImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1080',
    generatedCaption: 'Sustainability meets serenity. 🧘‍♀️ Sarah J. is loving her new Eco-Friendly Yoga Mat! "Best purchase this year." ✨ #EcoYoga #MindfulLiving',
    receivedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'PENDING_APPROVAL'
  },
  {
    id: '2',
    productName: 'Organic Sleep Mist',
    customerName: 'Michael R.',
    rating: 4,
    reviewText: 'Really helps me drift off, though the spray nozzle could be a bit finer.',
    customerImageUrl: 'https://images.unsplash.com/photo-1512429234300-1c98a96d36e2?auto=format&fit=crop&q=80&w=1080',
    generatedCaption: 'Sweet dreams are made of these... 🌙 Michael R. finds his peace with our Organic Sleep Mist. 💤 #SleepWell #NaturalWellness',
    receivedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'APPROVED'
  }
];

const MOCK_LOGS: SystemLog[] = [
  { id: 'l1', timestamp: new Date().toISOString(), level: 'INFO', message: 'Gemini generated caption for Review #124', service: 'Caption-Gen' },
  { id: 'l2', timestamp: new Date().toISOString(), level: 'INFO', message: 'Imagen 3 created abstract background for Review #124', service: 'Image-Gen' },
  { id: 'l3', timestamp: new Date().toISOString(), level: 'WARN', message: 'Retrying Gmail poll - token refresh required', service: 'Gmail-Poller' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'approvals' | 'setup' | 'simulator'>('dashboard');
  const [reviews] = useState<LooxReview[]>(MOCK_REVIEWS);

  const pendingCount = reviews.filter(r => r.status === 'PENDING_APPROVAL').length;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-900/50">
            <Workflow className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">LooxAuto</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <SidebarItem 
            active={activeTab === 'simulator'} 
            onClick={() => setActiveTab('simulator')} 
            icon={<PlayCircle size={20} />} 
            label="Live Simulator" 
            badge="New"
          />
          <SidebarItem 
            active={activeTab === 'approvals'} 
            onClick={() => setActiveTab('approvals')} 
            icon={<CheckCircle2 size={20} />} 
            label="Approvals" 
            count={pendingCount}
          />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Setup Guide</div>
          <SidebarItem 
            active={activeTab === 'setup'} 
            onClick={() => setActiveTab('setup')} 
            icon={<Settings size={20} />} 
            label="Push to Live" 
          />
        </nav>

        <div className="p-4 bg-slate-800 m-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 text-white mb-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-wider">Ready to Deploy</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">Fast deployment via Vercel + Make.com</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab === 'simulator' ? 'Pipeline Simulator' : activeTab === 'setup' ? 'Easy Deployment' : activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">System Status</span>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Optimized
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Processed Today" value="24" icon={<Mail className="text-blue-500" />} change="+12%" />
                <StatCard title="Auto-Generated" value="18" icon={<ImageIcon className="text-purple-500" />} change="+8%" />
                <StatCard title="Success Rate" value="99.2%" icon={<CheckCircle2 className="text-emerald-500" />} change="Stable" />
              </div>

              <SenseCheckPanel />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <History size={18} className="text-indigo-600" /> Recent Activity Logs
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {MOCK_LOGS.map(log => (
                      <div key={log.id} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.level === 'ERROR' ? 'bg-rose-500' : log.level === 'WARN' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <div className="flex-1">
                          <p className="text-sm text-slate-700 font-medium">{log.message}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{log.service}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-full">
                    <Cloud className="text-indigo-600 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">No Infrastructure Needed</h3>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                    We've simplified the pipeline. Use <strong>Vercel</strong> for this dashboard and <strong>Make.com</strong> for the automation logic.
                  </p>
                  <button onClick={() => setActiveTab('setup')} className="text-indigo-600 font-bold text-sm flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4">
                    View Simple Setup Guide <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && <Simulator />}

          {activeTab === 'approvals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-12">
              <SimpleSetupViewer />
              <VercelApiViewer />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ active, icon, label, onClick, count, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30' 
        : 'hover:bg-slate-800 text-slate-400'
    }`}
  >
    <div className="flex items-center gap-3 font-semibold text-sm tracking-tight">
      <span className={active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
        {icon}
      </span>
      {label}
    </div>
    {count !== undefined && count > 0 && (
      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${active ? 'bg-white text-indigo-600' : 'bg-slate-700 text-slate-300'}`}>
        {count}
      </span>
    )}
    {badge && (
      <span className="bg-emerald-500 text-[9px] text-white px-2 py-0.5 rounded-lg font-black uppercase tracking-widest animate-pulse">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, icon, change }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
      {icon}
    </div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-3">
      <h4 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">{value}</h4>
      <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
        {change}
      </span>
    </div>
  </div>
);

export default App;
