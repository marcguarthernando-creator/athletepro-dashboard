import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '../contexts/TeamContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import TeamSelector from '../components/TeamSelector';

import InjuryEvolutionModal from './InjuryEvolutionModal';

interface ActiveInjury {
    id: string; // Player ID
    injuryId: string;
    playerName: string;
    photo: string;
    injuryName: string;
    treatment: string;
    estimatedReturn: string;
    severity: 'low' | 'medium' | 'high';
    daysActive: number;
    status: 'Activa' | 'Recuperada';
    date: string; // YYYY-MM-DD
    type: string; // Muscular, Articular, Tendinopathy...
    zone: string; // Thigh, Knee, Ankle...
    diagnosis: string;
}

const ActiveInjuries: React.FC = () => {
    const navigate = useNavigate();
    const { selectedTeam } = useTeam();
    const { t } = useLanguage();
    const { userEmail } = useAuth();

    // Role-based path logic
    const isFisio = userEmail === 'fisio@athletepro.com';
    const isPrepa = userEmail === 'prepa@athletepro.com';
    const basePath = isFisio ? '/fisio' : isPrepa ? '/prepa' : '/medical';

    const [injuries, setInjuries] = useState<ActiveInjury[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInjury, setSelectedInjury] = useState<ActiveInjury | null>(null);

    // View Mode: Active or Total
    const [viewMode, setViewMode] = useState<'active' | 'total'>('active');

    // Filters
    const [filterDateSort, setFilterDateSort] = useState<'desc' | 'asc'>('desc');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterZone, setFilterZone] = useState<string>('all');
    const [filterPlayer, setFilterPlayer] = useState<string>('all');

    useEffect(() => {
        const loadInjuries = async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                const allInjuries: ActiveInjury[] = [
                    // Active Injuries
                    {
                        id: '11',
                        injuryId: 'inj1',
                        playerName: 'Rafa Rodríguez',
                        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        injuryName: 'Esguince LCL',
                        treatment: 'Fisioterapia y Carga Progresiva',
                        estimatedReturn: '15 Nov',
                        severity: 'medium',
                        daysActive: 12,
                        status: 'Activa',
                        date: '2023-11-03',
                        type: 'Articular',
                        zone: 'Rodilla',
                        diagnosis: 'Esguince de ligamento colateral lateral grado II'
                    },
                    {
                        id: '3',
                        injuryId: 'inj2',
                        playerName: 'David Acosta',
                        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        injuryName: 'Tendinopatía Aquilea',
                        treatment: 'Excéntricos y Ondas de Choque',
                        estimatedReturn: '01 Dic',
                        severity: 'high',
                        daysActive: 25,
                        status: 'Activa',
                        date: '2023-10-21',
                        type: 'Tendinopatía',
                        zone: 'Tobillo',
                        diagnosis: 'Tendinopatía de la porción media del Aquiles'
                    },
                    // Recovered / Historical Injuries (Mock Data)
                    {
                        id: '11',
                        injuryId: 'hist1',
                        playerName: 'Rafa Rodríguez',
                        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        injuryName: 'Sobrecarga Isquios',
                        treatment: 'Alta Médica',
                        estimatedReturn: '-',
                        severity: 'low',
                        daysActive: 5,
                        status: 'Recuperada',
                        date: '2023-09-10',
                        type: 'Muscular',
                        zone: 'Muslo',
                        diagnosis: 'Sobrecarga en bíceps femoral'
                    },
                    {
                        id: '6',
                        injuryId: 'hist2',
                        playerName: 'Carlos Méndez',
                        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        injuryName: 'Contractura Gemelo',
                        treatment: 'Alta Médica',
                        estimatedReturn: '-',
                        severity: 'low',
                        daysActive: 3,
                        status: 'Recuperada',
                        date: '2023-08-22',
                        type: 'Muscular',
                        zone: 'Gemelo',
                        diagnosis: 'Contractura en gastrocnemio medial'
                    }
                ];

                let filtered = allInjuries;
                if (selectedTeam === 'Primer Equipo') {
                    const allowedIds = ['3', '6', '11', '12'];
                    filtered = allInjuries.filter(inj => allowedIds.includes(inj.id));
                }

                setInjuries(filtered);
                setLoading(false);
            }, 800);
        };
        loadInjuries();
    }, [selectedTeam]);

    // Derived Lists based on ViewMode and Filters
    const displayedInjuries = injuries.filter(inj => {
        // Mode Filter
        if (viewMode === 'active' && inj.status !== 'Activa') return false;

        // Advanced Filters (Apply only in Total/History mode effectively, but logic works for both if needed)
        // User asked filters for "Total" view, but applying them generally is also fine.
        if (viewMode === 'total') {
            if (filterType !== 'all' && inj.type !== filterType) return false;
            if (filterZone !== 'all' && inj.zone !== filterZone) return false;
            if (filterPlayer !== 'all' && inj.playerName !== filterPlayer) return false;
        }
        return true;
    }).sort((a, b) => {
        // Date Sort
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return filterDateSort === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Unique values for filters
    const uniqueTypes = Array.from(new Set(injuries.map(i => i.type)));
    const uniqueZones = Array.from(new Set(injuries.map(i => i.zone)));
    const uniquePlayers = Array.from(new Set(injuries.map(i => i.playerName)));

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 relative">
            {selectedInjury && (
                <InjuryEvolutionModal
                    injury={selectedInjury as any} // Cast if interface mismatch slightly
                    onClose={() => setSelectedInjury(null)}
                />
            )}

            <header className="mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">LESIONES</h1>
                    <p className="text-gray-500 text-sm">{t('activeInjuriesScreen.subtitle')}</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                    {/* View Switcher */}
                    <div className="bg-[#161b22] p-1 rounded-xl flex gap-1 border border-white/5 order-2 md:order-1 self-start">
                        <button
                            onClick={() => setViewMode('active')}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'active' ? 'bg-primary text-background-dark' : 'text-gray-500 hover:text-white'}`}
                        >
                            Activas
                        </button>
                        <button
                            onClick={() => setViewMode('total')}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'total' ? 'bg-primary text-background-dark' : 'text-gray-500 hover:text-white'}`}
                        >
                            Total Temporada
                        </button>
                    </div>
                    <div className="order-1 md:order-2 self-start md:self-auto">
                        <TeamSelector />
                    </div>
                </div>
            </header>

            {/* Filter Bar (Only visible in Total Mode) */}
            {viewMode === 'total' && (
                <div className="mb-8 p-4 bg-[#161b22] border border-white/5 rounded-2xl flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mr-2">
                        <span className="material-symbols-outlined text-primary">filter_list</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">FILTRAR POR:</span>
                    </div>

                    <div className="flex flex-wrap gap-3 flex-1">
                        {/* Date Sort */}
                        <div className="relative group">
                            <select
                                value={filterDateSort}
                                onChange={(e) => setFilterDateSort(e.target.value as 'asc' | 'desc')}
                                className="bg-background-dark border border-white/10 text-white text-[10px] font-black uppercase py-2 pl-3 pr-8 rounded-lg outline-none focus:border-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
                            >
                                <option value="desc">Fecha (Recientes)</option>
                                <option value="asc">Fecha (Antiguas)</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">expand_more</span>
                        </div>

                        {/* Player Filter */}
                        <div className="relative group">
                            <select
                                value={filterPlayer}
                                onChange={(e) => setFilterPlayer(e.target.value)}
                                className="bg-background-dark border border-white/10 text-white text-[10px] font-black uppercase py-2 pl-3 pr-8 rounded-lg outline-none focus:border-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
                            >
                                <option value="all">JUGADOR (TODOS)</option>
                                {uniquePlayers.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">expand_more</span>
                        </div>

                        {/* Type Filter */}
                        <div className="relative group">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="bg-background-dark border border-white/10 text-white text-[10px] font-black uppercase py-2 pl-3 pr-8 rounded-lg outline-none focus:border-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
                            >
                                <option value="all">TIPO (TODOS)</option>
                                {uniqueTypes.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">expand_more</span>
                        </div>

                        {/* Zone Filter */}
                        <div className="relative group">
                            <select
                                value={filterZone}
                                onChange={(e) => setFilterZone(e.target.value)}
                                className="bg-background-dark border border-white/10 text-white text-[10px] font-black uppercase py-2 pl-3 pr-8 rounded-lg outline-none focus:border-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
                            >
                                <option value="all">ZONA (TODAS)</option>
                                {uniqueZones.map(z => <option key={z} value={z}>{z.toUpperCase()}</option>)}
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-primary animate-pulse">{t('activeInjuriesScreen.loading')}</span>
                </div>
            ) : displayedInjuries.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 border border-white/5 rounded-3xl bg-[#161b22]">
                    <span className="material-symbols-outlined text-4xl text-gray-600 mb-4">check_circle</span>
                    <p className="text-gray-400 font-bold uppercase text-sm">No se encontraron lesiones con estos filtros.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {displayedInjuries.map((injury) => (
                        <div key={injury.injuryId} className={`bg-[#161b22] border ${injury.status === 'Activa' ? 'border-amber-500/20 hover:border-amber-500/50' : 'border-white/5 hover:border-primary/30'} rounded-3xl overflow-hidden shadow-2xl transition-all group relative`}>
                            {/* Status/Gravity Indicator */}
                            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${injury.status === 'Recuperada'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : injury.severity === 'high' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'
                                }`}>
                                {injury.status === 'Recuperada' ? 'RECUPERADA' : `${t('activeInjuriesScreen.priority')}: ${injury.severity === 'high' ? 'ALTA' : 'MEDIA'}`}
                            </div>

                            <div className="p-6">
                                {/* Profile Section */}
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="relative cursor-pointer group/img" onClick={() => navigate(`${basePath}/players/${injury.id}`, { state: { tab: 'injuries' } })}>
                                        <img src={injury.photo} alt={injury.playerName} className={`w-20 h-20 rounded-2xl object-cover border-2 transition-colors ${injury.status === 'Activa' ? 'border-amber-500/20 group-hover/img:border-amber-500' : 'border-white/5 group-hover/img:border-primary'}`} />
                                        {injury.status === 'Activa' && (
                                            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-[#161b22] ${injury.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                                        )}
                                    </div>
                                    <div className="cursor-pointer group/txt" onClick={() => navigate(`${basePath}/players/${injury.id}`, { state: { tab: 'injuries' } })}>
                                        <h2 className={`text-xl font-black uppercase leading-none mb-1 transition-colors ${injury.status === 'Activa' ? 'text-white group-hover/txt:text-amber-500' : 'text-gray-400 group-hover/txt:text-white'}`}>{injury.playerName}</h2>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                            {injury.status === 'Activa' ? `${t('activeInjuriesScreen.inTreatment')} ${injury.daysActive} ${t('activeInjuriesScreen.days')}` : `RECUPERADA • ${injury.date}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Injury Details */}
                                <div className="space-y-6">
                                    <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`material-symbols-outlined text-lg ${injury.status === 'Activa' ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                {injury.status === 'Activa' ? 'emergency' : 'check_circle'}
                                            </span>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('activeInjuriesScreen.activeInjury')}</p>
                                        </div>
                                        <p className="text-sm font-bold text-white uppercase cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedInjury(injury)}>
                                            {injury.injuryName}
                                        </p>
                                        {viewMode === 'total' && (
                                            <p className="text-[9px] text-gray-500 mt-1 uppercase font-bold tracking-wider">{injury.type} • {injury.zone}</p>
                                        )}
                                    </div>

                                    {injury.status === 'Activa' ? (
                                        <>
                                            <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-primary text-lg">medical_services</span>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('activeInjuriesScreen.currentTreatment')}</p>
                                                </div>
                                                <p className="text-xs font-medium text-gray-300 leading-relaxed italic">{injury.treatment}</p>
                                            </div>

                                            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary">event_repeat</span>
                                                    <div>
                                                        <p className="text-[9px] text-primary/70 font-black uppercase tracking-tighter">{t('activeInjuriesScreen.estimatedReturn')}</p>
                                                        <p className="text-sm font-black text-primary uppercase">{injury.estimatedReturn}</p>
                                                    </div>
                                                </div>
                                                <div className="h-10 w-px bg-primary/20"></div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] text-gray-500 font-black uppercase">{t('activeInjuriesScreen.progress')}</span>
                                                    <span className="text-sm font-black text-white">
                                                        {injury.severity === 'high' ? '45%' : '80%'}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined text-emerald-500">history</span>
                                                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">ESTADO FINAL</p>
                                            </div>
                                            <p className="text-xs font-medium text-emerald-200">Jugador recuperado y con alta médica.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveInjuries;
