import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';

const MetricTooltip = ({ label, history }: { label: string, history: { date: string, value: string }[] }) => {
    return (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#161b22] border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <span className="material-symbols-outlined text-[14px] text-amber-500">history</span>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Historial {label}</p>
            </div>
            <div className="space-y-3">
                {history.map((h, i) => (
                    <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-1 rounded transition-colors">
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">{h.date}</span>
                        <span className="text-xs font-black text-white">{h.value}</span>
                    </div>
                ))}
            </div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#161b22] border-l border-t border-white/10 rotate-45"></div>
        </div>
    );
};

const MetricWithHistory = ({ label, value, unit, trend, trendColor, history, isEditing, onChange }: { label: string, value: string, unit: string, trend: string, trendColor: string, history: any[], isEditing?: boolean, onChange?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-surface-dark border border-surface-border p-6 rounded-3xl relative group hover:border-primary/30 transition-all cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isEditing && isHovered && <MetricTooltip label={label} history={history} />}
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] mb-4 opacity-50">{label}</p>
            <div className="flex items-baseline gap-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="bg-background-dark border border-primary/30 rounded-lg px-2 py-1 text-2xl font-black text-white w-24 outline-none focus:border-primary"
                    />
                ) : (
                    <span className="text-4xl font-black text-white">{value}</span>
                )}
                <span className="text-primary font-bold">{unit}</span>
            </div>
            {!isEditing && <div className={`mt-4 text-[10px] font-bold bg-white/5 w-fit px-2 py-1 rounded ${trendColor}`}>{trend}</div>}
        </div>
    );
};

const CompositionMetricWithHistory = ({ label, val, color, history, totalWeight, isEditing, onChange }: { label: string, val: string, color: string, history: any[], totalWeight?: string, isEditing?: boolean, onChange?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    const kgValue = useMemo(() => {
        if (!totalWeight) return null;
        const percentage = parseFloat(val);
        const weight = parseFloat(totalWeight);
        if (isNaN(percentage) || isNaN(weight)) return null;
        return ((percentage / 100) * weight).toFixed(1);
    }, [val, totalWeight]);

    return (
        <div
            className="space-y-2 relative group cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isEditing && isHovered && <MetricTooltip label={label} history={history} />}
            <div className="flex justify-between items-end px-1">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">{label}</span>
                <div className="flex flex-col items-end leading-none">
                    {isEditing ? (
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                value={val.replace('%', '')}
                                onChange={(e) => onChange?.(e.target.value + '%')}
                                className="bg-background-dark border border-primary/30 rounded-lg px-1 py-0.5 text-sm font-black text-white w-12 text-right outline-none focus:border-primary"
                            />
                            <span className="text-xs font-black text-white">%</span>
                        </div>
                    ) : (
                        <span className="text-sm font-black text-white">{val}</span>
                    )}
                    {!isEditing && kgValue && <span className="text-[10px] font-bold text-text-secondary">{kgValue} kg</span>}
                </div>
            </div>
            <div className="h-2 w-full bg-background-dark rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: val.includes('%') ? val : `${val}%` }}></div>
            </div>
        </div>
    );
};

const SomatotypeMetricWithHistory = ({ label, val, history, isEditing, onChange }: { label: string, val: string, history: any[], isEditing?: boolean, onChange?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="text-center relative group cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isEditing && isHovered && <MetricTooltip label={label} history={history} />}
            {isEditing ? (
                <input
                    type="text"
                    value={val}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="bg-background-dark border border-primary/30 rounded-lg px-2 py-1 text-xl font-black text-white w-16 text-center outline-none focus:border-primary mx-auto block"
                />
            ) : (
                <p className="text-2xl font-black text-white">{val}</p>
            )}
            <p className="text-[10px] text-text-secondary uppercase font-bold mt-1">{label}</p>
        </div>
    );
};

const ROMMetricWithHistory = ({ move, lVal, rVal, history, isEditing, onChangeL, onChangeR }: { move: string, lVal: string, rVal: string, history: any[], isEditing?: boolean, onChangeL?: (val: string) => void, onChangeR?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="flex items-center justify-between p-3 bg-background-dark/30 rounded-xl border border-white/5 relative group cursor-help hover:border-primary/30 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isEditing && isHovered && <MetricTooltip label={move} history={history} />}
            <span className="text-xs font-bold text-white uppercase tracking-tight">{move}</span>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    {isEditing ? (
                        <input
                            type="text"
                            value={lVal}
                            onChange={(e) => onChangeL?.(e.target.value)}
                            className="bg-background-dark border border-primary/30 rounded px-1 text-sm font-black text-white w-12 text-right outline-none"
                        />
                    ) : (
                        <span className="text-sm font-black text-white">{lVal}</span>
                    )}
                    <span className="text-[9px] text-text-secondary uppercase">Izquierda</span>
                </div>
                <div className="w-px h-6 bg-surface-border"></div>
                <div className="flex flex-col items-end">
                    {isEditing ? (
                        <input
                            type="text"
                            value={rVal}
                            onChange={(e) => onChangeR?.(e.target.value)}
                            className="bg-background-dark border border-primary/30 rounded px-1 text-sm font-black text-white w-12 text-right outline-none"
                        />
                    ) : (
                        <span className="text-sm font-black text-white">{rVal}</span>
                    )}
                    <span className="text-[9px] text-text-secondary uppercase">Derecha</span>
                </div>
            </div>
        </div>
    );
};

const EvaluationItemWithHistory = ({ zone, score, history, desc, isEditing, onChangeScore, onChangeDesc }: { zone: string, score: string, history: any[], desc: string, isEditing?: boolean, onChangeScore?: (val: string) => void, onChangeDesc?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const scoreVal = parseFloat(score);
    return (
        <div
            className="bg-surface-dark border border-surface-border p-6 rounded-3xl flex flex-col gap-4 relative group cursor-help hover:border-primary/30 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isEditing && isHovered && <MetricTooltip label={zone} history={history} />}
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">fitness_center</span>
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">{zone}</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase font-bold">
                    <span className="text-text-secondary">Puntuación</span>
                    {isEditing ? (
                        <input
                            type="text"
                            value={score}
                            onChange={(e) => onChangeScore?.(e.target.value)}
                            className="bg-background-dark border border-primary/30 rounded px-1 text-sm font-black text-white w-12 text-right outline-none"
                        />
                    ) : (
                        <span className="text-primary">{score}/10</span>
                    )}
                </div>
                {!isEditing && (
                    <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(scoreVal / 10) * 100}% ` }}></div>
                    </div>
                )}
            </div>
            {isEditing ? (
                <textarea
                    value={desc}
                    onChange={(e) => onChangeDesc?.(e.target.value)}
                    className="bg-background-dark border border-primary/30 rounded p-2 text-[11px] text-text-secondary leading-relaxed w-full min-h-[60px] outline-none"
                />
            ) : (
                <p className="text-[11px] text-text-secondary leading-relaxed mt-2 italic">"{desc}"</p>
            )}
        </div>
    );
};

const PlayerMedicalProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'biometrics');

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);
    const [isEditing, setIsEditing] = useState(false);
    const userEmail = localStorage.getItem('userEmail');
    const isDoctor = userEmail === 'medico@cbc.com';
    const isFisio = userEmail === 'fisio@cbc.com';
    const isPrepa = userEmail === 'prepa@cbc.com';
    const canEdit = isDoctor || isPrepa;
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const player = mockPlayers.find(p => p.id === id);

    // Initial data from provider
    // const initialMedicalData = useMemo(() => {
    //     if (!player) return null;
    //     const nameKey = player.name.toUpperCase();
    //     return playerMedicalData[nameKey] || null;
    // }, [player]);
    // REPLACED WITH SUPABASE FETCHING BELOW

    // Local state to manage edits
    const [localMedicalData, setLocalMedicalData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch from Supabase
    useEffect(() => {
        const fetchProfile = async () => {
            if (id) {
                setLoading(true);
                let data = null;
                try {
                    // Lazy import to avoid circular dependencies if any
                    const { getMedicalProfile } = await import('../services/medicalService');
                    data = await getMedicalProfile(id);
                } catch (e) {
                    console.warn("Could not fetch from Supabase (likely offline or no connection), checking fallback...", e);
                }

                if (data) {
                    // Reshape flat DB structure back to nested object if needed
                    // Our DB matches the structure closely except top level keys
                    const structuredData = {
                        biometrics: data.biometrics,
                        anthropometry: data.anthropometry,
                        rom: data.rom,
                        evaluation: data.evaluation,
                        physicalTests: data.physical_tests,
                        info: data.general_info,
                        extra: data.extra_data?.extra,
                        extraTests: data.extra_data?.extraTests
                    };
                    setLocalMedicalData(structuredData);
                } else {
                    // Fallback to local data if not in DB
                    console.log("No profile found in DB or fetch failed, using fallback");
                    if (player) {
                        const nameKey = player.name.toUpperCase();
                        const fallback = playerMedicalData[nameKey];
                        if (fallback) {
                            setLocalMedicalData({
                                biometrics: fallback.biometrics,
                                anthropometry: fallback.anthropometry,
                                rom: fallback.rom,
                                evaluation: fallback.evaluation,
                                physicalTests: fallback.physicalTests,
                                info: fallback.info,
                                extra: fallback.extra,
                                extraTests: fallback.extraTests
                            });
                        }
                    }
                }
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id, player]);

    const handleSave = async () => {
        if (!localMedicalData || !player || !id) return;

        // Prepare updates
        const updates = {
            biometrics: localMedicalData.biometrics,
            anthropometry: localMedicalData.anthropometry,
            rom: localMedicalData.rom,
            evaluation: localMedicalData.evaluation,
            physical_tests: localMedicalData.physicalTests,
            general_info: localMedicalData.info,
            extra_data: {
                extra: localMedicalData.extra,
                extraTests: localMedicalData.extraTests
            }
        };

        try {
            const { updateMedicalProfile } = await import('../services/medicalService');
            await updateMedicalProfile(id, updates);
            setIsEditing(false);
            // Optional: Toast success
        } catch (e) {
            console.error("Failed to save", e);
            alert("Error al guardar cambios");
        }
    };


    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full bg-background-dark/30">
                <div className="text-primary font-display animate-pulse text-lg">CARGANDO PERFIL...</div>
            </div>
        );
    }

    if (!player) {
        return <div className="p-10 text-white">Jugador no encontrado</div>;
    }

    if (!localMedicalData) {
        return (
            <div className="p-10 text-white flex flex-col items-center justify-center h-full">
                <span className="material-symbols-outlined text-4xl mb-2 text-text-secondary">folder_off</span>
                <p>No hay datos médicos disponibles para este jugador.</p>
            </div>
        );
    }

    const tabs = [
        { id: 'biometrics', label: 'BIOMÉTRICOS & ANTROPO', icon: 'straighten' },
        { id: 'rom', label: 'ROM (MOVILIDAD)', icon: 'directions_run' },
        { id: 'evaluation', label: 'EVALUACIÓN FÍSICA', icon: 'assignment_turned_in' },
        { id: 'physicalTests', label: 'TEST FISICOS', icon: 'speed' },
        { id: 'previous', label: 'INFORMACIÓN PREVIA', icon: 'history' },
        { id: 'injuries', label: 'HISTORIAL LESIONES', icon: 'medical_services' },
        { id: 'extra', label: 'IA & CUESTIONARIOS', icon: 'psychology' },
    ];

    // Helper to display data
    const getVal = (path: string, fallback: string) => {
        if (!localMedicalData) return fallback;
        const parts = path.split('.');
        let current = localMedicalData;
        for (const part of parts) {
            if (current[part] === undefined) return fallback;
            current = current[part];
        }
        return current;
    };

    const setVal = (path: string, value: any) => {
        const newData = { ...localMedicalData };
        const parts = path.split('.');
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        setLocalMedicalData(newData);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark/30">
            {/* Top Navigation */}
            <div className="h-16 flex items-center px-8 bg-background-dark/50 border-b border-surface-border/50 justify-between">
                <button
                    onClick={() => navigate(`${basePath}/players`)}
                    className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Volver a Jugadores
                </button >
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{isFisio ? 'Perfil Fisio' : isPrepa ? 'Perfil S&C' : 'Perfil Médico'} • {player.name}</span>
                </div>
            </div >

            <div className="flex-1 flex overflow-hidden">
                {/* Left Profile Summary */}
                <aside className="w-52 flex-none border-r border-surface-border/50 bg-background-dark/40 overflow-y-auto p-3 flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                            <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black border-2 border-background-dark shadow-xl
                            ${player.risk === 'low' ? 'bg-emerald-500 text-emerald-950' : player.risk === 'medium' ? 'bg-amber-500 text-amber-950' : 'bg-rose-500 text-rose-950'}
                        `}>
                            {player.risk.toUpperCase()} RISK
                        </div>
                    </div>

                    <h1 className="text-lg font-black text-white text-center mb-0.5 uppercase tracking-tight leading-none">{player.name}</h1>
                    <p className="text-primary font-bold text-[10px] tracking-widest mb-6 opacity-80">#{player.number} • {player.position.toUpperCase()}</p>

                    <div className="w-full space-y-4">
                        <div className="bg-surface-dark/50 border border-surface-border/30 rounded-xl p-3">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-3 opacity-50 text-center">Estado Actual</p>
                            <div className="flex flex-col items-center gap-1">
                                <span className={`text-sm font-black uppercase ${player.status === 'Disponible' ? 'text-emerald-400' : 'text-rose-400'}`}>{player.status}</span>
                                <span className="text-[9px] text-text-secondary italic">{player.lastAssessment}</span>
                            </div>
                        </div>

                        <div className="bg-surface-dark/50 border border-surface-border/30 rounded-xl p-3">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-3 opacity-50 text-center">Biometría</p>
                            <div className="flex flex-col gap-3">
                                <div className="text-center group hover:bg-white/5 p-1 rounded-lg transition-colors cursor-default">
                                    <p className="text-sm font-black text-white">{getVal('biometrics.age', '22')} <span className="text-[10px] text-text-secondary font-bold">AÑOS</span></p>
                                    <p className="text-[8px] text-primary uppercase font-bold tracking-widest opacity-60">Edad</p>
                                </div>
                                <div className="w-full h-px bg-surface-border/30"></div>
                                <div className="text-center group hover:bg-white/5 p-1 rounded-lg transition-colors cursor-default">
                                    <p className="text-sm font-black text-white">{getVal('biometrics.height', '198.5')} <span className="text-[10px] text-text-secondary font-bold">CM</span></p>
                                    <p className="text-[8px] text-primary uppercase font-bold tracking-widest opacity-60">Altura</p>
                                </div>
                                <div className="w-full h-px bg-surface-border/30"></div>
                                <div className="text-center group hover:bg-white/5 p-1 rounded-lg transition-colors cursor-default">
                                    <p className="text-sm font-black text-white">{getVal('biometrics.weight', '94.2')} <span className="text-[10px] text-text-secondary font-bold">KG</span></p>
                                    <p className="text-[8px] text-primary uppercase font-bold tracking-widest opacity-60">Peso</p>
                                </div>
                                <div className="w-full h-px bg-surface-border/30"></div>
                                <div className="text-center group hover:bg-white/5 p-1 rounded-lg transition-colors cursor-default">
                                    <p className="text-sm font-black text-white">{getVal('anthropometry.fat', '8.5')}<span className="text-[10px] text-text-secondary font-bold">%</span></p>
                                    <p className="text-[8px] text-primary uppercase font-bold tracking-widest opacity-60">Grasa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-hidden bg-background-dark/20">
                    {/* Tabs Navigation */}
                    <div className="flex bg-background-dark/40 border-b border-surface-border/50 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-5 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-2
                                    ${activeTab === tab.id
                                        ? 'text-primary border-primary bg-primary/5'
                                        : 'text-text-secondary border-transparent hover:text-white hover:bg-white/5'}
                                `}
                            >
                                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Container */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {activeTab === 'biometrics' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                                            DATOS BIOMÉTRICOS
                                        </h2>
                                        {canEdit && (
                                            <button
                                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                            >
                                                <span className="material-symbols-outlined text-sm">{isEditing ? 'save' : 'edit_square'}</span>
                                                {isEditing ? 'GUARDAR' : 'EDITAR DATOS'}
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <MetricWithHistory
                                            label="Altura de Pie"
                                            value={getVal('biometrics.height', '191.1')}
                                            unit="cm"
                                            trend="+0.2 vs oct."
                                            trendColor="text-emerald-400"
                                            history={getVal('biometrics.history.height', [])}
                                            isEditing={isEditing}
                                            onChange={(v) => setVal('biometrics.height', v)}
                                        />
                                        <MetricWithHistory
                                            label="Peso Corporal"
                                            value={getVal('biometrics.weight', '96.7')}
                                            unit="kg"
                                            trend="+1.5 vs oct."
                                            trendColor="text-rose-400"
                                            history={getVal('biometrics.history.weight', [])}
                                            isEditing={isEditing}
                                            onChange={(v) => setVal('biometrics.weight', v)}
                                        />
                                        <MetricWithHistory
                                            label="Envergadura"
                                            value={getVal('biometrics.wingspan', '197.2')}
                                            unit="cm"
                                            trend="Relación 1.03"
                                            trendColor="text-text-secondary opacity-30"
                                            history={getVal('biometrics.history.wingspan', [])}
                                            isEditing={isEditing}
                                            onChange={(v) => setVal('biometrics.wingspan', v)}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                                            DATOS ANTROPOMÉTRICOS
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl">
                                            <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b border-surface-border pb-4">Composición Corporal</h3>
                                            <div className="space-y-6">
                                                <CompositionMetricWithHistory
                                                    label="Grasa Corporal"
                                                    val={getVal('anthropometry.fat', '13.1') + '%'}
                                                    color="bg-emerald-500"
                                                    totalWeight={getVal('biometrics.weight', '94.2')}
                                                    history={getVal('anthropometry.history.fat', [])}
                                                    isEditing={isEditing}
                                                    onChange={(v) => setVal('anthropometry.fat', v.replace('%', ''))}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Masa Muscular"
                                                    val={getVal('anthropometry.muscle', '45.9') + '%'}
                                                    color="bg-primary"
                                                    totalWeight={getVal('biometrics.weight', '94.2')}
                                                    history={getVal('anthropometry.history.muscle', [])}
                                                    isEditing={isEditing}
                                                    onChange={(v) => setVal('anthropometry.muscle', v.replace('%', ''))}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Masa Ósea"
                                                    val={getVal('anthropometry.bone', '11.2') + '%'}
                                                    color="bg-blue-500"
                                                    totalWeight={getVal('biometrics.weight', '94.2')}
                                                    history={getVal('anthropometry.history.bone', [])}
                                                    isEditing={isEditing}
                                                    onChange={(v) => setVal('anthropometry.bone', v.replace('%', ''))}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Residual"
                                                    val={getVal('anthropometry.residual', '29.8') + '%'}
                                                    color="bg-surface-border"
                                                    totalWeight={getVal('biometrics.weight', '94.2')}
                                                    history={getVal('anthropometry.history.residual', [])}
                                                    isEditing={isEditing}
                                                    onChange={(v) => setVal('anthropometry.residual', v.replace('%', ''))}
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl">
                                            <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b border-surface-border pb-4">Somatotipo</h3>
                                            <div className="flex items-center justify-center p-4">
                                                <div className="grid grid-cols-3 gap-8 w-full">
                                                    <SomatotypeMetricWithHistory
                                                        label="Endomorfia"
                                                        val={getVal('anthropometry.somatotype.endo', '2.4')}
                                                        history={getVal('anthropometry.history.endo', [])}
                                                        isEditing={isEditing}
                                                        onChange={(v) => setVal('anthropometry.somatotype.endo', v)}
                                                    />
                                                    <SomatotypeMetricWithHistory
                                                        label="Mesomorfia"
                                                        val={getVal('anthropometry.somatotype.meso', '4.3')}
                                                        history={getVal('anthropometry.history.meso', [])}
                                                        isEditing={isEditing}
                                                        onChange={(v) => setVal('anthropometry.somatotype.meso', v)}
                                                    />
                                                    <SomatotypeMetricWithHistory
                                                        label="Ectomorfia"
                                                        val={getVal('anthropometry.somatotype.ecto', '2.4')}
                                                        history={getVal('anthropometry.history.ecto', [])}
                                                        isEditing={isEditing}
                                                        onChange={(v) => setVal('anthropometry.somatotype.ecto', v)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-center">Clasificación: Mesomorfo Balanceado</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'rom' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        ROM (RANGE OF MOVEMENTS)
                                    </h2>
                                    {canEdit && (
                                        <button
                                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{isEditing ? 'save' : 'edit_square'}</span>
                                            {isEditing ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-4 uppercase tracking-widest">Miembro Inferior</h3>
                                        <div className="space-y-4">
                                            {Object.entries(getVal('rom.lower', {})).map(([move, data]: [string, any]) => (
                                                <ROMMetricWithHistory
                                                    key={move}
                                                    move={move}
                                                    lVal={data.l} rVal={data.r}
                                                    history={data.history}
                                                    isEditing={isEditing}
                                                    onChangeL={(v) => setVal(`rom.lower.${move}.l`, v)}
                                                    onChangeR={(v) => setVal(`rom.lower.${move}.r`, v)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-4 uppercase tracking-widest">Miembro Superior</h3>
                                        <div className="space-y-4">
                                            {Object.entries(getVal('rom.upper', {})).map(([move, data]: [string, any]) => (
                                                <ROMMetricWithHistory
                                                    key={move}
                                                    move={move}
                                                    lVal={data.l} rVal={data.r}
                                                    history={data.history}
                                                    isEditing={isEditing}
                                                    onChangeL={(v) => setVal(`rom.upper.${move}.l`, v)}
                                                    onChangeR={(v) => setVal(`rom.upper.${move}.r`, v)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'evaluation' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        EVALUACIÓN FÍSICA POR ZONAS ANATÓMICAS
                                    </h2>
                                    {canEdit && (
                                        <button
                                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{isEditing ? 'save' : 'edit_square'}</span>
                                            {isEditing ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {Object.entries(getVal('evaluation', {})).map(([zone, data]: [string, any]) => (
                                        <EvaluationItemWithHistory
                                            key={zone}
                                            zone={zone}
                                            score={data.score}
                                            history={data.history}
                                            desc={data.desc}
                                            isEditing={isEditing}
                                            onChangeScore={(v) => setVal(`evaluation.${zone}.score`, v)}
                                            onChangeDesc={(v) => setVal(`evaluation.${zone}.desc`, v)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'previous' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        INFORMACIÓN PREVIA
                                    </h2>
                                    {canEdit && (
                                        <button
                                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{isEditing ? 'save' : 'edit_square'}</span>
                                            {isEditing ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: 'Medicación Habitual', path: 'info.medication' },
                                        { title: 'Suplementación', path: 'info.supplementation' },
                                        { title: 'Alergias', path: 'info.allergies' },
                                        { title: 'Lesiones Previas a llegar al club', path: 'info.previousInjuries' },
                                        { title: 'Antecedentes Familiares Relevantes', path: 'info.familyHistory' },
                                        { title: 'Antecedentes Personales', path: 'info.personalHistory' },
                                    ].map(sect => (
                                        <div key={sect.title} className="bg-surface-dark/50 border border-surface-border/30 p-6 rounded-3xl">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 border-b border-surface-border/20 pb-2">{sect.title}</h3>
                                            {isEditing ? (
                                                <textarea
                                                    value={getVal(sect.path, []).join('\n')}
                                                    onChange={(e) => setVal(sect.path, e.target.value.split('\n'))}
                                                    className="bg-background-dark border border-primary/30 rounded p-2 text-xs text-white leading-relaxed w-full min-h-[100px] outline-none"
                                                    placeholder="Una opción por línea..."
                                                />
                                            ) : (
                                                <ul className="space-y-2">
                                                    {getVal(sect.path, []).map((item: string) => (
                                                        <li key={item} className="text-xs text-white flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'physicalTests' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        TESTS FÍSICOS Y RENDIMIENTO
                                    </h2>
                                    <div className="flex gap-4">
                                        {canEdit && (
                                            <button
                                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isEditing ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                            >
                                                <span className="material-symbols-outlined text-sm">{isEditing ? 'save' : 'edit_square'}</span>
                                                {isEditing ? 'GUARDAR' : 'EDITAR DATOS'}
                                            </button>
                                        )}
                                        <button className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all">
                                            + Añadir Test Propio
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    {/* Jump Test Card */}
                                    <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-1">Salto (Jump Test)</h3>
                                                <p className="text-[10px] text-text-secondary uppercase font-bold">Altura Máxima (cm)</p>
                                            </div>
                                            <span className="material-symbols-outlined text-primary/40">height</span>
                                        </div>

                                        {isEditing ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs font-bold text-white uppercase">Último valor:</span>
                                                    <input
                                                        type="text"
                                                        value={getVal('physicalTests.jump.history.0.value', '')}
                                                        onChange={(e) => setVal('physicalTests.jump.history.0.value', e.target.value)}
                                                        className="bg-background-dark border border-primary/30 rounded px-2 py-1 text-sm font-black text-white w-20 outline-none"
                                                    />
                                                </div>
                                                <textarea
                                                    value={getVal('physicalTests.jump.comments', '')}
                                                    onChange={(e) => setVal('physicalTests.jump.comments', e.target.value)}
                                                    className="bg-background-dark border border-primary/30 rounded p-2 text-xs text-white leading-relaxed w-full min-h-[60px] outline-none"
                                                    placeholder="Comentarios..."
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="h-40 flex items-end gap-2 px-2 border-b border-surface-border/50 pb-2">
                                                    {getVal('physicalTests.jump.history', []).map((h: any, i: number) => (
                                                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                                            <div className="w-full bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/40 relative" style={{ height: `${(parseFloat(h.value) / 50) * 100}%` }}>
                                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white opacity-0 group-hover:opacity-100">{h.value}</span>
                                                            </div>
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-tighter">
                                                                {h.date}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-background-dark/30 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-sm">comment</span> Comentarios
                                                    </p>
                                                    <p className="text-xs text-text-secondary italic">"{getVal('physicalTests.jump.comments', 'Sin comentarios')}"</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Hop Test Card */}
                                    <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-1">Hop Test</h3>
                                                <p className="text-[10px] text-text-secondary uppercase font-bold">Salto Monodal (cm)</p>
                                            </div>
                                            <span className="material-symbols-outlined text-primary/40">directions_run</span>
                                        </div>

                                        {isEditing ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] text-text-secondary uppercase font-bold">Izquierda</span>
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.hopTest.history.0.lVal', '')}
                                                            onChange={(e) => setVal('physicalTests.hopTest.history.0.lVal', e.target.value)}
                                                            className="bg-background-dark border border-primary/30 rounded px-2 py-1 text-sm font-black text-white outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] text-text-secondary uppercase font-bold">Derecha</span>
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.hopTest.history.0.rVal', '')}
                                                            onChange={(e) => setVal('physicalTests.hopTest.history.0.rVal', e.target.value)}
                                                            className="bg-background-dark border border-primary/30 rounded px-2 py-1 text-sm font-black text-white outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={getVal('physicalTests.hopTest.comments', '')}
                                                    onChange={(e) => setVal('physicalTests.hopTest.comments', e.target.value)}
                                                    className="bg-background-dark border border-primary/30 rounded p-2 text-xs text-white leading-relaxed w-full min-h-[60px] outline-none"
                                                    placeholder="Comentarios..."
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-background-dark/30 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                                                        <span className="text-2xl font-black text-white">{getVal('physicalTests.hopTest.history.0.lVal', '0')}</span>
                                                        <span className="text-[9px] text-text-secondary uppercase font-bold">Izquierda</span>
                                                    </div>
                                                    <div className="bg-background-dark/30 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                                                        <span className="text-2xl font-black text-white">{getVal('physicalTests.hopTest.history.0.rVal', '0')}</span>
                                                        <span className="text-[9px] text-text-secondary uppercase font-bold">Derecha</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Asimetría</span>
                                                    <span className="text-sm font-black text-emerald-400">{getVal('physicalTests.hopTest.history.0.asymmetry', '0%')}</span>
                                                </div>

                                                <div className="bg-background-dark/30 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-sm">comment</span> Comentarios
                                                    </p>
                                                    <p className="text-xs text-text-secondary italic">"{getVal('physicalTests.hopTest.comments', 'Sin comentarios')}"</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Picos Fuerza Card */}
                                    <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-1">Picos de Fuerza</h3>
                                                <p className="text-[10px] text-text-secondary uppercase font-bold">Máxima Fuerza Aplicada (N)</p>
                                            </div>
                                            <span className="material-symbols-outlined text-primary/40">bolt</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary px-1">
                                                <span>Isométrica</span>
                                                <span className="text-white font-black">{getVal('physicalTests.strengthPeaks.history.0.isometric', '0')} N</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${(parseFloat(getVal('physicalTests.strengthPeaks.history.0.isometric', '0')) / 600) * 100}%` }}></div>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary px-1">
                                                <span>Excéntrica</span>
                                                <span className="text-white font-black">{getVal('physicalTests.strengthPeaks.history.0.eccentric', '0')} N</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500" style={{ width: `${(parseFloat(getVal('physicalTests.strengthPeaks.history.0.eccentric', '0')) / 600) * 100}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="bg-background-dark/30 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">comment</span> Comentarios
                                            </p>
                                            <p className="text-xs text-text-secondary italic">"{getVal('physicalTests.strengthPeaks.comments', 'Sin comentarios')}"</p>
                                        </div>
                                    </div>

                                    {/* Custom Tests Section */}
                                    <div className="bg-surface-dark/50 border border-surface-border/50 border-dashed p-8 rounded-3xl flex flex-col justify-center items-center text-center gap-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-primary/40">add_circle</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Tests Personalizados</h3>
                                            <p className="text-xs text-text-secondary max-w-[200px] mt-2">Añade mediciones específicas para el control individual del jugador.</p>
                                        </div>
                                        {getVal('physicalTests.custom', []).map((test: any, i: number) => (
                                            <div key={i} className="bg-background-dark/50 p-4 rounded-xl border border-white/5 w-full text-left">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black text-primary uppercase">{test.name}</span>
                                                    <span className="text-xs font-black text-white">{test.value} {test.unit}</span>
                                                </div>
                                                <p className="text-[8px] text-text-secondary uppercase mt-1">{test.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'injuries' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        HISTORIAL DE LESIONES
                                    </h2>
                                    <div className="flex gap-2">
                                        <button className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all">+ Nueva Lesión</button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {getVal('injuries', []).map((injury: any, idx: number) => (
                                        <div key={idx} className={`bg-surface-dark border ${injury.status === 'Activa' ? 'border-amber-500/30' : 'border-surface-border'} rounded-3xl overflow-hidden`}>
                                            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center
                                                        ${injury.status === 'Activa' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}
                                                    `}>
                                                        <span className="text-xl font-black leading-none">{injury.date.split('-')[2]}</span>
                                                        <span className="text-[9px] font-bold uppercase">{injury.date.split('-')[1]}</span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-white font-black uppercase tracking-tight">{injury.type}</h3>
                                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border
                                                                ${injury.status === 'Activa' ? 'border-amber-500/50 text-amber-400 bg-amber-500/5' : 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5'}
                                                            `}>{injury.status}</span>
                                                            {injury.private && (
                                                                <span className="material-symbols-outlined text-rose-500 text-sm" title="Solo visible para Médicos">lock</span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-[0.1em]">{injury.zone} • {injury.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex gap-2">
                                                        <div className="flex items-center gap-1 bg-background-dark px-3 py-1.5 rounded-lg border border-white/5">
                                                            <span className="material-symbols-outlined text-xs text-primary">medical_services</span>
                                                            <span className="text-[9px] font-bold text-white uppercase">Médico</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-background-dark px-3 py-1.5 rounded-lg border border-white/5">
                                                            <span className="material-symbols-outlined text-xs text-blue-400">physical_therapy</span>
                                                            <span className="text-[9px] font-bold text-white uppercase">Fisio</span>
                                                        </div>
                                                    </div>
                                                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Ver Detalle</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'extra' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                                <section>
                                    <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        HISTORIAL DE INFORMES IA
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {getVal('extra.aiReports', []).map((report: any, i: number) => (
                                            <div key={i} className="bg-surface-dark border border-surface-border p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                                        <span className="material-symbols-outlined text-xl">psychology</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{report.title}</h3>
                                                        <p className="text-[10px] text-text-secondary uppercase">Generado por Gemini AI • {report.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest bg-white/5 text-text-secondary`}>{report.type}</span>
                                                    <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors">download</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        CUESTIONARIOS BRUTO (INTRANET)
                                    </h2>
                                    <div className="bg-surface-dark border border-surface-border rounded-3xl overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-background-dark/50 border-b border-surface-border/50">
                                                <tr>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Fecha</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Cuestionario</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Puntos / Val</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-surface-border/30">
                                                {getVal('extra.questionnaires', []).map((q: any, i: number) => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                                                        <td className="px-6 py-4 text-xs font-bold text-white tracking-tight">{q.date}</td>
                                                        <td className="px-6 py-4 text-xs font-medium text-text-secondary uppercase">{q.name}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                                <span className="text-xs font-black text-white uppercase">{q.score}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-[4px] uppercase tracking-widest">{q.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </main>
            </div >
        </div >
    );
};

export default PlayerMedicalProfile;
