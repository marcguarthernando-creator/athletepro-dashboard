
import React from 'react';

const ExportReport: React.FC = () => {
  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-surface-border pb-6">
          <div className="max-w-2xl"><h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-2">Exportable Health Report</h1><p className="text-[#9cbaab] text-base font-normal leading-relaxed">Generate a professional PDF summary of your biometrics and performance data for your coaching staff.</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full pb-10">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-surface-dark rounded-xl border border-surface-border p-5 shadow-lg">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">date_range</span>Time Range</h3>
            <div className="flex flex-wrap gap-2">
              <button className="flex-1 min-w-[80px] h-10 rounded-lg bg-surface-border hover:bg-surface-border/80 text-white text-sm font-medium transition-all">30 Days</button>
              <button className="flex-1 min-w-[80px] h-10 rounded-lg bg-primary text-black text-sm font-bold shadow-[0_0_15px_rgba(25,240,133,0.3)] transition-all">90 Days</button>
              <button className="flex-1 min-w-[80px] h-10 rounded-lg bg-surface-border hover:bg-surface-border/80 text-white text-sm font-medium transition-all">180 Days</button>
            </div>
          </section>
          <div className="flex flex-col gap-3 mt-auto">
            <button className="w-full bg-primary hover:bg-[#15d675] text-background-dark h-12 rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(25,240,133,0.2)] transition-all transform hover:scale-[1.01]">
              <span className="material-symbols-outlined">download</span>Download PDF Report
            </button>
          </div>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="w-full bg-[#2a2a2a] rounded-xl border border-surface-border overflow-hidden flex justify-center p-6 md:p-10 min-h-[600px]">
            <div className="bg-white w-full max-w-[210mm] shadow-2xl relative flex flex-col text-slate-800 p-8">
              <div className="border-b-2 border-slate-100 pb-8 mb-8 flex justify-between items-start">
                <div><h2 className="text-3xl font-bold text-slate-900 mb-1 text-left">Health Performance Report</h2><p className="text-slate-500 font-medium text-left">Prepared for <span className="text-slate-900">Alex Morgan</span></p></div>
                <div className="text-right"><div className="text-slate-900 font-bold text-lg">Oct 1 - Dec 31, 2023</div><div className="text-green-600 text-sm font-medium mt-1">90 Day Analysis</div></div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-slate-500 text-xs uppercase font-bold mb-1">Avg HRV</div><div className="text-2xl font-black text-slate-900">68</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-slate-500 text-xs uppercase font-bold mb-1">Avg RHR</div><div className="text-2xl font-black text-slate-900">42</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-slate-500 text-xs uppercase font-bold mb-1">Sleep</div><div className="text-2xl font-black text-slate-900">88</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100"><div className="text-slate-500 text-xs uppercase font-bold mb-1">Load</div><div className="text-2xl font-black text-slate-900">High</div></div>
              </div>
              <div className="h-40 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-slate-400">Chart Visualization Placeholder</div>
              <div className="mt-8">
                <h4 className="font-bold text-slate-900 mb-2 text-left">Executive Summary</h4>
                <p className="text-sm text-slate-600 text-left">Subject shows exceptional physiological adaptation to increased training loads. Heart Rate Variability (rMSSD) has trended upwards by 12% over the last quarter, indicating high parasympathetic dominance and strong recovery capacity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExportReport;
