import { supabase } from './supabase';

export const getMedicalProfile = async (playerId: string) => {
    const { data, error } = await supabase
        .from('medical_profiles')
        .select('*')
        .eq('player_id', playerId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // Result contains 0 rows
            return null;
        }
        console.error('Error fetching medical profile:', error);
        return null;
    }
    return data;
};

export const updateMedicalProfile = async (playerId: string, updates: any) => {
    // We can upsert. Since we enabled RLS, ensure policies allow updates.
    const { data, error } = await supabase
        .from('medical_profiles')
        .upsert({
            player_id: playerId,
            ...updates,
            updated_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error('Error updating medical profile:', error);
        throw error;
    }
    return data;
};
