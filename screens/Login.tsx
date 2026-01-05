import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple authentication for demonstration
        if (email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);

            if (email === 'jugador@cbc.com' || email === 'jugadores@cbc.com') {
                navigate('/player/wellness');
            } else if (email === 'medico@cbc.com') {
                navigate('/medical');
            } else if (email === 'fisio@cbc.com') {
                navigate('/fisio');
            } else if (email === 'prepa@cbc.com') {
                navigate('/prepa');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex h-screen w-full bg-background-dark items-center justify-center font-display">
            <div className="w-full max-w-md p-8 flex flex-col items-center gap-8">
                {/* Logo and Welcome Section */}
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 relative">
                        <img
                            src="/healthtrack-logo.png"
                            alt="Health Track Logo"
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                            BIENVENIDO A
                        </h1>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-wide">
                            HEALTH TRACK
                        </h1>
                    </div>
                </div>

                {/* Login Panel */}
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 bg-surface-dark p-6 rounded-2xl border border-surface-border shadow-xl">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-text-secondary text-sm font-medium ml-1">
                            Usuario (Correo)
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-surface-border"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-text-secondary text-sm font-medium ml-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-surface-border"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-background-dark font-bold text-lg py-3 rounded-xl transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] mt-2"
                    >
                        ENTRAR
                    </button>
                </form>

                <p className="text-text-secondary text-xs opacity-60">
                    © 2025 Health Track Elite Performance System
                </p>
            </div>
        </div>
    );
};

export default Login;
