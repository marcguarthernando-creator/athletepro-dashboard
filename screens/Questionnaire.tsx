
import React from 'react';

const Questionnaire: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-[800px] flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Daily Wellbeing Check-in</h1><div className="flex items-center gap-2 text-[#9cbaab]"><span className="material-symbols-outlined text-sm">calendar_today</span><span className="text-sm font-medium">Friday, October 27th</span></div></div>
          </div>
          <div className="w-full bg-[#1b2721] rounded-full h-2 overflow-hidden"><div className="bg-primary h-full rounded-full transition-all duration-500 w-[10%]"></div></div>
        </div>
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="group relative overflow-hidden rounded-xl bg-[#1b2721] border border-[#283930] hover:border-primary/50 transition-colors duration-300 shadow-lg">
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex justify-between items-start"><div><h3 className="text-xl font-bold text-white mb-1">Subjective Sleep Quality</h3><p className="text-[#9cbaab] text-sm">How would you rate your sleep quality last night?</p></div></div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-xs font-medium text-[#9cbaab] uppercase tracking-wider px-1"><span>Very Poor (1)</span><span>Excellent (5)</span></div>
                <div className="grid grid-cols-5 gap-2 md:gap-4">
                  {[1,2,3,4,5].map(v => (
                    <label key={v} className="cursor-pointer">
                      <input className="peer sr-only" name="sleep" type="radio" value={v} defaultChecked={v===4} />
                      <div className="h-12 md:h-14 rounded-lg bg-[#283930] peer-checked:bg-primary/20 peer-checked:border-primary border border-transparent flex items-center justify-center transition-all hover:bg-[#3b5447]">
                        <span className="font-bold text-lg peer-checked:text-primary text-gray-400">{v}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-[#1b2721] border border-[#283930] hover:border-primary/50 transition-colors duration-300 shadow-lg">
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex justify-between items-start"><div><h3 className="text-xl font-bold text-white mb-1">General Fatigue</h3><p className="text-[#9cbaab] text-sm">Rate your current fatigue level.</p></div></div>
              <div className="py-4">
                <div className="flex justify-between mb-4"><span className="text-sm font-medium text-white">Value: <span className="text-primary font-bold text-lg align-middle ml-1">3</span></span><span className="text-xs text-[#9cbaab] uppercase tracking-wider">Normal</span></div>
                <input className="w-full" max="5" min="1" type="range" defaultValue="3"/>
                <div className="flex justify-between mt-2 text-xs text-[#9cbaab]"><span>Fresh (1)</span><span>Exhausted (5)</span></div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-4 z-40 bg-[#111814]/80 backdrop-blur-xl p-4 rounded-2xl border border-[#283930] shadow-2xl mt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="hidden sm:block"><p className="text-xs text-[#9cbaab]">Next: <span className="text-white font-medium">Daily Weigh-in</span></p></div>
              <button className="w-full sm:w-auto flex-1 sm:flex-none bg-primary text-[#102219] hover:bg-[#15cf72] text-base font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(25,240,133,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2" type="submit">
                <span>Complete Check-in</span><span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Questionnaire;
