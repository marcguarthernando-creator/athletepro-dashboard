import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';

const MetricTooltip = ({ label, history }: { label: string, history: { date: string, value: string }[] }) => {
    return (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#161b22] border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in duration-200 pointer-events-none">
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

const MetricWithHistory = ({ label, value, unit, trend, trendColor, history }: { label: string, value: string, unit: string, trend: string, trendColor: string, history: any[] }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-surface-dark border border-surface-border p-6 rounded-3xl relative group hover:border-primary/30 transition-all cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <MetricTooltip label={label} history={history} />}
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] mb-4 opacity-50">{label}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{value}</span>
                <span className="text-primary font-bold">{unit}</span>
            </div>
            <div className={`mt-4 text-[10px] font-bold bg-white/5 w-fit px-2 py-1 rounded ${trendColor}`}>{trend}</div>
        </div>
    );
};

const CompositionMetricWithHistory = ({ label, val, color, history }: { label: string, val: string, color: string, history: any[] }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="space-y-2 relative group cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <MetricTooltip label={label} history={history} />}
            <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">{label}</span>
                <span className="text-sm font-black text-white">{val}</span>
            </div>
            <div className="h-2 w-full bg-background-dark rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: val }}></div>
            </div>
        </div>
    );
};

const SomatotypeMetricWithHistory = ({ label, val, history }: { label: string, val: string, history: any[] }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="text-center relative group cursor-help"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <MetricTooltip label={label} history={history} />}
            <p className="text-2xl font-black text-white">{val}</p>
            <p className="text-[10px] text-text-secondary uppercase font-bold">{label}</p>
        </div>
    );
};

const ROMMetricWithHistory = ({ move, lVal, rVal, history }: { move: string, lVal: string, rVal: string, history: any[] }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="flex items-center justify-between p-3 bg-background-dark/30 rounded-xl border border-white/5 relative group cursor-help hover:border-primary/30 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <MetricTooltip label={move} history={history} />}
            <span className="text-xs font-bold text-white uppercase tracking-tight">{move}</span>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-white">{lVal}</span>
                    <span className="text-[9px] text-text-secondary uppercase">Izquierda</span>
                </div>
                <div className="w-px h-6 bg-surface-border"></div>
                <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-white">{rVal}</span>
                    <span className="text-[9px] text-text-secondary uppercase">Derecha</span>
                </div>
            </div>
        </div>
    );
};

const EvaluationItemWithHistory = ({ zone, score, history, desc }: { zone: string, score: string, history: any[], desc: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const scoreVal = parseFloat(score);
    return (
        <div
            className="bg-surface-dark border border-surface-border p-6 rounded-3xl flex flex-col gap-4 relative group cursor-help hover:border-primary/30 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && <MetricTooltip label={zone} history={history} />}
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">fitness_center</span>
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">{zone}</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase font-bold">
                    <span className="text-text-secondary">Puntuación</span>
                    <span className="text-primary">{score}/10</span>
                </div>
                <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(scoreVal / 10) * 100}%` }}></div>
                </div>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-2 italic">{desc}</p>
        </div>
    );
};

const PlayerMedicalProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('biometrics');
    const userEmail = localStorage.getItem('userEmail');
    const isFisio = userEmail === 'fisio@cbc.com';
    const isPrepa = userEmail === 'prepa@cbc.com';
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const player = mockPlayers.find(p => p.id === id);

    // Get real medical data for this player or use fallbacks
    const medicalData = useMemo(() => {
        if (!player) return null;
        // The data is keyed by player name in uppercase in our generator
        const nameKey = player.name.toUpperCase();
        return playerMedicalData[nameKey] || null;
    }, [player]);

    if (!player) {
        return <div className="p-10 text-white">Jugador no encontrado</div>;
    }

    const tabs = [
        { id: 'biometrics', label: 'BIOMÉTRICOS & ANTROPO', icon: 'straighten' },
        { id: 'rom', label: 'ROM (MOVILIDAD)', icon: 'directions_run' },
        { id: 'evaluation', label: 'EVALUACIÓN FÍSICA', icon: 'assignment_turned_in' },
        { id: 'previous', label: 'INFORMACIÓN PREVIA', icon: 'history' },
        { id: 'injuries', label: 'HISTORIAL LESIONES', icon: 'medical_services' },
        { id: 'extra', label: 'IA & CUESTIONARIOS', icon: 'psychology' },
    ];

    // Helper to display data
    const getVal = (path: string, fallback: string) => {
        if (!medicalData) return fallback;
        const parts = path.split('.');
        let current = medicalData;
        for (const part of parts) {
            if (current[part] === undefined) return fallback;
            current = current[part];
        }
        return current;
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
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{isFisio ? 'Perfil Fisio' : isPrepa ? 'Perfil S&C' : 'Perfil Médico'} • {player.name}</span>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Profile Summary */}
                <aside className="w-80 flex-none border-r border-surface-border/50 bg-background-dark/40 overflow-y-auto p-8 flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                            <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black border-2 border-background-dark shadow-xl
                            ${player.risk === 'low' ? 'bg-emerald-500 text-emerald-950' : player.risk === 'medium' ? 'bg-amber-500 text-amber-950' : 'bg-rose-500 text-rose-950'}
                        `}>
                            {player.risk.toUpperCase()} RISK
                        </div>
                    </div>

                    <h1 className="text-2xl font-black text-white text-center mb-1 uppercase tracking-tight">{player.name}</h1>
                    <p className="text-primary font-bold text-sm tracking-widest mb-8">#{player.number} • {player.position.toUpperCase()}</p>

                    <div className="w-full space-y-4">
                        <div className="bg-surface-dark/50 border border-surface-border/30 rounded-2xl p-4">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2 opacity-50">Estado Actual</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-sm font-black uppercase ${player.status === 'Disponible' ? 'text-emerald-400' : 'text-rose-400'}`}>{player.status}</span>
                                <span className="text-[10px] text-text-secondary italic">{player.lastAssessment}</span>
                            </div>
                        </div>

                        <div className="bg-surface-dark/50 border border-surface-border/30 rounded-2xl p-4">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2 opacity-50">Resumen Biométrico</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-white font-bold">{getVal('biometrics.age', '22')} años</p>
                                    <p className="text-[10px] text-text-secondary uppercase">Edad</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white font-bold">{getVal('biometrics.height', '198.5')} cm</p>
                                    <p className="text-[10px] text-text-secondary uppercase">Altura</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white font-bold">{getVal('biometrics.weight', '94.2')} kg</p>
                                    <p className="text-[10px] text-text-secondary uppercase">Peso</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white font-bold">{getVal('anthropometry.fat', '8.5')}%</p>
                                    <p className="text-[10px] text-text-secondary uppercase">Grasa</p>
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
                                    <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        DATOS BIOMÉTRICOS
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <MetricWithHistory
                                            label="Altura de Pie"
                                            value={getVal('biometrics.height', '191.1')}
                                            unit="cm"
                                            trend="+0.2 vs oct."
                                            trendColor="text-emerald-400"
                                            history={[
                                                { date: 'OCT 2025', value: '190.9 cm' },
                                                { date: 'SEP 2025', value: '190.9 cm' },
                                                { date: 'AGO 2025', value: '190.5 cm' }
                                            ]}
                                        />
                                        <MetricWithHistory
                                            label="Peso Corporal"
                                            value={getVal('biometrics.weight', '96.7')}
                                            unit="kg"
                                            trend="+1.5 vs oct."
                                            trendColor="text-rose-400"
                                            history={[
                                                { date: 'OCT 2025', value: '95.2 kg' },
                                                { date: 'SEP 2025', value: '94.8 kg' },
                                                { date: 'AGO 2025', value: '95.5 kg' }
                                            ]}
                                        />
                                        <MetricWithHistory
                                            label="Envergadura"
                                            value={getVal('biometrics.wingspan', '197.2')}
                                            unit="cm"
                                            trend="Relación 1.03"
                                            trendColor="text-text-secondary opacity-30"
                                            history={[
                                                { date: 'JUN 2025', value: '197.2 cm' },
                                                { date: 'ENE 2025', value: '196.8 cm' }
                                            ]}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        DATOS ANTROPOMÉTRICOS
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-surface-dark border border-surface-border p-8 rounded-3xl">
                                            <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b border-surface-border pb-4">Composición Corporal</h3>
                                            <div className="space-y-6">
                                                <CompositionMetricWithHistory
                                                    label="Grasa Corporal"
                                                    val={getVal('anthropometry.fat', '13.1') + '%'}
                                                    color="bg-emerald-500"
                                                    history={[
                                                        { date: 'OCT 2025', value: '13.3%' },
                                                        { date: 'SEP 2025', value: '13.8%' },
                                                        { date: 'AGO 2025', value: '14.2%' }
                                                    ]}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Masa Muscular"
                                                    val={getVal('anthropometry.muscle', '45.9') + '%'}
                                                    color="bg-primary"
                                                    history={[
                                                        { date: 'OCT 2025', value: '45.2%' },
                                                        { date: 'SEP 2025', value: '44.8%' },
                                                        { date: 'AGO 2025', value: '44.5%' }
                                                    ]}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Masa Ósea"
                                                    val={getVal('anthropometry.bone', '11.2') + '%'}
                                                    color="bg-blue-500"
                                                    history={[
                                                        { date: 'JUN 2025', value: '11.1%' },
                                                        { date: 'ENE 2025', value: '11.0%' }
                                                    ]}
                                                />
                                                <CompositionMetricWithHistory
                                                    label="Residual"
                                                    val={getVal('anthropometry.residual', '29.8') + '%'}
                                                    color="bg-surface-border"
                                                    history={[
                                                        { date: 'OCT 2025', value: '30.4%' },
                                                        { date: 'SEP 2025', value: '30.5%' }
                                                    ]}
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
                                                        history={[{ date: 'OCT 2025', value: '2.5' }, { date: 'MAY 2025', value: '2.8' }]}
                                                    />
                                                    <SomatotypeMetricWithHistory
                                                        label="Mesomorfia"
                                                        val={getVal('anthropometry.somatotype.meso', '4.3')}
                                                        history={[{ date: 'OCT 2025', value: '4.1' }, { date: 'MAY 2025', value: '3.9' }]}
                                                    />
                                                    <SomatotypeMetricWithHistory
                                                        label="Ectomorfia"
                                                        val={getVal('anthropometry.somatotype.ecto', '2.4')}
                                                        history={[{ date: 'OCT 2025', value: '2.3' }, { date: 'MAY 2025', value: '2.2' }]}
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
                                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    ROM (RANGE OF MOVEMENTS)
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-4 uppercase tracking-widest">Miembro Inferior</h3>
                                        <div className="space-y-4">
                                            <ROMMetricWithHistory
                                                move="Tobillo Flexión Dorsal"
                                                lVal="42°" rVal="44°"
                                                history={[{ date: 'OCT 2025', value: '40° | 41°' }, { date: 'MAY 2025', value: '38° | 38°' }]}
                                            />
                                            <ROMMetricWithHistory
                                                move="Cadera Flexión"
                                                lVal="115°" rVal="112°"
                                                history={[{ date: 'OCT 2025', value: '110° | 108°' }]}
                                            />
                                            <ROMMetricWithHistory
                                                move="Knee Extension"
                                                lVal="0°" rVal="0°"
                                                history={[{ date: 'OCT 2025', value: '0° | -2°' }]}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-surface-dark border border-surface-border p-6 rounded-3xl">
                                        <h3 className="text-xs font-black text-primary mb-4 uppercase tracking-widest">Miembro Superior</h3>
                                        <div className="space-y-4">
                                            <ROMMetricWithHistory
                                                move="Hombro Flexión"
                                                lVal="175°" rVal="178°"
                                                history={[{ date: 'JUN 2025', value: '170° | 172°' }]}
                                            />
                                            <ROMMetricWithHistory
                                                move="Hombro Rot. Interna"
                                                lVal="65°" rVal="62°"
                                                history={[{ date: 'JUN 2025', value: '60° | 58°' }]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'evaluation' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    EVALUACIÓN FÍSICA POR ZONAS ANATÓMICAS
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    <EvaluationItemWithHistory
                                        zone="UPPER BODY"
                                        score="8.5"
                                        history={[{ date: 'OCT 2025', value: '8.2' }, { date: 'MAY 2025', value: '7.8' }]}
                                        desc="Sin asimetrías detectadas. Excelente estabilidad."
                                    />
                                    <EvaluationItemWithHistory
                                        zone="SPINAL COLUMN"
                                        score="7.8"
                                        history={[{ date: 'OCT 2025', value: '7.5' }]}
                                        desc="Control motor adecuado en movimientos dinámicos."
                                    />
                                    <EvaluationItemWithHistory
                                        zone="LOWER BODY"
                                        score="9.0"
                                        history={[{ date: 'OCT 2025', value: '8.5' }, { date: 'MAY 2025', value: '8.0' }]}
                                        desc="Potencia explosiva en rango óptimo."
                                    />
                                    <EvaluationItemWithHistory
                                        zone="ABS / CORE"
                                        score="8.0"
                                        history={[{ date: 'OCT 2025', value: '7.8' }]}
                                        desc="Estabilidad central sólida en anti-rotación."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'previous' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
                                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    INFORMACIÓN PREVIA
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: 'Medicación Habitual', items: getVal('info.medication', []) },
                                        { title: 'Suplementación', items: getVal('info.supplementation', []) },
                                        { title: 'Alergias', items: getVal('info.allergies', []) },
                                        { title: 'Lesiones Previas a llegar al club', items: getVal('info.previousInjuries', []) },
                                        { title: 'Antecedentes Familiares Relevantes', items: getVal('info.familyHistory', []) },
                                        { title: 'Antecedentes Personales', items: getVal('info.personalHistory', []) },
                                    ].map(sect => (
                                        <div key={sect.title} className="bg-surface-dark/50 border border-surface-border/30 p-6 rounded-3xl">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 border-b border-surface-border/20 pb-2">{sect.title}</h3>
                                            <ul className="space-y-2">
                                                {sect.items.map((item: string) => (
                                                    <li key={item} className="text-xs text-white flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
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
                                    <div className="space-y-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="bg-surface-dark border border-surface-border p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                                        <span className="material-symbols-outlined">psychology</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Análisis de Recuperación Semanal</h3>
                                                        <p className="text-[10px] text-text-secondary uppercase">Generado por Gemini AI • 15 Dic 2025</p>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors">download</span>
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
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                                                        <td className="px-6 py-4 text-xs font-bold text-white">{20 - i}/12/2025</td>
                                                        <td className="px-6 py-4 text-xs font-medium text-text-secondary uppercase">Well-being (WBQ)</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                                <span className="text-xs font-black text-white">{(85 - i * 2)}/100</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase">Completo</span>
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
            </div>
        </div>
    );
};

export default PlayerMedicalProfile;
