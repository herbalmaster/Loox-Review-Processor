
import React from 'react';
import { Share2, Instagram, Wind, ExternalLink, ShieldCheck, Zap, List, Key } from 'lucide-react';

const SocialConnect: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Share2 size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight italic uppercase">Social <span className="text-indigo-400">Bridge</span></h2>
          <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10">
            To fully automate your workflow, your backend (n8n or GCP) must be authorized to post to your social channels. 
            Connect your APIs here to bridge the gap between approval and publishing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ConnectionPlatform 
          name="Instagram (Business)"
          icon={<Instagram className="text-pink-600" />}
          status="Setup Required"
          desc="Requires an Instagram Business account linked to a Facebook Page."
          steps={[
            "Create App in developers.facebook.com",
            "Add 'Instagram Graph API' product",
            "Generate a 'System User' Long-Lived Token",
            "Set Webhook URL to your n8n/GCP endpoint"
          ]}
        />
        <ConnectionPlatform 
          name="Pinterest"
          icon={<Wind className="text-rose-600" />}
          status="Setup Required"
          desc="Automate pinning customer reviews to your product boards."
          steps={[
            "Create App in developers.pinterest.com",
            "Get Client ID and App Secret",
            "Authorize 'boards:read' and 'pins:write'",
            "Copy Redirect URI into Pinterest App settings"
          ]}
        />
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200">
        <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Key className="text-indigo-600" /> Connecting the Webhook
        </h4>
        <div className="bg-slate-950 p-6 rounded-3xl mb-8">
          <p className="text-emerald-400 font-mono text-sm"># POST Request to trigger your Social Poster</p>
          <pre className="text-slate-400 text-xs mt-2 font-mono leading-relaxed">
{`POST /hooks/social-poster
{
  "platform": "instagram",
  "image_url": "https://storage.googleapis.com/.../asset.jpg",
  "caption": "Absolutely loving this! ✨",
  "auth_key": "YOUR_INTERNAL_SECRET"
}`}
          </pre>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-white p-2.5 rounded-xl shadow-sm"><ShieldCheck className="text-emerald-500" /></div>
            <p className="text-sm font-medium text-slate-600">
              <strong>Secure Posting:</strong> Ensure your backend webhook checks for a "Secret Key" header. Only this Dashboard and your n8n workflow should be able to trigger posts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectionPlatform = ({ name, icon, status, desc, steps }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col group hover:shadow-xl transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-indigo-50 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full">{status}</span>
    </div>
    <h4 className="text-xl font-bold text-slate-800 mb-2">{name}</h4>
    <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">{desc}</p>
    
    <div className="space-y-3 mt-auto">
      {steps.map((step: string, i: number) => (
        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          {step}
        </div>
      ))}
    </div>
    
    <button className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
      Open Developer Console <ExternalLink size={14} />
    </button>
  </div>
);

export default SocialConnect;
