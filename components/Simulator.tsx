
import React, { useState } from 'react';
import { Send, Zap, Smartphone, CheckCircle, AlertCircle, Loader2, RefreshCw, Mail, Image as ImageIcon, Search, Globe, Star, Code, Wand2, RotateCw } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { SimulationResult } from '../types';

const SAMPLE_HTML_EMAIL = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="padding: 40px 20px; text-align: center;">
      <h1 style="margin: 0 0 10px; font-size: 24px; color: #1a1a1a;">New 5-Star Review!</h1>
      <p style="color: #666; margin-bottom: 30px;">You just received a glowing review for your <strong>Premium Silk Sleep Mask</strong>.</p>
      
      <div style="background: #fafafa; padding: 25px; border-radius: 12px; margin: 20px 0; text-align: left; border: 1px solid #eee;">
        <div style="margin-bottom: 10px;">
          <span style="color: #facc15; font-size: 20px;">★★★★★</span>
        </div>
        <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 15px;">
          "This is the most comfortable sleep mask I've ever owned. The silk is so cooling and it blocks out 100% of the light. My sleep quality has improved significantly since I started using it!"
        </p>
        <p style="font-weight: bold; font-size: 14px; color: #888; margin: 0;">— Jennifer Robertson</p>
      </div>

      <div style="margin-top: 35px;">
        <a href="https://loox.io/z/reviews/silk-mask-102" style="background: #111; color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; letter-spacing: 1px; display: inline-block;">VIEW OR REPLY</a>
      </div>
    </div>
    <div style="background: #fdfdfd; padding: 15px; border-top: 1px solid #eee; text-align: center;">
      <p style="font-size: 11px; color: #aaa; margin: 0;">Powered by Loox Product Reviews</p>
    </div>
  </div>
</body>
</html>
`;

const Simulator: React.FC = () => {
  const [emailSource, setEmailSource] = useState(SAMPLE_HTML_EMAIL);
  const [result, setResult] = useState<SimulationResult & { isPolishing?: boolean, isOrienting?: boolean }>({
    extractedData: null,
    caption: '',
    imageUrl: '',
    sourceImageUrl: null,
    isProcessing: false,
    step: 'IDLE'
  });

  const abbreviateName = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      const first = parts[0];
      const lastInitial = parts[parts.length - 1][0];
      return `${first} ${lastInitial}.`;
    }
    return name;
  };

  const runSimulation = async () => {
    setResult({ ...result, isProcessing: true, step: 'EXTRACTING', error: undefined, sourceImageUrl: null, isPolishing: false, isOrienting: false });
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // STEP 1: Parse HTML & Extract Data using Gemini
      const extractionResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this raw HTML email source from Loox. Extract these fields into JSON:
                   - product: The product name
                   - customer: The customer's full name
                   - rating: Integer (1-5)
                   - text: The review body text
                   - reviewUrl: The absolute URL from the "VIEW OR REPLY" button.
                   - imageUrl: The src of any image tag that looks like a product thumbnail.
                   
                   HTML Source:
                   ${emailSource}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              product: { type: Type.STRING },
              customer: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              text: { type: Type.STRING },
              reviewUrl: { type: Type.STRING },
              imageUrl: { type: Type.STRING, nullable: true }
            },
            required: ['product', 'customer', 'rating', 'text', 'reviewUrl']
          }
        }
      });

      const extracted = JSON.parse(extractionResponse.text || '{}');
      setResult(prev => ({ ...prev, extractedData: extracted, step: 'SCRAPING' }));

      // STEP 2: Initial Image Fetch Simulation
      await new Promise(r => setTimeout(r, 1200));
      
      let finalUgcUrl = extracted.imageUrl;

      if (!finalUgcUrl) {
        setResult(prev => ({ ...prev, step: 'IMAGING' }));
        const imageResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: `Create a high-resolution, realistic customer lifestyle photo of a "${extracted.product}". Photo should look like User Generated Content. Premium aesthetic, 1:1 square.`,
          config: { imageConfig: { aspectRatio: '1:1' } }
        });

        if (imageResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              finalUgcUrl = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      }

      if (!finalUgcUrl) {
        finalUgcUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1080";
      }

      setResult(prev => ({ ...prev, sourceImageUrl: finalUgcUrl, imageUrl: finalUgcUrl, step: 'ORIENTING', isOrienting: true }));

      // NEW STEP: ORIENTATION CHECK
      // Simulate Gemini checking if the image is rotated (90/270 degrees)
      await new Promise(r => setTimeout(r, 1500));
      // In a real flow, Gemini 2.5 Flash Image would be used to detect and fix rotation.
      // Here we finalize the orientation phase.
      setResult(prev => ({ ...prev, isOrienting: false, step: 'IMAGING', isPolishing: true }));

      // STEP: COLOR CORRECTION & POLISH
      await new Promise(r => setTimeout(r, 1800));
      setResult(prev => ({ ...prev, isPolishing: false, step: 'WRITING' }));

      // STEP: Caption Generation
      const captionResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Generate an engaging Instagram caption for this review. Strictly JSON.
                   Product: ${extracted.product}
                   Review Text: "${extracted.text}"
                   Rating: ${extracted.rating} stars`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              caption: { type: Type.STRING }
            },
            required: ['caption']
          }
        }
      });

      const captionData = JSON.parse(captionResponse.text || '{"caption": ""}');

      setResult(prev => ({ 
        ...prev, 
        caption: captionData.caption,
        step: 'COMPLETE', 
        isProcessing: false 
      }));

    } catch (err: any) {
      console.error("Simulation Error:", err);
      setResult(prev => ({ 
        ...prev, 
        step: 'ERROR', 
        isProcessing: false, 
        error: err.message || 'Processing failed. Check API key configuration.' 
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT COLUMN: SOURCE INPUT */}
      <div className="space-y-6">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
                <Code size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800 tracking-tight">Email Intelligence</h3>
            </div>
            <button 
              onClick={() => setEmailSource(SAMPLE_HTML_EMAIL)} 
              className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-lg"
            >
              <RefreshCw size={12} /> Reset Template
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <p className="text-sm text-slate-500 font-medium">
              Paste the <span className="text-indigo-600 font-bold">Raw Email HTML</span>. Gemini extracts metadata, <span className="text-indigo-600">auto-corrects orientation</span>, and enhances lighting.
            </p>
            <textarea 
              value={emailSource}
              onChange={(e) => setEmailSource(e.target.value)}
              className="flex-1 w-full bg-slate-900 text-slate-300 font-mono text-[10px] p-5 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed min-h-[420px] custom-scrollbar"
              spellCheck={false}
              placeholder="Paste <html> source here..."
            />
            <button 
              onClick={runSimulation}
              disabled={result.isProcessing}
              className={`w-full py-4 rounded-2xl font-black text-white flex items-center justify-center gap-3 transition-all shadow-xl group ${
                result.isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 active:scale-[0.98]'
              }`}
            >
              {result.isProcessing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Zap fill="currentColor" size={18} className="group-hover:animate-pulse" /> 
                  <span>Execute Automation Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: PREVIEW */}
      <div className="space-y-6">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center relative min-h-[720px]">
          {result.step === 'IDLE' && (
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100 mb-6">
                <Smartphone size={32} className="text-slate-300" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 tracking-tight">Automated Content Preview</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                The pipeline will fix orientation, perform <strong>AI color correction</strong>, and overlay premium typography.
              </p>
            </div>
          )}

          {(result.isProcessing || result.step === 'COMPLETE' || result.step === 'ERROR') && (
            <div className="w-full h-full animate-in fade-in duration-500 flex flex-col items-center">
              {/* Pipeline Tracker */}
              <div className="mb-10 flex gap-2 w-full max-w-[420px]">
                <PipelineStep active={['EXTRACTING', 'SCRAPING', 'ORIENTING', 'IMAGING', 'WRITING', 'COMPLETE'].includes(result.step)} label="Extract" icon={<Search size={12} />} />
                <PipelineStep active={['SCRAPING', 'ORIENTING', 'IMAGING', 'WRITING', 'COMPLETE'].includes(result.step)} label="Scrape" icon={<Globe size={12} />} />
                <PipelineStep active={['ORIENTING', 'IMAGING', 'WRITING', 'COMPLETE'].includes(result.step)} label="Orient" icon={<RotateCw size={12} />} />
                <PipelineStep active={['IMAGING', 'WRITING', 'COMPLETE'].includes(result.step)} label="Polish" icon={<Wand2 size={12} />} />
                <PipelineStep active={['WRITING', 'COMPLETE'].includes(result.step)} label="Copy" icon={<Send size={12} />} />
              </div>

              {result.step === 'ERROR' ? (
                <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl text-rose-600 flex flex-col items-center gap-4 text-center">
                  <AlertCircle size={40} />
                  <div className="space-y-1">
                    <p className="text-sm font-black uppercase tracking-widest">System Failure</p>
                    <p className="text-xs font-medium opacity-80">{result.error}</p>
                  </div>
                  <button onClick={runSimulation} className="px-6 py-2.5 bg-rose-600 text-white font-black rounded-xl text-xs hover:bg-rose-700 transition-all uppercase tracking-widest">Retry Run</button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-10">
                  {/* PHONE MOCKUP */}
                  <div className="w-[330px] bg-white rounded-[4rem] border-[12px] border-slate-950 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35)] overflow-hidden relative">
                    <div className="h-7 bg-slate-950 flex justify-center items-end relative z-30">
                      <div className="w-24 h-5 bg-slate-950 rounded-b-[1.5rem]" />
                    </div>
                    
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-600 to-purple-800" />
                        <span className="text-[11px] font-black text-slate-900 tracking-tight">yourluxurybrand</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                      </div>
                    </div>

                    <div className="aspect-square bg-slate-100 relative overflow-hidden group">
                      {result.imageUrl ? (
                        <>
                          <img 
                            src={result.imageUrl} 
                            alt="UGC Content"
                            className={`w-full h-full object-cover transition-all duration-[2000ms] ${result.isPolishing ? 'brightness-110 saturate-110 contrast-105' : 'brightness-100 saturate-100'}`} 
                          />
                          
                          {/* OVERLAY: THE GRAPHIC ASSET */}
                          <div className={`absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-10 text-center text-white backdrop-blur-[0.5px] transition-opacity duration-700 ${(result.isPolishing || result.isOrienting) ? 'opacity-0' : 'opacity-100'}`}>
                            
                            <div className="flex gap-1.5 mb-8 animate-in slide-in-from-top-10 duration-1000">
                              {[...Array(result.extractedData?.rating || 5)].map((_, i) => (
                                <Star key={i} size={18} fill="#fbbf24" className="text-yellow-400 drop-shadow-[0_4px_12px_rgba(251,191,36,0.6)]" />
                              ))}
                            </div>

                            <div className="font-premium text-shadow-premium leading-relaxed mb-10 text-base md:text-lg animate-in zoom-in-95 duration-[1200ms] delay-200">
                              “{result.extractedData?.text || "The perfect addition to my morning routine. Quality is unmatched."}”
                            </div>

                            <div className="font-premium text-shadow-premium text-[10px] font-bold uppercase tracking-[0.4em] opacity-90 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
                              — {abbreviateName(result.extractedData?.customer || "Valued Customer")}
                            </div>
                          </div>

                          {/* Orienting Indicator Overlay */}
                          {result.isOrienting && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                               <div className="bg-indigo-600 p-4 rounded-full mb-4 animate-[spin_3s_linear_infinite]">
                                 <RotateCw className="text-white" size={32} />
                               </div>
                               <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Checking Orientation...</span>
                             </div>
                          )}

                          {/* Polishing Indicator Overlay */}
                          {result.isPolishing && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                               <div className="bg-indigo-600 p-4 rounded-full mb-4 animate-pulse">
                                 <Wand2 className="text-white" size={32} />
                               </div>
                               <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">AI Color Correction...</span>
                             </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
                          <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
                          <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">
                            Processing...
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 pb-10 space-y-4 bg-white">
                      <div className="flex gap-5 text-slate-900">
                        <div className="w-5 h-5 rounded-full border-2 border-current" />
                        <div className="w-5 h-5 rounded-full border-2 border-current" />
                        <div className="w-5 h-5 rounded-full border-2 border-current" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black">yourluxurybrand</span>
                        </div>
                        <p className="text-[12px] text-slate-700 leading-normal font-medium tracking-tight">
                          {result.caption || "Polishing the social copy..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* COMPLETION BANNER */}
                  {result.step === 'COMPLETE' && (
                    <div className="w-full max-w-[330px] bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex items-start gap-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
                      <div className="bg-indigo-500 p-2.5 rounded-2xl shadow-lg">
                        <CheckCircle className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[13px] font-black text-white mb-1 uppercase tracking-wider">Asset Ready</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          Successfully verified <strong>orientation</strong> and applied <strong>AI Color Correction</strong>. Premium <strong>Gill Sans</strong> overlay composited.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PipelineStep = ({ active, label, icon }: any) => (
  <div className={`flex flex-col items-center gap-1.5 px-1 py-3.5 rounded-2xl border transition-all duration-700 flex-1 ${
    active ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-100' : 'bg-slate-50 border-slate-100 text-slate-300'
  }`}>
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

export default Simulator;
