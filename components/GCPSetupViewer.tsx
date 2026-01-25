
import React from 'react';
import { Cloud, Zap, Cpu, Mail, Terminal, ShieldCheck, List, Code, Settings, Copy } from 'lucide-react';

const GCPSetupViewer: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Cloud size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">Google Cloud <br/><span className="text-indigo-400">Enterprise Core Code</span></h2>
          <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10">
            Full source code for your Cloud Function. This handles Gmail processing and Gemini execution.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-xl">
                <Code size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">Cloud Function (index.js)</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">Runtime: Node.js 20</span>
          </div>
          <div className="bg-slate-950 p-8 relative group">
             <button className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
              <Copy size={16} />
            </button>
            <pre className="text-xs font-mono text-blue-400 overflow-x-auto leading-loose">
{`const { GoogleGenAI } = require("@google/genai");
const functions = require("@google-cloud/functions-framework");

functions.cloudEvent("processReview", async (cloudEvent) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. Get Email Data from Pub/Sub
  const base64Email = cloudEvent.data.message.data;
  const emailContent = Buffer.from(base64Email, "base64").toString();

  // 2. Call Gemini for Extraction & Caption
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: \`Analyze this Loox email: \${emailContent}. 
               Extract: product, rating, text. 
               Generate: high-engagement Instagram caption.\`,
    config: { responseMimeType: "application/json" }
  });

  const result = JSON.parse(response.text);

  // 3. Store in Firestore (Admin Dashboard reads this)
  const db = require("@google-cloud/firestore").Firestore();
  await db.collection("reviews").add({
    ...result,
    status: "PENDING_APPROVAL",
    createdAt: new Date().toISOString()
  });
});`}
            </pre>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] flex items-start gap-6">
          <div className="bg-amber-400 p-3 rounded-2xl shadow-lg">
            <Terminal size={24} className="text-white" />
          </div>
          <div>
            <h4 className="text-xl font-black text-amber-900 mb-2">How to Deploy</h4>
            <div className="text-sm text-amber-800/80 font-medium space-y-2">
              <p>1. Open Google Cloud Shell (terminal icon in GCP Console).</p>
              <p>2. Create a folder: <code className="bg-amber-100 px-1 rounded">mkdir review-bot && cd review-bot</code></p>
              <p>3. Create index.js and paste the code above.</p>
              <p>4. Deploy: <code className="bg-amber-100 px-1 rounded">gcloud functions deploy processReview --trigger-topic reviews --runtime nodejs20</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCPSetupViewer;
