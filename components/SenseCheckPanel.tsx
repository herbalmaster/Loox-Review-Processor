
import React from 'react';
import { Lightbulb, CheckCircle, Zap } from 'lucide-react';

const SenseCheckPanel: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-amber-400 p-2 rounded-lg">
          <Lightbulb className="text-white w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-amber-900 underline decoration-amber-300 underline-offset-4">Simplification & Improvement Review</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <Zap size={16} /> Suggested Optimizations
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-amber-900/80">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>Prioritize Email Body:</strong> Loox emails often contain the full review text and rating. Skip URL fetching to avoid Cloudflare bot-protection issues.</span>
            </li>
            <li className="flex gap-3 text-sm text-amber-900/80">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>Linearize Workflow:</strong> For a small business, Cloud Workflows might be overkill. A single Cloud Function triggered by Pub/Sub is easier to maintain.</span>
            </li>
            <li className="flex gap-3 text-sm text-amber-900/80">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>State Management:</strong> Use Firestore to track review status rather than just stateless webhooks. It allows for this Dashboard view!</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <Zap size={16} /> Architectural Gains
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-amber-900/80">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>Abstract over Literal:</strong> Gemini generates better *abstract* artistic backgrounds than trying to recreate specific SKU products without fine-tuning.</span>
            </li>
            <li className="flex gap-3 text-sm text-amber-900/80">
              <CheckCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>Unified Billing:</strong> By using Vertex AI and GCS, all costs are centralized on one GCP project, optimized for Free Tier limits.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SenseCheckPanel;
