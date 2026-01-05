
import React from 'react';

const Trends: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card-dark rounded-xl p-5 border border-[#283930] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2"><p className="text-text-secondary text-sm font-medium">Current rMSSD</p><span className="material-symbols-outlined text-primary text-xl">ecg_heart</span></div>
            <div><div className="flex items-baseline gap-2"><p className="text-white text-3xl font-bold">42<span className="text-sm text-text-secondary font-normal ml-1">ms</span></p></div><p className="text-xs text-text-secondary mt-1">vs 7d avg (40 ms)</p></div>
          </div>
          <div className="bg-card-dark rounded-xl p-5 border border-[#283930] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2"><p className="text-text-secondary text-sm font-medium">Resting HR</p><span className="material-symbols-outlined text-red-400 text-xl">favorite</span></div>
            <div><div className="flex items-baseline gap-2"><p className="text-white text-3xl font-bold">58<span className="text-sm text-text-secondary font-normal ml-1">bpm</span></p></div><p className="text-xs text-text-secondary mt-1">vs 7d avg (60 bpm)</p></div>
          </div>
          <div className="bg-card-dark rounded-xl p-5 border border-[#283930] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2"><p className="text-text-secondary text-sm font-medium">Recovery Score</p><span className="material-symbols-outlined text-orange-400 text-xl">battery_charging_full</span></div>
            <div><div className="flex items-baseline gap-2"><p className="text-white text-3xl font-bold">88<span className="text-sm text-text-secondary font-normal ml-1">%</span></p></div><p className="text-xs text-text-secondary mt-1">Ready for high intensity</p></div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-card-dark rounded-xl p-5 border border-primary/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-primary text-6xl">lightbulb</span></div>
            <div className="flex justify-between items-start mb-2 relative z-10"><p className="text-primary text-sm font-bold">Daily Insight</p></div>
            <div className="relative z-10"><p className="text-white text-sm font-medium leading-snug">Parasympathetic activity is elevated. Good adaptation to yesterday's sprint session.</p></div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-card-dark border border-[#283930] rounded-xl p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div><h2 className="text-white text-lg font-bold flex items-center gap-2">Heart Rate Variability (rMSSD)</h2><p className="text-text-secondary text-sm">30 Day Trend • Optimal Range: 35-55ms</p></div>
          </div>
          <div className="relative h-64 w-full mt-2">
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-text-secondary text-right pr-2"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>
            <div className="absolute left-8 right-0 top-0 bottom-6 border-l border-b border-[#283930]">
              {[0, 25, 50, 75].map(top => <div key={top} className="absolute w-full h-px bg-[#283930]" style={{top: `${top}%`}}></div>)}
              <div className="absolute w-full top-[35%] h-[30%] bg-primary/5 border-y border-primary/10"></div>
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs><linearGradient id="hrvGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#19f085" stopOpacity="0.4"></stop><stop offset="100%" stopColor="#19f085" stopOpacity="0"></stop></linearGradient></defs>
                <path d="M0,60 C5,55 10,65 15,50 C20,45 25,48 30,42 C35,45 40,40 45,44 C50,48 55,42 60,38 C65,40 70,55 75,50 C80,45 85,48 90,44 C95,40 100,42 100,42 L100,100 L0,100 Z" fill="url(#hrvGradient)"></path>
                <path d="M0,60 C5,55 10,65 15,50 C20,45 25,48 30,42 C35,45 40,40 45,44 C50,48 55,42 60,38 C65,40 70,55 75,50 C80,45 85,48 90,44 C95,40 100,42" fill="none" stroke="#19f085" strokeLinecap="round" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                <path d="M0,50 L100,45" fill="none" stroke="#ffffff" strokeDasharray="4,4" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
            <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-between text-xs text-text-secondary pt-2"><span>Jan 1</span><span>Jan 8</span><span>Jan 15</span><span>Jan 22</span><span>Jan 29</span></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Trends;
