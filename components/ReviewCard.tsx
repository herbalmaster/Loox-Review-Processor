
import React, { useState } from 'react';
import { Star, MessageSquare, User, Package, Check, X, Share2, ExternalLink, Loader2, Instagram, Wind } from 'lucide-react';
import { LooxReview } from '../types';

interface ReviewCardProps {
  review: LooxReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isActing, setIsActing] = useState<boolean>(false);

  const handleAction = () => {
    setIsActing(true);
    // Simulation: would normally ping n8n/GCP webhook
    setTimeout(() => setIsActing(false), 2000);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-2xl hover:shadow-slate-200/50 relative">
      {/* Header Info */}
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <Package size={16} className="text-indigo-600" />
          </div>
          <span className="text-xs font-black text-slate-700 uppercase tracking-[0.1em] truncate max-w-[150px]">
            {review.productName}
          </span>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
             <Instagram size={14} className="text-pink-600" />
             <Wind size={14} className="text-rose-600" />
           </div>
           <div className="w-px h-4 bg-slate-200 mx-1" />
           <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < review.rating ? "#f59e0b" : "none"} className={i < review.rating ? "text-amber-500" : "text-slate-300"} />
            ))}
          </div>
        </div>
      </div>

      {/* Visual Content */}
      <div className="aspect-square relative overflow-hidden bg-slate-900">
        <img 
          src={review.customerImageUrl || review.generatedImageUrl} 
          alt="Review Visual"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
        />
        {!review.customerImageUrl && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-2xl border border-white">
            <span className="text-[10px] font-black text-indigo-600 flex items-center gap-2 uppercase tracking-widest">
              <Share2 size={12} /> AI Abstract
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
           <button className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
             View Source <ExternalLink size={12} />
           </button>
        </div>
      </div>

      {/* Caption & Content */}
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-inner">
            <User size={18} className="text-slate-400" />
          </div>
          <div className="bg-slate-50 rounded-[1.5rem] p-4 flex-1 relative border border-slate-100">
             <div className="absolute -left-1.5 top-4 w-3 h-3 bg-slate-50 border-l border-t border-slate-100 rotate-[-45deg]" />
             <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">
               "{review.reviewText}"
             </p>
             <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">— {review.customerName}</p>
          </div>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-[1.5rem] p-5 shadow-inner">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <MessageSquare size={14} className="text-white" />
            </div>
            <span className="text-[11px] font-black text-indigo-900 uppercase tracking-widest">Optimized Caption</span>
          </div>
          <p className="text-[13px] text-slate-800 font-bold leading-relaxed">
            {review.generatedCaption}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 bg-slate-50/80 border-t border-slate-100 flex gap-4 mt-auto">
        <button 
          onClick={handleAction}
          disabled={isActing}
          className="flex-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <X size={14} /> Reject
        </button>
        <button 
          onClick={handleAction}
          disabled={isActing}
          className="flex-[1.5] bg-slate-950 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
        >
          {isActing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Check size={16} /> Approve & Post
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
