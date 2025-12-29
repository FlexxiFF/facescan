
import React from 'react';
import { SkinAnalysis } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface ResultProps {
  data: SkinAnalysis;
  onReset: () => void;
}

const MetricCard = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
    <div className="flex justify-between items-end mb-2">
      <span className="text-stone-500 font-medium text-sm">{label}</span>
      <span className="text-2xl font-bold text-stone-800">{value}%</span>
    </div>
    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000 ease-out" 
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export const AnalysisResult: React.FC<ResultProps> = ({ data, onReset }) => {
  const chartData = [
    { name: 'Hydration', value: data.hydratedLevel, color: '#60a5fa' },
    { name: 'Oiliness', value: data.oilinessLevel, color: '#fbbf24' },
    { name: 'Sensitivity', value: data.sensitivityLevel, color: '#f87171' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-stone-800 mb-2">Your Skin Analysis</h1>
          <p className="text-stone-500">Based on your recent scan</p>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors text-stone-600 font-medium"
        >
          Retake Scan
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 bg-stone-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">Core Skin Type</span>
            <h2 className="text-5xl font-playfair font-bold mb-4">{data.skinType}</h2>
            <p className="text-stone-300 leading-relaxed max-w-xl">{data.summary}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {data.concerns.map((concern, idx) => (
              <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                #{concern}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 flex flex-col gap-4">
          <h3 className="font-bold text-stone-800 mb-2">Vital Metrics</h3>
          <MetricCard label="Hydration" value={data.hydratedLevel} color="#fb7185" />
          <MetricCard label="Oil Balance" value={data.oilinessLevel} color="#fbbf24" />
          <MetricCard label="Sensitivity" value={data.sensitivityLevel} color="#f87171" />
        </div>
      </div>

      {/* Daily Routine */}
      <section className="mb-16">
        <h3 className="text-2xl font-playfair font-bold text-stone-800 mb-8 flex items-center gap-3">
          <div className="w-1 h-8 bg-rose-500 rounded-full" />
          Recommended Routine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Morning', 'Evening'].map(time => (
            <div key={time} className="glass rounded-3xl p-8 border border-stone-100">
              <div className="flex items-center gap-3 mb-6">
                <span className={`p-2 rounded-xl ${time === 'Morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  {time === 'Morning' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  )}
                </span>
                <h4 className="text-xl font-bold text-stone-800">{time} Routine</h4>
              </div>
              <div className="space-y-6">
                {data.routine.filter(r => r.time === time).map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-800">{step.action}</h5>
                      <p className="text-stone-500 text-sm mb-1">{step.description}</p>
                      <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">{step.productType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Products */}
      <section className="mb-16">
        <h3 className="text-2xl font-playfair font-bold text-stone-800 mb-8 flex items-center gap-3">
          <div className="w-1 h-8 bg-rose-500 rounded-full" />
          Product Archetypes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.products.map((prod, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.13l-2.062-.344a2 2 0 00-1.106.125l-1.446.723a2 2 0 00-1.103 2.403l.358 1.433a2 2 0 002.427 1.457l3.229-.615a2 2 0 001.583-1.576l.115-.575a2 2 0 011.21-1.47l.76-.304a2 2 0 011.887.154l1.385.801a2 2 0 002.342-.234l.496-.496a2 2 0 00.425-2.081l-.657-1.972z" /></svg>
              </div>
              <h4 className="font-bold text-stone-800 mb-2">{prod.category}</h4>
              <p className="text-sm text-stone-500 mb-4">{prod.why}</p>
              <div className="flex flex-wrap gap-2">
                {prod.ingredients.map((ing, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-1 bg-stone-100 text-stone-600 rounded-md uppercase">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Content */}
      <section>
        <h3 className="text-2xl font-playfair font-bold text-stone-800 mb-8 flex items-center gap-3">
          <div className="w-1 h-8 bg-rose-500 rounded-full" />
          Masterclasses for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.videos.map((video, idx) => (
            <a 
              key={idx} 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-stone-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="md:w-1/3 h-48 md:h-auto bg-stone-800 relative flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${video.title}/400/300`} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  alt="Thumbnail" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-125 transition-all">
                    <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">{video.channel}</span>
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-rose-300 transition-colors leading-tight">
                  {video.title}
                </h4>
                <p className="text-stone-400 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
