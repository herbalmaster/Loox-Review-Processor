
import React from 'react';
import { Mail, Cpu, Database, Zap, Server, Settings, CheckCircle, Globe, List, Code, Webhook, Copy, Instagram, Wind } from 'lucide-react';

const SimpleSetupViewer: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/50">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Server size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">n8n (Hostinger) <br/><span className="text-indigo-400">Deep Integration Guide</span></h2>
          <p className="text-indigo-100/80 text-lg font-medium leading-relaxed mb-10 max-w-2xl">
            Technical specifications for your n8n nodes. Copy these settings directly into your Hostinger instance.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-slate-900 p-2 rounded-xl text-white">
            <Code size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Final Stage: Posting Nodes</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instagram Node */}
          <TechnicalNode 
            title="Instagram Graph API Node"
            description="Add this after your approval webhook to post the final review image."
            icon={<Instagram size={20} className="text-pink-500" />}
            language="json"
            code={`// Instagram Node Config
{
  "Resource": "Media",
  "Operation": "Upload",
  "Media Type": "Image",
  "Image URL": "{{ $node["Upload"].json["url"] }}",
  "Caption": "{{ $node["Gemini"].json["caption"] }}",
  "Instagram Business Account ID": "YOUR_ID"
}`}
          />

          {/* Pinterest Node */}
          <TechnicalNode 
            title="Pinterest Node"
            description="Automatically create a pin for the new review on your product board."
            icon={<Wind size={20} className="text-rose-500" />}
            language="json"
            code={`// Pinterest Node Config
{
  "Resource": "Pin",
  "Operation": "Create",
  "Board": "Customer Reviews",
  "Media URL": "{{ $node["Upload"].json["url"] }}",
  "Description": "{{ $node["Gemini"].json["caption"] }}",
  "Link": "{{ $node["Code"].json["reviewUrl"] }}"
}`}
          />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Extraction Node */}
          <TechnicalNode 
            title="Extraction Logic (Code Node)"
            description="Extracts specific fields from the Loox Email HTML."
            language="javascript"
            code={`// n8n Javascript Node
const html = items[0].json.textHtml;

// Regex to find product, rating, and customer
const productMatch = html.match(/review for your <strong>(.*?)<\\/strong>/);
const ratingMatch = html.match(/([1-5])-Star Review/);
const customerMatch = html.match(/— (.*?)</);
const linkMatch = html.match(/href="(https:\\/\\/loox\\.io\\/z\\/reviews\\/.*?)"/);

return [{
  json: {
    product: productMatch ? productMatch[1] : "Unknown Product",
    rating: ratingMatch ? parseInt(ratingMatch[1]) : 5,
    customer: customerMatch ? customerMatch[1] : "Valued Customer",
    reviewUrl: linkMatch ? linkMatch[1] : "",
    emailBody: items[0].json.textPlain
  }
}];`}
          />
        </div>
      </div>
    </div>
  );
};

const TechnicalNode = ({ title, description, icon, language, code }: any) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
      <div>
        <h4 className="text-xl font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 font-medium">{description}</p>
      </div>
      {icon && <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">{icon}</div>}
    </div>
    <div className="bg-slate-950 p-6 relative group flex-1">
      <button className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
        <Copy size={16} />
      </button>
      <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export default SimpleSetupViewer;
