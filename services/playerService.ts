import { supabase } from './supabase';
import { Player } from './mockPlayers'; // Importing type from mock for now to keep consistency

export const getPlayers = async (): Promise<Player[]> => {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('number', { ascending: true });

    if (error) {
        console.error('Error fetching players:', error);
        return [];
    }

    return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        number: p.number,
        photo: p.photo, // Will be null or a URL string
        position: p.position,
        risk: p.risk,
        status: p.status,
        readiness: p.readiness,
        lastAssessment: p.last_assessment
    }));
};

export const uploadPlayerPhoto = async (playerId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${playerId}.${fileExt}`;
    const filePath = `${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    // 3. Update Player Record
    const { error: updateError } = await supabase
        .from('players')
        .update({ photo: publicUrl })
        .eq('id', playerId);

    if (updateError) throw updateError;

    return publicUrl;
};
