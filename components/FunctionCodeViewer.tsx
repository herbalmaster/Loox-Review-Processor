
import React from 'react';
import { FileText, Copy } from 'lucide-react';

const FUNCTION_CODE = `
import { GoogleGenAI, Type } from "@google/genai";

export const processReview = async (event, context) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. Extract from Email (HTML)
  const reviewData = await parseLooxEmail(event.data);
  
  // 2. Conditional Image Logic
  let imageUrl = reviewData.customerImage;
  
  if (!imageUrl) {
    const promptResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: "Create a detailed prompt for a square abstract background representing " + reviewData.productName
    });
    
    // Call Imagen 3 (Gemini 3 Pro Image)
    const imgGen = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: promptResponse.text
    });
    // Save to GCS...
  }
  
  // 3. Caption Generation
  const captionResponse = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: "Create a short 150-char Instagram caption for: " + reviewData.text
  });
  
  // 4. Send Approval Email
  await sendApprovalEmail(reviewData, captionResponse.text);
};
`;

const FunctionCodeViewer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-indigo-600" />
          <h3 className="font-bold text-slate-800">Function (index.ts)</h3>
        </div>
        <button className="p-2 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors">
          <Copy size={18} />
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-xs font-mono text-blue-400 leading-relaxed">
          {FUNCTION_CODE.trim()}
        </pre>
      </div>
    </div>
  );
};

export default FunctionCodeViewer;
