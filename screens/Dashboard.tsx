
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
      <header className="w-full px-6 py-8 md:px-10 md:py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Good Morning, Alex</h2>
            <p className="text-text-secondary text-base font-normal">Tuesday, Oct 24 • Season Phase: <span className="text-primary font-medium">Peak Performance</span></p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border hover:bg-surface-dark text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span className="text-sm font-medium">Schedule</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="text-sm">Log Workout</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 px-6 md:px-10 pb-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
        <section className="rounded-2xl border border-surface-border bg-gradient-to-br from-surface-dark to-[#151f19] p-6 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative z-10">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center gap-3 bg-background-dark/50 p-2 rounded-full w-fit border border-surface-border/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(25,240,133,0.6)]"></div>
                <span className="text-xs font-bold text-primary ml-1 pr-2 tracking-wide uppercase">System Green</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">Daily Readiness: <span className="text-primary">OPTIMAL</span></h3>
                <p className="text-text-secondary text-lg font-light max-w-xl">Your nervous system is primed for high intensity. Recovery metrics are peaking. Go for a PR today.</p>
              </div>
              <div className="flex gap-4 pt-2">
                <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold tracking-wide hover:opacity-90 transition-opacity">View Training Plan</button>
                <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-surface-border text-white hover:bg-surface-dark transition-colors">View Trends</button>
              </div>
            </div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex-none mr-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" fill="none" r="45%" stroke="#283930" strokeWidth="12"></circle>
                <circle className="drop-shadow-[0_0_10px_rgba(25,240,133,0.3)]" cx="50%" cy="50%" fill="none" r="45%" stroke="#19f085" strokeDasharray="283" strokeDashoffset="17" strokeLinecap="round" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">94</span>
                <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">Score</span>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4 rounded-xl p-6 border border-surface-border bg-surface-dark hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-[24px]">battery_charging_full</span><span className="text-sm font-medium">Recovery</span></div>
              <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            </div>
            <div><p className="text-white text-3xl font-bold leading-tight tracking-tight">94%</p><p className="text-primary text-sm font-medium mt-1">+2% vs avg</p></div>
            <div className="h-1 w-full bg-surface-border rounded-full mt-2 overflow-hidden"><div className="h-full bg-primary w-[94%] rounded-full"></div></div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl p-6 border border-surface-border bg-surface-dark hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-[24px]">fitness_center</span><span className="text-sm font-medium">Daily Load</span></div>
              <span className="material-symbols-outlined text-text-secondary text-[20px]">remove</span>
            </div>
            <div><p className="text-white text-3xl font-bold leading-tight tracking-tight">12.4</p><p className="text-text-secondary text-sm font-medium mt-1">Stable</p></div>
            <div className="h-8 flex items-end gap-1 mt-1 opacity-50"><div className="w-full bg-surface-border h-[40%] rounded-sm"></div><div className="w-full bg-surface-border h-[60%] rounded-sm"></div><div className="w-full bg-surface-border h-[50%] rounded-sm"></div><div className="w-full bg-primary h-[70%] rounded-sm"></div><div className="w-full bg-surface-border h-[40%] rounded-sm"></div></div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl p-6 border border-surface-border bg-surface-dark hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-[24px]">bedtime</span><span className="text-sm font-medium">Sleep Duration</span></div>
              <span className="material-symbols-outlined text-primary text-[20px]">arrow_upward</span>
            </div>
            <div><p className="text-white text-3xl font-bold leading-tight tracking-tight">8<span className="text-xl font-normal text-text-secondary">h</span> 12<span className="text-xl font-normal text-text-secondary">m</span></p><p className="text-primary text-sm font-medium mt-1">+45m vs avg</p></div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl p-6 border border-surface-border bg-surface-dark hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-[24px]">ecg_heart</span><span className="text-sm font-medium">HRV (RMSSD)</span></div>
              <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            </div>
            <div><p className="text-white text-3xl font-bold leading-tight tracking-tight">52 <span className="text-xl font-normal text-text-secondary">ms</span></p><p className="text-primary text-sm font-medium mt-1">+4ms trending up</p></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
