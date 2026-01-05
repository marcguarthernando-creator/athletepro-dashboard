import React, { useState } from 'react';

const MedicalStats: React.FC = () => {
    const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

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

    const renderDetail = () => {
        if (!selectedDetail) return null;

        const section = statsSections.find(s => s.id === selectedDetail);
        if (!section) return null;

        return (
            <div className="fixed inset-0 z-50 bg-[#0a0d10]/95 backdrop-blur-xl p-6 md:p-10 flex flex-col">
                <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSelectedDetail(null)}
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
                    {/* Mock Content based on ID */}
                    {selectedDetail === 'sports' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-[#161b22] p-8 rounded-3xl border border-white/5">
                                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-primary/80">Localización de Lesiones</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Tobillo (LCL)', val: 45, color: 'bg-emerald-500' },
                                        { label: 'Rodilla (LCA)', val: 20, color: 'bg-amber-500' },
                                        { label: 'Isquios', val: 15, color: 'bg-rose-500' },
                                        { label: 'Ingle', val: 12, color: 'bg-blue-500' },
                                        { label: 'Espalda', val: 8, color: 'bg-indigo-500' }
                                    ].map(item => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-2">
                                                <span>{item.label}</span>
                                                <span>{item.val}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#161b22] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-6xl text-primary mb-4">sports_basketball</span>
                                <p className="text-white font-black text-xl uppercase tracking-tighter">18 Lesiones Totales</p>
                                <p className="text-gray-500 text-sm mt-2 text-center max-w-[250px]">El 60% de las lesiones ocurren durante la primera mitad de la temporada.</p>
                            </div>
                        </div>
                    )}

                    {selectedDetail === 'type' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Sobrecarga', val: 68, icon: 'repeat' },
                                { label: 'Traumática', val: 22, icon: 'warning' },
                                { label: 'Otras', val: 10, icon: 'help' }
                            ].map(item => (
                                <div key={item.label} className="bg-[#161b22] p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-amber-500 text-3xl">{item.icon}</span>
                                    </div>
                                    <span className="text-4xl font-black text-white">{item.val}%</span>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedDetail === 'ranking' && (
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
                                        { name: 'Manuel Crujeiras', games: 5, cost: 15, status: 'Rehabilitación' },
                                        { name: 'Rafa Rodríguez', games: 2, cost: 6, status: 'Disponible' },
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
                    )}

                    {['illness', 'usage', 'heatmap', 'timeline', 'conclusions'].includes(selectedDetail) && (
                        <div className="bg-[#161b22] p-20 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                                <span className="material-symbols-outlined text-4xl text-primary">{section.icon}</span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Simulando Análisis de {section.title}</h3>
                            <p className="text-gray-500 max-w-sm">Este módulo está generando métricas avanzadas a partir de los datos históricos. Pronto podrás ver el desglose completo.</p>
                        </div>
                    )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {statsSections.map((section) => (
                    <div
                        key={section.id}
                        onClick={() => setSelectedDetail(section.id)}
                        className="bg-[#161b22] border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-all group cursor-pointer hover:bg-primary/5 flex flex-col gap-4 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>

                        <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300`}>
                            <span className={`material-symbols-outlined ${section.color} text-3xl`}>{section.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">{section.title}</h3>
                            <p className="text-gray-500 text-xs mt-2 font-medium">Haz clic para ver el desglose detallado y análisis de datos.</p>
                        </div>
                        <div className="mt-auto pt-4 flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest transition-all translate-x-0 group-hover:translate-x-2">
                            Ver estadísticas <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                ))}
            </div>

            {renderDetail()}
        </div>
    );
};

export default MedicalStats;
