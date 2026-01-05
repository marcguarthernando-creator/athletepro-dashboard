import React from 'react';
import { mockPlayers } from '../services/mockPlayers';

const TeamDashboard: React.FC = () => {
    const disponibles = mockPlayers.filter(p => p.status === 'Disponible');
    const dudas = mockPlayers.filter(p => p.status === 'Duda');
    const bajas = mockPlayers.filter(p => p.status === 'Baja');

    // Mock treatments for today
    const treatments = [
        { name: 'Manuel Crujeiras', injury: 'Esguince Tobillo Grado II', time: '10:00 - Fisioterapia', type: 'Rehabilitación' },
        { name: 'Rafa Rodríguez', injury: 'Sobrecarga Isquios', time: '11:30 - Masaje Descarga', type: 'Mantenimiento' },
        { name: 'Emilis Prekivicius', injury: 'Molestias Rodilla', time: '12:00 - Valoración Médica', type: 'Evaluación' }
    ];

    const weekDays = [
        { day: 'LUN', date: '22', active: false },
        { day: 'MAR', date: '23', active: false },
        { day: 'MIÉ', date: '24', active: false },
        { day: 'JUE', date: '25', active: false },
        { day: 'VIE', date: '26', active: true },
        { day: 'SÁB', date: '27', active: false },
        { day: 'DOM', date: '28', active: false },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 md:p-10 bg-background-dark/30">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Dashboard Equipo</h1>
                    <p className="text-text-secondary text-base font-medium">Resumen general de disponibilidad y salud de la plantilla</p>
                </div>
            </header>

            {/* Status Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Available Players Box */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex flex-col items-center shadow-lg backdrop-blur-sm min-h-[220px]">
                    <div className="flex flex-col items-center mb-4 text-center">
                        <span className="text-5xl font-black text-emerald-400 mb-0.5">{disponibles.length}</span>
                        <span className="text-[10px] text-emerald-400 uppercase font-black tracking-widest">DISPONIBLES</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                        {disponibles.map(p => (
                            <span key={p.id} className="text-[11px] font-black text-white/90 uppercase tracking-tight text-center leading-none">
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* On Doubt Box */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex flex-col items-center shadow-lg backdrop-blur-sm min-h-[220px]">
                    <span className="text-5xl font-black text-amber-400 mb-1">{dudas.length}</span>
                    <span className="text-[10px] text-amber-400 uppercase font-black tracking-widest mb-4 text-center">EN DUDA</span>
                    <div className="flex flex-col items-center gap-2 w-full">
                        {dudas.map(p => (
                            <span key={p.id} className="text-[11px] font-black text-white/90 uppercase tracking-tight text-center leading-none">
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* In Risk Box */}
                <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl flex flex-col items-center shadow-lg backdrop-blur-sm min-h-[220px]">
                    <span className="text-5xl font-black text-rose-500 mb-1">{bajas.length}</span>
                    <span className="text-[10px] text-rose-500 uppercase font-black tracking-widest mb-4 text-center">BAJAS / RIESGO</span>
                    <div className="flex flex-col items-center gap-2 w-full">
                        {bajas.map(p => (
                            <span key={p.id} className="text-[11px] font-black text-white/90 uppercase tracking-tight text-center leading-none">
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Treatments Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">medical_services</span>
                            Tratamientos Hoy
                        </h3>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold">FECHA: {new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {treatments.map((t, idx) => (
                            <div key={idx} className="bg-surface-dark border border-surface-border p-4 rounded-xl hover:border-primary/30 transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-bold text-white text-sm">{t.name}</p>
                                    <span className="text-[10px] text-text-secondary opacity-50 font-bold uppercase">{t.type}</span>
                                </div>
                                <p className="text-[11px] text-text-secondary mb-2">{t.injury}</p>
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-[11px] font-black">{t.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Calendar */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-400">calendar_month</span>
                            Calendario Semanal
                        </h3>
                        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                            <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="GCal" className="w-4 h-4" />
                            <span className="text-[10px] text-blue-400 font-bold tracking-tight uppercase">Google Calendar Activo</span>
                        </div>
                    </div>

                    <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 shadow-xl relative overflow-hidden h-[400px]">
                        <div className="grid grid-cols-7 gap-px h-full">
                            {weekDays.map((wd, i) => (
                                <div key={i} className={`flex flex-col items-center h-full border-r border-surface-border/30 last:border-0 ${wd.active ? 'bg-primary/5' : ''}`}>
                                    <span className={`text-[10px] font-black tracking-widest mb-1 ${wd.active ? 'text-primary' : 'text-text-secondary'}`}>
                                        {wd.day}
                                    </span>
                                    <span className={`text-sm font-black mb-4 w-7 h-7 flex items-center justify-center rounded-full ${wd.active ? 'bg-primary text-background-dark scale-110 shadow-[0_0_15px_rgba(25,240,133,0.3)]' : 'text-white'}`}>
                                        {wd.date}
                                    </span>

                                    <div className="w-full flex flex-col gap-2 px-1">
                                        {i === 2 && (
                                            <div className="bg-blue-500/20 border-l-2 border-blue-500 p-1.5 rounded-r text-[9px]">
                                                <p className="font-bold text-blue-400 uppercase">Sesión Táctica</p>
                                                <p className="text-text-secondary opacity-70">10:00 - 11:30</p>
                                            </div>
                                        )}
                                        {i === 4 && (
                                            <>
                                                <div className="bg-primary/20 border-l-2 border-primary p-1.5 rounded-r text-[9px]">
                                                    <p className="font-bold text-primary uppercase">Entreno Equipo</p>
                                                    <p className="text-text-secondary opacity-70">09:00 - 11:00</p>
                                                </div>
                                                <div className="bg-amber-500/20 border-l-2 border-amber-500 p-1.5 rounded-r text-[9px]">
                                                    <p className="font-bold text-amber-400 uppercase">Consultas Med</p>
                                                    <p className="text-text-secondary opacity-70">12:00 - 14:00</p>
                                                </div>
                                            </>
                                        )}
                                        {i === 6 && (
                                            <div className="bg-rose-500/20 border-l-2 border-rose-500 p-1.5 rounded-r text-[9px]">
                                                <p className="font-bold text-rose-500 uppercase">Partido vs Joventut</p>
                                                <p className="text-text-secondary opacity-70">18:30</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDashboard;
