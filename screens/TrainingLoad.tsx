
import React from 'react';

const TrainingLoad: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
      <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Live Analysis</span>
              </div>
              <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">Performance Status: <span className="text-primary">Optimal</span></h1>
              <p className="text-[#9cbaab] text-lg font-light mt-2">Your Acute:Chronic Workload Ratio is <span className="text-white font-medium">1.1</span>. You are in the safe zone with high readiness.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex h-9 items-center px-4 rounded-full bg-primary text-background-dark text-sm font-bold shadow-md shadow-primary/10">Last 28 Days</button>
              <button className="flex h-9 items-center px-4 rounded-full bg-[#283930] text-[#9cbaab] hover:text-white hover:bg-[#344a3e] transition-colors text-sm font-medium">Last Season</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card-dark rounded-2xl border border-[#283930] p-6 lg:p-8 flex flex-col shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div><h3 className="text-white text-xl font-bold">ACWR Trend</h3><p className="text-[#9cbaab] text-sm">Acute (7d) vs Chronic (28d) Ratio</p></div>
              </div>
              <div className="relative w-full h-[320px] bg-[#111814] rounded-lg border border-[#283930] overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none z-0 opacity-20">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-[#9cbaab]"></div>)}
                </div>
                <div className="absolute inset-0 pointer-events-none flex flex-col">
                  <div className="h-[25%] bg-red-500/5 border-b border-red-500/10 w-full relative"></div>
                  <div className="h-[15%] bg-yellow-500/5 border-b border-yellow-500/10 w-full relative"></div>
                  <div className="h-[40%] bg-primary/5 border-b border-primary/10 w-full relative"><span className="absolute right-2 top-2 text-[10px] text-primary font-mono">OPTIMAL ZONE</span></div>
                  <div className="h-[20%] bg-blue-500/5 w-full relative"></div>
                </div>
                <svg className="absolute inset-0 w-full h-full p-6 z-10" preserveAspectRatio="none" viewBox="0 0 800 250">
                  <defs>
                    <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#19f085" stopOpacity="0.5"></stop>
                      <stop offset="100%" stopColor="#19f085" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,180 Q100,160 200,130 T400,100 T600,110 T800,90 V250 H0 Z" fill="url(#lineGradient)" style={{mixBlendMode: "overlay"}}></path>
                  <path className="drop-shadow-[0_0_10px_rgba(25,240,133,0.5)]" d="M0,180 Q100,160 200,130 T400,100 T600,110 T800,90" fill="none" stroke="#19f085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-card-dark rounded-2xl border border-[#283930] p-6 flex flex-col shadow-xl flex-1 justify-center relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-white text-lg font-bold">Acute Load</h3>
                <p className="text-[#9cbaab] text-xs mb-4">Last 7 Days Average</p>
                <div className="flex items-center gap-6">
                  <div className="relative size-24 shrink-0">
                    <svg className="size-full rotate-[-90deg]" viewBox="0 0 36 36">
                      <path className="text-[#283930]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="4"></path>
                      <path className="text-primary drop-shadow-[0_0_8px_rgba(25,240,133,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeWidth="4"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col"><span className="text-xl font-bold text-white">850</span><span className="text-[9px] text-[#9cbaab]">AU</span></div>
                  </div>
                  <div className="flex flex-col gap-1"><div className="flex items-center gap-1 text-primary"><span className="material-symbols-outlined text-sm">trending_up</span><span className="text-sm font-bold">+12%</span></div><p className="text-xs text-[#9cbaab] leading-tight">Increased intensity this week.</p></div>
                </div>
              </div>
              <div className="bg-card-dark rounded-2xl border border-[#283930] p-6 flex flex-col shadow-xl flex-1 justify-center relative overflow-hidden group hover:border-blue-400/30 transition-colors">
                <h3 className="text-white text-lg font-bold">Chronic Load</h3>
                <p className="text-[#9cbaab] text-xs mb-4">Last 28 Days Average</p>
                <div className="flex items-center gap-6">
                  <div className="relative size-24 shrink-0">
                    <svg className="size-full rotate-[-90deg]" viewBox="0 0 36 36">
                      <path className="text-[#283930]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="4"></path>
                      <path className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeWidth="4"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col"><span className="text-xl font-bold text-white">720</span><span className="text-[9px] text-[#9cbaab]">AU</span></div>
                  </div>
                  <div className="flex flex-col gap-1"><div className="flex items-center gap-1 text-[#9cbaab]"><span className="material-symbols-outlined text-sm">remove</span><span className="text-sm font-bold">Stable</span></div><p className="text-xs text-[#9cbaab] leading-tight">Base fitness is holding steady.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TrainingLoad;
