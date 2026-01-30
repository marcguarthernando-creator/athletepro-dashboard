import React, { useState, useMemo } from 'react';

// Hardcoded list of images
const PLAYBOOK_IMAGES = [
    "1 DOWN.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg",
    "4 LADO FLASH.jpg", "4 LADO.jpg", "41 FLASH.jpg", "41.jpg", "42.jpg",
    "43.jpg", "44.jpg", "47.jpg", "50.jpg", "51 FLASH.jpg",
    "51.jpg", "52.jpg", "54.jpg", "BLOB 1.jpg", "BLOB 22.jpg",
    "BLOB 23.jpg", "BLOB 25.jpg", "BLOB 3 FLASH.jpg", "BLOB 3.jpg", "BLOB LOW.jpg",
    "BLOB POCO 1.jpg", "BLOB ZONE MAC 2.jpg", "CORTES 1.jpg", "CORTES 22.jpg", "CORTES 3.jpg",
    "CORTES ARRIBA.jpg", "CORTES BLUE.jpg", "FAST.jpg", "PECHO 1.jpg", "PECHO 3.jpg",
    "PECHO.jpg", "PRESS BREAK 2.jpg", "PRESS BREAK BOX.jpg", "PULGAR.jpg", "QUICK 1.jpg",
    "QUICK 2.jpg", "QUICK 4.jpg", "QUICK 5.jpg", "QUICK VUELTAS.jpg", "QUICK.png",
    "SHORT 1.jpg", "SHORT.png", "SLOB 41.jpg", "SLOB 42.jpg", "SLOB 43.jpg",
    "SLOB LAGUN 1.jpg", "SLOB LAGUN 2.jpg", "SLOB LAGUN.jpg", "SLOB LINE.jpg", "SLOB LOW.jpg",
    "SLOB QUICK 1.jpg", "SLOB QUICK.jpg", "SLOB ZONE CAMISETA.jpg", "SLOB ZONE MAC 2.jpg", "TRANSI.jpg",
    "ZONE CAMISETA.jpg", "ZONE CORTES.jpg", "ZONE MAC 2.jpg", "ZONE PANTALÓN.jpg", "ZONE PULGAR.jpg"
];

const PlayerPlaybook = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter images based on search
    const filteredImages = useMemo(() => {
        if (!searchTerm.trim()) return PLAYBOOK_IMAGES;
        const lower = searchTerm.toLowerCase();
        return PLAYBOOK_IMAGES.filter(img => img.toLowerCase().includes(lower));
    }, [searchTerm]);

    return (
        <div className="flex-1 bg-background-dark p-6 md:p-8 text-white overflow-y-auto w-full pb-20">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary">menu_book</span>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Playbook</h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors">search</span>
                    <input
                        type="text"
                        placeholder="Buscar jugada (ej. 4 LADO)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#161b22] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    />
                </div>
            </header>

            {filteredImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
                    <p className="text-xl font-bold uppercase tracking-wide">No se encontraron jugadas</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredImages.map((filename, index) => {
                        const isMatch = searchTerm && filename.toLowerCase().includes(searchTerm.toLowerCase());

                        return (
                            <button
                                key={filename}
                                onClick={() => setSelectedImage(filename)}
                                className={`group relative aspect-[4/3] bg-surface rounded-xl overflow-hidden border transition-all hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-primary/10 ${isMatch ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-white/5 hover:border-primary/50'}`}
                            >
                                {/* Image */}
                                <img
                                    src={`/playbook/${filename}`}
                                    alt={filename}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    loading="lazy"
                                />

                                {/* Caption Overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-white truncate text-center w-full shadow-black drop-shadow-md">
                                        {filename.replace(/\.(jpg|png|jpeg)$/i, '')}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center">
                        <img
                            src={`/playbook/${selectedImage}`}
                            alt={selectedImage}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <p className="mt-4 text-white font-bold text-xl uppercase tracking-widest text-center">
                            {selectedImage.replace(/\.(jpg|png|jpeg)$/i, '')}
                        </p>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white/50 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerPlaybook;
