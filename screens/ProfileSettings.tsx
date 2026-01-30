import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const ProfileSettings: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    // Role Logic
    const userEmail = user?.email || localStorage.getItem('userEmail');
    const isDoctor = userEmail?.includes('medico') || userEmail?.includes('marcguarthernando');
    const isFisio = userEmail?.includes('fisio') || userEmail?.includes('healthtrack1939');
    const isPrepa = userEmail?.includes('prepa') || userEmail?.includes('m.guart');

    const roleLabel = isDoctor ? "JEFE MÉDICO" : isPrepa ? "PREPARADOR FÍSICO" : isFisio ? "FISIOTERAPEUTA" : "JUGADOR";

    // Initial State loading from localStorage or defaults
    const [firstName, setFirstName] = useState(() => localStorage.getItem('userFirstName') || "Sergio");
    const [lastName, setLastName] = useState(() => localStorage.getItem('userLastName') || "Berjón");
    const [email, setEmail] = useState(() => localStorage.getItem('userEmail') || user?.email || "dr.berjon@club.com");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState(() => localStorage.getItem('doctorImage') || "https://ui-avatars.com/api/?name=Dr+Sergio&background=00E5FF&color=0a192f");

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Cropper State
    const [tempImg, setTempImg] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setTempImg(reader.result as string);
                setIsCropping(true);
            });
            reader.readAsDataURL(file);
            // Verify this part works as expected for file input reset if needed
            e.target.value = '';
        }
    };

    const handleCropSave = async () => {
        try {
            if (tempImg && croppedAreaPixels) {
                const croppedImage = await getCroppedImg(tempImg, croppedAreaPixels);
                if (croppedImage) {
                    setPhotoUrl(croppedImage);
                    setIsCropping(false);
                    setTempImg(null);
                }
            }
        } catch (e) {
            console.error(e);
            setIsCropping(false);
        }
    };

    const handleSave = () => {
        try {
            localStorage.setItem('userFirstName', firstName);
            localStorage.setItem('userLastName', lastName);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('doctorImage', photoUrl);

            let displayName = `${firstName} ${lastName}`;
            if (isDoctor) {
                displayName = `Dr. ${lastName}`;
            } else if (isPrepa || isFisio || !isDoctor) { // Default to Initial. Surname for everyone else (Prepa, Fisio, Player)
                displayName = `${firstName.charAt(0).toUpperCase()}. ${lastName.toUpperCase()}`;
            }

            localStorage.setItem('userName', displayName);

            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('profile-updated'));

            setMessage({ text: "Cambios guardados correctamente", type: 'success' });

            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ text: "Error al guardar los cambios", type: 'error' });
        }
    };

    return (
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-background-dark min-h-screen flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Configuración de Perfil</h1>
                    <p className="text-text-secondary">Gestiona tu información personal y credenciales de acceso.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Photo & Role (Smaller width) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col items-center shadow-lg">
                            {/* Hidden Input */}
                            <input
                                type="file"
                                id="photo-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {/* Clickable Image (No button anymore) */}
                            <div
                                className="relative group cursor-pointer mb-6"
                                onClick={() => document.getElementById('photo-upload')?.click()}
                                title="Cambiar foto de perfil"
                            >
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-surface-border group-hover:border-primary transition-colors shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                    <span className="material-symbols-outlined text-white text-3xl mb-1">photo_camera</span>
                                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Cambiar</span>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-surface-dark rounded-full p-1.5 border border-surface-border shadow-md pointer-events-none">
                                    <span className="material-symbols-outlined text-primary text-sm">edit</span>
                                </div>
                            </div>

                            <div className="w-full pt-6 border-t border-surface-border border-dashed">
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block text-center">Rol / Cargo</label>
                                <div className="w-full bg-primary/10 text-primary border border-primary/20 rounded-lg px-4 py-3 font-bold uppercase tracking-wider text-center cursor-not-allowed">
                                    {roleLabel}
                                </div>
                                <p className="text-[10px] text-text-secondary mt-2 text-center italic opacity-60">
                                    El rol es asignado por la administración.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Fields (Wider) */}
                    <div className="lg:col-span-8">
                        <div className="bg-surface-dark border border-surface-border p-8 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Información Personal
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Nombre</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-background-dark text-white border border-surface-border rounded-xl px-4 py-3 font-medium focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Apellidos</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-background-dark text-white border border-surface-border rounded-xl px-4 py-3 font-medium focus:border-primary outline-none transition-colors"
                                    />
                                    <p className="text-[10px] text-primary mt-1.5 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">info</span>
                                        {isDoctor
                                            ? `Se mostrará como "Dr. ${lastName}"`
                                            : `Se mostrará como "${firstName?.charAt(0).toUpperCase()}. ${lastName?.toUpperCase()}"`
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-surface-border border-dashed my-8"></div>

                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">lock_person</span>
                                Seguridad
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background-dark text-white border border-surface-border rounded-xl px-4 py-3 font-medium focus:border-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Contraseña</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-background-dark text-white border border-surface-border rounded-xl px-4 py-3 font-medium focus:border-primary outline-none transition-colors placeholder-white/20"
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    {message && (
                                        <div className={`px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                                            <span className="material-symbols-outlined text-lg">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                                            {message.text}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="bg-primary hover:bg-primary-dark text-background-dark font-black px-8 py-3 rounded-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 flex-shrink-0"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cropper Modal */}
            {isCropping && tempImg && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-surface-dark border border-surface-border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-surface-border flex justify-between items-center bg-background-dark/50">
                            <h3 className="text-white font-bold uppercase tracking-wide">Ajustar Foto</h3>
                            <button onClick={() => setIsCropping(false)} className="text-text-secondary hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="relative w-full h-[400px] bg-black">
                            <Cropper
                                image={tempImg}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={false}
                                cropShape="round"
                            />
                        </div>

                        <div className="p-6 bg-surface-dark border-t border-surface-border space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-text-secondary text-sm">remove_circle</span>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-1 bg-surface-border rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light"
                                />
                                <span className="material-symbols-outlined text-text-secondary text-sm">add_circle</span>
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <button
                                    onClick={() => setIsCropping(false)}
                                    className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-white uppercase tracking-wider transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCropSave}
                                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-background-dark text-sm font-black rounded-lg uppercase tracking-wider transition-colors shadow-lg shadow-primary/20"
                                >
                                    Aplicar y Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;
