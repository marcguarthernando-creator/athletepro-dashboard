import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import { playerMedicalData } from '../services/playerMedicalData';
import PlayerStatsReportModal from './PlayerStatsReportModal';
import RichTextEditor from '../components/RichTextEditor';
import TeamSelector from '../components/TeamSelector';
import { useTeam } from '../contexts/TeamContext';
import { useLanguage } from '../contexts/LanguageContext';

// Body Parts Hierarchy
const BODY_PARTS: Record<string, string[]> = {
  'Cabeza': ['Parte superior', 'Frente', 'Nuca', 'Oído', 'Ceja', 'Ojo', 'Nariz', 'Boca', 'Mejilla', 'Mandíbula', 'Mentón'],
  'Cuello': ['Cervical', 'Garganta', 'Esternocleidomastoideo'],
  'Tronco': ['Pecho', 'Cintura', 'Cadera', 'Abdomen', 'Ingle', 'Espalda', 'Pulmón', 'Corazón', 'Estómago', 'Hígado', 'Riñón', 'Pubis'],
  'Brazo': ['Hombro', 'Brazo', 'Codo', 'Antebrazo', 'Muñeca', 'Mano', 'Dedo', 'Uña'],
  'Pierna': ['Glúteo', 'Aductor', 'Muslo', 'Rodilla', 'Pantorrilla', 'Espinilla', 'Tobillo', 'Pie', 'Talón', 'Empeine', 'Planta', 'Dedo', 'Uña']
};

// Injury Types
const INJURY_TYPES: Record<string, string[]> = {
  'Enfermedad Común': ['Seleccionar tipo', 'Alergología', 'Cardiología / Sistema Vascular', 'Dentista / Odontólogo', 'Sistema Digestivo', 'Sistema Locomotor', 'Sistema Neurológico', 'Nefrología / Urología', 'Otorrinolaringología', 'Oftalmología', 'Psiquiatría', 'Sistema Respiratorio', 'Cirugía General'],
  'Articular': ['Seleccionar tipo', 'Sinovitis', 'Derrame', 'Capsulitis', 'Bloqueo', 'Luxación', 'Subluxación'],
  'Muscular': ['Seleccionar tipo', 'Sobrecarga', 'Calambre', 'Distensión', 'Rotura Grado I', 'Rotura Grado II', 'Rotura Grado III'],
  'Tendinosa': ['Seleccionar tipo', 'Tendinosis', 'Tendinitis', 'Rotura'],
  'Ligamentosa': ['Seleccionar tipo', 'Esguince Grado I', 'Esguince Grado II', 'Esguince Grado III', 'Rotura Parcial', 'Rotura Completa'],
  'Osea': ['Seleccionar tipo', 'Edema Oseo', 'Fractura'],
  'Menisco': ['-'],
  'Cartílago': ['-'],
  'Conmoción Cerebral': ['-'],
  'Hematoma / Golpe': ['-']
};

const COMPLEMENTARY_TESTS = [
  'Ecografía', 'Resonancia Magnética (RMN)', 'Radiografía (RX)', 'TAC', 'Gammagrafía',
  'Electromiografía', 'Analítica Sanguínea', 'Estudio Pisada', 'Biomecánica', 'Prueba Esfuerzo', 'Otras'
];

interface TestItem {
  id: string; // unique
  type: string;
  details: string;
}



const ExportReport: React.FC = () => {
  const location = useLocation();
  const { selectedTeam } = useTeam();
  const { t } = useLanguage();
  const isFisioReport = location.pathname.includes('/fisio');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');

  // Filter players based on selected team
  const filteredPlayers = React.useMemo(() => {
    let players = [...mockPlayers];
    if (selectedTeam === 'Primer Equipo') {
      const allowedIds = ['3', '6', '11', '12'];
      players = players.filter(p => allowedIds.includes(p.id));
    }

    return players;
  }, [selectedTeam]);

  // Set initial selected player based on filteredPlayers or location state
  useEffect(() => {
    if (location.state?.playerId && filteredPlayers.some(p => p.id === location.state.playerId)) {
      setSelectedPlayerId(location.state.playerId);
    } else if (filteredPlayers.length > 0) {
      setSelectedPlayerId(filteredPlayers[0].id);
    } else {
      setSelectedPlayerId('');
    }
  }, [location.state, filteredPlayers]);

  const selectedPlayer = filteredPlayers.find(p => p.id === selectedPlayerId) || filteredPlayers[0];

  // Get biometrics from playerMedicalData
  const playerData = selectedPlayer ? playerMedicalData[selectedPlayer.name.toUpperCase()] : undefined;
  const biometrics = playerData?.biometrics || { age: '-', height: '-', weight: '-' };

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTestToAdd, setSelectedTestToAdd] = useState<string>(COMPLEMENTARY_TESTS[0]);

  useEffect(() => {
    if (location.state?.playerId) {
      setSelectedPlayerId(location.state.playerId);
    }
  }, [location.state]);


  // Form State
  const [formData, setFormData] = useState({
    anamnesis: '',
    exploracion: '',
    zonaCorporal: 'Pierna',
    estructuraEspecifica: 'Rodilla',
    tipoLesion: 'Ligamentosa',
    subtipoLesion: 'Seleccionar tipo',
    lado: 'Derecha',
    causa: 'Traumático',
    gradoDetalle: '',
    severidad: 'moderada',

    pruebasComplementarias: [] as TestItem[],
    detallePruebas: '', // Kept for legacy or general notes if needed, but rows handle details now
    archivos: [] as File[],
    diagnostico: '',
    tratamiento: '',
    estado: 'OFF',
    notas: '',
    comentarioIA: 'El mecanismo de lesión sugiere una distensión del LCL. Considerando el historial de esguinces previos en 2023, se recomienda precaución en la vuelta al impacto (RTP).',
    diagnosticoPublico: '',
    pronosticoPublico: ''
  });

  // AI Mock Generation
  useEffect(() => {
    const genComment = () => {
      // If no player selected, return empty
      if (!selectedPlayer) return '';

      const { tipoLesion, subtipoLesion, zonaCorporal, estructuraEspecifica, causa, lado } = formData;
      const { age, weight, height } = biometrics;

      let comment = `Paciente ${selectedPlayer.name} (${age} años) presenta cuadro clínico compatible con ${tipoLesion} (${subtipoLesion}) en ${estructuraEspecifica} (${zonaCorporal}, lado ${lado}). Origen ${causa?.toLowerCase() || 'no especificado'}.\n\n`;

      if (tipoLesion === 'Ligamentosa') comment += "Se sugiere evaluar estabilidad articular y descartar lesiones asociadas. ";
      if (tipoLesion === 'Muscular') comment += "Considerar ecografía para determinar extensión del edema. ";
      if (causa === 'Traumático') comment += "Mecanismo compatible con impacto directo o torsión. ";

      comment += "Recomendación: Iniciar protocolo PRICE y valoración evolutiva en 48h.";
      return comment;
    };

    setFormData(prev => ({ ...prev, comentarioIA: genComment() }));
  }, [formData.tipoLesion, formData.subtipoLesion, formData.zonaCorporal, formData.estructuraEspecifica, formData.causa, formData.lado, selectedPlayer?.name]);

  const [showPublicReport, setShowPublicReport] = useState(false);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFormData({
      ...formData,
      tipoLesion: newType,
      subtipoLesion: INJURY_TYPES[newType]?.[0] || ''
    });
  };

  const handleBodyZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newZone = e.target.value;
    setFormData({
      ...formData,
      zonaCorporal: newZone,
      estructuraEspecifica: BODY_PARTS[newZone]?.[0] || ''
    });
  };

  const addTestRow = () => {
    const newTest: TestItem = {
      id: Date.now().toString(), // Simple ID
      type: COMPLEMENTARY_TESTS[0],
      details: ''
    };
    setFormData(prev => ({
      ...prev,
      pruebasComplementarias: [...prev.pruebasComplementarias, newTest]
    }));
  };

  const removeTestRow = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pruebasComplementarias: prev.pruebasComplementarias.filter(t => t.id !== id)
    }));
  };

  const updateTestRow = (id: string, field: 'type' | 'details', value: string) => {
    setFormData(prev => ({
      ...prev,
      pruebasComplementarias: prev.pruebasComplementarias.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  // AI Generation Effect
  useEffect(() => {
    const generateAIComment = () => {
      if (!formData.diagnostico && !formData.zonaCorporal) return;

      const severityText = formData.severidad ? `de severidad ${formData.severidad}` : '';
      const mechanism = formData.causa === 'Traumático' ? 'mecanismo traumático' : 'sobrecarga progresiva';

      let comment = `Paciente presenta ${formData.subtipoLesion || 'lesión'} en ${formData.estructuraEspecifica || formData.zonaCorporal} (${formData.lado}). `;
      comment += `Diagnóstico compatible con ${formData.diagnostico || formData.tipoLesion} ${severityText}. `;
      comment += `Origen sugerente de ${mechanism}. `;

      if (formData.tratamiento) {
        comment += `Se recomienda adherencia estricta al plan de ${formData.tratamiento.substring(0, 30)}... para optimizar tiempos de recuperación. `;
      } else {
        comment += `Se recomienda iniciar protocolo RICE y valoración de carga en 48h. `;
      }

      setFormData(prev => ({ ...prev, comentarioIA: comment }));
    };

    // Debounce slightly to avoid rapid updates
    const timer = setTimeout(generateAIComment, 800);
    return () => clearTimeout(timer);
  }, [formData.diagnostico, formData.subtipoLesion, formData.zonaCorporal, formData.estructuraEspecifica, formData.lado, formData.causa, formData.severidad, formData.tratamiento]);

  return (
    <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-8 flex flex-col gap-8 overflow-y-auto font-display bg-[#0a0d10] text-slate-200">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">{isFisioReport ? "PARTE FISIO" : t('exportReport.title')}</h1>
          <p className="text-gray-400 font-medium text-sm">{t('exportReport.subtitle')}</p>
        </div>
        <div className="flex gap-4 items-center">
          <TeamSelector />
          <button className="px-6 py-3 bg-[#0a0d10] border border-primary text-primary font-bold rounded-xl text-sm hover:bg-primary/10 transition-colors uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">save</span> {t('exportReport.saveReport')}
          </button>
          <button className="px-6 py-3 bg-[#161b22] border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/5 transition-colors uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span> {t('exportReport.downloadPdf')}
          </button>
        </div>
      </div>

      {/* 1. INFORMACIÓN DEL JUGADOR */}
      {!selectedPlayer ? (
        <div className="bg-[#161b22] rounded-3xl p-12 border border-white/5 shadow-2xl text-center">
          <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">group_off</span>
          <h2 className="text-xl font-bold text-white mb-2">{t('common.noData')}</h2>
          <p className="text-gray-400">No hay jugadores disponibles en este equipo.</p>
        </div>
      ) : (
        <>
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">{t('exportReport.playerInfo')}</h2>
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="text-[10px] font-bold text-white bg-primary/20 hover:bg-primary/30 border border-primary/50 px-3 py-1.5 rounded-lg uppercase tracking-wide transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                {t('exportReport.viewPlayerReport')}
              </button>
            </div>

            <div className="grid grid-cols-12 gap-8 items-end">
              <div className="col-span-12 md:col-span-6">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">{t('exportReport.selectPlayer')}</label>
                <div className="relative">
                  <select
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    className="w-full bg-[#0a0d10] text-white border border-blue-500/30 rounded-xl px-5 py-4 text-sm focus:border-primary outline-none appearance-none cursor-pointer shadow-inner font-medium"
                    style={{ backgroundImage: 'none' }} // Force remove default arrow
                  >
                    <option value="">{t('exportReport.selectPlayer')}</option>
                    {filteredPlayers.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.position}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">{t('exportReport.age')}</label>
                <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">{biometrics.age}</div>
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">{t('exportReport.height')}</label>
                <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">{biometrics.height} cm</div>
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">{t('exportReport.weight')}</label>
                <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">{biometrics.weight} kg</div>
              </div>
            </div>
          </div>

          {/* 1.5 HISTORIAL DE LESIONES (MOVED) */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-white">history</span>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">{t('exportReport.injuryHistory')} - {selectedPlayer.name}</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">{t('common.date')}</th>
                    <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">{t('exportReport.diagnosis')}</th>
                    <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">{t('exportReport.duration')}</th>
                    <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest text-right">{t('exportReport.status')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* History is now dynamic from player profile */}
                  {(selectedPlayer.injuryHistory && selectedPlayer.injuryHistory.length > 0) ? selectedPlayer.injuryHistory.map((item, idx) => (
                    <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-gray-400 font-mono">{item.date}</td>
                      <td className="py-4 px-4 text-white font-bold">{item.injury}</td>
                      <td className="py-4 px-4 text-gray-400">{item.duration}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${item.status === 'Activa'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : item.status === 'Recaída'
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          }`}>
                          {item.status === 'Activa' ? t('exportReport.active') : item.status === 'Recaída' ? t('exportReport.relapse') : t('exportReport.recovered')}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500 italic">{t('exportReport.noHistory')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. EVALUACIÓN CLÍNICA */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">clinical_notes</span>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">{t('exportReport.clinicalEval')}</h2>
            </div>

            <div className="flex flex-col gap-8 mb-8">
              {/* Anamnesis - Full Width */}
              <div className="w-full bg-[#0a0d10] rounded-2xl border border-white/5 p-1">
                <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('exportReport.anamnesis')}</span>
                </div>
                <RichTextEditor
                  value={formData.anamnesis}
                  onChange={(val) => setFormData({ ...formData, anamnesis: val })}
                  placeholder={t('exportReport.anamnesisPlaceholder')}
                  minHeight="h-48"
                  className="border-0 bg-transparent"
                />
              </div>

              {/* Pruebas Complementarias - Dynamic Rows */}
              <div className="w-full bg-[#0a0d10] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('exportReport.complementaryTests')}</span>
                  </div>
                  <button
                    onClick={addTestRow}
                    className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-lg hover:bg-emerald-500/20 transition-colors uppercase tracking-wider flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    {t('exportReport.addTest')}
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {formData.pruebasComplementarias.map((test) => (
                    <div key={test.id} className="grid grid-cols-12 gap-4 items-start bg-[#161b22] p-3 rounded-xl border border-white/5 animate-in fade-in slide-in-from-top-2">
                      {/* Type Selector */}
                      <div className="col-span-12 md:col-span-4 relative">
                        <select
                          value={test.type}
                          onChange={(e) => updateTestRow(test.id, 'type', e.target.value)}
                          className="w-full bg-[#0a0d10] text-white border border-white/10 rounded-lg px-3 py-2.5 text-xs focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
                          style={{ backgroundImage: 'none' }}
                        >
                          {COMPLEMENTARY_TESTS.map(tOption => (
                            <option key={tOption} value={tOption}>{t(`medicalTerms.${tOption}`)}</option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">expand_more</span>
                      </div>

                      {/* Details Input */}
                      <div className="col-span-12 md:col-span-7">
                        <textarea
                          value={test.details}
                          onChange={(e) => updateTestRow(test.id, 'details', e.target.value)}
                          placeholder="Resultados o detalles..."
                          rows={1}
                          className="w-full bg-[#0a0d10] text-white border border-white/10 rounded-lg px-3 py-2.5 text-xs focus:border-emerald-500/50 outline-none placeholder:text-gray-700 resize-y min-h-[38px] normal-case"
                          style={{ fieldSizing: 'content' } as any}
                        />
                      </div>

                      {/* Delete Button */}
                      <div className="col-span-12 md:col-span-1 flex justify-end">
                        <button
                          onClick={() => removeTestRow(test.id)}
                          className="p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {formData.pruebasComplementarias.length === 0 && (
                    <div className="text-center py-6 text-gray-600 text-xs italic border border-dashed border-white/5 rounded-xl">
                      {t('exportReport.noTests')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Exploración Física */}
            <div className="bg-[#0a0d10] rounded-2xl border border-white/5 p-1 mb-8">
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('exportReport.physicalExam')}</span>
              </div>
              <RichTextEditor
                value={formData.exploracion}
                onChange={(val) => setFormData({ ...formData, exploracion: val })}
                placeholder={t('exportReport.physicalExamPlaceholder')}
                minHeight="h-32"
                className="border-0 bg-transparent"
              />
            </div>

            {/* Diagnóstico Médico Final */}
            <div className="bg-gradient-to-r from-[#0a0d10] to-[#11161d] rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-sm">medical_services</span>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('exportReport.finalDiagnosis')}</span>
              </div>
              <RichTextEditor
                value={formData.diagnostico}
                onChange={(val) => setFormData({ ...formData, diagnostico: val })}
                placeholder={t('exportReport.finalDiagnosisPlaceholder')}
                minHeight="h-24"
                className="relative z-10 border border-white/5 bg-[#0a0d10]/50"
              />
            </div>
          </div>

          {/* 3. CLASIFICACIÓN DE LESIÓN */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">category</span>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">{t('exportReport.injuryClass')}</h2>
              </div>
              <button className="px-4 py-2 border border-primary/30 rounded-lg text-primary text-[10px] font-bold uppercase hover:bg-primary/10 transition-colors">
                + {t('exportReport.addOther')}
              </button>
            </div>

            <div className="bg-[#0a0d10] border border-white/5 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* Zona */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.bodyZone')}</label>
                  <div className="relative">
                    <select
                      value={formData.zonaCorporal}
                      onChange={handleBodyZoneChange}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      {Object.keys(BODY_PARTS).map(zone => (
                        <option key={zone} value={zone}>{t(`medicalTerms.${zone}`)}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Lado */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.side')}</label>
                  <div className="relative">
                    <select
                      value={formData.lado}
                      onChange={(e) => setFormData({ ...formData, lado: e.target.value })}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option>Derecha</option>
                      <option>Izquierda</option>
                      <option>Bilateral</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Estructura - Bigger */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.structure')}</label>
                  <div className="relative">
                    <select
                      value={formData.estructuraEspecifica}
                      onChange={(e) => setFormData({ ...formData, estructuraEspecifica: e.target.value })}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      {BODY_PARTS[formData.zonaCorporal]?.map(part => (
                        <option key={part} value={part}>{t(`medicalTerms.${part}`)}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                {/* Categoría (Ex-Tipo) */}
                <div className="col-span-12 md:col-span-4 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.category')}</label>
                  <div className="relative">
                    <select
                      value={formData.tipoLesion}
                      onChange={handleTypeChange}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      {Object.keys(INJURY_TYPES).map(type => (
                        <option key={type} value={type}>{t(`medicalTerms.${type}`)}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>

                {/* Tipo (New Subtype) */}
                <div className="col-span-12 md:col-span-4 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.type')}</label>
                  <div className="relative">
                    <select
                      value={formData.subtipoLesion}
                      onChange={(e) => setFormData({ ...formData, subtipoLesion: e.target.value })}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      {INJURY_TYPES[formData.tipoLesion]?.map(subtype => (
                        <option key={subtype} value={subtype}>{t(`medicalTerms.${subtype}`)}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>

                {/* Causa */}
                <div className="col-span-12 md:col-span-4 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.cause')}</label>
                  <div className="relative">
                    <select
                      value={formData.causa}
                      onChange={(e) => setFormData({ ...formData, causa: e.target.value })}
                      className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option>Traumático</option>
                      <option>Otras</option>
                      <option>Sobrecarga</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Grado / Detalle */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="col-span-12 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('exportReport.gradeDetail')}</label>
                  <input
                    type="text"
                    value={formData.gradoDetalle}
                    onChange={(e) => setFormData({ ...formData, gradoDetalle: e.target.value })}
                    className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none placeholder:text-gray-600 normal-case"
                    placeholder={t('exportReport.gradePlaceholder')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. TRATAMIENTO & ESTADO */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            {/* Tratamiento */}
            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">{t('exportReport.plannedTreatment')}</label>
              <div className="bg-[#0a0d10] border border-blue-500/20 rounded-2xl p-1">
                <RichTextEditor
                  value={formData.tratamiento}
                  onChange={(val) => setFormData({ ...formData, tratamiento: val })}
                  placeholder={t('exportReport.treatmentPlaceholder')}
                  minHeight="h-24"
                  className="border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Estado */}
            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">{t('exportReport.playerStatus')}</label>
              <div className="relative">
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className={`w-full bg-[#161b22] font-black border rounded-xl px-5 py-4 text-sm outline-none appearance-none cursor-pointer transition-all shadow-lg ${formData.estado === 'OFF'
                    ? 'text-rose-500 border-rose-500 shadow-rose-500/10'
                    : formData.estado === 'REHAB'
                      ? 'text-amber-500 border-amber-500 shadow-amber-500/10'
                      : 'text-emerald-500 border-emerald-500 shadow-emerald-500/10'
                    }`}
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="OFF">OFF / {t('medicalDashboard.risk').toUpperCase()}</option>
                  <option value="REHAB">REHAB / {t('medicalDashboard.doubt').toUpperCase()}</option>
                  <option value="ON">ON / {t('medicalDashboard.available').toUpperCase()}</option>
                </select>
                <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${formData.estado === 'OFF' ? 'text-rose-500' : formData.estado === 'REHAB' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>expand_more</span>
              </div>
            </div>
          </div>

          {/* 5. COMENTARIO IA / DIAGNÓSTICO SUGERIDO */}
          {/* 5. COMENTARIO IA / DIAGNÓSTICO SUGERIDO */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">{t('exportReport.aiComment')}</label>
            <div className="bg-[#0a0d10] border border-blue-500/20 rounded-2xl p-4">
              <textarea
                readOnly
                value={formData.comentarioIA}
                className="w-full bg-transparent text-gray-300 text-sm font-medium outline-none resize-none h-24 custom-scrollbar"
              />
            </div>
            <div className="mt-2 text-[10px] text-gray-600 font-mono text-right w-full">
              {t('exportReport.generatedBy')}
            </div>
          </div>



          {/* 6. ARCHIVOS */}
          <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-gray-400">attach_file</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('exportReport.addFiles')}</h3>
            </div>

            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  const newFiles = Array.from(e.target.files);
                  setFormData(prev => ({ ...prev, archivos: [...(prev.archivos || []), ...newFiles] }));
                }
              }}
              className="hidden"
              id="file-upload"
            />

            <label
              htmlFor="file-upload"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files) {
                  const newFiles = Array.from(e.dataTransfer.files);
                  setFormData(prev => ({ ...prev, archivos: [...(prev.archivos || []), ...newFiles] }));
                }
              }}
              className="w-full h-32 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-colors group bg-[#0a0d10]/50"
            >
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-cyan-500">upload</span>
              </div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300 uppercase tracking-widest">{t('exportReport.dragFiles')}</span>
            </label>

            {/* File List */}
            {formData.archivos && formData.archivos.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {formData.archivos.map((file: File, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-cyan-500">description</span>
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          archivos: prev.archivos.filter((_, i) => i !== index)
                        }));
                      }}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-rose-500"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>


          {selectedPlayer && (
            <>
              <PlayerStatsReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                player={selectedPlayer || {}}
              />
            </>
          )}
        </>
      )}
    </main >
  );
};

export default ExportReport;
