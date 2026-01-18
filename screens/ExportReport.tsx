import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockPlayers } from '../services/mockPlayers';
import PlayerStatsReportModal from './PlayerStatsReportModal';

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
  'Enfermedad Común': ['Gripe', 'Gastroenteritis', 'Faringitis', 'Fiebre', 'Infección Respiratoria', 'Alergia', 'Migraña'],
  'Articular': ['Sinovitis', 'Derrame', 'Capsulitis', 'Bloqueo', 'Luxación', 'Subluxación'],
  'Muscular': ['Sobrecarga', 'Calambre', 'Distensión', 'Rotura Grado I', 'Rotura Grado II', 'Rotura Grado III', 'Contusión'],
  'Tendinosa': ['Tendinopatía', 'Tendinitis', 'Rotura Parcial', 'Rotura Total', 'Entesopatía'],
  'Ligamentosa': ['Esguince Grado I', 'Esguince Grado II', 'Esguince Grado III', 'Rotura Completa'],
  'Osea': ['Fisura', 'Fractura', 'Edema Oseo', 'Periostitis'],
  'Menisco': ['Rotura Asa de Cubo', 'Rotura Radial', 'Parameniscitis', 'Degeneración'],
  'Cartílago': ['Condropatía Grado I', 'Condropatía Grado II', 'Condropatía Grado III', 'Condropatía Grado IV', 'Osteocondritis'],
  'Conmoción Cerebral': ['Grado 1 (Leve)', 'Grado 2 (Moderado)', 'Grado 3 (Grave)'],
  'Hematoma / Golpe': ['Hematoma Subcutáneo', 'Hematoma Muscular', 'Contusión Simple']
};

const COMPLEMENTARY_TESTS = [
  'Ecografía', 'Resonancia Magnética (RMN)', 'Radiografía (RX)', 'TAC', 'Gammagrafía',
  'Electromiografía', 'Analítica Sanguínea', 'Estudio Pisada', 'Biomecánica', 'Prueba Esfuerzo'
];



const ExportReport: React.FC = () => {
  const location = useLocation();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(location.state?.playerId || mockPlayers[0]?.id || '1');
  const selectedPlayer = mockPlayers.find(p => p.id === selectedPlayerId) || mockPlayers[0]!;
  const [showReportModal, setShowReportModal] = useState(false);

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
    subtipoLesion: 'Esguince Grado II',
    lado: 'Derecha',
    causa: 'Traumático',
    gradoDetalle: '',
    severidad: 'moderada',
    pruebasComplementarias: [] as string[],
    detallePruebas: '',
    archivos: [] as File[],
    diagnostico: '',
    tratamiento: '',
    estado: 'OFF',
    notas: '',
    comentarioIA: 'El mecanismo de lesión sugiere una distensión del LCL. Considerando el historial de esguinces previos en 2023, se recomienda precaución en la vuelta al impacto (RTP).',
    diagnosticoPublico: '',
    pronosticoPublico: ''
  });

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

  const toggleTest = (test: string) => {
    setFormData(prev => {
      const tests = prev.pruebasComplementarias.includes(test)
        ? prev.pruebasComplementarias.filter(t => t !== test)
        : [...prev.pruebasComplementarias, test];
      return { ...prev, pruebasComplementarias: tests };
    });
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
          <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Parte Médico</h1>
          <p className="text-gray-400 font-medium text-sm">Creación y edición de fichas de lesión del jugador</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#0a0d10] border border-primary text-primary font-bold rounded-xl text-sm hover:bg-primary/10 transition-colors uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">save</span> Guardar Parte
          </button>
          <button className="px-6 py-3 bg-[#161b22] border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/5 transition-colors uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span> Descargar PDF
          </button>
        </div>
      </div>

      {/* 1. INFORMACIÓN DEL JUGADOR */}
      <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">person</span>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Información del Jugador</h2>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="text-[10px] font-bold text-white bg-primary/20 hover:bg-primary/30 border border-primary/50 px-3 py-1.5 rounded-lg uppercase tracking-wide transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            Ver Informe Jugador
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-6">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Seleccionar Jugador</label>
            <div className="relative">
              <select
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="w-full bg-[#0a0d10] text-white border border-blue-500/30 rounded-xl px-5 py-4 text-sm focus:border-primary outline-none appearance-none cursor-pointer shadow-inner font-medium"
              >
                {mockPlayers.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - {p.position}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Edad</label>
            <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">24</div>
          </div>
          <div className="col-span-4 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Altura</label>
            <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">198 cm</div>
          </div>
          <div className="col-span-4 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Peso</label>
            <div className="w-full bg-[#0a0d10] border border-white/5 rounded-xl px-4 py-3.5 text-center text-gray-400 font-mono">92 kg</div>
          </div>
        </div>
      </div>

      {/* 1.5 HISTORIAL DE LESIONES (MOVED) */}
      <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-white">history</span>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Historial de Lesiones - {selectedPlayer.name}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">Fecha</th>
                <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">Diagnóstico (Lesión)</th>
                <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">Duración</th>
                <th className="py-4 px-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest text-right">Estado</th>
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
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 italic">No hay historial de lesiones.</td>
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
          <h2 className="text-sm font-black text-white uppercase tracking-widest">Evaluación Clínica</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Anamnesis */}
          <div className="bg-[#0a0d10] rounded-2xl border border-white/5 p-1">
            <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Anamnesis</span>
            </div>
            <textarea
              value={formData.anamnesis}
              onChange={(e) => setFormData({ ...formData, anamnesis: e.target.value })}
              className="w-full h-48 bg-transparent text-white p-5 text-sm outline-none resize-none placeholder:text-gray-700 leading-relaxed"
              placeholder="Descripción detallada de lo que relata el paciente..."
            ></textarea>
          </div>

          {/* Pruebas Complementarias */}
          <div className="bg-[#0a0d10] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pruebas Complementarias</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {COMPLEMENTARY_TESTS.map(test => (
                <button
                  key={test}
                  onClick={() => toggleTest(test)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all ${formData.pruebasComplementarias.includes(test)
                    ? 'bg-white text-black border-white'
                    : 'bg-[#161b22] text-gray-500 border-white/10 hover:border-white/30'
                    }`}
                >
                  {test}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">add_comment</span>
              <input
                type="text"
                value={formData.detallePruebas}
                onChange={(e) => setFormData({ ...formData, detallePruebas: e.target.value })}
                className="w-full bg-[#161b22] border border-white/5 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder:text-gray-700 focus:border-white/20 outline-none"
                placeholder="Detalles adicionales o resultados..."
              />
            </div>
          </div>
        </div>

        {/* Exploración Física */}
        <div className="bg-[#0a0d10] rounded-2xl border border-white/5 p-1 mb-8">
          <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Exploración Física</span>
          </div>
          <textarea
            value={formData.exploracion}
            onChange={(e) => setFormData({ ...formData, exploracion: e.target.value })}
            className="w-full h-32 bg-transparent text-white p-5 text-sm outline-none resize-none placeholder:text-gray-700 leading-relaxed"
            placeholder="Hallazgos físicos, maniobras, dolor a la palpación..."
          ></textarea>
        </div>

        {/* Diagnóstico Médico Final */}
        <div className="bg-gradient-to-r from-[#0a0d10] to-[#11161d] rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary text-sm">medical_services</span>
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Diagnóstico Médico Final</span>
          </div>
          <textarea
            value={formData.diagnostico}
            onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
            className="w-full bg-transparent text-white text-sm font-medium outline-none placeholder:text-gray-700 resize-none h-16 relative z-10"
            placeholder="Escriba el diagnóstico formal..."
          />
        </div>
      </div>

      {/* 3. CLASIFICACIÓN DE LESIÓN */}
      <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">category</span>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Clasificación de Lesión</h2>
          </div>
          <button className="px-4 py-2 border border-primary/30 rounded-lg text-primary text-[10px] font-bold uppercase hover:bg-primary/10 transition-colors">
            + Añadir Otra Lesión
          </button>
        </div>

        <div className="bg-[#0a0d10] border border-white/5 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Zona */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Zona Corporal</label>
              <div className="relative">
                <select
                  value={formData.zonaCorporal}
                  onChange={handleBodyZoneChange}
                  className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                >
                  {Object.keys(BODY_PARTS).map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
              </div>
            </div>
            {/* Lado */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lado</label>
              <div className="relative">
                <select
                  value={formData.lado}
                  onChange={(e) => setFormData({ ...formData, lado: e.target.value })}
                  className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
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
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estructura Específica</label>
              <div className="relative">
                <select
                  value={formData.estructuraEspecifica}
                  onChange={(e) => setFormData({ ...formData, estructuraEspecifica: e.target.value })}
                  className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                >
                  {BODY_PARTS[formData.zonaCorporal]?.map(part => (
                    <option key={part} value={part}>{part}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Tipo - Right Aligned in previous row in visual, but grid here serves well */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tipo</label>
              <div className="relative">
                <select
                  value={formData.tipoLesion}
                  onChange={handleTypeChange}
                  className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                >
                  {Object.keys(INJURY_TYPES).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Causa */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Causa</label>
              <div className="relative">
                <select
                  value={formData.causa}
                  onChange={(e) => setFormData({ ...formData, causa: e.target.value })}
                  className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none appearance-none cursor-pointer"
                >
                  <option>Traumático</option>
                  <option>No Traumático</option>
                  <option>Sobrecarga</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Grado / Detalle - Bigger */}
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Grado / Detalle (Ampliado)</label>
              <input
                type="text"
                value={formData.gradoDetalle}
                onChange={(e) => setFormData({ ...formData, gradoDetalle: e.target.value })}
                className="w-full bg-[#161b22] text-white border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:border-primary outline-none placeholder:text-gray-600"
                placeholder="Ej: Grado II, Rotura Parcial, Edema Oseo..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRATAMIENTO & ESTADO */}
      <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5 shadow-2xl">
        {/* Tratamiento */}
        <div className="mb-8">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Tratamiento Planificado</label>
          <div className="bg-[#0a0d10] border border-blue-500/20 rounded-2xl p-4">
            <textarea
              value={formData.tratamiento}
              onChange={(e) => setFormData({ ...formData, tratamiento: e.target.value })}
              className="w-full h-24 bg-transparent text-white text-sm outline-none resize-none placeholder:text-blue-500/30 font-medium"
              placeholder="Fisioterapia, pauta de ejercicios, medicación..."
            ></textarea>
          </div>
        </div>

        {/* Estado */}
        <div className="mb-8">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Estado del Jugador</label>
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
            >
              <option value="OFF">OFF / BAJA TOTAL</option>
              <option value="REHAB">REHAB / PARCIAL</option>
              <option value="ON">ON / DISPONIBLE</option>
            </select>
            <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${formData.estado === 'OFF' ? 'text-rose-500' : formData.estado === 'REHAB' ? 'text-amber-500' : 'text-emerald-500'
              }`}>expand_more</span>
          </div>
        </div>
      </div>



      {/* 6. ARCHIVOS */}
      <div className="bg-[#161b22] rounded-3xl p-8 border border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-gray-400">attach_file</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Añadir Archivos (PDF/PNG)</h3>
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
          <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300 uppercase tracking-widest">Arrastrar archivos aquí</span>
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

      {/* 7. AI ASSISTANT (MOVED TO END) */}
      <div className="bg-[#0a0d10] rounded-3xl p-1 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>

        <div className="bg-[#0a0d10]/80 backdrop-blur-xl rounded-[20px] p-8 h-full relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 animate-pulse"></div>
                <div className="relative p-2 bg-black border border-cyan-500/50 rounded-lg">
                  <span className="material-symbols-outlined text-cyan-400">smart_toy</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">AI Medical Analysis</h3>
                <p className="text-[10px] font-bold text-cyan-500/70 uppercase tracking-wider">Powered by AthletePro Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-[pulse_2s_infinite]"></div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Live Generation</span>
            </div>
          </div>

          <div className="relative group/textarea">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover/textarea:opacity-100 transition duration-500 blur"></div>
            <div className="relative">
              <textarea
                readOnly
                value={formData.comentarioIA}
                className="w-full h-40 bg-[#0d1117] rounded-xl border border-white/5 p-6 text-cyan-100/90 text-sm leading-relaxed font-mono outline-none resize-none shadow-inner"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest border-t border-white/5 pt-4">
            <span>Model: AP-MED-v4.2</span>
            <span>Latency: ~12ms</span>
            <span className="flex-1 text-right text-cyan-500/50">Auto-filled based on inputs</span>
          </div>
        </div>
      </div>
      <PlayerStatsReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        player={selectedPlayer}
      />
    </main>
  );
};

export default ExportReport;
