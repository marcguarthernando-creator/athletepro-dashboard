import React from 'react';

const GymTraining: React.FC = () => {
    return (
        <div className="flex-1 p-6 md:p-10 bg-background-dark min-h-screen text-white flex flex-col items-center justify-center">
            <div className="text-center opacity-50">
                <span className="material-symbols-outlined text-6xl mb-4">fitness_center</span>
                <h2 className="text-xl font-bold uppercase tracking-widest">Entrenamiento Gym</h2>
                <p className="text-sm mt-2">Configuración pendiente...</p>
            </div>
        </div>
    );
};

export default GymTraining;
