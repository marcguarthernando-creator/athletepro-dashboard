
import React from 'react';
import { useTeam } from '../contexts/TeamContext';

const TeamSelector: React.FC = () => {
    const { selectedTeam, setSelectedTeam, teams } = useTeam();

    return (
        <div className="relative z-20 w-full xl:w-auto">
            <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full xl:w-auto bg-[#161b22] text-white border border-white/10 rounded-xl px-5 py-3 pr-10 text-sm font-bold uppercase tracking-wider outline-none focus:border-primary appearance-none cursor-pointer hover:bg-white/5 transition-colors shadow-lg"
            >
                {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">expand_more</span>
        </div>
    );
};

export default TeamSelector;
