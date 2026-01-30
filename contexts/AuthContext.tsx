
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    debugLogin: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
    debugLogin: (_email: string) => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const STORAGE_KEY = 'healthtrack-debug-session';

    useEffect(() => {
        // Get initial session
        console.log('AuthContext: Fetching session...');

        const restoreSession = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const { session } = JSON.parse(stored);
                    console.log('AuthContext: Restored debug session from storage');
                    setSession(session);
                    setUser(session?.user ?? null);
                    setLoading(false);
                    return true;
                }
            } catch (e) {
                console.error('AuthContext: Failed to parse stored session', e);
                localStorage.removeItem(STORAGE_KEY);
            }
            return false;
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log('AuthContext: Session fetched', session);
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            } else {
                // Try to restore from local storage if Supabase has no session
                if (!restoreSession()) {
                    setSession(null);
                    setUser(null);
                    setLoading(false);
                }
            }
        }).catch((_err) => {
            console.error('AuthContext: Session fetch error', _err);
            // On error, also try to restore (e.g. offline)
            if (!restoreSession()) {
                setSession(null);
                setUser(null);
                setLoading(false);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        localStorage.removeItem(STORAGE_KEY);
        // Clean up legacy keys if present
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
    };

    const debugLogin = (email: string) => {
        console.log('--- DEBUG LOGIN BYPASS ACTIVATED ---');
        // Create a fake user object for local session
        let role = 'authenticated';
        let firstName = 'Usuario';
        let lastName = 'Debug';

        if (email.includes('medico') || email.includes('marcguarthernando')) {
            role = 'medical_staff';
            firstName = 'Marc';
            lastName = 'Guart';
        } else if (email.includes('fisio') || email.includes('healthtrack1939')) {
            role = 'physiotherapist';
            firstName = 'Fisio';
            lastName = 'Principal';
        } else if (email.includes('prepa') || email.includes('m.guart')) {
            role = 'strength_coach';
            firstName = 'Preparador';
            lastName = 'Físico';
        } else if (email.includes('jugador')) {
            role = 'player';
            firstName = 'Jugador';
            lastName = 'Demo';
        }

        const fakeUser = {
            id: 'debug-user-id-' + Math.random(),
            aud: 'authenticated',
            role: 'authenticated',
            email: email,
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: {
                first_name: firstName,
                last_name: lastName,
                role: role
            },
            created_at: new Date().toISOString(),
            confirmed_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            phone: '',
        } as User;

        const fakeSession = {
            access_token: 'fake-token-debug',
            refresh_token: 'fake-refresh-debug',
            expires_in: 3600,
            token_type: 'bearer',
            user: fakeUser
        } as Session;

        localStorage.setItem(STORAGE_KEY, JSON.stringify({ session: fakeSession }));
        setSession(fakeSession);
        setUser(fakeUser);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut, debugLogin }}>
            {loading ? (
                <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0f1c', color: 'white' }}>
                    <h2 style={{ fontSize: '24px', color: '#00E5FF' }}>INICIANDO SESIÓN...</h2>
                    <p>Conectando con Supabase...</p>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
