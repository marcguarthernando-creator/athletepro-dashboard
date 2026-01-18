import { supabase } from './supabase';

export interface Injury {
    id: string;
    player_id: string;
    date: string;
    type: string;
    diagnosis: string;
    status: 'Activa' | 'Recuperada';
    severity: string;
    treatment: string;
    estimated_return: string;
    is_private: boolean;
}

export const getInjuriesByPlayer = async (playerId: string) => {
    const { data, error } = await supabase
        .from('injuries')
        .select('*')
        .eq('player_id', playerId)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching injuries:', error);
        return [];
    }
    return data;
};

export const getActiveInjuries = async () => {
    // Joins with players to get name and photo
    const { data, error } = await supabase
        .from('injuries')
        .select(`
        *,
        players (
          name,
          photo
        )
      `)
        .eq('status', 'Activa')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching active injuries:', error);
        return [];
    }

    // Transform to match the UI interface if needed
    return data.map((injury: any) => ({
        id: injury.player_id, // Navigating to player profile usually uses player_id
        injuryId: injury.id,
        playerName: injury.players?.name || 'Unknown',
        photo: injury.players?.photo || '',
        injuryName: injury.diagnosis || injury.type,
        treatment: injury.treatment,
        estimatedReturn: injury.estimated_return,
        severity: injury.severity?.toLowerCase() || 'medium',
        daysActive: calculateDaysDifference(injury.date)
    }));
};

function calculateDaysDifference(dateString: string): number {
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
