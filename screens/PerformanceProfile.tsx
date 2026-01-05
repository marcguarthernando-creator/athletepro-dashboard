
import React from 'react';

const PerformanceProfile: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scroll-smooth">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2"><h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">All-Time Performance</h1><p className="text-gray-400 text-base max-w-2xl">A comprehensive overview of your long-term capabilities, evolution, and career defining moments.</p></div>
          <div className="bg-surface-dark rounded-2xl p-6 border border-border-dark/50">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative">
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-24 md:size-28 border-4 border-surface-darker shadow-xl" style={{backgroundImage: 'url("https://picsum.photos/seed/alex-profile/200/200")'}}></div>
                <div className="absolute bottom-1 right-1 bg-primary text-surface-darker text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-surface-dark">PRO</div>
              </div>
              <div className="flex-1 text-center sm:text-left pt-1">
                <h2 className="text-2xl font-bold text-white mb-2">Alex Morgan</h2>
                <p className="text-gray-300 mb-4">Professional Road Cyclist · Team Visma</p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="flex flex-col gap-0.5"><span className="text-xs text-gray-500 uppercase tracking-wider">Weight</span><span className="text-sm text-white font-medium">68 kg</span></div>
                  <div className="w-px h-8 bg-border-dark"></div>
                  <div className="flex flex-col gap-0.5"><span className="text-xs text-gray-500 uppercase tracking-wider">VO2 Max</span><span className="text-sm text-primary font-bold">82 ml/kg</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Activities</p>
            <div className="flex items-end gap-2"><span className="text-4xl md:text-5xl font-bold text-white tracking-tight">1,248</span><span className="text-sm text-gray-500 mb-1.5">sessions</span></div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Max Heart Rate</p>
            <div className="flex items-end gap-2"><span className="text-4xl md:text-5xl font-bold text-primary tracking-tight">202</span><span className="text-sm text-gray-500 mb-1.5">bpm</span></div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Peak Daily Strain</p>
            <div className="flex items-end gap-2"><span className="text-4xl md:text-5xl font-bold text-white tracking-tight">20.8</span><span className="text-sm text-gray-500 mb-1.5">/ 21.0</span></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PerformanceProfile;
