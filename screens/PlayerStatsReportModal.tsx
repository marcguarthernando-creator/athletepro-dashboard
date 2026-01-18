import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PlayerStatsReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    player: any; // Using any for now to be flexible with the mock data
}

const PlayerStatsReportModal: React.FC<PlayerStatsReportModalProps> = ({ isOpen, onClose, player }) => {
    if (!isOpen || !player) return null;

    const handleDownloadPDF = async () => {
        const reportElement = document.getElementById('report-content');
        if (!reportElement) return;

        try {
            // Create canvas from the element
            const canvas = await html2canvas(reportElement, {
                scale: 3, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // A4 Dimensions (mm)
            const pdfWidth = 210;
            const pdfHeight = 297;

            // Calculate dimensions to fit exactly on A4
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            // If content is taller than A4, scale it down to fit
            let finalWidth = imgWidth;
            let finalHeight = imgHeight;

            if (imgHeight > pdfHeight) {
                const scale = pdfHeight / imgHeight;
                finalWidth = imgWidth * scale;
                finalHeight = pdfHeight;
            }

            // Center horizontally if scaled down width-wise (unlikely given logic above, but good practice)
            // Center vertically if shorter than page
            const x = (pdfWidth - finalWidth) / 2;
            const y = 0; // Top align prefered for reports

            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, finalWidth, finalHeight);

            // Filename: MM_DD_AA_NOMBRE_APELLIDO
            const today = new Date();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const year = String(today.getFullYear()).slice(-2);
            const safeName = player.name.replace(/\s+/g, '_').toUpperCase();

            pdf.save(`${month}_${day}_${year}_${safeName}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
            <div className="min-h-screen py-8 px-4 flex items-center justify-center">
                <div className="bg-white w-full max-w-[1000px] min-h-[90vh] rounded-none shadow-2xl relative flex flex-col font-sans text-[#1a1a1a]">

                    {/* Action Buttons (Screen only) */}
                    <div className="absolute -right-16 top-0 flex flex-col gap-2">
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-300 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md"
                            title="Cerrar"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="text-white hover:text-cyan-400 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md group"
                            title="Descargar PDF"
                        >
                            <span className="material-symbols-outlined group-hover:animate-bounce">download</span>
                        </button>
                    </div>

                    <div id="report-content" className="flex flex-col flex-1 bg-white">
                        {/* --- HEADER --- */}
                        <div className="bg-[#1e3a8a] text-white px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="bg-white p-1 rounded-lg h-10 w-10 flex items-center justify-center">
                                    <img src="/escudo-cbc.png" alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <h1 className="text-xl font-black uppercase tracking-wide">INFORME MÉDICO DEPORTIVO - CB BALONCESTO</h1>
                            </div>
                            <div className="bg-white/10 p-1.5 rounded backdrop-blur-sm">
                                <span className="text-[10px] font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded">CONFIDENCIAL</span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col gap-6">
                            {/* Player Info Header */}
                            <div className="flex gap-6 items-center border-b pb-6 border-gray-100">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm relative shrink-0">
                                    <img
                                        src={player.photo}
                                        alt={player.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-6 flex-1">
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">PACIENTE</span>
                                        <h2 className="text-xl font-black text-[#1e3a8a] uppercase leading-none">{player.name}</h2>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">EDAD</span>
                                        <div className="font-bold text-gray-800 text-sm">24 años</div>
                                        <div className="text-[10px] text-gray-500 font-mono">25/12/2001</div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">POSICIÓN</span>
                                        <div className="font-bold text-gray-800 uppercase text-sm">{player.position}</div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">FECHA</span>
                                        <div className="font-bold text-[#2563eb] uppercase text-sm">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                    </div>
                                </div>
                            </div>

                            {/* PART 1: AVAILABILITY */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">PARTE 1: DISPONIBILIDAD PARA JUGAR</h3>
                                </div>

                                <div className="bg-emerald-50 rounded-lg px-4 py-2 flex justify-between items-center border border-emerald-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
                                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">ESTADO: APTO / OPTIMO</span>
                                    </div>
                                    <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">RIESGO: 5%</span>
                                </div>
                            </div>

                            {/* METRICS TABLE */}
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <table className="w-full text-xs">
                                    <thead className="bg-[#1e3a8a] text-white">
                                        <tr>
                                            <th className="py-2 px-3 text-left font-bold uppercase text-[9px] tracking-widest w-1/4">Herramienta</th>
                                            <th className="py-2 px-3 text-left font-bold uppercase text-[9px] tracking-widest">Valor</th>
                                            <th className="py-2 px-3 text-left font-bold uppercase text-[9px] tracking-widest opacity-70">Rango</th>
                                            <th className="py-2 px-3 text-left font-bold uppercase text-[9px] tracking-widest">Semáforo</th>
                                            <th className="py-2 px-3 text-left font-bold uppercase text-[9px] tracking-widest">Variación</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { name: 'WBQ Promedio', val: '1.2', range: '≤ 3.0', status: 'normal', change: '-0.2' },
                                            { name: 'Fatiga (WBQ)', val: '6/7', range: '≤ 3', status: 'warning', change: '0' },
                                            { name: 'Dolor Muscular', val: '5/7', range: '≤ 3', status: 'warning', change: '-1' },
                                            { name: 'AAL Máximo', val: '610', range: '< 400', status: 'warning', change: 'vs prev' },
                                            { name: 'RHR (Whoop)', val: '58 BPM', range: '38-58', status: 'normal', change: 'Estable' },
                                            { name: 'HRV (Whoop)', val: '45 ms', range: '50-80', status: 'normal', change: '+2 ms' },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-2 px-3 font-bold text-gray-800">{row.name}</td>
                                                <td className="py-2 px-3 font-mono font-bold text-gray-900">{row.val}</td>
                                                <td className="py-2 px-3 font-mono text-gray-400 text-[10px]">{row.range}</td>
                                                <td className="py-2 px-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-2 h-2 rounded-full ${row.status === 'normal' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                                                        <span className={`text-[9px] font-bold uppercase italic ${row.status === 'normal' ? 'text-emerald-600' : 'text-amber-600'}`}>{row.status}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-3 font-mono text-[10px] text-gray-500">{row.change}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* PART 2: SPECIFIC INFO */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-[#1e3a8a] text-lg">groups</span>
                                    <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">PARTE 2: INFORMACIÓN ESPECÍFICA POR ROL</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* MEDIC */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-800">
                                            <span className="material-symbols-outlined text-sm">medical_services</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Médico</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Hallazgos</span>
                                                <p className="text-[11px] text-gray-700 font-medium leading-relaxed">Adaptación fisiológica normal. Sin desviaciones significativas.</p>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold text-[#2563eb] uppercase">Autorización</span>
                                                <p className="text-[11px] font-bold text-[#2563eb]">APTO ÓPTIMO</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FISIO */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-800">
                                            <span className="material-symbols-outlined text-sm">spa</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Fisio</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Carga</span>
                                                <p className="text-[11px] text-gray-700 font-medium leading-relaxed">Mantenimiento. Protocolo post-entreno OK.</p>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Acción</span>
                                                <p className="text-[11px] text-gray-700 font-medium">Criomovilización semanal.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PREPA */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-800">
                                            <span className="material-symbols-outlined text-sm">fitness_center</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Prepa</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Plan</span>
                                                <p className="text-[11px] text-gray-700 font-medium leading-relaxed">Carga competitiva completa. Sin restricciones.</p>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Enfoque</span>
                                                <p className="text-[11px] text-gray-700 font-medium">Fuerza explosiva y reactividad.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* COACH */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-800">
                                            <span className="material-symbols-outlined text-sm">sports</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Entrenador</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Disponibilidad</span>
                                                <p className="text-[11px] font-bold text-emerald-600">DISPONIBLE 100%</p>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Sugerencia</span>
                                                <p className="text-[11px] text-gray-700 font-medium">Ritmo competitivo estándar.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXTERNAL & VERIFICATION */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                    <div className="flex items-center gap-2 mb-1.5 text-amber-800">
                                        <span className="material-symbols-outlined text-sm">comment</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Comentario Externo</span>
                                    </div>
                                    <p className="text-[11px] text-amber-900/70 italic font-medium">"Sueño bajo / Dolor leve referido en la mañana"</p>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-1.5 text-blue-800">
                                        <span className="material-symbols-outlined text-sm">verified</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Verificación Clínica</span>
                                    </div>
                                    <ul className="text-[10px] text-blue-900/70 space-y-0.5">
                                        <li>- <span className="font-bold">Sinergia:</span> HRV estable, RHR normal.</li>
                                        <li>- <span className="font-bold">Carga:</span> AAL adaptado por debajo de 1.3.</li>
                                        <li>- <span className="font-bold">Wellness:</span> Sueño y humor en niveles óptimos.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-2 text-gray-800 mb-1.5">
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Conclusión</span>
                                </div>
                                <p className="text-[11px] text-gray-600 leading-relaxed max-w-2xl">
                                    Jugador apto para competición sin restricciones. No se detectan indicadores de sobrecarga o fatiga residual significativa que impidan su participación al 100%.
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="bg-[#1e3a8a] text-white p-3 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest mt-auto">
                            <span>Elite Performance Coaching Staff | CB Canarias</span>
                            <span className="opacity-70">Validación Digital de Datos: Dr. Sergio Mora</span>
                        </div>
                    </div> {/* End of report-content */}
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsReportModal;
