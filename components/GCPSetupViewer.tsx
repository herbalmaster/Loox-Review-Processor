
import React from 'react';
import { Cloud, Zap, Cpu, Mail, Terminal, ShieldCheck, List, Code, Settings, Copy, FileCode, FileText } from 'lucide-react';
import TerraformViewer from './TerraformViewer';
import FunctionCodeViewer from './FunctionCodeViewer';
import SenseCheckPanel from './SenseCheckPanel';

const GCPSetupViewer: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Cloud size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight uppercase italic">Google Cloud <br/><span className="text-indigo-400">Enterprise Core</span></h2>
          <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10">
            The professional, serverless approach. Use these configurations to build a high-scale processing pipeline on Google Cloud Platform.
          </p>
        </div>
      </div>

      <SenseCheckPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-slate-900 p-2 rounded-xl text-white">
              <FileCode size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Infrastructure (Terraform)</h3>
          </div>
          <TerraformViewer />
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-slate-900 p-2 rounded-xl text-white">
              <FileText size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Application Logic (Node.js)</h3>
          </div>
          <FunctionCodeViewer />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-slate-900 p-2 rounded-xl text-white">
            <Terminal size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Deployment Commands</h3>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-10 rounded-[2.5rem] flex items-start gap-8 shadow-sm">
          <div className="bg-amber-400 p-4 rounded-2xl shadow-lg shrink-0">
            <Terminal size={32} className="text-white" />
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black text-amber-900">Step-by-Step Deployment</h4>
            <div className="text-sm text-amber-800 font-medium space-y-4 leading-relaxed">
              <p>1. <strong>Open Console:</strong> Access the <a href="https://console.cloud.google.com" className="underline font-bold" target="_blank">Google Cloud Console</a> and open the Cloud Shell.</p>
              <p>2. <strong>Setup Project:</strong> Set your project ID: <code className="bg-amber-100 px-2 py-0.5 rounded border border-amber-200">gcloud config set project [YOUR_PROJECT_ID]</code></p>
              <p>3. <strong>Enable Services:</strong> Enable Pub/Sub and Functions: <code className="bg-amber-100 px-2 py-0.5 rounded border border-amber-200">gcloud services enable pubsub.googleapis.com cloudfunctions.googleapis.com</code></p>
              <p>4. <strong>Deploy Topic:</strong> Create the entry point: <code className="bg-amber-100 px-2 py-0.5 rounded border border-amber-200">gcloud pubsub topics create review-extracted-topic</code></p>
              <p>5. <strong>Deploy Function:</strong> Upload your code: <code className="bg-amber-100 px-2 py-0.5 rounded border border-amber-200">gcloud functions deploy processReview --trigger-topic review-extracted-topic --runtime nodejs20</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCPSetupViewer;
