import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const MetricTooltip = ({ label, history }: { label: string, history: { date: string, value: string }[] }) => {
    const { t } = useLanguage();
    return (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#161b22] border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <span className="material-symbols-outlined text-[14px] text-amber-500">history</span>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{t('playerProfile.history')} {label}</p>
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

const SidebarMetricWithHistory = ({ label, value, unit, history }: { label: string, value: string, unit: string, history: any[] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useLanguage();
    return (
        <div
            className="text-center group hover:bg-white/5 p-1 rounded-lg transition-colors cursor-default relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div className="absolute z-50 top-0 left-[105%] w-48 bg-[#161b22] border border-white/10 rounded-xl p-4 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-left-2 pointer-events-none">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                        <span className="material-symbols-outlined text-xs text-amber-500">history</span>
                        <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{t('playerProfile.history')} {label}</p>
                    </div>
                    <div className="space-y-2">
                        {history.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px]">
                                <span className="text-text-secondary font-bold uppercase">{h.date}</span>
                                <span className="text-white font-black">{h.value}</span>
                            </div>
                        ))}
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-4 -left-1.5 w-3 h-3 bg-[#161b22] border-l border-b border-white/10 rotate-45"></div>
                </div>
            )}
            <p className="text-sm font-black text-white">{value} <span className="text-[10px] text-text-secondary font-bold">{unit}</span></p>
            <p className="text-[8px] text-primary uppercase font-bold tracking-widest opacity-60">{label}</p>
        </div>
    );
};

const ROMMetricWithHistory = ({ move, lVal, rVal, history, isEditing, onChangeL, onChangeR }: { move: string, lVal: string, rVal: string, history: any[], isEditing?: boolean, onChangeL?: (val: string) => void, onChangeR?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useLanguage();
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
                    <span className="text-[9px] text-text-secondary uppercase">{t('playerProfile.left')}</span>
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
                    <span className="text-[9px] text-text-secondary uppercase">{t('playerProfile.right')}</span>
                </div>
            </div>
        </div>
    );
};

const EvaluationItemWithHistory = ({ zone, score, history, desc, isEditing, onChangeScore, onChangeDesc }: { zone: string, score: string, history: any[], desc: string, isEditing?: boolean, onChangeScore?: (val: string) => void, onChangeDesc?: (val: string) => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useLanguage();
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
                    <span className="text-text-secondary">{t('playerProfile.score')}</span>
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
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'anthropometry');
    const { t } = useLanguage();

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    const { user } = useAuth();
    const userEmail = user?.email || localStorage.getItem('userEmail') || '';

    // Role Logic
    const isMedical = userEmail.includes('medico') || userEmail.includes('marcguarthernando');
    const isFisio = userEmail.includes('fisio') || userEmail.includes('healthtrack1939');
    const isPrepa = userEmail.includes('prepa') || userEmail.includes('m.guart');

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

    // Granular Editing State
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Record<string, any>>({});

    const startEditing = (section: string) => {
        setEditingSection(section);
        setEditValues({}); // Start fresh, getVal will handle falling back to current data
    };

    const cancelEditing = () => {
        setEditingSection(null);
        setEditValues({});
    };


    // Initialize with local data immediately
    useEffect(() => {
        if (player) {
            const nameKey = player.name.toUpperCase();
            // Direct access to ensure data is loaded
            const fallback = playerMedicalData[nameKey];

            if (fallback) {
                console.log("Loading data for:", nameKey);
                setLocalMedicalData({
                    biometrics: fallback.biometrics,
                    anthropometry: fallback.anthropometry,
                    rom: fallback.rom,
                    evaluation: fallback.evaluation,
                    physicalTests: fallback.physicalTests || fallback.physical_tests, // Handle both cases
                    info: fallback.info || fallback.general_info,
                    extra: fallback.extra || (fallback.extra_data ? fallback.extra_data.extra : null),
                    extraTests: fallback.extraTests || (fallback.extra_data ? fallback.extra_data.extraTests : null)
                });
            } else {
                console.warn("No data found for:", nameKey);
            }
            // Stop loading immediately
            setLoading(false);
        }
    }, [player]);

    /* Supabase Fetch - Temporarily disabled to fix regression
    useEffect(() => {
        const fetchProfile = async () => {
             // ... existing async logic ...
        };
        // fetchProfile();
    }, [id, player]);
    */

    const handleSaveSection = async (section: string) => {
        if (!localMedicalData || !player || !id) return;

        // Create a deep copy of data to modify
        const newData = JSON.parse(JSON.stringify(localMedicalData));
        const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

        // Process all edited values
        Object.entries(editValues).forEach(([path, newValue]) => {
            // Get old value for history
            const parts = path.split('.');
            let current = newData;
            for (let i = 0; i < parts.length - 1; i++) {
                current = current[parts[i]];
            }
            const field = parts[parts.length - 1];
            const oldValue = current[field];

            // Only update if changed
            if (oldValue !== newValue) {
                // Update value
                current[field] = newValue;

                // Add to history if applicable (check if history array exists nearby)
                // Convention: if updating 'biometrics.weight', look for 'biometrics.history.weight'
                // constructing history path based on field structure
                // Common patterns: 
                // 1. parent.field -> parent.history.field
                // 2. parent.sub.field -> parent.sub.history.field (or parent.history.subField?)
                // Based on file inspection: biometrics.history.weight, anthropometry.history.fat

                let historyArray = null;
                // Attempt to find history array in the parent object under 'history' key
                if (current.history && Array.isArray(current.history[field])) {
                    historyArray = current.history[field];
                } else if (current.history && Array.isArray(current.history)) {
                    // Sometimes history is directly on the object e.g. for simple objects? No, usually localized.
                }

                // Specific handling for known structures
                if (path.includes('biometrics.')) {
                    if (!newData.biometrics.history) newData.biometrics.history = {};
                    if (!newData.biometrics.history[field]) newData.biometrics.history[field] = [];
                    historyArray = newData.biometrics.history[field];
                } else if (path.includes('anthropometry.') && !path.includes('folds') && !path.includes('perimeters') && !path.includes('diameters') && !path.includes('somatotype')) {
                    // Direct anthro fields (fat, muscle, etc)
                    if (!newData.anthropometry.history) newData.anthropometry.history = {};
                    if (!newData.anthropometry.history[field]) newData.anthropometry.history[field] = [];
                    historyArray = newData.anthropometry.history[field];
                } else if (path.includes('rom.')) {
                    // ROM structure: rom.lower['Joint'].history
                    // path example: rom.lower.Tobillo Flexión Dorsal.l
                    const romParts = path.split('.'); // ['rom', 'lower', 'Tobillo...', 'l']
                    if (romParts.length === 4) {
                        const jointData = newData.rom[romParts[1]][romParts[2]];
                        if (!jointData.history) jointData.history = [];
                        // For ROM, history stores "val" combining L and R usually "val": "40° | 41°"
                        // We need to construct the combined string
                        // Logic: If we update L, we need R's current value (or edited value)
                        const lKey = `rom.${romParts[1]}.${romParts[2]}.l`;
                        const rKey = `rom.${romParts[1]}.${romParts[2]}.r`;
                        const lVal = editValues[lKey] || jointData.l;
                        const rVal = editValues[rKey] || jointData.r;

                        // Check if we already pushed history for this joint in this save batch?
                        // Simplification: Just push a new entry.
                        // But we iterate per field.
                        // Optimization: Only push history once per joint per save.
                        // For now, let's just update the value. Real history handling for ROM is complex with single entry for dual values.
                        // Let's defer ROM history pushing or do it smartly.
                        // Assuming 'val' string in history: "L | R"

                        // Let's create a new history entry ONLY if it's the first time we touch this joint in this loop loops? Hard.
                        // Fallback: Just update the value for now in memory.
                        // Ideally we push { date: today, val: `${originalL} | ${originalR}` }
                    }
                }

                if (historyArray) {
                    historyArray.unshift({
                        date: today,
                        value: oldValue
                    });
                }
            }
        });

        setLocalMedicalData(newData);
        setEditingSection(null);
        setEditValues({});

        // Persist to service (Mock)
        try {
            const { updateMedicalProfile } = await import('../services/medicalService');
            // We pass the WHOLE new object or partial? The service takes partial updates usually.
            // For mock, we often just need to verify it updates the ref.
            // Since we updated localMedicalData which is initially derived from the mock import via reference in useEffect? 
            // No, strictly local state. We need to push back to mock service.
            await updateMedicalProfile(id, newData); // Assuming service handles full update or merge
        } catch (e) {
            console.error(e);
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
        { id: 'anthropometry', label: t('playerProfile.anthropometry'), icon: 'straighten' },
        { id: 'rom', label: t('playerProfile.rom'), icon: 'directions_run' },
        { id: 'evaluation', label: t('playerProfile.physicalEval'), icon: 'assignment_turned_in' },
        { id: 'physicalTests', label: t('playerProfile.physicalTests'), icon: 'speed' },
        { id: 'previous', label: t('playerProfile.prevInfo'), icon: 'history' },
        { id: 'injuries', label: t('playerProfile.injuries'), icon: 'medical_services' },
        { id: 'extra', label: t('playerProfile.aiQuest'), icon: 'psychology' },
    ];

    // Helper to display data
    const getVal = (path: string, fallback: any) => {
        // If editing and value exists in edit buffer, return that
        if (editingSection && editValues[path] !== undefined) {
            return editValues[path];
        }

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
        setEditValues(prev => ({
            ...prev,
            [path]: value
        }));
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
                    {t('playerProfile.backToPlayers')}
                </button >
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{isFisio ? t('playerProfile.physio') : isPrepa ? t('playerProfile.sc') : t('playerProfile.medical')} {t('playerProfile.profile')} • {player.name}</span>
                </div>
            </div >

            <div className="flex-1 flex overflow-hidden">
                {/* Left Profile Summary */}
                <aside className="w-48 flex-none border-r border-surface-border/50 bg-background-dark/40 overflow-visible p-3 flex flex-col items-center z-20">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                            <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black border-2 border-background-dark shadow-xl
                            ${player.risk === 'low' ? 'bg-emerald-500 text-emerald-950' : player.risk === 'medium' ? 'bg-amber-500 text-amber-950' : 'bg-rose-500 text-rose-950'}
                        `}>
                            {player.risk === 'low' ? t('playerProfile.riskLow') : player.risk === 'medium' ? t('playerProfile.riskMedium') : t('playerProfile.riskHigh')} {t('playerProfile.risk')}
                        </div>
                    </div>

                    <div className="flex flex-col items-center mb-0.5">
                        <h1 className="text-xl font-black text-white text-center uppercase tracking-tight leading-none">{player.name.split(' ')[0]}</h1>
                        <h1 className="text-xl font-black text-primary text-center uppercase tracking-tight leading-none">{player.name.split(' ').slice(1).join(' ')}</h1>
                    </div>
                    <p className="text-primary font-bold text-[10px] tracking-widest mb-6 opacity-80">#{player.number} • {player.position.toUpperCase()}</p>

                    <div className="w-full space-y-4">
                        <div className="bg-surface-dark/50 border border-surface-border/30 rounded-xl p-3">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-3 opacity-50 text-center">{t('playerProfile.currentStatus')}</p>
                            <div className="flex flex-col items-center gap-1">
                                <span className={`text-sm font-black uppercase ${player.status === 'Disponible' ? 'text-emerald-400' : 'text-rose-400'}`}>{player.status === 'Disponible' ? t('teamDashboard.available') : player.status}</span>
                                <span className="text-[9px] text-text-secondary italic">{player.lastAssessment}</span>
                            </div>
                        </div>

                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-3 opacity-50 text-center flex items-center justify-center gap-2">
                            {t('playerProfile.biometrics')}
                            {isMedical && (
                                <button
                                    onClick={() => editingSection === 'biometrics' ? handleSaveSection('biometrics') : startEditing('biometrics')}
                                    className="hover:text-white transition-colors"
                                >
                                    <span className={`material-symbols-outlined text-[10px] ${editingSection === 'biometrics' ? 'text-emerald-500' : 'text-text-secondary'}`}>
                                        {editingSection === 'biometrics' ? 'save' : 'edit'}
                                    </span>
                                </button>
                            )}
                        </p>
                        <div className="flex flex-col gap-3">
                            {editingSection === 'biometrics' ? (
                                <>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] uppercase font-bold text-text-secondary">{t('playerProfile.height')}</span>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                value={getVal('biometrics.height', '')}
                                                onChange={e => setVal('biometrics.height', e.target.value)}
                                                className="w-12 bg-background-dark/50 border border-primary/30 rounded px-1 text-right text-xs font-black text-white"
                                            />
                                            <span className="text-[8px] font-bold text-primary">CM</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-surface-border/30"></div>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] uppercase font-bold text-text-secondary">{t('playerProfile.weight')}</span>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                value={getVal('biometrics.weight', '')}
                                                onChange={e => setVal('biometrics.weight', e.target.value)}
                                                className="w-12 bg-background-dark/50 border border-primary/30 rounded px-1 text-right text-xs font-black text-white"
                                            />
                                            <span className="text-[8px] font-bold text-primary">KG</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-surface-border/30"></div>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] uppercase font-bold text-text-secondary">{t('playerProfile.wingspan')}</span>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                value={getVal('biometrics.wingspan', '')}
                                                onChange={e => setVal('biometrics.wingspan', e.target.value)}
                                                className="w-12 bg-background-dark/50 border border-primary/30 rounded px-1 text-right text-xs font-black text-white"
                                            />
                                            <span className="text-[8px] font-bold text-primary">CM</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SidebarMetricWithHistory
                                        label={t('playerProfile.height')}
                                        value={getVal('biometrics.height', '198.5')}
                                        unit="CM"
                                        history={getVal('biometrics.history.height', [])}
                                    />
                                    <div className="w-full h-px bg-surface-border/30"></div>
                                    <SidebarMetricWithHistory
                                        label={t('playerProfile.weight')}
                                        value={getVal('biometrics.weight', '94.2')}
                                        unit="KG"
                                        history={getVal('biometrics.history.weight', [])}
                                    />
                                    <div className="w-full h-px bg-surface-border/30"></div>
                                    <SidebarMetricWithHistory
                                        label={t('playerProfile.wingspan')}
                                        value={getVal('biometrics.wingspan', '197.2')}
                                        unit="CM"
                                        history={getVal('biometrics.history.wingspan', [])}
                                    />
                                </>
                            )}
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


                        {activeTab === 'anthropometry' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        {t('playerProfile.details')}
                                    </h2>
                                    {isMedical && (
                                        <button
                                            onClick={() => editingSection === 'anthropometry' ? handleSaveSection('anthropometry') : startEditing('anthropometry')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingSection === 'anthropometry' ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{editingSection === 'anthropometry' ? 'save' : 'edit_square'}</span>
                                            {editingSection === 'anthropometry' ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>

                                {/* General Composition */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b border-surface-border pb-4">{t('playerProfile.bodyComposition')}</h3>
                                        <div className="space-y-6">
                                            <CompositionMetricWithHistory
                                                label={t('playerProfile.fat')}
                                                val={getVal('anthropometry.fat', '13.1') + '%'}
                                                color="bg-emerald-500"
                                                totalWeight={getVal('biometrics.weight', '94.2')}
                                                history={getVal('anthropometry.history.fat', [])}
                                                isEditing={editingSection === 'anthropometry'}
                                                onChange={(v) => setVal('anthropometry.fat', v.replace('%', ''))}
                                            />
                                            <CompositionMetricWithHistory
                                                label={t('playerProfile.muscle')}
                                                val={getVal('anthropometry.muscle', '45.9') + '%'}
                                                color="bg-primary"
                                                totalWeight={getVal('biometrics.weight', '94.2')}
                                                history={getVal('anthropometry.history.muscle', [])}
                                                isEditing={editingSection === 'anthropometry'}
                                                onChange={(v) => setVal('anthropometry.muscle', v.replace('%', ''))}
                                            />
                                            <CompositionMetricWithHistory
                                                label={t('playerProfile.bone')}
                                                val={getVal('anthropometry.bone', '11.2') + '%'}
                                                color="bg-blue-500"
                                                totalWeight={getVal('biometrics.weight', '94.2')}
                                                history={getVal('anthropometry.history.bone', [])}
                                                isEditing={editingSection === 'anthropometry'}
                                                onChange={(v) => setVal('anthropometry.bone', v.replace('%', ''))}
                                            />
                                            <CompositionMetricWithHistory
                                                label={t('playerProfile.residual')}
                                                val={getVal('anthropometry.residual', '29.8') + '%'}
                                                color="bg-surface-border"
                                                totalWeight={getVal('biometrics.weight', '94.2')}
                                                history={getVal('anthropometry.history.residual', [])}
                                                isEditing={editingSection === 'anthropometry'}
                                                onChange={(v) => setVal('anthropometry.residual', v.replace('%', ''))}
                                            />
                                        </div>
                                    </div>

                                    {/* Somatotype */}
                                    <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b border-surface-border pb-4">{t('playerProfile.somatotype')}</h3>
                                        <div className="flex items-center justify-center p-4">
                                            <div className="grid grid-cols-3 gap-8 w-full">
                                                <SomatotypeMetricWithHistory
                                                    label="Endomorfia"
                                                    val={getVal('anthropometry.somatotype.endo', '2.4')}
                                                    history={getVal('anthropometry.history.endo', [])}
                                                    isEditing={editingSection === 'anthropometry'}
                                                    onChange={(v) => setVal('anthropometry.somatotype.endo', v)}
                                                />
                                                <SomatotypeMetricWithHistory
                                                    label="Mesomorfia"
                                                    val={getVal('anthropometry.somatotype.meso', '4.3')}
                                                    history={getVal('anthropometry.history.meso', [])}
                                                    isEditing={editingSection === 'anthropometry'}
                                                    onChange={(v) => setVal('anthropometry.somatotype.meso', v)}
                                                />
                                                <SomatotypeMetricWithHistory
                                                    label="Ectomorfia"
                                                    val={getVal('anthropometry.somatotype.ecto', '2.4')}
                                                    history={getVal('anthropometry.history.ecto', [])}
                                                    isEditing={editingSection === 'anthropometry'}
                                                    onChange={(v) => setVal('anthropometry.somatotype.ecto', v)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-center">{t('playerProfile.classification')}: Mesomorfo Balanceado</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Tables Section */}
                                <div className="bg-surface-dark border border-surface-border rounded-3xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        {/* Folds */}
                                        <div className="p-4 border-b border-surface-border/50">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2 px-2">{t('playerProfile.folds')}</h3>
                                            <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                                                {[
                                                    { label: t('playerProfile.triceps'), key: 'anthropometry.folds.triceps' },
                                                    { label: t('playerProfile.subscapular'), key: 'anthropometry.folds.subscapular' },
                                                    { label: t('playerProfile.biceps'), key: 'anthropometry.folds.biceps' },
                                                    { label: t('playerProfile.suprailiac'), key: 'anthropometry.folds.suprailiac' },
                                                    { label: t('playerProfile.abdominal'), key: 'anthropometry.folds.abdominal' },
                                                    { label: t('playerProfile.thighFront'), key: 'anthropometry.folds.thigh' },
                                                    { label: t('playerProfile.calf'), key: 'anthropometry.folds.calf' },
                                                    { label: t('playerProfile.sum'), key: 'anthropometry.folds.sum' }
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-background-dark/50 p-3 rounded-lg flex flex-col items-center">
                                                        <span className="text-[10px] text-text-secondary uppercase font-bold mb-1">{item.label}</span>
                                                        {editingSection === 'anthropometry' ? (
                                                            <input
                                                                type="text"
                                                                value={getVal(item.key, '')}
                                                                onChange={e => setVal(item.key, e.target.value)}
                                                                className="w-full bg-transparent border-b border-primary/50 text-sm font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                placeholder="-"
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-black text-white">
                                                                {getVal(item.key, '-')}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Perimeters */}
                                        <div className="p-4 border-b border-surface-border/50">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2 px-2">{t('playerProfile.perimeters')}</h3>
                                            <div className="grid grid-cols-5 gap-2 min-w-[800px]">
                                                {[
                                                    { label: t('playerProfile.armRelaxed'), key: 'anthropometry.perimeters.armRelaxed' },
                                                    { label: t('playerProfile.armContracted'), key: 'anthropometry.perimeters.armContracted' },
                                                    { label: t('playerProfile.forearm'), key: 'anthropometry.perimeters.forearm' },
                                                    { label: t('playerProfile.thighMid'), key: 'anthropometry.perimeters.thigh' },
                                                    { label: t('playerProfile.calf'), key: 'anthropometry.perimeters.calf' }
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-background-dark/50 p-3 rounded-lg flex flex-col items-center">
                                                        <span className="text-[10px] text-text-secondary uppercase font-bold mb-1">{item.label}</span>
                                                        {editingSection === 'anthropometry' ? (
                                                            <input
                                                                type="text"
                                                                value={getVal(item.key, '')}
                                                                onChange={e => setVal(item.key, e.target.value)}
                                                                className="w-full bg-transparent border-b border-primary/50 text-sm font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                placeholder="-"
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-black text-white">
                                                                {getVal(item.key, '-')}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Diameters */}
                                        <div className="p-4">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2 px-2">{t('playerProfile.diameters')}</h3>
                                            <div className="grid grid-cols-3 gap-2 min-w-[400px]">
                                                {[
                                                    { label: t('playerProfile.humerus'), key: 'anthropometry.diameters.humerus' },
                                                    { label: t('playerProfile.femur'), key: 'anthropometry.diameters.femur' },
                                                    { label: t('playerProfile.wrist'), key: 'anthropometry.diameters.bistyloid' }
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-background-dark/50 p-3 rounded-lg flex flex-col items-center">
                                                        <span className="text-[10px] text-text-secondary uppercase font-bold mb-1">{item.label}</span>
                                                        {editingSection === 'anthropometry' ? (
                                                            <input
                                                                type="text"
                                                                value={getVal(item.key, '')}
                                                                onChange={e => setVal(item.key, e.target.value)}
                                                                className="w-full bg-transparent border-b border-primary/50 text-sm font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                placeholder="-"
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-black text-white">
                                                                {getVal(item.key, '-')}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'rom' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        ROM (RANGE OF MOVEMENTS)
                                    </h2>
                                    {(isMedical || isPrepa) && (
                                        <button
                                            onClick={() => editingSection === 'rom' ? handleSaveSection('rom') : startEditing('rom')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingSection === 'rom' ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{editingSection === 'rom' ? 'save' : 'edit_square'}</span>
                                            {editingSection === 'rom' ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>

                                <div className="bg-surface-dark border border-surface-border rounded-3xl overflow-hidden p-6 space-y-8">

                                    {/* Cadera (Hip) Section */}
                                    <div className="bg-background-dark/30 border border-surface-border/50 rounded-2xl p-6">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Cadera (Hip)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                                            {['Flex', 'Ext', 'Abd', 'Add', 'Rot Int', 'Rot Ext'].map((label) => (
                                                <div key={label} className="bg-surface-dark border border-surface-border/50 p-4 rounded-xl flex flex-col items-center hover:border-primary/50 transition-all group shadow-lg shadow-black/20">
                                                    <span className="text-[10px] text-primary/80 uppercase font-black mb-3 tracking-wider group-hover:text-primary transition-colors">{label}</span>
                                                    <div className="flex items-center gap-3 w-full justify-center bg-background-dark/50 p-2 rounded-lg border border-white/5">
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">IZQ</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.l`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.l`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.l`, '-')}</span>
                                                            )}
                                                        </div>
                                                        <div className="w-px h-6 bg-surface-border"></div>
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">DER</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.r`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.r`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.r`, '-')}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rodilla (Knee) Section */}
                                    <div className="bg-background-dark/30 border border-surface-border/50 rounded-2xl p-6">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Rodilla (Knee)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                                            {['Flex', 'Ext'].map((label) => (
                                                <div key={label} className="bg-surface-dark border border-surface-border/50 p-4 rounded-xl flex flex-col items-center hover:border-primary/50 transition-all group shadow-lg shadow-black/20">
                                                    <span className="text-[10px] text-primary/80 uppercase font-black mb-3 tracking-wider group-hover:text-primary transition-colors">{label}</span>
                                                    <div className="flex items-center gap-3 w-full justify-center bg-background-dark/50 p-2 rounded-lg border border-white/5">
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">IZQ</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.l`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.l`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.l`, '-')}</span>
                                                            )}
                                                        </div>
                                                        <div className="w-px h-6 bg-surface-border"></div>
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">DER</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.r`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.r`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.r`, '-')}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tobillo (Ankle) Section */}
                                    <div className="bg-background-dark/30 border border-surface-border/50 rounded-2xl p-6">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Tobillo (Ankle)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                                            {['Flex', 'Ext'].map((label) => (
                                                <div key={label} className="bg-surface-dark border border-surface-border/50 p-4 rounded-xl flex flex-col items-center hover:border-primary/50 transition-all group shadow-lg shadow-black/20">
                                                    <span className="text-[10px] text-primary/80 uppercase font-black mb-3 tracking-wider group-hover:text-primary transition-colors">{label}</span>
                                                    <div className="flex items-center gap-3 w-full justify-center bg-background-dark/50 p-2 rounded-lg border border-white/5">
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">IZQ</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.l`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.l`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.l`, '-')}</span>
                                                            )}
                                                        </div>
                                                        <div className="w-px h-6 bg-surface-border"></div>
                                                        <div className="flex flex-col items-center gap-1 min-w-[30px]">
                                                            <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">DER</span>
                                                            {editingSection === 'rom' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal(`rom.lower.${label}.r`, '')}
                                                                    onChange={e => setVal(`rom.lower.${label}.r`, e.target.value)}
                                                                    placeholder="-"
                                                                    className="w-full text-center bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-black text-white">{getVal(`rom.lower.${label}.r`, '-')}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
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
                                        {t('playerProfile.evalByZone')}
                                    </h2>
                                    {/* Evaluation is Automatic - No Edit Button */}
                                    <div className="h-8"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {Object.entries(getVal('evaluation', {})).map(([zone, data]: [string, any]) => (
                                        <EvaluationItemWithHistory
                                            key={zone}
                                            zone={zone}
                                            score={data.score}
                                            history={data.history}
                                            desc={data.desc}
                                            isEditing={false} // Evaluation is read-only
                                            onChangeScore={(v) => { }}
                                            onChangeDesc={(v) => { }}
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
                                        {t('playerProfile.prevInfo')}
                                    </h2>
                                    {isMedical && (
                                        <button
                                            onClick={() => editingSection === 'info' ? handleSaveSection('info') : startEditing('info')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingSection === 'info' ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{editingSection === 'info' ? 'save' : 'edit_square'}</span>
                                            {editingSection === 'info' ? 'GUARDAR' : 'EDITAR DATOS'}
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: t('playerProfile.medication'), path: 'info.medication' },
                                        { title: t('playerProfile.supplementation'), path: 'info.supplementation' },
                                        { title: t('playerProfile.allergies'), path: 'info.allergies' },
                                        { title: t('playerProfile.prevInjuries'), path: 'info.previousInjuries' },
                                        { title: t('playerProfile.familyHistory'), path: 'info.familyHistory' },
                                        { title: t('playerProfile.personalHistory'), path: 'info.personalHistory' },
                                    ].map(sect => (
                                        <div key={sect.title} className="bg-surface-dark/50 border border-surface-border/30 p-6 rounded-3xl">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 border-b border-surface-border/20 pb-2">{sect.title}</h3>
                                            {editingSection === 'info' ? (
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
                                        {t('playerProfile.testsAndPerf')}
                                    </h2>
                                    <div className="flex gap-4">
                                        <div className="bg-surface-dark/50 border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-3 max-w-lg">
                                            <span className="material-symbols-outlined text-primary animate-pulse">auto_awesome</span>
                                            <p className="text-[10px] text-text-secondary leading-tight">
                                                <span className="text-primary font-black uppercase tracking-wider block mb-0.5">Análisis IA</span>
                                                Se observa una asimetría ligera en la dorsiflexión del tobillo (10% dif). El control motor en SL Squat muestra déficits en rodilla izquierda (Valgo dinámico). Y-Balance scores indican buena estabilidad posterolateral.
                                            </p>
                                        </div>
                                        {(isMedical || isPrepa) && (
                                            <button
                                                onClick={() => editingSection === 'physicalTests' ? handleSaveSection('physicalTests') : startEditing('physicalTests')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editingSection === 'physicalTests' ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark'}`}
                                            >
                                                <span className="material-symbols-outlined text-sm">{editingSection === 'physicalTests' ? 'save' : 'edit_square'}</span>
                                                {editingSection === 'physicalTests' ? 'GUARDAR' : 'EDITAR DATOS'}
                                            </button>
                                        )}
                                        {isPrepa && (
                                            <button className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all h-fit self-center">
                                                {t('playerProfile.addTest')}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">

                                    {/* Ankle Test */}
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Movilidad de Tobillo (Dorsiflexión)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4 max-w-2xl">
                                            <div className="bg-background-dark/30 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                                                {editingSection === 'physicalTests' ? (
                                                    <div className="flex items-baseline gap-1">
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.ankle.l', '10.5')}
                                                            onChange={e => setVal('physicalTests.ankle.l', e.target.value)}
                                                            className="w-16 bg-transparent border-b border-primary/50 text-2xl font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                        />
                                                        <span className="text-xs text-text-secondary">cm</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl font-black text-white">{getVal('physicalTests.ankle.l', '10.5')}<span className="text-xs ml-1 text-text-secondary">cm</span></span>
                                                )}
                                                <span className="text-[9px] text-text-secondary uppercase font-bold tracking-widest mt-1">IZQUIERDA</span>
                                            </div>
                                            <div className="bg-background-dark/30 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                                                {editingSection === 'physicalTests' ? (
                                                    <div className="flex items-baseline gap-1">
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.ankle.r', '9.5')}
                                                            onChange={e => setVal('physicalTests.ankle.r', e.target.value)}
                                                            className="w-16 bg-transparent border-b border-primary/50 text-2xl font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                        />
                                                        <span className="text-xs text-text-secondary">cm</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl font-black text-white">{getVal('physicalTests.ankle.r', '9.5')}<span className="text-xs ml-1 text-text-secondary">cm</span></span>
                                                )}
                                                <span className="text-[9px] text-text-secondary uppercase font-bold tracking-widest mt-1">DERECHA</span>
                                            </div>
                                            <div className="bg-background-dark/30 p-4 rounded-xl border border-white/5 flex flex-col items-center relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-1.5 bg-amber-500 rounded-bl-lg z-10">
                                                    <span className="material-symbols-outlined text-[10px] text-amber-950 font-black">warning</span>
                                                </div>
                                                <span className="text-2xl font-black text-amber-400">1.0<span className="text-xs ml-1 text-amber-400/70">cm</span></span>
                                                <span className="text-[9px] text-amber-400/70 uppercase font-bold tracking-widest mt-1">DIF</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SL Squat */}
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Sentadilla a una pierna (Single Leg Squat)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Leg */}
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">{t('playerProfile.leftLegAnalysis')}</span>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Tobillo', key: 'physicalTests.slSquat.left.ankle' },
                                                        { label: 'Rodilla', key: 'physicalTests.slSquat.left.knee' },
                                                        { label: 'Cadera', key: 'physicalTests.slSquat.left.hip' }
                                                    ].map((item) => {
                                                        const val = getVal(item.key, 'Bien');
                                                        const colorClass = val === 'Precaución' ? 'text-amber-200 bg-amber-500/10 border-amber-500/30' :
                                                            val === 'Malo' ? 'text-rose-200 bg-rose-500/10 border-rose-500/30' :
                                                                'text-emerald-200 bg-emerald-500/10 border-emerald-500/30';
                                                        return (
                                                            <div key={item.label} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 ${colorClass}`}>
                                                                <span className={`text-[9px] font-black uppercase tracking-wider ${val === 'Precaución' ? 'text-amber-400' : val === 'Malo' ? 'text-rose-400' : 'text-emerald-400'}`}>{item.label}</span>
                                                                {editingSection === 'physicalTests' ? (
                                                                    <select
                                                                        value={val}
                                                                        onChange={(e) => setVal(item.key, e.target.value)}
                                                                        className="bg-transparent text-[10px] font-bold uppercase outline-none text-center w-full appearance-none cursor-pointer"
                                                                    >
                                                                        <option value="Bien" className="bg-background-dark text-emerald-400">Bien</option>
                                                                        <option value="Excelente" className="bg-background-dark text-emerald-400">Excelente</option>
                                                                        <option value="Precaución" className="bg-background-dark text-amber-400">Precaución</option>
                                                                        <option value="Malo" className="bg-background-dark text-rose-400">Malo</option>
                                                                    </select>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold uppercase">{val}</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Right Leg */}
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">{t('playerProfile.rightLegAnalysis')}</span>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Tobillo', key: 'physicalTests.slSquat.right.ankle' },
                                                        { label: 'Rodilla', key: 'physicalTests.slSquat.right.knee' },
                                                        { label: 'Cadera', key: 'physicalTests.slSquat.right.hip' }
                                                    ].map((item) => {
                                                        const val = getVal(item.key, 'Bien');
                                                        const colorClass = val === 'Precaución' ? 'text-amber-200 bg-amber-500/10 border-amber-500/30' :
                                                            val === 'Malo' ? 'text-rose-200 bg-rose-500/10 border-rose-500/30' :
                                                                'text-emerald-200 bg-emerald-500/10 border-emerald-500/30';
                                                        return (
                                                            <div key={item.label} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 ${colorClass}`}>
                                                                <span className={`text-[9px] font-black uppercase tracking-wider ${val === 'Precaución' ? 'text-amber-400' : val === 'Malo' ? 'text-rose-400' : 'text-emerald-400'}`}>{item.label}</span>
                                                                {editingSection === 'physicalTests' ? (
                                                                    <select
                                                                        value={val}
                                                                        onChange={(e) => setVal(item.key, e.target.value)}
                                                                        className="bg-transparent text-[10px] font-bold uppercase outline-none text-center w-full appearance-none cursor-pointer"
                                                                    >
                                                                        <option value="Bien" className="bg-background-dark text-emerald-400">Bien</option>
                                                                        <option value="Excelente" className="bg-background-dark text-emerald-400">Excelente</option>
                                                                        <option value="Precaución" className="bg-background-dark text-amber-400">Precaución</option>
                                                                        <option value="Malo" className="bg-background-dark text-rose-400">Malo</option>
                                                                    </select>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold uppercase">{val}</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hurdle Step */}
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                            Paso de Valla (Hurdle Step)
                                            <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left */}
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">{t('playerProfile.leftLegAnalysis')}</span>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Estabilidad', key: 'physicalTests.hurdleStep.left.stability' },
                                                        { label: 'Cadera', key: 'physicalTests.hurdleStep.left.hip' },
                                                        { label: 'Pelvis', key: 'physicalTests.hurdleStep.left.pelvis' }
                                                    ].map((item) => {
                                                        const val = getVal(item.key, 'Excelente');
                                                        const colorClass = val === 'Precaución' ? 'text-amber-200 bg-amber-500/10 border-amber-500/30' :
                                                            val === 'Malo' ? 'text-rose-200 bg-rose-500/10 border-rose-500/30' :
                                                                'text-emerald-200 bg-emerald-500/10 border-emerald-500/30';
                                                        return (
                                                            <div key={item.label} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 ${colorClass}`}>
                                                                <span className={`text-[9px] font-black uppercase tracking-wider ${val === 'Precaución' ? 'text-amber-400' : val === 'Malo' ? 'text-rose-400' : 'text-emerald-400'}`}>{item.label}</span>
                                                                {editingSection === 'physicalTests' ? (
                                                                    <select
                                                                        value={val}
                                                                        onChange={(e) => setVal(item.key, e.target.value)}
                                                                        className="bg-transparent text-[10px] font-bold uppercase outline-none text-center w-full appearance-none cursor-pointer"
                                                                    >
                                                                        <option value="Bien" className="bg-background-dark text-emerald-400">Bien</option>
                                                                        <option value="Excelente" className="bg-background-dark text-emerald-400">Excelente</option>
                                                                        <option value="Precaución" className="bg-background-dark text-amber-400">Precaución</option>
                                                                        <option value="Malo" className="bg-background-dark text-rose-400">Malo</option>
                                                                    </select>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold uppercase">{val}</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Right */}
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">{t('playerProfile.rightLegAnalysis')}</span>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Estabilidad', key: 'physicalTests.hurdleStep.right.stability' },
                                                        { label: 'Cadera', key: 'physicalTests.hurdleStep.right.hip' },
                                                        { label: 'Pelvis', key: 'physicalTests.hurdleStep.right.pelvis' }
                                                    ].map((item) => {
                                                        const val = getVal(item.key, 'Excelente');
                                                        const colorClass = val === 'Precaución' ? 'text-amber-200 bg-amber-500/10 border-amber-500/30' :
                                                            val === 'Malo' ? 'text-rose-200 bg-rose-500/10 border-rose-500/30' :
                                                                'text-emerald-200 bg-emerald-500/10 border-emerald-500/30';
                                                        return (
                                                            <div key={item.label} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 ${colorClass}`}>
                                                                <span className={`text-[9px] font-black uppercase tracking-wider ${val === 'Precaución' ? 'text-amber-400' : val === 'Malo' ? 'text-rose-400' : 'text-emerald-400'}`}>{item.label}</span>
                                                                {editingSection === 'physicalTests' ? (
                                                                    <select
                                                                        value={val}
                                                                        onChange={(e) => setVal(item.key, e.target.value)}
                                                                        className="bg-transparent text-[10px] font-bold uppercase outline-none text-center w-full appearance-none cursor-pointer"
                                                                    >
                                                                        <option value="Bien" className="bg-background-dark text-emerald-400">Bien</option>
                                                                        <option value="Excelente" className="bg-background-dark text-emerald-400">Excelente</option>
                                                                        <option value="Precaución" className="bg-background-dark text-amber-400">Precaución</option>
                                                                        <option value="Malo" className="bg-background-dark text-rose-400">Malo</option>
                                                                    </select>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold uppercase">{val}</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Y-Balance & Core */}
                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                        {/* Y-Balance */}
                                        <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl xl:col-span-2">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                                Test Y-Balance
                                                <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <span className="text-[9px] text-text-secondary uppercase font-bold block text-center">Anterior</span>
                                                    <div className="flex gap-2 justify-center">
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.anterior.l', '80')}
                                                                    onChange={e => setVal('physicalTests.yBalance.anterior.l', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.anterior.l', '80')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">IZQ</span>
                                                        </div>
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.anterior.r', '76')}
                                                                    onChange={e => setVal('physicalTests.yBalance.anterior.r', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.anterior.r', '76')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">DER</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded">ASIM: 5.00</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] text-text-secondary uppercase font-bold block text-center">Posteromedial</span>
                                                    <div className="flex gap-2 justify-center">
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.posteromedial.l', '81')}
                                                                    onChange={e => setVal('physicalTests.yBalance.posteromedial.l', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.posteromedial.l', '81')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">IZQ</span>
                                                        </div>
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.posteromedial.r', '81')}
                                                                    onChange={e => setVal('physicalTests.yBalance.posteromedial.r', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.posteromedial.r', '81')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">DER</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded">ASIM: 0.00</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] text-text-secondary uppercase font-bold block text-center">Posterolateral</span>
                                                    <div className="flex gap-2 justify-center">
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.posterolateral.l', '80')}
                                                                    onChange={e => setVal('physicalTests.yBalance.posterolateral.l', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.posterolateral.l', '80')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">IZQ</span>
                                                        </div>
                                                        <div className="bg-background-dark/30 p-2 rounded-lg text-center w-12">
                                                            {editingSection === 'physicalTests' ? (
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.yBalance.posterolateral.r', '80')}
                                                                    onChange={e => setVal('physicalTests.yBalance.posterolateral.r', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-primary/50 text-xs font-black text-white text-center outline-none focus:border-primary pb-0.5"
                                                                />
                                                            ) : (
                                                                <span className="text-xs font-black text-white">{getVal('physicalTests.yBalance.posterolateral.r', '80')}</span>
                                                            )}
                                                            <span className="text-[8px] block text-text-secondary">DER</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded">ASIM: 0.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Core Test */}
                                        <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-2 border-l-4 border-primary pl-3 flex items-center gap-2">
                                                Estabilidad del Core
                                                <div className="h-px flex-1 bg-surface-border/50 ml-4"></div>
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center bg-background-dark/30 p-3 rounded-xl border border-white/5 mx-2">
                                                    <span className="text-[10px] text-text-secondary uppercase font-bold">Puente Lateral IZQ</span>
                                                    {editingSection === 'physicalTests' ? (
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.core.leftSide', '95s')}
                                                            onChange={e => setVal('physicalTests.core.leftSide', e.target.value)}
                                                            className="w-16 text-right bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-black text-white">{getVal('physicalTests.core.leftSide', '95s')}</span>
                                                    )}
                                                </div>
                                                <div className="flex justify-between items-center bg-background-dark/30 p-3 rounded-xl border border-white/5 mx-2">
                                                    <span className="text-[10px] text-text-secondary uppercase font-bold">Puente Lateral DER</span>
                                                    {editingSection === 'physicalTests' ? (
                                                        <input
                                                            type="text"
                                                            value={getVal('physicalTests.core.rightSide', '90s')}
                                                            onChange={e => setVal('physicalTests.core.rightSide', e.target.value)}
                                                            className="w-16 text-right bg-transparent border-b border-primary/50 text-sm font-black text-white outline-none focus:border-primary pb-0.5"
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-black text-white">{getVal('physicalTests.core.rightSide', '90s')}</span>
                                                    )}
                                                </div>
                                                <div className="text-center mt-2">
                                                    {editingSection === 'physicalTests' ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div className="flex items-center gap-2 justify-center">
                                                                <span className="text-[10px] text-emerald-400 font-bold">RATIO:</span>
                                                                <input
                                                                    type="text"
                                                                    value={getVal('physicalTests.core.ratio', '0.94')}
                                                                    onChange={e => setVal('physicalTests.core.ratio', e.target.value)}
                                                                    className="w-12 text-center bg-transparent border-b border-emerald-400 text-[10px] font-black text-emerald-400 outline-none pb-0.5"
                                                                />
                                                            </div>
                                                            <select
                                                                value={getVal('physicalTests.core.ratioEval', 'Bien')}
                                                                onChange={(e) => setVal('physicalTests.core.ratioEval', e.target.value)}
                                                                className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-lg outline-none appearance-none cursor-pointer"
                                                            >
                                                                <option value="Bien" className="bg-background-dark text-emerald-400">Bien</option>
                                                                <option value="Excelente" className="bg-background-dark text-emerald-400">Excelente</option>
                                                                <option value="Precaución" className="bg-background-dark text-amber-400">Precaución</option>
                                                                <option value="Malo" className="bg-background-dark text-rose-400">Malo</option>
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-lg">RATIO: {getVal('physicalTests.core.ratio', '0.94')} ({getVal('physicalTests.core.ratioEval', 'Bien')})</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}




                        {activeTab === 'injuries' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        {t('playerProfile.injuries')}
                                    </h2>
                                    <div className="flex gap-2">
                                        {/* New Injury Button Removed as per request */}
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
                                                            `}>
                                                                {injury.status === 'Activa' ? 'ACTIVA' : 'RECUPERADA'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-text-secondary">{injury.diagnosis}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-8">
                                                    <div className="hidden md:block text-right">
                                                        <p className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mb-1">{t('exportReport.duration')}</p>
                                                        <p className="text-sm font-bold text-white">{injury.duration}</p>
                                                    </div>
                                                    <div className="hidden md:block text-right">
                                                        <p className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mb-1">{t('exportReport.currentTreatment')}</p>
                                                        <p className="text-sm font-bold text-white">{injury.treatment}</p>
                                                    </div>
                                                    <button className="w-10 h-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-primary/50 transition-all group">
                                                        <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors">arrow_forward</span>
                                                    </button>
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
                                        {t('playerProfile.aiReports')}
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
                                                        <p className="text-[10px] text-text-secondary uppercase">{t('playerProfile.generatedBy')} • {report.date}</p>
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
                                        {t('playerProfile.rawQuestionnaires')}
                                    </h2>
                                    <div className="bg-surface-dark border border-surface-border rounded-3xl overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-background-dark/50 border-b border-surface-border/50">
                                                <tr>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('playerProfile.date')}</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('playerProfile.questionnaire')}</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('playerProfile.points')}</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t('playerProfile.statusLabel')}</th>
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
