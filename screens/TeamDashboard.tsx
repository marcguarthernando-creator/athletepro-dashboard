import React, { useState, useEffect } from 'react';
import { Player, mockPlayers as fallbackMock } from '../services/mockPlayers';
import { getPlayers } from '../services/playerService';

const TeamDashboard: React.FC = () => {
    const [calendarId, setCalendarId] = useState('');
    const [isEditingCalendar, setIsEditingCalendar] = useState(false);
    const [tempCalendarId, setTempCalendarId] = useState('');

    // State for players
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedId = localStorage.getItem('team_calendar_id');
        if (savedId) {
            setCalendarId(savedId);
        }

        // Fetch players from Supabase
        const fetchPlayers = async () => {
            try {
                const data = await getPlayers();
                if (data.length > 0) {
                    setPlayers(data);
                } else {
                    // Fallback to mock if DB is empty or error
                    setPlayers(fallbackMock);
                }
            } catch (error) {
                console.error("Failed to fetch players", error);
                setPlayers(fallbackMock);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    const saveCalendarId = () => {
        const cleanedId = tempCalendarId.trim();
        if (cleanedId) {
            localStorage.setItem('team_calendar_id', cleanedId);
            setCalendarId(cleanedId);
            setIsEditingCalendar(false);
        }
    };

    const disponibles = players.filter(p => p.status === 'Disponible');
    const dudas = players.filter(p => p.status === 'Duda');
    const bajas = players.filter(p => p.status === 'Baja');

    // Mock treatments for today
    const treatments = [
        { name: 'Jorge González', injury: 'Esguince Tobillo Grado II', time: '10:00 - Fisioterapia', type: 'Rehabilitación' },
        { name: 'Pablo Torres', injury: 'Sobrecarga Isquios', time: '11:30 - Masaje Descarga', type: 'Mantenimiento' },
        { name: 'Lucas Vázquez', injury: 'Molestias Rodilla', time: '12:00 - Valoración Médica', type: 'Evaluación' }
    ];

    const calendarSrc = `https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FMadrid&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=WEEK&hl=es&src=${encodeURIComponent(calendarId)}`;

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 min-h-[500px]">
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
                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-400">calendar_month</span>
                            Calendario Equipo
                        </h3>
                        <button
                            onClick={() => setIsEditingCalendar(!isEditingCalendar)}
                            className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors"
                        >
                            <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="GCal" className="w-4 h-4" />
                            <span className="text-[10px] text-blue-400 font-bold tracking-tight uppercase">
                                {calendarId ? 'Configurar Calendar' : 'Vincular Calendar'}
                            </span>
                        </button>
                    </div>

                    {isEditingCalendar && (
                        <div className="mb-4 bg-surface-dark border border-blue-500/30 p-4 rounded-xl animate-in slide-in-from-top-2">
                            <p className="text-xs text-text-secondary mb-2 font-bold uppercase">Introduce SÓLO tu EMAIL de Gmail (No pegues un enlace):</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempCalendarId}
                                    onChange={(e) => setTempCalendarId(e.target.value)}
                                    placeholder="ej: usuario@gmail.com"
                                    className="flex-1 bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none uppercase"
                                />
                                <button
                                    onClick={saveCalendarId}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-blue-600 transition-colors"
                                >
                                    Guardar y Sincronizar
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">
                                *Aviso: Si ves un error 400, asegúrate de haber puesto solo el email. Si no carga eventos, verifica que el calendario sea público o estés logueado en este navegador.
                            </p>
                        </div>
                    )}

                    <div className="flex-1 bg-surface-dark border border-surface-border rounded-2xl overflow-hidden shadow-xl min-h-[400px] relative">
                        {calendarId ? (
                            <iframe
                                src={calendarSrc}
                                style={{ border: 0, width: '100%', height: '100%', filter: 'invert(0.93) hue-rotate(180deg)' }}
                                frameBorder="0"
                                scrolling="no"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary opacity-50 gap-4">
                                <span className="material-symbols-outlined text-6xl">calendar_today</span>
                                <p className="text-sm font-bold uppercase tracking-widest">No hay calendario vinculado</p>
                                <button
                                    onClick={() => setIsEditingCalendar(true)}
                                    className="text-primary text-xs font-bold underline decoration-2 underline-offset-4 hover:text-white transition-colors uppercase"
                                >
                                    Vincular ahora
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDashboard;
