import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FisioForm: React.FC = () => {
    const navigate = useNavigate();
    const reportRef = useRef<HTMLDivElement>(null);

    // Form State
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [anamnesis, setAnamnesis] = useState('');
    const [physicalExam, setPhysicalExam] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [injuryType, setInjuryType] = useState('MUSCULAR');
    const [injuryGrade, setInjuryGrade] = useState('');
    const [cause, setCause] = useState('SOBRECARGA');
    const [tests, setTests] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [status, setStatus] = useState('OFF');
    const [files, setFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    // Get selected player data
    const player = useMemo(() => mockPlayers.find(p => p.id === selectedPlayerId), [selectedPlayerId]);
    const medicalData = useMemo(() => {
        if (!player) return null;
        return playerMedicalData[player.name.toUpperCase()] || null;
    }, [player]);

    const injuryTypes = [
        'ARTICULAR', 'MUSCULAR', 'TENDINOSA', 'LIGAMENTOSA', 'OSEA', 'MENISCO', 'CARTILAGO', 'ENFERMEDAD COMUN', 'CONMOCION CEREBRAL'
    ];

    const playerStatuses = [
        { id: 'OFF', label: 'OFF / BAJA TOTAL' },
        { id: 'TRAINING_ONLY', label: 'DISPONIBLE ENTRENAMIENTO PERO NO JUGAR' },
        { id: 'LIMITED_GAMES', label: 'DISPONIBLE PARTIDOS CON LIMITACIÓN' },
        { id: 'ON', label: 'ON / DISPONIBLE TOTAL' }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const generateAIComment = () => {
        if (!player) return "Selecciona un jugador para generar el comentario.";
        return `Teniendo en cuenta que ${player.name} tiene ${medicalData?.biometrics?.age || 'N/A'} años y un peso de ${medicalData?.biometrics?.weight || 'N/A'} kg, esta lesión de tipo ${injuryType} (${injuryGrade}) provocada por ${cause.toLowerCase()} sugiere un periodo de recuperación de aproximadamente ${injuryType === 'MUSCULAR' ? '15-21' : '30+'} días. Se recomienda monitorizar la carga de trabajo post-retorno para evitar recaídas.`;
    };

    const handleSave = () => {
        if (!selectedPlayerId) return alert('Por favor selecciona un jugador');
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert('Parte fisio guardado correctamente en el historial del jugador.');
        }, 1500);
    };

    const handleDownloadPDF = async () => {
        if (!player || !reportRef.current) return alert('Datos insuficientes para generar el PDF');

        const canvas = await html2canvas(reportRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);

        // Format: MM_DD_AA_NOMBRE_APELLIDO.pdf
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const aa = String(now.getFullYear()).slice(-2);
        const fileName = `${mm}_${dd}_${aa}_${player.name.replace(/\s+/g, '_').toUpperCase()}.pdf`;

        pdf.save(fileName);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 custom-scrollbar">
            <header className="mb-8 flex justify-between items-end max-w-4xl mx-auto w-full">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Parte Fisio</h1>
                    <p className="text-gray-500 text-sm">Creación y edición de fichas de fisioterapia del jugador</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-background-dark px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">{saving ? 'sync' : 'save'}</span>
                        {saving ? 'Guardando...' : 'Guardar Parte'}
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-white/5 text-white border border-white/10 hover:bg-white/10 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Descargar PDF
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto w-full space-y-6">
                {/* Player Selection & Basic Info */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-primary">person</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Información del Jugador</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Seleccionar Jugador</label>
                            <select
                                value={selectedPlayerId}
                                onChange={(e) => setSelectedPlayerId(e.target.value)}
                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors appearance-none"
                            >
                                <option value="">Elegir jugador...</option>
                                {mockPlayers.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Edad</label>
                                <input type="text" readOnly value={medicalData?.biometrics?.age || '--'} className="w-full bg-background-dark/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 text-sm outline-none cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Altura</label>
                                <input type="text" readOnly value={medicalData?.biometrics?.height || '--'} className="w-full bg-background-dark/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 text-sm outline-none cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Peso</label>
                                <input type="text" readOnly value={medicalData?.biometrics?.weight || '--'} className="w-full bg-background-dark/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 text-sm outline-none cursor-not-allowed" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clinical Details */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Anamnesis</label>
                                <textarea
                                    value={anamnesis}
                                    onChange={(e) => setAnamnesis(e.target.value)}
                                    placeholder="Descripción de lo que relata el paciente..."
                                    className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Exploración Física</label>
                                <textarea
                                    value={physicalExam}
                                    onChange={(e) => setPhysicalExam(e.target.value)}
                                    placeholder="Hallazgos físicos, dolor, ROM, tests ortopédicos..."
                                    className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pruebas Complementarias</label>
                                <textarea
                                    value={tests}
                                    onChange={(e) => setTests(e.target.value)}
                                    placeholder="Ecografía, Resonancia, RX, etc..."
                                    className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Diagnóstico Fisioterapéutico</label>
                                <textarea
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    placeholder="Diagnóstico formal..."
                                    className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Injury Classification */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Parte del Cuerpo</label>
                            <input
                                type="text"
                                value={bodyPart}
                                onChange={(e) => setBodyPart(e.target.value)}
                                placeholder="Ej: Tobillo Derecho"
                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Tipo de Lesión</label>
                            <select
                                value={injuryType}
                                onChange={(e) => setInjuryType(e.target.value)}
                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors appearance-none"
                            >
                                {injuryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Grado/Sub-tipo</label>
                            <input
                                type="text"
                                value={injuryGrade}
                                onChange={(e) => setInjuryGrade(e.target.value)}
                                placeholder="Ej: Grado II"
                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Causa</label>
                            <select
                                value={cause}
                                onChange={(e) => setCause(e.target.value)}
                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors appearance-none"
                            >
                                <option value="SOBRECARGA">SOBRECARGA</option>
                                <option value="TRAUMATICO">TRAUMÁTICO</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Treatment & Status */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Tratamiento Planificado</label>
                        <textarea
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            placeholder="Fisioterapia, pauta de ejercicios, medicación..."
                            className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary/50 transition-colors h-24 resize-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Estado del Jugador</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm font-black outline-none focus:border-primary/50 transition-colors appearance-none ${status === 'OFF' ? 'text-rose-500' : status === 'ON' ? 'text-primary' : 'text-amber-500'
                                }`}
                        >
                            {playerStatuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* AI Assistant Box (Integrated into flow) */}
                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-primary text-2xl animate-pulse">psychology</span>
                        <h4 className="text-sm font-black text-primary uppercase tracking-widest">AI Fisio Assistant</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                        {generateAIComment()}
                    </p>
                </div>

                {/* Files Section */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-gray-500">attach_file_add</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Añadir Archivos (PDF/PNG)</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-10 hover:border-primary/50 transition-all cursor-pointer relative">
                        <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="material-symbols-outlined text-4xl text-gray-500 mb-2">upload_file</span>
                        <p className="text-sm font-bold text-gray-500">Arrastra o selecciona archivos para adjuntar</p>
                        <p className="text-[10px] text-gray-600 mt-1 uppercase font-black">Los archivos PNG se convertirán automáticamente a PDF</p>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {files.map((f, i) => (
                                <div key={i} className="bg-white/5 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
                                    <span className="text-[10px] font-bold text-gray-400 truncate max-w-[150px]">{f.name}</span>
                                    <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-500 hover:text-rose-400">
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* HIDDEN PDF TEMPLATE */}
            <div className="fixed -left-[4000px] top-0 pointer-events-none">
                <div ref={reportRef} className="bg-white text-slate-900 p-16 w-[210mm] min-h-[297mm] flex flex-col font-sans">
                    <div className="border-b-4 border-slate-900 pb-8 mb-10 flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-black uppercase leading-none mb-1">PARTE FISIO</h2>
                            <p className="text-[12px] font-black text-slate-500 italic uppercase tracking-widest">CONFIDENCIAL • SERVICIOS FISIOTERAPIA CBC</p>
                        </div>
                        <img src="/escudo-cbc.png" className="w-16 h-16 grayscale" alt="" />
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 mb-12">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nombre del Jugador</p>
                                <p className="text-2xl font-black uppercase border-b-2 border-slate-100 pb-2">{player?.name || '---'}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Edad</p>
                                    <p className="text-lg font-black">{medicalData?.biometrics?.age || '--'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Altura</p>
                                    <p className="text-lg font-black">{medicalData?.biometrics?.height || '--'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Peso</p>
                                    <p className="text-lg font-black">{medicalData?.biometrics?.weight || '--'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-center">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 border-b border-primary/20 pb-2">Diagnóstico Fisio Final</p>
                            <p className="text-2xl font-black uppercase leading-tight">{diagnosis || 'PENDIENTE DE EVALUACIÓN'}</p>
                        </div>
                    </div>

                    <div className="space-y-10 flex-1">
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-900 inline-block">Anamnesis & Clínica</p>
                                <p className="text-sm leading-relaxed italic text-slate-700">{anamnesis || 'Sin datos registrados.'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-900 inline-block">Exploración Física</p>
                                <p className="text-sm leading-relaxed text-slate-700">{physicalExam || 'Sin datos registrados.'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localización</p>
                                <p className="text-sm font-black uppercase mt-1">{bodyPart || '---'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Lesión</p>
                                <p className="text-sm font-black uppercase mt-1">{injuryType} ({injuryGrade})</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Etiología</p>
                                <p className="text-sm font-black uppercase mt-1">{cause}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-900 inline-block">Plan de Rehabilitación & Tratamiento</p>
                            <p className="text-sm leading-relaxed text-slate-800 font-medium bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900">{treatment || 'Pendiente de definir pauta.'}</p>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl mt-auto border-t-8 border-primary shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Estado de Disponibilidad</p>
                                <div className={`px-6 py-2 rounded-full text-xs font-black text-white uppercase ${status === 'OFF' ? 'bg-rose-500' : status === 'ON' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                    {status === 'OFF' ? 'BAJA FISIO' : status === 'ON' ? 'ALTA COMPLETA' : 'DISPONIBILIDAD LIMITADA'}
                                </div>
                            </div>
                            <p className="text-lg font-black uppercase leading-tight tracking-tight">{playerStatuses.find(s => s.id === status)?.label}</p>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between items-end">
                        <div className="flex gap-12">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Fecha Emisión</p>
                                <p className="text-sm font-black text-slate-900 underline underline-offset-4">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Fisio Responsable</p>
                                <p className="text-sm font-black italic uppercase text-slate-900">Responsable Fisio</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Firma Digital</p>
                                <div className="h-10 w-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                    <span className="text-[8px] text-slate-300 font-black italic">FISIO_CBC</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-300 tracking-[0.4em] mb-1">ATHLETEPRO FISIO</p>
                            <p className="text-[8px] font-black text-slate-200 uppercase">Licencia CBC-2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FisioForm;
