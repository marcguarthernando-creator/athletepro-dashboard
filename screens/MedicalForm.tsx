import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { BODY_AREAS, INJURY_SIDES, INJURY_TYPES, STRUCTURES_BY_AREA, DIAGNOSES_BY_TYPE } from '../services/injuryData';

const RichTextEditor = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder: string }) => {
    return (
        <div className="bg-[#0d1117] border border-white/5 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/[0.02]">
                <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Bold">
                    <span className="material-symbols-outlined text-sm">format_bold</span>
                </button>
                <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Italic">
                    <span className="material-symbols-outlined text-sm">format_italic</span>
                </button>
                <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Underline">
                    <span className="material-symbols-outlined text-sm">format_underlined</span>
                </button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="List">
                    <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                </button>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent px-4 py-3 text-white text-sm outline-none h-32 resize-none leading-relaxed placeholder:text-white/20"
            />
        </div>
    );
};

const MedicalForm: React.FC = () => {
    const navigate = useNavigate();
    const reportRef = useRef<HTMLDivElement>(null);

    // Form State
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [anamnesis, setAnamnesis] = useState('');
    const [physicalExam, setPhysicalExam] = useState('');
    // Refactored Injury State
    interface InjuryRecord {
        id: string;
        bodyArea: string;
        side: string;
        type: string;
        structure: string;
        diagnosis: string; // Renamed from grade/detail to diagnosis for new structure
        cause: string;
        severity: string; // New field
    }

    // Default empty injury
    const createEmptyInjury = (): InjuryRecord => ({
        id: crypto.randomUUID(),
        bodyArea: 'Leg',
        side: 'Right',
        type: 'Muscular',
        structure: '',
        diagnosis: '',
        cause: 'Overload',
        severity: 'Moderate (8-28 days)'
    });

    const [injuries, setInjuries] = useState<InjuryRecord[]>([createEmptyInjury()]);

    // Actions for injury list
    const addInjury = () => setInjuries(prev => [...prev, createEmptyInjury()]);
    const removeInjury = (id: string) => {
        if (injuries.length > 1) {
            setInjuries(prev => prev.filter(i => i.id !== id));
        }
    };
    const updateInjury = (id: string, field: keyof InjuryRecord, value: string) => {
        setInjuries(prev => prev.map(injury => {
            if (injury.id === id) {
                const updated = { ...injury, [field]: value };
                // Reset structure if body area changes
                if (field === 'bodyArea') updated.structure = '';
                return updated;
            }
            return injury;
        }));
    };
    const [selectedTests, setSelectedTests] = useState<string[]>([]);
    const [testsDetails, setTestsDetails] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [status, setStatus] = useState('OFF');
    const [notes, setNotes] = useState(''); // New Notes field
    const [publicInfo, setPublicInfo] = useState(''); // New Public Info field
    const [isPublicInfoOpen, setIsPublicInfoOpen] = useState(false); // Collapsible state
    const [files, setFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    // Get selected player data
    const player = useMemo(() => mockPlayers.find(p => p.id === selectedPlayerId), [selectedPlayerId]);
    const medicalData = useMemo(() => {
        if (!player) return null;
        return playerMedicalData[player.name.toUpperCase()] || null;
    }, [player]);



    const commonTests = [
        'Ecografía', 'Resonancia Magnética (RMN)', 'Radiografía (RX)', 'TAC', 'Gammagrafía',
        'Electromiografía', 'Analítica Sanguínea', 'Estudio Pisada', 'Biomecánica', 'Prueba Esfuerzo'
    ];

    const toggleTest = (test: string) => {
        setSelectedTests(prev =>
            prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
        );
    };

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
        if (!player) return "Selecciona un jugador para generar el comentario.";
        const mainInjury = injuries[0];
        return `Teniendo en cuenta que ${player.name} tiene ${medicalData?.biometrics?.age || 'N/A'} años y un peso de ${medicalData?.biometrics?.weight || 'N/A'} kg, esta lesión (${mainInjury.type} en ${mainInjury.bodyArea}) provocada por ${mainInjury.cause.toLowerCase()} sugiere un periodo de recuperación variable. Se recomienda monitorizar la carga de trabajo post-retorno para evitar recaídas.`;
    };

    const handleSave = () => {
        if (!selectedPlayerId) return alert('Por favor selecciona un jugador');
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert('Parte médico guardado correctamente en el historial del jugador.');
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
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Parte Médico</h1>
                    <p className="text-gray-500 text-sm">Creación y edición de fichas de lesión del jugador</p>
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
                    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-4">
                        <span className="material-symbols-outlined text-primary">clinical_notes</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Evaluación Clínica</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Narrative */}
                        <div className="space-y-6">
                            <div className="bg-background-dark/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    Anamnesis
                                </label>
                                <RichTextEditor
                                    value={anamnesis}
                                    onChange={setAnamnesis}
                                    placeholder="Descripción detallada de lo que relata el paciente..."
                                />
                            </div>
                            <div className="bg-background-dark/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    Exploración Física
                                </label>
                                <RichTextEditor
                                    value={physicalExam}
                                    onChange={setPhysicalExam}
                                    placeholder="Hallazgos físicos, maniobras, dolor a la palpación..."
                                />
                            </div>
                        </div>

                        {/* Right Column: Tests & Diagnosis */}
                        <div className="space-y-6">
                            <div className="bg-[#111827]/40 border border-white/5 p-8 rounded-[32px] backdrop-blur-sm">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 block flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                                    Pruebas Complementarias
                                </label>
                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {commonTests.map(test => (
                                            <button
                                                key={test}
                                                onClick={() => toggleTest(test)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                                                    ${selectedTests.includes(test)
                                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                                                        : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
                                                    }`}
                                            >
                                                {test}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative group/input">
                                        <div className="absolute left-4 top-4 text-text-secondary group-focus-within/input:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm">add_box</span>
                                        </div>
                                        <textarea
                                            value={testsDetails}
                                            onChange={(e) => setTestsDetails(e.target.value)}
                                            placeholder="DETALLES ADICIONALES O RESULTADOS..."
                                            className="w-full bg-[#0d1117]/60 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs text-white placeholder:text-text-secondary/30 focus:outline-none focus:border-primary/30 transition-all min-h-[80px] resize-none uppercase font-black tracking-wider leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 block flex items-center gap-2 relative z-10">
                                    <span className="material-symbols-outlined text-sm">medical_services</span>
                                    Diagnóstico Médico Final
                                </label>
                                <textarea
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    placeholder="Escriba el diagnóstico formal..."
                                    className="w-full bg-[#0d1117]/80 border border-primary/20 rounded-xl px-4 py-3 text-white text-sm font-medium outline-none focus:border-primary/50 transition-colors h-24 resize-none leading-relaxed placeholder:text-white/20 relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Injury Classification */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between gap-2 mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">personal_injury</span>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Clasificación de Lesión</h3>
                        </div>
                        <button onClick={addInjury} className="text-[10px] font-black uppercase text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">add</span> Añadir Otra Lesión
                        </button>
                    </div>

                    <div className="space-y-6">
                        {injuries.map((injury, index) => (
                            <div key={injury.id} className="relative bg-background-dark/50 p-6 rounded-2xl border border-white/5">
                                {index > 0 && (
                                    <button
                                        onClick={() => removeInjury(injury.id)}
                                        className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                                    {/* Body Area */}
                                    <div className="space-y-2 lg:col-span-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Zona Corporal</label>
                                        <select
                                            value={injury.bodyArea}
                                            onChange={(e) => updateInjury(injury.id, 'bodyArea', e.target.value)}
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="">Select...</option>
                                            {BODY_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                                        </select>
                                    </div>

                                    {/* Side */}
                                    <div className="space-y-2 lg:col-span-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Lado</label>
                                        <select
                                            value={injury.side}
                                            onChange={(e) => updateInjury(injury.id, 'side', e.target.value)}
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                        >
                                            {INJURY_SIDES.map(side => <option key={side} value={side}>{side}</option>)}
                                        </select>
                                    </div>

                                    {/* Structure (Dependent) */}
                                    <div className="space-y-2 lg:col-span-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Estructura Específica</label>
                                        <div className="relative">
                                            <select
                                                value={injury.structure}
                                                onChange={(e) => updateInjury(injury.id, 'structure', e.target.value)}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors appearance-none truncate pr-8"
                                                disabled={!injury.bodyArea}
                                            >
                                                <option value="">{injury.bodyArea ? 'Select Structure...' : 'Select Zone First...'}</option>
                                                {injury.bodyArea && STRUCTURES_BY_AREA[injury.bodyArea as keyof typeof STRUCTURES_BY_AREA]?.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <span className="absolute right-3 top-3.5 material-symbols-outlined text-gray-500 text-sm pointer-events-none">arrow_drop_down</span>
                                        </div>
                                    </div>

                                    {/* Injury Type */}
                                    <div className="space-y-2 lg:col-span-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Tipo / Clasificación</label>
                                        <select
                                            value={injury.type}
                                            onChange={(e) => updateInjury(injury.id, 'type', e.target.value)}
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                        >
                                            {INJURY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    {/* Row 2 */}

                                    {/* Diagnosis (Dependent on Type) */}
                                    <div className="space-y-2 lg:col-span-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Diagnóstico Específico</label>
                                        <div className="relative">
                                            <select
                                                value={injury.diagnosis}
                                                onChange={(e) => updateInjury(injury.id, 'diagnosis', e.target.value)}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                            >
                                                <option value="">Select Diagnosis...</option>
                                                {DIAGNOSES_BY_TYPE[injury.type as keyof typeof DIAGNOSES_BY_TYPE]?.map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                            <span className="absolute right-3 top-3.5 material-symbols-outlined text-gray-500 text-sm pointer-events-none">arrow_drop_down</span>
                                        </div>
                                    </div>

                                    {/* Severity (New Field) */}
                                    <div className="space-y-2 lg:col-span-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Severidad</label>
                                        <select
                                            value={injury.severity}
                                            onChange={(e) => updateInjury(injury.id, 'severity', e.target.value)}
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="Minimum (1-3 days)">Minimum (1-3 days)</option>
                                            <option value="Mild (4-7 days)">Mild (4-7 days)</option>
                                            <option value="Moderate (8-28 days)">Moderate (8-28 days)</option>
                                            <option value="Severe (> 28 days)">Severe (&gt; 28 days)</option>
                                        </select>
                                    </div>

                                    {/* Cause */}
                                    <div className="space-y-2 lg:col-span-4">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Causa</label>
                                        <select
                                            value={injury.cause}
                                            onChange={(e) => updateInjury(injury.id, 'cause', e.target.value)}
                                            className="w-full bg-background-dark border border-white/10 rounded-xl px-3 py-3 text-white text-xs font-bold uppercase outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="Overload">Overload</option>
                                            <option value="Traumatic">Traumatic</option>
                                            <option value="Recurrence">Recurrence</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Clinical Notes (New Section) */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-amber-500">sticky_note_2</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Notas Clínicas Adicionales</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Notas de Evolución / Observaciones</label>
                        <RichTextEditor
                            value={notes}
                            onChange={setNotes}
                            placeholder="Añadir notas de evolución, observaciones subjetivas o comentarios privados..."
                        />
                    </div>
                </div>

                {/* Public Information (Collapsible) */}
                <div className="bg-[#161b22] border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
                    <button
                        onClick={() => setIsPublicInfoOpen(!isPublicInfoOpen)}
                        className="w-full flex items-center justify-between p-8 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-400">public</span>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Información Pública (Prensa)</h3>
                        </div>
                        <span className={`material-symbols-outlined text-gray-500 transition-transform duration-300 ${isPublicInfoOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>

                    {isPublicInfoOpen && (
                        <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-4">
                                <p className="text-xs text-blue-200 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    Esta información es visible para el departamento de prensa.
                                </p>
                            </div>
                            <RichTextEditor
                                value={publicInfo}
                                onChange={setPublicInfo}
                                placeholder="Redactar parte médico oficial para medios de comunicación..."
                            />
                        </div>
                    )}
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
                        <h4 className="text-sm font-black text-primary uppercase tracking-widest">AI Medical Assistant</h4>
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
                            <h2 className="text-3xl font-black uppercase leading-none mb-1">PARTE MÉDICO</h2>
                            <p className="text-[12px] font-black text-slate-500 italic uppercase tracking-widest">CONFIDENCIAL • SERVICIOS MÉDICOS CBC</p>
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
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 border-b border-primary/20 pb-2">Diagnóstico Médico Final</p>
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

                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Clasificación de Lesión(es)</p>
                            <div className="space-y-6">
                                {injuries.map((injury, i) => (
                                    <div key={i} className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                                        <div className="col-span-1">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Zona & Lado</p>
                                            <p className="text-xs font-black uppercase text-slate-900 mt-1">{injury.bodyArea} <span className="text-slate-500">({injury.side.substring(0, 3)})</span></p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Estructura</p>
                                            <p className="text-xs font-black uppercase text-slate-900 mt-1">{injury.structure || '---'}</p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Tipo/Grado</p>
                                            <p className="text-xs font-black uppercase text-slate-900 mt-1 leading-tight">{injury.type} <br /> <span className="text-slate-500 text-[10px]">{injury.grade}</span></p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Causa</p>
                                            <p className="text-xs font-black uppercase text-slate-900 mt-1">{injury.cause}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pruebas Complementarias</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedTests.length > 0 ? selectedTests.map(t => (
                                    <span key={t} className="px-2 py-1 bg-slate-200 rounded text-[9px] font-bold text-slate-700 uppercase">{t}</span>
                                )) : <span className="text-[10px] text-slate-400 italic">No solicitadas</span>}
                            </div>
                            {testsDetails && <p className="text-[10px] text-slate-600 italic border-t border-slate-200 pt-1 mt-1">{testsDetails}</p>}
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-900 inline-block">Plan de Rehabilitación & Tratamiento</p>
                            <p className="text-sm leading-relaxed text-slate-800 font-medium bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900">{treatment || 'Pendiente de definir pauta.'}</p>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl mt-auto border-t-8 border-primary shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Estado de Disponibilidad</p>
                                <div className={`px-6 py-2 rounded-full text-xs font-black text-white uppercase ${status === 'OFF' ? 'bg-rose-500' : status === 'ON' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                    {status === 'OFF' ? 'BAJA MÉDICA' : status === 'ON' ? 'ALTA COMPLETA' : 'DISPONIBILIDAD LIMITADA'}
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
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Médico Responsable</p>
                                <p className="text-sm font-black italic uppercase text-slate-900">Dr. Martínez</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Firma Digital</p>
                                <div className="h-10 w-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                    <span className="text-[8px] text-slate-300 font-black italic">MARTINEZ_MD</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-300 tracking-[0.4em] mb-1">ATHLETEPRO MEDICAL</p>
                            <p className="text-[8px] font-black text-slate-200 uppercase">Licencia CBC-2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalForm;
