
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env = {};
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const users = [
    { email: 'partidoscbcanarias@gmail.com', password: 'password123', role: 'player', name: 'Jugador Real' },
    { email: 'marcguarthernando@gmail.com', password: 'password123', role: 'medical', name: 'Marc Guart (Médico)' },
    { email: 'healthtrack1939@gmail.com', password: 'password123', role: 'physio', name: 'Fisio Real' },
    { email: 'm.guart@cbcanarias.es', password: 'password123', role: 'strength', name: 'Preparador Físico Real' }
];

async function createUsers() {
    console.log('Creating users...');

    for (const user of users) {
        console.log(`Creating ${user.email}...`);

        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    full_name: user.name,
                    role: user.role
                }
            }
        });

        if (error) {
            console.error(`Error creating ${user.email}:`, error.message);
        } else {
            console.log(`Created/Registered ${user.email} successfully (ID: ${data.user?.id})`);
            console.log(`NOTE: If Email Confirmation is enabled in Supabase, this user cannot login yet.`);
        }
    }
}

createUsers();
