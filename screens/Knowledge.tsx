import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Knowledge: React.FC = () => {
    const { t } = useLanguage();

    // Mock Data for "Daily News"
    const news = [
        {
            id: 1,
            title: "Nuevo protocolo de conmociones cerebrales en baloncesto",
            summary: "La FIBA actualiza las directrices para el retorno al juego tras un traumatismo craneoencefálico, enfatizando el reposo cognitivo de 48h.",
            source: "FIBA Medical",
            date: "29 Ene 2026",
            link: "https://www.fiba.basketball/medical" // Placeholder
        },
        {
            id: 2,
            title: "Eficacia de la crioterapia pos-partido",
            summary: "Estudio reciente cuestiona los beneficios de la inmersión en agua helada para la hipertrofia, aunque confirma su utilidad analgésica inmediata.",
            source: "Sports Sci Journal",
            date: "28 Ene 2026",
            link: "https://pubmed.ncbi.nlm.nih.gov/" // Placeholder
        },
        {
            id: 3,
            title: "Nutrición y sueño en el atleta de élite",
            summary: "Cómo la ingesta de triptófano y magnesio antes de dormir mejora la calidad del sueño REM en jugadores con alta carga de viajes.",
            source: "Journal of ISSN",
            date: "27 Ene 2026",
            link: "https://jissn.biomedcentral.com/" // Placeholder
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0d10] overflow-y-auto p-8 animate-in fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-primary">menu_book</span>
                    {t('knowledge.title')}
                </h1>
                <p className="text-gray-500 text-sm max-w-2xl">{t('knowledge.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => window.open(item.link, '_blank')}
                        className="bg-[#161b22] border border-white/5 rounded-3xl p-6 cursor-pointer hover:border-primary/50 hover:bg-[#1c222b] transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.source}</span>
                            <span className="text-gray-500 text-[10px] font-bold uppercase">{item.date}</span>
                        </div>

                        <h2 className="text-lg font-black text-white uppercase leading-tight mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                            {item.summary}
                        </p>

                        <div className="flex items-center gap-2 text-text-secondary group-hover:text-white transition-colors">
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('knowledge.readMore')}</span>
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Knowledge;
