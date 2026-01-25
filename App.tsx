
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Mail, 
  History,
  Cloud,
  PlayCircle,
  Workflow,
  Cpu,
  Zap,
  Server,
  Layers,
  BookOpen,
  Share2,
  Triangle,
  Info
} from 'lucide-react';
import { LooxReview, SystemLog } from './types';
import ReviewCard from './components/ReviewCard';
import SimpleSetupViewer from './components/SimpleSetupViewer';
import GCPSetupViewer from './components/GCPSetupViewer';
import Simulator from './components/Simulator';
import DeploymentGuide from './components/DeploymentGuide';
import SocialConnect from './components/SocialConnect';
import ArchitecturalOverview from './components/ArchitecturalOverview';
import VercelDeploymentGuide from './components/VercelDeploymentGuide';

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
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'approvals' | 'gcp' | 'n8n' | 'simulator' | 'guide' | 'connect' | 'arch' | 'vercel'>('dashboard');
  const [reviews] = useState<LooxReview[]>(MOCK_REVIEWS);

  const pendingCount = reviews.filter(r => r.status === 'PENDING_APPROVAL').length;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-900">
        <div className="p-8 border-b border-slate-900 flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.4)]">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-black text-white text-xl tracking-tighter uppercase italic">LOOX<span className="text-indigo-500">GO</span></span>
        </div>
        
        <nav className="flex-1 p-5 space-y-1 mt-4">
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
            label="AI Pipeline Lab" 
          />
          <SidebarItem 
            active={activeTab === 'approvals'} 
            onClick={() => setActiveTab('approvals')} 
            icon={<CheckCircle2 size={20} />} 
            label="Approvals" 
            count={pendingCount}
          />
          
          <div className="pt-8 pb-2 px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
            <div className="h-px bg-slate-800 flex-1" />
            Infrastructure
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          <SidebarItem 
            active={activeTab === 'arch'} 
            onClick={() => setActiveTab('arch')} 
            icon={<Layers size={20} />} 
            label="Compare Paths" 
          />
          <SidebarItem 
            active={activeTab === 'vercel'} 
            onClick={() => setActiveTab('vercel')} 
            icon={<Triangle size={20} />} 
            label="Host on Vercel" 
          />
          <SidebarItem 
            active={activeTab === 'n8n'} 
            onClick={() => setActiveTab('n8n')} 
            icon={<Server size={20} />} 
            label="n8n (Hostinger)" 
          />
          <SidebarItem 
            active={activeTab === 'gcp'} 
            onClick={() => setActiveTab('gcp')} 
            icon={<Cloud size={20} />} 
            label="Google Cloud" 
          />
          <SidebarItem 
            active={activeTab === 'connect'} 
            onClick={() => setActiveTab('connect')} 
            icon={<Share2 size={20} />} 
            label="Social Connect" 
          />

          <div className="pt-6">
             <SidebarItem 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')} 
              icon={<BookOpen size={20} />} 
              label="The Master Guide" 
              primary
            />
          </div>
        </nav>

        <div className="p-6 bg-indigo-950/20 m-5 rounded-[2rem] border border-indigo-500/10">
          <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-[10px] uppercase tracking-widest">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Vercel Edge Ready
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/90 backdrop-blur-2xl border-b border-slate-200 px-10 py-6 flex justify-between items-center sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1 capitalize italic uppercase">
              {activeTab === 'arch' ? 'Strategic Choice' : activeTab === 'vercel' ? 'Deployment Blueprint' : activeTab === 'guide' ? 'Master Plan' : activeTab}
            </h1>
            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
               {activeTab === 'dashboard' ? 'Automating Loox for Success' : 'System Configuration Node'}
            </p>
          </div>
        </header>

        <div className="p-10 max-w-[1500px] mx-auto pb-40">
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard title="Automation Status" value="Active" icon={<Zap className="text-indigo-500" />} change="Live" />
                <StatCard title="Social Links" value="2" icon={<Share2 className="text-purple-500" />} change="Connected" />
                <StatCard title="Host" value="Vercel" icon={<Layers className="text-emerald-500" />} change="Stable" />
              </div>
              
              <div className="bg-slate-950 p-12 rounded-[3rem] shadow-2xl flex items-center justify-between group overflow-hidden relative">
                <div className="relative z-10 max-w-xl">
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tighter italic">START HERE: MASTER GUIDE</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                    Follow the explicit, step-by-step instructions to get your business automated in less than 30 minutes.
                  </p>
                  <button onClick={() => setActiveTab('guide')} className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                    Open Master Manual
                  </button>
                </div>
                <div className="opacity-10 group-hover:opacity-20 transition-opacity absolute right-10">
                  <BookOpen size={240} className="text-white" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'arch' && <ArchitecturalOverview />}
          {activeTab === 'vercel' && <VercelDeploymentGuide />}
          {activeTab === 'simulator' && <Simulator />}
          {activeTab === 'approvals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
          )}
          {activeTab === 'n8n' && <SimpleSetupViewer />}
          {activeTab === 'gcp' && <GCPSetupViewer />}
          {activeTab === 'guide' && <DeploymentGuide />}
          {activeTab === 'connect' && <SocialConnect />}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ active, icon, label, onClick, count, primary }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.25rem] transition-all duration-300 group ${
      active 
        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/50' 
        : primary 
          ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/20' 
          : 'hover:bg-slate-900 text-slate-500'
    }`}
  >
    <div className="flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.15em]">
      {icon}
      {label}
    </div>
    {count !== undefined && count > 0 && (
      <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${active ? 'bg-white text-indigo-600' : 'bg-slate-800 text-slate-400'}`}>
        {count}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, icon, change }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    </div>
    <div className="flex items-baseline gap-4">
      <h4 className="text-4xl font-black text-slate-950 tracking-tighter">{value}</h4>
      <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600">{change}</span>
    </div>
  </div>
);

export default App;
