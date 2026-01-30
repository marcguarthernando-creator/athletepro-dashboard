import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InjuryEvolutionModal from './InjuryEvolutionModal';
import MedicalChatbot from './MedicalChatbot';

import { useLanguage } from '../contexts/LanguageContext';
import TeamSelector from '../components/TeamSelector';

const MedicalStats: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const statsSections = [
        { id: 'availability', title: t('medicalStats.availability'), icon: 'check_circle', color: 'text-emerald-500' },
        { id: 'injuries_type', title: t('medicalStats.byType'), icon: 'medical_services', color: 'text-blue-500' },
        { id: 'consultations', title: t('medicalStats.consultations'), icon: 'assignment', color: 'text-purple-500' },
        { id: 'prevalence', title: t('medicalStats.prevalence'), icon: 'monitoring', color: 'text-rose-500' }
    ];

    const renderDetail = () => {
        if (!selectedDetail) return null;

        const currentSectionTitle = statsSections.find(s => s.id === selectedDetail)?.title;

        return (
            <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 bg-[#161b22] p-8 rounded-3xl border border-white/5 relative">
                <button onClick={() => setSelectedDetail(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                    {selectedDetail === 'availability' ? t('medicalStats.teamAvailability') : currentSectionTitle}
                </h2>

                {selectedDetail === 'availability' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-300 mb-4">{t('medicalStats.teamAvailability')}</h3>
                        {/* Mock Bar Chart */}
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                    <span>{t('medicalDashboard.available')} (85%)</span>
                                    <span>10 {t('sidebar.players').toLowerCase()}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                    <span>{t('medicalDashboard.doubt')} (10%)</span>
                                    <span>1 {t('questionnaires.player').toLowerCase()}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[10%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                    <span>{t('medicalDashboard.risk')} (5%)</span>
                                    <span>1 {t('questionnaires.player').toLowerCase()}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 w-[5%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedDetail === 'injuries_type' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-background-dark p-6 rounded-2xl border border-white/5">
                            <h4 className="text-sm font-bold text-white uppercase mb-4">{t('medicalStats.byStructure')}</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl font-bold text-white">40%</div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-xs text-gray-400">{t('medicalStats.muscular')}</span></div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><span className="text-xs text-gray-400">{t('medicalStats.articular')}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-background-dark p-6 rounded-2xl border border-white/5">
                            <h4 className="text-sm font-bold text-white uppercase mb-4">{t('medicalStats.bySeverity')}</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400"><span>{t('medicalStats.mild')}</span><span className="text-white">60%</span></div>
                                <div className="h-1.5 bg-white/5 rounded-full"><div className="h-full bg-emerald-400 w-[60%]"></div></div>
                                <div className="flex justify-between text-xs text-gray-400 mt-2"><span>{t('medicalStats.severe')}</span><span className="text-white">10%</span></div>
                                <div className="h-1.5 bg-white/5 rounded-full"><div className="h-full bg-rose-500 w-[10%]"></div></div>
                            </div>
                        </div>
                    </div>
                )}

                {(selectedDetail === 'consultations' || selectedDetail === 'prevalence') && (
                    <div className="h-40 flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-3xl mb-2 opacity-50">bar_chart</span>
                            <p className="uppercase font-bold tracking-widest text-xs">{t('medicalStats.historicalData')}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative p-6 md:p-10 bg-[#0a0d10]">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">{t('medicalStats.title')}</h1>
                    <p className="text-gray-500 text-base">{t('medicalStats.subtitle')}</p>
                </div>
                <TeamSelector />
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
                            {t('medicalStats.clickToView')}
                        </p>

                        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>{t('medicalStats.viewStats')}</span>
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
