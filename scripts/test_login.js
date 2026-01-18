
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env = {};
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function testLogin() {
    console.log('Testing login for medico@cbc.com...');
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'medico@cbc.com',
        password: 'password123'
    });

    if (error) {
        console.error('Login PAILED:', error.message);
    } else {
        console.log('Login SUCCESS! User ID:', data.user.id);
    }
}

testLogin();
