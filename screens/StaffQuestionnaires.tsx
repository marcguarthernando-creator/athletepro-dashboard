import React, { useState } from 'react';
import { mockPlayers } from '../services/mockPlayers';

interface QuestionnaireEntry {
    id: string;
    name: string;
    photo: string;
    date: string;
    sick: 'Yes' | 'No';
    sleepQ: number;
    tiredness: number;
    mood: number;
    stress: number;
    soreness: number;
    sleepH: string;
    average: number;
    result: 'green' | 'red' | 'yellow';
}

interface PostTrainingEntry {
    id: string;
    name: string;
    photo: string;
    rpe: number;
    duration: number; // minutes
    load: number; // rpe * duration
    sessionType: string;
    feeling: number;
    result: 'green' | 'red' | 'yellow';
}

const StaffQuestionnaires: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock Pre-Training Data (WBQ)
    const preData: QuestionnaireEntry[] = mockPlayers.map(p => ({
        id: p.id,
        name: p.name,
        photo: p.photo,
        date: `${selectedDate.split('-').reverse().join('/')} 09:30`,
        sick: Math.random() > 0.9 ? 'Yes' : 'No',
        sleepQ: Math.floor(Math.random() * 5) + 1,
        tiredness: Math.floor(Math.random() * 5) + 1,
        mood: Math.floor(Math.random() * 5) + 1,
        stress: Math.floor(Math.random() * 5) + 1,
        soreness: Math.floor(Math.random() * 5) + 1,
        sleepH: '7-8 h',
        average: 0,
        result: 'green'
    })).map(entry => {
        const avg = (entry.sleepQ + entry.tiredness + entry.mood + entry.stress + entry.soreness) / 5;
        return {
            ...entry,
            average: parseFloat(avg.toFixed(2)),
            result: avg > 3.5 ? 'red' : avg > 2.5 ? 'yellow' : 'green'
        };
    });

    // Mock Post-Training Data
    const postData: PostTrainingEntry[] = mockPlayers.map(p => {
        const rpe = Math.floor(Math.random() * 7) + 3;
        const duration = 90;
        return {
            id: p.id,
            name: p.name,
            photo: p.photo,
            rpe,
            duration,
            load: rpe * duration,
            sessionType: 'Pista (Táctica)',
            feeling: Math.floor(Math.random() * 4) + 2,
            result: rpe > 8 ? 'red' : rpe > 6 ? 'yellow' : 'green'
        };
    });

    const getScoreColor = (score: number) => {
        if (score <= 2) return 'bg-[#2d4d3b] text-[#5cdb95]'; // Greenish
        if (score <= 4) return 'bg-[#4d442d] text-[#dbb95c]'; // Yellowish
        return 'bg-[#4d2d2d] text-[#db5c5c]'; // Reddish
    };

    const getStatusDot = (color: string) => {
        switch (color) {
            case 'green': return <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8px_rgba(16,185,129,0.5)]"></div>;
            case 'yellow': return <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8px_rgba(245,158,11,0.5)]"></div>;
            case 'red': return <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8_rgba(244,63,94,0.5)]"></div>;
            default: return null;
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-hidden">
            {/* Sub-Header Tabs */}
            <div className="bg-[#12161b] border-b border-white/5 px-8 pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Registro de Cuestionarios</h1>
                        <p className="text-gray-500 text-sm">Monitoreo diario de bienestar y carga subjetiva</p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#1c2229] px-4 py-2 rounded-xl border border-white/5 group hover:border-primary/50 transition-all">
                        <span className="material-symbols-outlined text-gray-500 text-lg group-hover:text-primary transition-colors">calendar_today</span>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent text-white text-xs font-black uppercase tracking-widest outline-none cursor-pointer [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('pre')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative ${activeTab === 'pre' ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        PRE-ENTRENO (WBQ)
                        {activeTab === 'pre' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('post')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative ${activeTab === 'post' ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        POST-ENTRENO (RPE)
                        {activeTab === 'post' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-auto p-8">
                <div className="bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1f262e] text-gray-400">
                            {activeTab === 'pre' ? (
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Jugador</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Enfermo</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Sueño Q</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Fatiga</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Ánimo</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Estrés</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Dolor</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Media</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Sueño H</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Resultado</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Jugador</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">RPE (1-10)</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Minutos</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Carga (u.a)</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Tipo Sesión</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Sensación</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Resultado</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeTab === 'pre' ? preData.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={entry.photo} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase leading-tight">{entry.name}</p>
                                                <p className="text-[10px] text-gray-500 font-medium">Hoy, 09:30 AM</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded ${entry.sick === 'No' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                            {entry.sick}
                                        </span>
                                    </td>
                                    {[entry.sleepQ, entry.tiredness, entry.mood, entry.stress, entry.soreness].map((score, i) => (
                                        <td key={i} className="px-4 py-4 text-center">
                                            <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black ${getScoreColor(score)}`}>
                                                {score}
                                            </div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-4 text-center">
                                        <div className="inline-flex items-center justify-center bg-white/10 text-white w-10 h-7 rounded text-[11px] font-black">
                                            {entry.average}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">
                                            {entry.sleepH}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            {getStatusDot(entry.result)}
                                        </div>
                                    </td>
                                </tr>
                            )) : postData.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={entry.photo} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase leading-tight">{entry.name}</p>
                                                <p className="text-[10px] text-gray-500 font-medium tracking-tight">Fin: 12:15 PM</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-10 h-7 rounded-lg text-sm font-black ${entry.rpe > 8 ? 'bg-rose-500/20 text-rose-400' : entry.rpe > 6 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {entry.rpe}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-white font-bold text-sm">{entry.duration}'</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-sm font-black ${entry.load > 600 ? 'text-rose-500' : 'text-primary'}`}>
                                            {entry.load}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                        {entry.sessionType}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black bg-white/5 text-gray-300`}>
                                            {entry.feeling}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            {getStatusDot(entry.result)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffQuestionnaires;
