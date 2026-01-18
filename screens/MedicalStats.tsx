import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InjuryEvolutionModal from './InjuryEvolutionModal';
import MedicalChatbot from './MedicalChatbot';

const MedicalStats: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
    const [activeMetric, setActiveMetric] = useState<any | null>(null);
    const [selectedInjuryReport, setSelectedInjuryReport] = useState<any | null>(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const injuryStats = [
        {
            label: 'Tobillo (LCL)',
            val: 45,
            color: 'bg-emerald-500',
            injuries: [
                { id: '1', player: 'Alejandro Guerra', injury: 'Esguince G2 Ligamento Lateral', photo: '/default-avatar.jpg', date: '12/10/2024', duration: '3 Semanas', severity: 'medium' },
                { id: '3', player: 'David Acosta', injury: 'Esguince G1', photo: '/default-avatar.jpg', date: '05/11/2024', duration: '1 Semana', severity: 'low' }
            ]
        },
        {
            label: 'Rodilla (LCA)',
            val: 20,
            color: 'bg-amber-500',
            injuries: [
                { id: '12', player: 'Babel Lipasi', injury: 'Rotura Parcial LCA (En tratamiento)', photo: '/default-avatar.jpg', date: '20/09/2024', duration: '4 Meses', severity: 'high' }
            ]
        },
        {
            label: 'Isquios',
            val: 15,
            color: 'bg-rose-500',
            injuries: [
                { id: '9', player: 'Manuel Crujeiras', injury: 'Rotura Fibrilar Bíceps Femoral', photo: '/default-avatar.jpg', date: '15/12/2024', duration: '6 Semanas', severity: 'medium' }
            ]
        },
        {
            label: 'Ingle',
            val: 12,
            color: 'bg-blue-500',
            injuries: [
                { id: '6', player: 'Louis Riga', injury: 'Pubalgia Crónica', photo: '/default-avatar.jpg', date: '01/09/2024', duration: 'Indefinido', severity: 'medium' }
            ]
        },
        {
            label: 'Espalda',
            val: 8,
            color: 'bg-indigo-500',
            injuries: [
                { id: '10', player: 'Diego Fernandez', injury: 'Contractura Lumbar', photo: '/default-avatar.jpg', date: '30/11/2024', duration: '5 Días', severity: 'low' }
            ]
        }
    ];

    const typeStats = [
        {
            label: 'Sobrecarga',
            val: 68,
            color: 'bg-amber-500',
            injuries: [
                { id: '6', player: 'Louis Riga', injury: 'Pubalgia Crónica', photo: '/default-avatar.jpg', date: '01/09/2024', duration: 'Indefinido', severity: 'medium' },
                { id: '10', player: 'Diego Fernandez', injury: 'Contractura Lumbar', photo: '/default-avatar.jpg', date: '30/11/2024', duration: '5 Días', severity: 'low' },
                { id: '9', player: 'Manuel Crujeiras', injury: 'Rotura Fibrilar Bíceps Femoral', photo: '/default-avatar.jpg', date: '15/12/2024', duration: '6 Semanas', severity: 'medium' }
            ]
        },
        {
            label: 'Traumática',
            val: 22,
            color: 'bg-rose-500',
            injuries: [
                { id: '1', player: 'Alejandro Guerra', injury: 'Esguince G2 Ligamento Lateral', photo: '/default-avatar.jpg', date: '12/10/2024', duration: '3 Semanas', severity: 'medium' },
                { id: '12', player: 'Babel Lipasi', injury: 'Rotura Parcial LCA', photo: '/default-avatar.jpg', date: '20/09/2024', duration: '4 Meses', severity: 'high' }
            ]
        },
        {
            label: 'Otras',
            val: 10,
            color: 'bg-blue-500',
            injuries: [
                { id: '3', player: 'David Acosta', injury: 'Contusión Fuerte en Cuádriceps', photo: '/default-avatar.jpg', date: '05/11/2024', duration: '3 Días', severity: 'low' }
            ]
        }
    ];

    const illnessStats = [
        {
            label: 'Gripe / Viral',
            val: 40,
            color: 'bg-teal-500',
            injuries: [
                { id: '2', player: 'Carlos Sainz', injury: 'Gripe A', photo: '/default-avatar.jpg', date: '10/01/2025', duration: '4 Días', severity: 'low' },
                { id: '4', player: 'Fernando Alonso', injury: 'Proceso Viral', photo: '/default-avatar.jpg', date: '02/01/2025', duration: '2 Días', severity: 'low' }
            ]
        },
        {
            label: 'Gastroenteritis',
            val: 30,
            color: 'bg-orange-500',
            injuries: [
                { id: '5', player: 'Marc Marquez', injury: 'Gastroenteritis', photo: '/default-avatar.jpg', date: '28/12/2024', duration: '3 Días', severity: 'low' }
            ]
        },
        {
            label: 'Otras',
            val: 30,
            color: 'bg-purple-500',
            injuries: [
                { id: '7', player: 'Rafa Nadal', injury: 'Migraña Fuerte', photo: '/default-avatar.jpg', date: '15/12/2024', duration: '1 Día', severity: 'low' }
            ]
        }
    ];

    const rankingStats = [
        {
            label: 'Bases',
            val: 12,
            color: 'bg-indigo-500',
            injuries: [
                { id: '1', player: 'Alejandro Guerra', injury: 'Esguince G2 Ligamento Lateral', photo: '/default-avatar.jpg', date: '12/10/2024', duration: '8 Partidos', severity: 'medium' }
            ]
        },
        {
            label: 'Aleros',
            val: 8,
            color: 'bg-pink-500',
            injuries: [
                { id: '9', player: 'Manuel Crujeiras', injury: 'Rotura Fibrilar', photo: '/default-avatar.jpg', date: '15/12/2024', duration: '5 Partidos', severity: 'medium' }
            ]
        },
        {
            label: 'Pivots',
            val: 24,
            color: 'bg-cyan-500',
            injuries: [
                { id: '12', player: 'Babel Lipasi', injury: 'Rotura ACL', photo: '/default-avatar.jpg', date: '20/09/2024', duration: '20+ Partidos', severity: 'high' }
            ]
        }
    ];

    const statsSections = [
        { id: 'sports', title: 'Lesión Deportiva', icon: 'sports_basketball', color: 'text-primary' },
        { id: 'type', title: 'Lesión Sobrecarga o Traumática', icon: 'troubleshoot', color: 'text-amber-500' },
        { id: 'illness', title: 'Enfermedad Común', icon: 'thermometer', color: 'text-rose-400' },
        { id: 'ranking', title: 'Partidos Perdidos (Ranking)', icon: 'format_list_numbered', color: 'text-blue-400' },
        { id: 'usage', title: 'Minutos Jugados (Uso)', icon: 'timer', color: 'text-emerald-400' },
        { id: 'heatmap', title: 'Mapas de Calor (Variables)', icon: 'distance', color: 'text-orange-400' },
        { id: 'timeline', title: 'Línea Temporal de la Temporada', icon: 'timeline', color: 'text-indigo-400' },
        { id: 'conclusions', title: 'Conclusiones del Equipo', icon: 'psychology', color: 'text-purple-400' },
    ];

    const StatDetailLayout = ({ title, data, onSelectMetric, activeMetric }: any) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
            {/* Left Col: Graph/List */}
            <div className="bg-[#161b22] p-8 rounded-3xl border border-white/5 flex flex-col">
                <h3 className="text-white font-bold mb-8 text-sm uppercase tracking-widest text-primary/80">{title}</h3>
                <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {data.map((item: any) => (
                        <div
                            key={item.label}
                            className={`group/item cursor-pointer relative transition-all duration-300 ${activeMetric?.label === item.label ? 'opacity-100 scale-[1.02]' : 'opacity-60 hover:opacity-100'}`}
                            onClick={() => onSelectMetric(item)}
                        >
                            <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase mb-3 px-1">
                                <span className={activeMetric?.label === item.label ? 'text-white' : ''}>{item.label}</span>
                                <span className={activeMetric?.label === item.label ? 'text-primary' : ''}>{item.val}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} shadow-lg shadow-${item.color.replace('bg-', '')}/20 transition-all duration-500`} style={{ width: `${item.val}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Col: Details Panel */}
            <div className="bg-[#161b22] p-8 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden transition-all duration-500">
                {activeMetric ? (
                    <div key={activeMetric.label} className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{activeMetric.label}</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{activeMetric.injuries.length} REGISTROS</p>
                            </div>
                            <button onClick={() => onSelectMetric(null)} className="text-xs font-bold text-gray-500 hover:text-white uppercase">
                                Volver
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                            {activeMetric.injuries.map((inj: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="bg-[#0a0d10] p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                                    onClick={() => setSelectedInjuryReport(inj)}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <img src={inj.photo} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase group-hover:text-primary transition-colors">{inj.player}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{inj.date}</p>
                                        </div>
                                        <div className={`ml-auto px-2 py-1 rounded text-[9px] font-black uppercase ${inj.severity === 'high' ? 'bg-rose-500/10 text-rose-500' :
                                            inj.severity === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-emerald-500/10 text-emerald-500'
                                            }`}>
                                            {inj.severity === 'medium' ? 'Media' : inj.severity === 'high' ? 'Grave' : 'Leve'}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[11px] text-gray-300 font-medium leading-tight mb-1">{inj.injury}</p>
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[10px] text-gray-600">timer</span>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">{inj.duration} de baja</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-primary font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            Ver Informe <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500">
                        <div className="w-24 h-24 rounded-full bg-[#0a0d10] border-4 border-[#1f262e] flex items-center justify-center mb-8 relative">
                            <span className="material-symbols-outlined text-5xl text-gray-600">analytics</span>
                        </div>
                        <p className="text-xl font-bold text-white uppercase tracking-widest mb-2">Selecciona un dato</p>
                        <p className="text-gray-500 text-sm max-w-[200px]">Haz clic en las barras de la izquierda para ver el desglose detallado.</p>
                    </div>
                )}
            </div>
        </div>
    );

    const renderDetail = () => {
        if (!selectedDetail) return null;

        const section = statsSections.find(s => s.id === selectedDetail);
        if (!section) return null;

        // Determine data source based on section
        let currentData = null;
        let chartTitle = '';
        let content;

        switch (selectedDetail) {
            case 'sports':
                currentData = injuryStats;
                chartTitle = 'Localización de Lesiones';
                break;
            case 'type':
                currentData = typeStats;
                chartTitle = 'Tipo de Lesión (Mecanismo)';
                break;
            case 'illness':
                currentData = illnessStats;
                chartTitle = 'Enfermedades Comunes';
                break;
            case 'ranking':
                currentData = rankingStats; // Using rankingStats grouped by position
                chartTitle = 'Partidos Perdidos por Posición';
                break;
            default:
                // Fallback for others using placeholders if needed or just empty
                break;
        }

        if (currentData && ['sports', 'type', 'illness'].includes(selectedDetail)) {
            content = (
                <StatDetailLayout
                    title={chartTitle}
                    data={currentData}
                    activeMetric={activeMetric}
                    onSelectMetric={setActiveMetric}
                />
            );
        } else if (selectedDetail === 'ranking') {
            content = (
                <div className="bg-[#161b22] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Jugador</th>
                                <th className="px-4 py-4 text-center">Partidos Perdidos</th>
                                <th className="px-4 py-4 text-center">Coste % Minutos</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: 'Alejandro Guerra', games: 8, cost: 24, status: 'Rehabilitación' },
                                { name: 'Jorge González', games: 5, cost: 15, status: 'Rehabilitación' },
                                { name: 'Pablo Torres', games: 2, cost: 6, status: 'Disponible' },
                                { name: 'David Acosta', games: 1, cost: 3, status: 'En Duda' }
                            ].map(p => (
                                <tr key={p.name} className="hover:bg-white/[0.02]">
                                    <td className="px-6 py-4 text-sm font-bold text-white uppercase">{p.name}</td>
                                    <td className="px-4 py-4 text-center font-bold text-rose-500">{p.games}</td>
                                    <td className="px-4 py-4 text-center text-gray-500">{p.cost}%</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[10px] font-black px-2 py-1 rounded bg-white/5 text-gray-400 uppercase">{p.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            content = (
                <div className="bg-[#161b22] p-20 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center h-[500px]">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                        <span className="material-symbols-outlined text-4xl text-primary">{section.icon}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Simulando Análisis de {section.title}</h3>
                    <p className="text-gray-500 max-w-sm">Este módulo está generando métricas avanzadas a partir de los datos históricos. Pronto podrás ver el desglose completo.</p>
                </div>
            );
        }

        return (
            <div className="fixed inset-0 z-50 bg-[#0a0d10]/95 backdrop-blur-xl p-6 md:p-10 flex flex-col">
                {/* Modal for Report */}
                {selectedInjuryReport && (
                    <InjuryEvolutionModal
                        injury={{
                            ...selectedInjuryReport,
                            injuryName: selectedInjuryReport.injury,
                            playerName: selectedInjuryReport.player,
                            daysActive: 45 // Mock for historical view
                        }}
                        onClose={() => setSelectedInjuryReport(null)}
                    />
                )}

                <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { setSelectedDetail(null); setActiveMetric(null); }}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-white">arrow_back</span>
                        </button>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h2>
                            <p className="text-gray-500 text-sm italic">Análisis detallado de la temporada 2024/25</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar">
                    {content}
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative p-6 md:p-10 bg-[#0a0d10]">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Estadística de Lesiones</h1>
                <p className="text-gray-500 text-base">Análisis detallado de la salud y disponibilidad de la plantilla</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                {statsSections.map((section) => (
                    <div
                        key={section.id}
                        onClick={() => setSelectedDetail(section.id)}
                        className="bg-[#161b22] p-8 rounded-3xl border border-white/5 hover:border-primary/50 hover:bg-[#1c2128] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white -rotate-45">arrow_forward</span>
                        </div>

                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${section.color.includes('primary') ? 'bg-primary/10' :
                                section.color.includes('amber') ? 'bg-amber-500/10' :
                                    section.color.includes('rose') ? 'bg-rose-500/10' :
                                        section.color.includes('blue') ? 'bg-blue-500/10' :
                                            section.color.includes('emerald') ? 'bg-emerald-500/10' :
                                                section.color.includes('orange') ? 'bg-orange-500/10' :
                                                    section.color.includes('indigo') ? 'bg-indigo-500/10' :
                                                        'bg-purple-500/10'
                            }`}>
                            <span className={`material-symbols-outlined text-2xl ${section.color}`}>{section.icon}</span>
                        </div>

                        <h2 className="text-white font-black uppercase text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                            {section.title}
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                            Haz clic para ver el desglose
                        </p>

                        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Ver Estadísticas</span>
                            <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                        </div>
                    </div>
                ))}
            </div>

            {renderDetail()}

            {/* Chatbot FAB */}
            <button
                onClick={() => setIsChatbotOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group border border-white/20"
            >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 group-hover:opacity-40"></div>
                <span className="material-symbols-outlined text-white text-2xl">smart_toy</span>
            </button>

            {/* Chatbot Interface */}
            <MedicalChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
        </div >
    );
};

export default MedicalStats;
