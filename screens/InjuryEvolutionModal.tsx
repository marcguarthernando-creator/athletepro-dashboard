import React, { useState } from 'react';

interface InjuryEvolutionModalProps {
    injury: {
        id: string; // Player ID
        playerName: string;
        photo: string;
        injuryName: string;
        daysActive: number;
        severity: 'low' | 'medium' | 'high';
        diagnosis?: string; // Optional if not available in parent
    };
    onClose: () => void;
}

const InjuryEvolutionModal: React.FC<InjuryEvolutionModalProps> = ({ injury, onClose }) => {
    const [filter, setFilter] = useState<'all' | 'medical' | 'physio'>('all');

    // Generate mock timeline based on daysActive
    const reports = Array.from({ length: Math.ceil(injury.daysActive / 2) + 2 }).map((_, i) => {
        const daysAgo = injury.daysActive - (i * 2);
        if (daysAgo < 0) return null;

        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        if (daysAgo === injury.daysActive) {
            return {
                id: `rep-${i}`,
                date: dateStr,
                type: 'medical',
                author: 'Dr. Sergio Mora',
                role: 'Jefe Servicios Médicos',
                title: 'INFORME INICIAL DE LESIÓN',
                content: `Jugador refiere dolor agudo tras mecanismo traumático. Exploración positiva. Se solicita resonancia magnética urgente.`,
                tags: ['Diagnóstico', 'Urgencia']
            };
        } else if (daysAgo === injury.daysActive - 1) {
            return {
                id: `rep-${i}`,
                date: dateStr,
                type: 'medical',
                author: 'Dr. Sergio Mora',
                role: 'Jefe Servicios Médicos',
                title: 'RESULTADOS PRUEBAS IMAGEN',
                content: `RM confirma ${injury.injuryName}. Se establece protocolo conservador y plazos de recuperación estimados según evolución.`,
                tags: ['Resonancia', 'Confirmación']
            };
        } else {
            const isPhysio = Math.random() > 0.3;
            return {
                id: `rep-${i}`,
                date: dateStr,
                type: isPhysio ? 'physio' : 'medical',
                author: isPhysio ? 'Santi García' : 'Dr. Sergio Mora',
                role: isPhysio ? 'Fisioterapeuta' : 'Médico',
                title: isPhysio ? 'SESIÓN DE REHABILITACIÓN' : 'REVISIÓN DE CONTROL',
                content: isPhysio
                    ? 'Trabajo de movilidad, descarga miofascial y ejercicios isométricos suaves. Buena tolerancia al dolor (VAS 2/10).'
                    : 'Evolución favorable. Se autoriza progresión a carga parcial en gimnasio.',
                tags: isPhysio ? ['Terapia Manual', 'Gym'] : ['Evolución', 'Control']
            };
        }
    }).filter(Boolean).reverse(); // Newest first

    const filteredReports = reports.filter(r => {
        if (!r) return false;
        if (filter === 'all') return true;
        return r.type === filter;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-[#161b22] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-6 bg-[#1f262e] border-b border-white/10 shrink-0">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img src={injury.photo} alt={injury.playerName} className="w-14 h-14 rounded-full border-2 border-white/10" />
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#1f262e] flex items-center justify-center ${injury.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                                    <span className="material-symbols-outlined text-[10px] text-white">local_hospital</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-white uppercase tracking-tight">{injury.playerName}</h1>
                                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">{injury.injuryName}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {(['all', 'medical', 'physio'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f
                                    ? 'bg-primary text-background-dark shadow-lg shadow-primary/20 transform scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {f === 'all' ? 'Todos' : f === 'medical' ? 'Informes Médicos' : 'Fisioterapia'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {filteredReports.map((report: any, idx) => (
                        <div key={report.id} className="relative pl-8 before:absolute before:left-3 before:top-8 before:bottom-[-24px] before:w-px before:bg-white/5 last:before:hidden group">
                            <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-[#161b22] flex items-center justify-center ${report.type === 'medical' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                                <span className="material-symbols-outlined text-[10px] text-white">
                                    {report.type === 'medical' ? 'medical_services' : 'physical_therapy'}
                                </span>
                            </div>

                            <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-tight mb-1">{report.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{report.author}</span>
                                            <span className="text-[10px] text-gray-600">•</span>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">{report.role}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded uppercase tracking-wider">{report.date}</span>
                                </div>

                                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                                    {report.content}
                                </p>

                                <div className="flex gap-2">
                                    {report.tags.map((tag: string) => (
                                        <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${report.type === 'medical' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                                            }`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-white/10 bg-[#1f262e] flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                        Total Informes: {filteredReports.length}
                    </span>

                </div>
            </div>
        </div>
    );
};

export default InjuryEvolutionModal;
