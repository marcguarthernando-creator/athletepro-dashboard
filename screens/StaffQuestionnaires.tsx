import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TeamSelector from '../components/TeamSelector';
import { useTeam } from '../contexts/TeamContext';
import { useLanguage } from '../contexts/LanguageContext';

// Define filtered IDs for Primer Equipo
const PRIMER_EQUIPO_IDS = ['3', '6', '11', '12'];

const StaffQuestionnaires: React.FC = () => {
    const { selectedTeam } = useTeam();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { userEmail } = useAuth();

    const isFisio = userEmail === 'fisio@athletepro.com';
    const isPrepa = userEmail === 'prepa@athletepro.com';
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);

    // Mock Data for Pre-Training (WBQ)
    const allPreData = useMemo(() => [
        {
            id: '11', name: 'Rafa Rodríguez', sick: false, sleepQ: 4, tiredness: 3, mood: 4, stress: 2, soreness: 1, average: 3.8, sleepH: 8.5, result: 'text-emerald-500'
        },
        {
            id: '3', name: 'David Acosta', sick: false, sleepQ: 5, tiredness: 2, mood: 5, stress: 1, soreness: 1, average: 4.5, sleepH: 9.0, result: 'text-emerald-500'
        },
        {
            id: '6', name: 'Edu García', sick: false, sleepQ: 3, tiredness: 4, mood: 3, stress: 3, soreness: 2, average: 3.2, sleepH: 7.5, result: 'text-amber-500'
        },
        {
            id: '12', name: 'Javi López', sick: false, sleepQ: 5, tiredness: 1, mood: 5, stress: 1, soreness: 1, average: 4.8, sleepH: 9.0, result: 'text-emerald-500'
        },
        {
            id: '99', name: 'Xabier López', sick: true, sleepQ: 2, tiredness: 5, mood: 2, stress: 4, soreness: 3, average: 2.1, sleepH: 5.5, result: 'text-rose-500'
        },
    ], []);

    const preData = useMemo(() => {
        if (selectedTeam === 'Primer Equipo') {
            return allPreData.filter(p => PRIMER_EQUIPO_IDS.includes(p.id));
        } else {
            return allPreData.filter(p => !PRIMER_EQUIPO_IDS.includes(p.id));
        }
    }, [selectedTeam, allPreData]);

    // Mock Data for Post-Training (sRPE)
    const allPostData = useMemo(() => [
        { id: '11', name: 'Rafa Rodríguez', rpe: 7, duration: 90, load: 630, type: 'Technical', feeling: 4 },
        { id: '3', name: 'David Acosta', rpe: 8, duration: 90, load: 720, type: 'Technical', feeling: 3 },
        { id: '6', name: 'Edu García', rpe: 6, duration: 90, load: 540, type: 'Recovery', feeling: 5 },
        { id: '12', name: 'Javi López', rpe: 9, duration: 90, load: 810, type: 'Conditioning', feeling: 2 },
        { id: '99', name: 'Xabier López', rpe: 5, duration: 60, load: 300, type: 'Technical', feeling: 4 },
    ], []);

    const postData = useMemo(() => {
        if (selectedTeam === 'Primer Equipo') {
            return allPostData.filter(p => PRIMER_EQUIPO_IDS.includes(p.id));
        } else {
            return allPostData.filter(p => !PRIMER_EQUIPO_IDS.includes(p.id));
        }
    }, [selectedTeam, allPostData]);

    // Update helpers to return BACKGROUND classes for rounded squares (Traffic Light style)
    const getScoreColor = (score: number) => {
        if (score <= 2) return 'bg-emerald-500 text-background-dark';
        if (score <= 4) return 'bg-amber-400 text-background-dark';
        return 'bg-rose-500 text-white';
    };

    const getSickColor = (sick: boolean) => {
        return sick ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-500';
    };

    const getRPEColor = (rpe: number) => {
        if (rpe <= 4) return 'bg-emerald-500 text-background-dark';
        if (rpe <= 7) return 'bg-amber-400 text-background-dark';
        return 'bg-rose-500 text-white';
    };

    const getStatusDot = (color: string) => {
        if (!color || typeof color !== 'string') return null;
        const bgClass = color.replace('text-', 'bg-');
        return <div className={`w-3 h-3 rounded-full ${bgClass} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}></div>;
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-hidden relative">
            <div className="bg-[#12161b] border-b border-white/5 px-8 pt-6">
                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-white uppercase tracking-tight">{t('questionnaires.title')}</h1>
                            <button onClick={() => setShowInfoModal(true)} className="bg-primary/20 p-2 rounded-lg hover:bg-primary/30 transition-colors group">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">info</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                        <TeamSelector />

                        <div className="flex items-center gap-3 bg-[#1c2229] px-4 py-3 rounded-xl border border-white/5 group hover:border-primary/50 transition-all shadow-lg h-[46px]">
                            <span className="material-symbols-outlined text-gray-500 text-lg group-hover:text-primary transition-colors">calendar_today</span>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="bg-transparent text-white text-xs font-black uppercase tracking-widest outline-none cursor-pointer [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('pre')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative group flex items-center gap-2 ${activeTab === 'pre' ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {t('questionnaires.preTraining')}
                        <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100" title={t('questionnaires.infoTitleWBQ')}>info</span>
                        {activeTab === 'pre' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}

                        {/* Tooltip on Hover via Group */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background-dark border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">{t('questionnaires.infoTitleWBQ')}</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background-dark border-r border-b border-white/10 rotate-45"></div>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('post')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative group flex items-center gap-2 ${activeTab === 'post' ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {t('questionnaires.postTraining')}
                        <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100" title={t('questionnaires.infoTitleSRPE')}>info</span>
                        {activeTab === 'post' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}

                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background-dark border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">{t('questionnaires.infoTitleSRPE')}</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background-dark border-r border-b border-white/10 rotate-45"></div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-8">
                <div className="bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1f262e] text-gray-400">
                            {activeTab === 'pre' ? (
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-left">{t('questionnaires.player')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.sick')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.sleepQ')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.tiredness')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.mood')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.stress')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.soreness')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.average')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.sleepH')}</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.result')}</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-left">{t('questionnaires.player')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.rpe')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.minutes')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.load')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.sessionType')}</th>
                                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.feeling')}</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">{t('questionnaires.result')}</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeTab === 'pre' ? preData.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group" onClick={() => setSelectedPlayer(entry)}>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p
                                                className="text-sm font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors cursor-pointer hover:underline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`${basePath}/players/${entry.id}`);
                                                }}
                                            >
                                                {entry.name}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-0.5">{t('misc.today')}, 09:30 AM</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${getSickColor(entry.sick === 'Yes' || entry.sick === true)}`}>
                                            {entry.sick === 'Yes' || entry.sick === true ? 'SI' : 'NO'}
                                        </div>
                                    </td>
                                    {[entry.sleepQ, entry.tiredness, entry.mood, entry.stress, entry.soreness].map((score, i) => (
                                        <td key={i} className="px-4 py-4 text-center">
                                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black shadow-lg ${getScoreColor(score)}`}>
                                                {score}
                                            </div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-4 text-center">
                                        <div className="inline-flex items-center justify-center bg-[#252b36] text-white w-10 h-8 rounded-lg text-xs font-black border border-white/5">
                                            {entry.average}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-[11px] font-black text-emerald-400 uppercase tracking-tighter">
                                            {entry.sleepH} H
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            {getStatusDot(entry.result)}
                                        </div>
                                    </td>
                                </tr>
                            )) : postData.map((entry) => (
                                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group" onClick={() => setSelectedPlayer(entry)}>
                                    <td className="px-6 py-4">
                                        <div>
                                            {/* Photo REMOVED, just name */}
                                            <p
                                                className="text-sm font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors cursor-pointer hover:underline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`${basePath}/players/${entry.id}`);
                                                }}
                                            >
                                                {entry.name}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-0.5">{t('misc.end')}: 12:15 PM</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black shadow-lg ${getRPEColor(entry.rpe)}`}>
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
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-xs font-black text-white uppercase tracking-wider">{entry.type}</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black bg-amber-400 text-background-dark shadow-lg">
                                            {entry.feeling}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {/* Status dot logic shared or different? defaulting to green for post mock */}
                                        <div className="flex justify-center">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {((activeTab === 'pre' && preData.length === 0) || (activeTab === 'post' && postData.length === 0)) && (
                        <div className="p-12 text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-30">block</span>
                            <p className="text-sm font-bold uppercase tracking-widest">{t('common.noData')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Modal */}
            {showInfoModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8 animate-in fade-in">
                    <div className="bg-[#161b22] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl flex flex-col p-8 relative">
                        <button onClick={() => setShowInfoModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/20 p-2 rounded-lg">
                                <span className="material-symbols-outlined text-primary text-2xl">info</span>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                {activeTab === 'pre' ? t('questionnaires.infoTitleWBQ') : t('questionnaires.infoTitleSRPE')}
                            </h2>
                        </div>

                        {activeTab === 'pre' ? (
                            <div className="space-y-6">
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {t('questionnaires.wbqDescription')}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.sleepQ')} (Quality)</h4>
                                        <p className="text-gray-500 text-[11px]">Calidad subjetiva del descanso nocturno.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.tiredness')}</h4>
                                        <p className="text-gray-500 text-[11px]">Nivel de cansancio general acumulado.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.stress')}</h4>
                                        <p className="text-gray-500 text-[11px]">Nivel de estrés psicológico o mental.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.soreness')}</h4>
                                        <p className="text-gray-500 text-[11px]">Percepción de dolor o agujetas (DOMS).</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {t('questionnaires.srpeDescription')}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.rpe')} (1-10)</h4>
                                        <p className="text-gray-500 text-[11px]">Rating of Perceived Exertion. 1 (Reposo) a 10 (Máximo esfuerzo).</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.load')} (A.U)</h4>
                                        <p className="text-gray-500 text-[11px]">RPE x Duración. Indica el volumen de carga total.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.sessionType')}</h4>
                                        <p className="text-gray-500 text-[11px]">Clasificación del entrenamiento (Táctico, Físico, etc.).</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-primary font-bold text-xs uppercase mb-2">{t('questionnaires.feeling')}</h4>
                                        <p className="text-gray-500 text-[11px]">Evaluación subjetiva de cómo se sintió el jugador.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* History Modal */}
            {selectedPlayer && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8 animate-in fade-in">
                    <div className="bg-[#161b22] w-full max-w-4xl h-[80vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col p-8 relative">
                        <button onClick={() => setSelectedPlayer(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Historial: {selectedPlayer.name}</h2>
                        <p className="text-gray-500 mb-8">{t('misc.historySubtitle')}</p>

                        <div className="flex-1 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-gray-500 flex-col">
                            <span className="material-symbols-outlined text-4xl mb-4 opacity-50">history_edu</span>
                            <p className="uppercase font-bold tracking-widest text-sm">{t('misc.detailedHistory')}</p>
                            <p className="text-xs mt-2 opacity-50">{t('misc.detailedHistoryDesc')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default StaffQuestionnaires;
