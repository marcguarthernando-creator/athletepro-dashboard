import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserProfileSettings: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [profileImage, setProfileImage] = useState("https://ui-avatars.com/api/?name=Dr+Martinez&background=00E5FF&color=0a192f");
    const [imageScale, setImageScale] = useState(1);
    const [showFramer, setShowFramer] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const userEmail = localStorage.getItem('userEmail') || 'medico@cbc.com';
    const isDoctor = userEmail === 'medico@cbc.com';
    const isFisio = userEmail === 'fisio@cbc.com';
    const isPrepa = userEmail === 'prepa@cbc.com';

    const [formData, setFormData] = useState({
        name: isFisio ? 'Responsable' : isPrepa ? 'Daniel' : 'Sergio',
        lastName: isFisio ? 'Fisio' : isPrepa ? 'Brage' : 'Berjon',
        email: userEmail,
        birthDate: '1985-05-12',
        password: '••••••••••••'
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);

            // Persist to local storage for sidebar sync
            // Specifically store Dr. LASTNAME for the sidebar as requested for doctors
            // For others (Fisio, Prepa), store Full Name "Name LastName" so sidebar can split it
            const sidebarName = isDoctor ? `Dr. ${formData.lastName}` : `${formData.name} ${formData.lastName}`;
            localStorage.setItem('userName', sidebarName);
            localStorage.setItem('doctorImage', profileImage);

            // Dispatch event for same-tab sync
            window.dispatchEvent(new Event('storage'));

            setTimeout(() => setSaved(false), 3000);
        }, 1500);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setShowFramer(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Header background decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10">
                <div className="max-w-4xl mx-auto space-y-12 pb-20">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate(isDoctor ? '/medical/dashboard' : '/fisio/dashboard')}
                                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-4"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Volver al Dashboard
                            </button>
                            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                                Perfil del <span className="text-primary">{isDoctor ? 'Dr.' : ''} {formData.name} {formData.lastName}</span>
                            </h1>
                            <p className="text-text-secondary text-sm font-bold opacity-60">Gestiona tus datos personales y credenciales de acceso.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Column 1: Avatar & Basic Info */}
                        <div className="space-y-8">
                            <div className="bg-surface-dark border border-surface-border p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                                <div className="relative mb-6">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="size-32 rounded-full bg-primary/10 p-1 border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.1)] cursor-pointer"
                                    >
                                        <div
                                            className="w-full h-full rounded-full overflow-hidden"
                                            style={{ transform: `scale(${imageScale})` }}
                                        >
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 size-10 bg-primary text-background-dark rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                                    >
                                        <span className="material-symbols-outlined">photo_camera</span>
                                    </button>
                                </div>

                                <h2 className="text-xl font-black text-white px-4">{isDoctor ? 'Dr.' : ''} {formData.name} {formData.lastName}</h2>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1 opacity-80">{isDoctor ? 'Jefe Médico' : 'Fisioterapeuta'}</p>

                                <div className="mt-8 w-full space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="material-symbols-outlined text-sm text-text-secondary">calendar_today</span>
                                        <p className="text-[11px] font-bold text-white/50">{formData.birthDate}</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="material-symbols-outlined text-sm text-text-secondary">mail</span>
                                        <p className="text-[11px] font-bold text-white/50">{formData.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 & 3: Main Form */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-surface-dark border border-surface-border p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-secondary font-black uppercase tracking-widest ml-1">Nombre</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-secondary font-black uppercase tracking-widest ml-1">Apellidos</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-secondary font-black uppercase tracking-widest ml-1">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-secondary font-black uppercase tracking-widest ml-1">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2 relative">
                                        <label className="text-[10px] text-text-secondary font-black uppercase tracking-widest ml-1">Contraseña Nueva</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full bg-background-dark/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all"
                                                placeholder="Escribe tu nueva contraseña"
                                            />
                                            <button
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col md:flex-row items-center gap-4 pt-8 border-t border-white/5">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className={`w-full md:w-auto min-w-[200px] h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20
                                            ${saved ? 'bg-emerald-500 text-white' : 'bg-primary text-background-dark hover:scale-105 active:scale-95'}
                                            ${isSaving ? 'opacity-70 cursor-wait' : ''}
                                        `}
                                    >
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                                        ) : saved ? (
                                            <>
                                                <span className="material-symbols-outlined">check_circle</span>
                                                ¡Guardado con éxito!
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined">save</span>
                                                Guardar Cambios
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => navigate(isDoctor ? '/medical/dashboard' : '/fisio/dashboard')}
                                        className="w-full md:w-auto px-10 h-14 rounded-2xl border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>

                                {/* Saved confirmation overlay */}
                                {saved && (
                                    <div className="absolute top-8 right-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                            Base de Datos Actualizada
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Photo Framer Modal */}
            {showFramer && (
                <div className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-surface-dark border border-white/10 w-full max-w-lg rounded-[3rem] p-8 space-y-8 animate-in fade-in zoom-in duration-300 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                Encuadrar <span className="text-primary">Foto</span>
                            </h2>
                            <p className="text-text-secondary text-xs font-bold opacity-60">Ajusta el zoom para centrar tu imagen correctamente.</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="size-48 rounded-full border-4 border-primary/20 p-2 overflow-hidden bg-background-dark">
                                <div
                                    className="w-full h-full rounded-full overflow-hidden flex items-center justify-center shadow-inner"
                                >
                                    <img
                                        src={profileImage}
                                        style={{ transform: `scale(${imageScale})` }}
                                        className="min-w-full min-h-full object-cover transition-transform duration-100"
                                        alt="Framer preview"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary">
                                    <span>Zoom</span>
                                    <span className="text-primary">{Math.round(imageScale * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="3"
                                    step="0.01"
                                    value={imageScale}
                                    onChange={(e) => setImageScale(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            <button
                                onClick={() => setShowFramer(false)}
                                className="w-full py-4 bg-primary text-background-dark rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                            >
                                Confirmar Encuadre
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileSettings;
