
import React from 'react';
import { Star, MessageSquare, User, Package, Check, X, Share2 } from 'lucide-react';
import { LooxReview } from '../types';

interface ReviewCardProps {
  review: LooxReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
      {/* Header Info */}
      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <Package size={14} className="text-indigo-600" />
          </div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide truncate max-w-[150px]">
            {review.productName}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < review.rating ? "#eab308" : "none"} className={i < review.rating ? "text-yellow-500" : "text-slate-300"} />
          ))}
        </div>
      </div>

      {/* Visual Content */}
      <div className="aspect-square relative overflow-hidden bg-slate-200">
        <img 
          src={review.customerImageUrl || review.generatedImageUrl} 
          alt="Review Visual"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!review.customerImageUrl && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm">
            <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 uppercase">
              <Share2 size={10} /> AI Abstract
            </span>
          </div>
        )}
      </div>

      {/* Caption & Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <User size={16} className="text-slate-400" />
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 flex-1 relative">
             <div className="absolute -left-1.5 top-3 w-3 h-3 bg-slate-50 rotate-45" />
             <p className="text-[13px] text-slate-600 leading-relaxed italic">
               "{review.reviewText}"
             </p>
             <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">— {review.customerName}</p>
          </div>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={14} className="text-indigo-600" />
            <span className="text-[11px] font-bold text-indigo-700 uppercase">Generated Caption</span>
          </div>
          <p className="text-[13px] text-slate-800 font-medium">
            {review.generatedCaption}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex gap-3 mt-auto">
        <button className="flex-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
          <X size={16} /> Reject
        </button>
        <button className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-100 transition-all">
          <Check size={16} /> Approve & Post
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
