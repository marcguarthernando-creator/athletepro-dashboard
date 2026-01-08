
import React from 'react';

const Journal: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Daily Behavioral Log</h1><p className="text-[#9cbaab] font-normal">Track your habits to unlock recovery insights.</p></div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-background-dark font-bold text-sm hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(25,240,133,0.2)]"><span>Today</span><span className="material-symbols-outlined text-lg">calendar_today</span></button>
        </div>
        <div className="w-full bg-surface-dark border border-border-dark rounded-xl p-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-white font-bold tracking-wide">October 2023</span>
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-4 text-center">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                <span className={`text-xs font-bold ${i===1 ? 'text-primary' : 'text-[#5c7266]'}`}>{d}</span>
                <div className={`size-8 md:size-10 flex items-center justify-center rounded-full text-sm ${i===1 ? 'font-bold bg-primary text-background-dark shadow-[0_0_10px_rgba(25,240,133,0.3)]' : 'text-white group-hover:bg-[#283930]'}`}>
                  {23+i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-8 pb-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-white">Today's Habits</h3></div>
          <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 flex flex-col gap-1">
            <div className="flex items-center justify-between py-4 border-b border-border-dark/50">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-[#283930] flex items-center justify-center text-primary"><span className="material-symbols-outlined">self_improvement</span></div>
                <div className="flex flex-col"><p className="text-white font-bold text-base">Meditation</p><p className="text-[#9cbaab] text-xs">15+ minutes session</p></div>
              </div>
              <div className="flex bg-[#111814] rounded-lg p-1 border border-border-dark">
                <button className="px-4 py-1.5 rounded text-sm font-medium text-[#9cbaab] hover:text-white transition-colors">No</button>
                <button className="px-4 py-1.5 rounded bg-primary text-[#111814] text-sm font-bold shadow-sm">Yes</button>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-[#283930] flex items-center justify-center text-[#9cbaab]"><span className="material-symbols-outlined">local_cafe</span></div>
                <div className="flex flex-col"><p className="text-white font-bold text-base">Caffeine after 2 PM</p><p className="text-[#9cbaab] text-xs">Any caffeinated beverage</p></div>
              </div>
              <div className="flex bg-[#111814] rounded-lg p-1 border border-border-dark">
                <button className="px-4 py-1.5 rounded bg-[#283930] text-white text-sm font-bold shadow-sm border border-border-dark/50">No</button>
                <button className="px-4 py-1.5 rounded text-sm font-medium text-[#9cbaab] hover:text-white transition-colors">Yes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[400px] flex flex-col gap-6">
          <div className="flex items-center gap-2"><h3 className="text-xl font-bold text-white">Impact Analysis</h3><span className="bg-[#283930] text-[#9cbaab] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Beta</span></div>
          <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col gap-1"><div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider"><span className="material-symbols-outlined text-sm">trending_up</span>Positive Impact</div><h4 className="text-white font-bold text-lg">Meditation & HRV</h4></div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold border border-primary/20">+5%</div>
            </div>
            <p className="text-[#9cbaab] text-sm leading-relaxed z-10">On days you log <span className="text-white font-medium">Meditation</span>, your Heart Rate Variability tends to be higher the following morning.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Journal;
