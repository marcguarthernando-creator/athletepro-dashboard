import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// ... (previous interfaces remain)

interface HistoryModalProps {
    player: { id: string; name: string; photo: string };
    onClose: () => void;
}

const QuestionnaireHistoryModal: React.FC<HistoryModalProps> = ({ player, onClose }) => {
    const [historyTab, setHistoryTab] = useState<'pre' | 'post'>('pre');

    // Mock history generator
    const generateHistory = (type: 'pre' | 'post') => {
        return Array.from({ length: 10 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

            if (type === 'pre') {
                return {
                    date: dateStr,
                    sick: Math.random() > 0.95 ? 'Yes' : 'No',
                    sleepQ: Math.floor(Math.random() * 3) + 2, // 2-5
                    tiredness: Math.floor(Math.random() * 4) + 1,
                    mood: Math.floor(Math.random() * 3) + 2,
                    stress: Math.floor(Math.random() * 3) + 1,
                    soreness: Math.floor(Math.random() * 3) + 1,
                    sleepH: '7-8 h',
                };
            } else {
                const rpe = Math.floor(Math.random() * 5) + 3; // 3-8
                const duration = [90, 75, 60, 105][Math.floor(Math.random() * 4)];
                return {
                    date: dateStr,
                    rpe,
                    duration,
                    load: rpe * duration,
                    sessionType: ['Pista', 'Gym', 'Recuperación', 'Partido'][Math.floor(Math.random() * 4)],
                    feeling: Math.floor(Math.random() * 3) + 2,
                };
            }
        });
    };

    const historyData = generateHistory(historyTab);

    const getScoreColor = (score: number) => {
        if (score <= 2) return 'bg-emerald-500 text-emerald-950';
        if (score <= 4) return 'bg-amber-400 text-amber-950';
        return 'bg-rose-500 text-white';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-[#161b22] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1f262e]">
                    <div className="flex items-center gap-4">
                        <img src={player.photo} alt={player.name} className="w-12 h-12 rounded-full border-2 border-primary" />
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">{player.name}</h2>
                            <p className="text-sm text-text-secondary uppercase tracking-widest font-bold">Historial de Cuestionarios</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-white">close</span>
                    </button>
                </div>

                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setHistoryTab('pre')}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${historyTab === 'pre' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        Pre-Entreno (WBQ)
                    </button>
                    <button
                        onClick={() => setHistoryTab('post')}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${historyTab === 'post' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        Post-Entreno (RPE)
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0a0d10] sticky top-0">
                            {historyTab === 'pre' ? (
                                <tr>
                                    <th className="px-4 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">Fecha</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Enfermo</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Sueño Q</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Fatiga</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Ánimo</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Estrés</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Dolor</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Sueño H</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-4 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">Fecha</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">RPE</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Min</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Carga</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Tipo</th>
                                    <th className="px-2 py-3 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Feeling</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {historyData.map((row: any, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    {historyTab === 'pre' ? (
                                        <>
                                            <td className="px-4 py-3 text-xs font-bold text-white">{row.date}</td>
                                            <td className="px-2 py-3 text-center text-xs text-gray-400">{row.sick}</td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-6 h-6 leading-6 rounded ${getScoreColor(row.sleepQ)} text-[10px] font-black`}>{row.sleepQ}</span></td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-6 h-6 leading-6 rounded ${getScoreColor(row.tiredness)} text-[10px] font-black`}>{row.tiredness}</span></td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-6 h-6 leading-6 rounded ${getScoreColor(row.mood)} text-[10px] font-black`}>{row.mood}</span></td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-6 h-6 leading-6 rounded ${getScoreColor(row.stress)} text-[10px] font-black`}>{row.stress}</span></td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-6 h-6 leading-6 rounded ${getScoreColor(row.soreness)} text-[10px] font-black`}>{row.soreness}</span></td>
                                            <td className="px-2 py-3 text-center text-xs text-emerald-400 font-bold">{row.sleepH}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3 text-xs font-bold text-white">{row.date}</td>
                                            <td className="px-2 py-3 text-center"><span className={`inline-block w-8 h-6 leading-6 rounded ${row.rpe > 8 ? 'bg-rose-500/20 text-rose-400' : row.rpe > 5 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'} text-[10px] font-black`}>{row.rpe}</span></td>
                                            <td className="px-2 py-3 text-center text-xs text-white font-bold">{row.duration}'</td>
                                            <td className="px-2 py-3 text-center text-xs font-black text-primary">{row.load}</td>
                                            <td className="px-2 py-3 text-center text-[10px] text-gray-400 uppercase font-bold">{row.sessionType}</td>
                                            <td className="px-2 py-3 text-center text-xs text-gray-300 font-bold">{row.feeling}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StaffQuestionnaires: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; name: string; photo: string } | null>(null);

    // ... (rest of preData and postData logic remains same)
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
        if (score <= 2) return 'bg-emerald-500 text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
        if (score <= 4) return 'bg-amber-400 text-amber-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]';
        return 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    };

    const getStatusDot = (color: string) => {
        switch (color) {
            case 'green': return <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8px_rgba(16,185,129,0.5)]"></div>;
            case 'yellow': return <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8px_rgba(245,158,11,0.5)]"></div>;
            case 'red': return <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),0_0_8_rgba(244,63,94,0.5)]"></div>;
            default: return null;
        }
    };

    const getRPEColor = (score: number) => {
        if (score <= 5) return 'bg-emerald-500 text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
        if (score <= 8) return 'bg-amber-400 text-amber-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]';
        return 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    };

    const getFeelingColor = (score: number) => {
        if (score >= 4) return 'bg-emerald-500 text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]'; // Better feeling usually high? Or low? Assuming high is good for naming "Feeling" but Pre-Entreno "Fatigue" high is bad. 
        // Let's stick to the generic getScoreColor logic if "Feeling" is like "Mood" (1=Good, 5=Bad)?
        // Use consistent scale as Pre if possible. In Pre, 5 is RED (Bad).
        // Let's assume Feeling 5 is bad? Or is it "Sensación"?
        // If I look at Pre data: Tiredness, Mood, Stress. 
        // Let's just reuse getScoreColor for consistent 1-5 scale visuals.
        return getScoreColor(score);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-hidden relative">
            {selectedPlayer && (
                <QuestionnaireHistoryModal
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
            )}

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
                                        <div
                                            className="flex items-center gap-3 cursor-pointer group"
                                            onClick={() => setSelectedPlayer(entry)}
                                        >
                                            <img src={entry.photo} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-primary transition-colors" alt="" />
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors">{entry.name}</p>
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
                                        <div
                                            className="flex items-center gap-3 cursor-pointer group"
                                            onClick={() => setSelectedPlayer(entry)}
                                        >
                                            <img src={entry.photo} className="w-8 h-8 rounded-full border border-white/10 group-hover:border-primary transition-colors" alt="" />
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors">{entry.name}</p>
                                                <p className="text-[10px] text-gray-500 font-medium tracking-tight">Fin: 12:15 PM</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black ${getRPEColor(entry.rpe)}`}>
                                            {entry.rpe}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-white font-bold text-sm">{entry.duration}'</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-sm font-black ${entry.load > 600 ? 'text-rose-500' : 'text-emerald-400'}`}>
                                            {entry.load}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center text-[10px] font-black text-white/70 uppercase tracking-tighter">
                                        {entry.sessionType}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black ${getScoreColor(entry.feeling)}`}>
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
