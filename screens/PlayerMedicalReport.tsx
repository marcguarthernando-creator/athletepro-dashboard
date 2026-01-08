import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PlayerMedicalReport: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const reportRef = useRef<HTMLDivElement>(null);

    const player = mockPlayers.find(p => p.id === id);

    if (!player) {
        return <div className="p-10 text-white">Jugador no encontrado</div>;
    }

    const downloadPDF = async () => {
        if (!reportRef.current) return;

        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Format: MM_DD_AA_NOMBRE_APELLIDO.pdf
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const aa = String(now.getFullYear()).slice(-2);
        const nameFormatted = player.name.toUpperCase().replace(/\s+/g, '_');

        pdf.save(`${mm}_${dd}_${aa}_${nameFormatted}.pdf`);
    };

    const sendEmail = () => {
        const subject = `Informe Médico Deportivo - ${player.name}`;
        const body = `Adjunto informe médico de ${player.name} con fecha ${new Date().toLocaleDateString()}.`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background-dark/30 overflow-hidden">
            {/* Top Toolbar */}
            <div className="h-16 flex items-center px-8 bg-background-dark/50 border-b border-surface-border/50 justify-between flex-none">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/medical/players')}
                        className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Volver
                    </button>
                    <div className="h-6 w-px bg-surface-border/50"></div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={downloadPDF}
                            className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all flex items-center justify-center shadow-lg group"
                            title="Descargar PDF"
                        >
                            <span className="material-symbols-outlined">download</span>
                        </button>
                        <button
                            onClick={sendEmail}
                            className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center shadow-lg group"
                            title="Enviar por Email"
                        >
                            <span className="material-symbols-outlined">mail</span>
                        </button>
                    </div>
                </div>
                <div>
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Generador de Informes v2.0</span>
                </div>
            </div>

            {/* Report Container */}
            <div className="flex-1 overflow-y-auto p-10 flex justify-center items-start bg-[#1e2329]/50">
                <div
                    ref={reportRef}
                    className="w-[210mm] min-h-[297mm] bg-white text-[#1a1f24] p-10 relative shadow-2xl flex flex-col mb-10"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {/* Top Meta Info (Metadata identical to reference) */}
                    <div className="flex justify-between items-start text-[8px] text-slate-500 font-bold mb-4 px-2 tracking-tighter">
                        <div>12_26_25_{player.name.toUpperCase().replace(/\s+/g, '_')}</div>
                        <div>25/12/25 13:51</div>
                    </div>

                    {/* Main Banner (Solid blue matching reference) */}
                    <div className="bg-[#1e3a8a] text-white py-2 px-6 flex justify-between items-center mb-6">
                        <h1 className="text-[16px] font-black uppercase tracking-[0.05em]">INFORME MÉDICO DEPORTIVO - CB BALONCESTO</h1>
                        <div className="w-5 h-5 flex items-center justify-center">
                            <img src="/escudo-cbc.png" alt="Logo" className="w-4 h-4 object-contain brightness-0 invert" />
                        </div>
                    </div>

                    {/* Patient Profile Row (Horizontal per reference) */}
                    <div className="flex items-center gap-8 mb-8 px-2">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-100 flex-none bg-slate-50">
                            <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-5 gap-0 flex-1 h-full">
                            <div className="px-4 py-1 border-r border-slate-100 last:border-0">
                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">PACIENTE</p>
                                <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{player.name}</p>
                            </div>
                            <div className="px-4 py-1 border-r border-slate-100 last:border-0">
                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">EDAD</p>
                                <p className="text-[10px] font-bold text-slate-800">20 años</p>
                            </div>
                            <div className="px-4 py-1 border-r border-slate-100 last:border-0">
                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">FECHA</p>
                                <p className="text-[10px] font-bold text-slate-800">21/12/2025</p>
                            </div>
                            <div className="px-4 py-1 border-r border-slate-100 last:border-0">
                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">POSICIÓN</p>
                                <p className="text-[10px] font-black text-slate-800 uppercase leading-none">{player.position}</p>
                            </div>
                            <div className="px-4 py-1 border-r border-slate-100 last:border-0">
                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">PERÍODO</p>
                                <p className="text-[10px] font-black text-[#1e3a8a] uppercase italic leading-none">HOY</p>
                            </div>
                        </div>
                    </div>

                    {/* Parte 1: Disponibilidad */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                            <h2 className="text-[9px] font-black text-[#1e3a8a] uppercase tracking-widest">PARTE 1: DISPONIBILIDAD PARA JUGAR</h2>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-lg px-6 py-2.5 flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full bg-[#10b981]`}></div>
                                <span className="text-[11px] font-black uppercase tracking-tight text-[#1e3a8a]">
                                    ESTADO: RIESGO CRÍTICO
                                </span>
                            </div>
                            <div className="text-[11px] font-black text-[#1e3a8a] uppercase tracking-tight">
                                RIESGO: 99%
                            </div>
                        </div>

                        <div className="overflow-hidden border border-slate-100 rounded-md">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#1e3a8a] text-white">
                                    <tr>
                                        <th className="px-5 py-2.5 text-[8px] font-black uppercase tracking-widest">HERRAMIENTA</th>
                                        <th className="px-5 py-2.5 text-[8px] font-black uppercase tracking-widest">VALOR</th>
                                        <th className="px-5 py-2.5 text-[8px] font-black uppercase tracking-widest">RANGO</th>
                                        <th className="px-5 py-2.5 text-[8px] font-black uppercase tracking-widest">SEMÁFORO</th>
                                        <th className="px-5 py-2.5 text-[8px] font-black uppercase tracking-widest">VARIACIÓN</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-inter">
                                    {[
                                        { t: 'WBQ Promedio', v: '1.2', r: '< 3.0', s: 'NORMAL', sc: 'bg-[#10b981]', sv: '-0.2' },
                                        { t: 'Fatiga (WBQ)', v: '6/7', r: '> 3', s: 'ATENCIÓN', sc: 'bg-[#f59e0b]', sv: '0' },
                                        { t: 'Dolor Muscular', v: '5/7', r: '> 3', s: 'ATENCIÓN', sc: 'bg-[#f59e0b]', sv: '-1' },
                                        { t: 'AAL Máximo', v: '610', r: '< 400', s: 'ATENCIÓN', sc: 'bg-[#f59e0b]', sv: 'vs prev' },
                                        { t: 'RHR (Whoop)', v: '58 BPM', r: '50-65', s: 'NORMAL', sc: 'bg-[#10b981]', sv: 'Estable' },
                                        { t: 'HRV (Whoop)', v: '45 ms', r: '40-60', s: 'NORMAL', sc: 'bg-[#10b981]', sv: '+2 ms' },
                                        { t: 'Minutos Juego', v: '12 min', r: 'Std', s: 'NORMAL', sc: 'bg-[#10b981]', sv: 'Media: 24' },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-5 py-2.5 text-[9px] font-bold text-slate-700 uppercase tracking-tight">{row.t}</td>
                                            <td className="px-5 py-2.5 text-[9px] font-black text-slate-800">{row.v}</td>
                                            <td className="px-5 py-2.5 text-[8px] text-slate-400 font-bold">{row.r}</td>
                                            <td className="px-5 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${row.sc}`}></div>
                                                    <span className="text-[7px] font-black uppercase tracking-widest text-slate-400">{row.s}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-2.5 text-[9px] font-bold text-slate-500">{row.sv}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Parte 2: Information Specific by Role */}
                    <div className="mb-8 underline-none">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#1e3a8a] text-[14px]">groups</span>
                            <h2 className="text-[9px] font-black text-[#1e3a8a] uppercase tracking-widest">PARTE 2: INFORMACIÓN ESPECÍFICA POR ROL</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { r: 'MÉDICO', i: 'medical_services', c: 'Hallaegos: Adaptación fisiológica normal. Sin desviaciones.', a: 'AUTORIZACIÓN: APTO ÓPTIMO' },
                                { r: 'FISIO', i: 'physical_therapy', c: 'Carga: Mantenimiento. Protocolo post-entreno OK.', a: 'Acción: Criomovilización semanal.' },
                                { r: 'PREPA', i: 'bolt', c: 'Plan: Carga competitiva completa. Sin restricciones.', a: 'Enfoque: Fuerza explosiva y reactividad.' },
                                { r: 'ENTRENA', i: 'sports', c: 'Disponibilidad: DISPONIBLE 100%', a: 'Sugerencia: Ritmo competitivo estándar. Titularidad.' }
                            ].map((role, idx) => (
                                <div key={idx} className="bg-slate-50/10 border border-slate-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-[12px] text-[#1e3a8a]">{role.i}</span>
                                        <h3 className="text-[8px] font-black text-[#1e3a8a] uppercase tracking-widest">{role.r}</h3>
                                    </div>
                                    <p className="text-[8px] text-slate-500 italic mb-1 leading-relaxed">{role.c}</p>
                                    <p className={`text-[8px] font-black uppercase tracking-tight ${idx === 3 ? 'text-[#10b981]' : 'text-[#1e3a8a]'}`}>{role.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Extra Comments */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#fffbeb]/50 border border-[#fef3c7] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-[12px] text-[#b45309]">chat_bubble</span>
                                <h3 className="text-[8px] font-black text-[#b45309] uppercase tracking-widest">COMENTARIO EXTERNO</h3>
                            </div>
                            <p className="text-[8px] text-[#92400e] font-medium leading-relaxed italic">Sueño Bajo / Dolor</p>
                        </div>
                        <div className="bg-[#eff6ff]/50 border border-[#dbeafe] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-[12px] text-[#1e40af]">check_circle</span>
                                <h3 className="text-[8px] font-black text-[#1e40af] uppercase tracking-widest">VERIFICACIÓN CLÍNICA</h3>
                            </div>
                            <ul className="text-[7px] text-[#1e40af] font-medium space-y-1">
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-[#1e40af]/30 rounded-full"></span>
                                    Sinergia: HRV estable, RHR normal.
                                </li>
                                <li className="flex items-center gap-2 border-slate-100">
                                    <span className="w-1 h-1 bg-[#1e40af]/30 rounded-full"></span>
                                    Carga: AAL adaptado por debajo de 1.3.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-[#1e40af]/30 rounded-full"></span>
                                    Wellness: Sueño y humor en niveles óptimos.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4: Conclusion */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[14px] text-slate-800">assignment</span>
                            <h2 className="text-[9px] font-black text-slate-800 uppercase tracking-widest">CONCLUSIÓN</h2>
                        </div>
                        <p className="text-[8px] text-slate-600 font-medium leading-relaxed pb-2">
                            Jugador apto para competición sin restricciones. No se detectan indicadores de sobrecarga o fatiga residual significativa.
                        </p>
                    </div>

                    {/* Dark Blue Footer Banner (Identical to reference) */}
                    <div className="bg-[#1e3a8a] text-white py-1 px-4 flex justify-between items-center text-[8px] font-black uppercase tracking-widest mt-auto mb-2">
                        <div className="italic">Elite Performance Coaching Staff | CB BALONCESTO</div>
                        <div className="italic">Validación Digital de Datos: Dr. Sergio Mora</div>
                    </div>

                    {/* Page Footer */}
                    <div className="flex justify-between items-end px-2">
                        <div className="text-[6px] text-slate-300 font-medium lowercase">
                            http://localhost:3000/#/staff/report/{player.id}
                        </div>
                        <div className="text-[7px] text-slate-400 font-bold uppercase tracking-tight">
                            Página 1 de 1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerMedicalReport;
