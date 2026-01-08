
import React from 'react';

const SleepAnalysis: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary/80 text-sm font-medium uppercase tracking-wider"><span className="material-symbols-outlined text-lg">bedtime</span><span>Recovery Module</span></div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Sleep Analysis</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-surface-dark border border-[#283930] rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><span className="material-symbols-outlined text-9xl text-primary">verified</span></div>
            <div className="flex justify-between items-start mb-6 z-10">
              <div><h3 className="text-white text-lg font-bold">Sleep Score</h3><p className="text-gray-400 text-sm">Based on duration & quality</p></div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Optimal</span>
            </div>
            <div className="flex items-center justify-center py-4 z-10">
              <div className="relative size-48 md:size-56 rounded-full flex items-center justify-center shadow-[0_0_40px_-10px_rgba(25,240,133,0.3)]" style={{background: 'conic-gradient(#19f085 92%, #283930 0)', borderRadius: '50%'}}>
                <div className="bg-surface-dark rounded-full size-[90%] flex flex-col items-center justify-center">
                  <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">92<span className="text-2xl text-primary align-top">%</span></span>
                  <span className="text-gray-400 text-sm mt-1 font-medium">Performance</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4 z-10">
              <div className="flex justify-between items-end border-b border-[#283930] pb-2"><span className="text-gray-400 text-sm">Target Duration</span><span className="text-white font-mono font-medium">8h 25m</span></div>
              <div className="flex justify-between items-end"><span className="text-gray-400 text-sm">Actual Sleep</span><span className="text-primary font-mono font-bold text-lg">7h 45m</span></div>
            </div>
          </div>
          <div className="lg:col-span-8 bg-surface-dark border border-[#283930] rounded-2xl p-6 md:p-8 flex flex-col">
            <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
              <div><h3 className="text-white text-lg font-bold">Sleep Stages</h3><p className="text-gray-400 text-sm">Hypnogram distribution</p></div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2"><div className="size-3 rounded-sm bg-[#ef4444]"></div><span className="text-gray-300">Awake</span></div>
                <div className="flex items-center gap-2"><div className="size-3 rounded-sm bg-[#8b5cf6]"></div><span className="text-gray-300">REM</span></div>
                <div className="flex items-center gap-2"><div className="size-3 rounded-sm bg-[#94a3b8]"></div><span className="text-gray-300">Light</span></div>
                <div className="flex items-center gap-2"><div className="size-3 rounded-sm bg-primary"></div><span className="text-gray-300">Deep</span></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="relative h-16 w-full flex rounded-xl overflow-hidden shadow-inner bg-[#111814]">
                <div className="h-full bg-[#ef4444]" style={{width: "5%"}}></div>
                <div className="h-full bg-[#94a3b8]" style={{width: "15%"}}></div>
                <div className="h-full bg-primary" style={{width: "10%"}}></div>
                <div className="h-full bg-[#8b5cf6]" style={{width: "20%"}}></div>
                <div className="h-full bg-[#94a3b8]" style={{width: "25%"}}></div>
                <div className="h-full bg-primary" style={{width: "10%"}}></div>
                <div className="h-full bg-[#8b5cf6]" style={{width: "5%"}}></div>
                <div className="h-full bg-[#ef4444]" style={{width: "2%"}}></div>
                <div className="h-full bg-[#94a3b8]" style={{width: "8%"}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-mono px-1"><span>10:30 PM</span><span>12:00 AM</span><span>1:30 AM</span><span>3:00 AM</span><span>4:30 AM</span><span>6:15 AM</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SleepAnalysis;
