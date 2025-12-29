
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Camera } from './components/Camera';
import { AnalysisResult } from './components/AnalysisResult';
import { AppState, SkinAnalysis } from './types';
import { analyzeSkinImage } from './geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<SkinAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartScan = () => {
    setState(AppState.SCANNING);
    setError(null);
  };

  const handleCapture = async (base64Image: string) => {
    setState(AppState.ANALYZING);
    try {
      const data = await analyzeSkinImage(base64Image);
      setResult(data);
      setState(AppState.RESULT);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze skin. Please try again.");
      setState(AppState.ERROR);
    }
  };

  return (
    <Layout>
      {state === AppState.IDLE && (
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-rose-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-blue-100/50 rounded-full blur-[100px]" />
          
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-semibold mb-8 animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Next-Gen Dermatology AI
            </div>
            
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-stone-900 mb-8 leading-[1.1] tracking-tight">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                Skin's Full Potential
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-stone-600 mb-12 leading-relaxed">
              Professional-grade skin analysis in seconds. Get personalized routines, product suggestions, and expert-led video tutorials tailored for you.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleStartScan}
                className="group relative px-10 py-5 bg-stone-900 text-white rounded-full text-lg font-bold shadow-2xl hover:shadow-rose-200/50 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative flex items-center gap-3">
                  Scan Your Face Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
              <button className="px-10 py-5 bg-white text-stone-800 border border-stone-200 rounded-full text-lg font-bold hover:bg-stone-50 transition-all">
                Learn More
              </button>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { title: 'AI Driven', desc: 'Powered by Gemini for unprecedented accuracy in identifying 20+ skin markers.' },
                { title: 'Personalized', desc: 'No two faces are alike. Get a routine designed specifically for your biochemistry.' },
                { title: 'Actionable', desc: 'We don\'t just analyze; we provide specific product types and expert tutorials.' }
              ].map((item, idx) => (
                <div key={idx} className="group p-8 glass rounded-3xl hover:bg-white transition-all border border-transparent hover:border-rose-100">
                  <h3 className="text-2xl font-playfair font-bold text-stone-900 mb-4">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {state === AppState.SCANNING && (
        <Camera 
          onCapture={handleCapture} 
          onCancel={() => setState(AppState.IDLE)} 
        />
      )}

      {state === AppState.ANALYZING && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <div className="w-24 h-24 relative mb-8">
            <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-3xl font-playfair font-bold text-stone-800 mb-2">Analyzing Your Skin</h2>
          <p className="text-stone-500 animate-pulse">Running dermatological AI models...</p>
        </div>
      )}

      {state === AppState.RESULT && result && (
        <AnalysisResult data={result} onReset={() => setState(AppState.IDLE)} />
      )}

      {state === AppState.ERROR && (
        <div className="max-w-md mx-auto mt-20 p-8 glass rounded-3xl text-center border-rose-200">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Something went wrong</h2>
          <p className="text-stone-500 mb-8">{error}</p>
          <button 
            onClick={() => setState(AppState.IDLE)}
            className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold"
          >
            Try Again
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
