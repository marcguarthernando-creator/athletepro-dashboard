
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TeamContextType {
    selectedTeam: string;
    setSelectedTeam: (team: string) => void;
    teams: string[];
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTeam, setSelectedTeam] = useState('Primer Equipo');
    const teams = ['Primer Equipo', 'Junior', 'Cadete', 'Infantil'];

    return (
        <TeamContext.Provider value={{ selectedTeam, setSelectedTeam, teams }}>
            {children}
        </TeamContext.Provider>
    );
};
