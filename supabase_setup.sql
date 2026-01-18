-- 1. Create the table
CREATE TABLE IF NOT EXISTS players (
  id text PRIMARY KEY,
  name text NOT NULL,
  number integer,
  photo text,
  position text,
  risk text,
  status text,
  readiness integer,
  last_assessment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (Good practice)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow read access to everyone (since we are using Anon key for now)
-- Note: In a real app you might restrict this to authenticated users.
CREATE POLICY "Allow public read access" ON players
  FOR SELECT USING (true);

-- 4. Seed data (from mockPlayers)
INSERT INTO players (id, name, number, photo, position, risk, status, readiness, last_assessment) VALUES
('1', 'Alejandro Guerra', 10, '/default-avatar.jpg', 'Alero', 'low', 'Disponible', 92, 'Hoy, 09:00'),
('2', 'Babel Lipasi', 15, '/default-avatar.jpg', 'Pívot', 'low', 'Disponible', 88, 'Hoy, 09:15'),
('3', 'David Acosta', 7, '/default-avatar.jpg', 'Base', 'medium', 'Duda', 75, 'Hoy, 08:30'),
('4', 'David Delgado', 12, '/default-avatar.jpg', 'Escolta', 'low', 'Disponible', 95, 'Hoy, 08:45'),
('5', 'Diego Fernandez', 5, '/default-avatar.jpg', 'Base', 'low', 'Disponible', 91, 'Hoy, 09:10'),
('6', 'Dylan Bordon', 8, '/default-avatar.jpg', 'Escolta', 'low', 'Disponible', 90, 'Hoy, 09:00'),
('7', 'Emilis Prekivicius', 14, '/default-avatar.jpg', 'Alero', 'medium', 'Duda', 68, 'Hoy, 08:20'),
('8', 'Louis Riga', 11, '/default-avatar.jpg', 'Ala-Pívot', 'low', 'Disponible', 85, 'Hoy, 09:30'),
('9', 'Manuel Crujeiras', 20, '/default-avatar.jpg', 'Pívot', 'high', 'Baja', 35, 'Ayer, 18:00'),
('10', 'Mohamed Sangare', 23, '/default-avatar.jpg', 'Ala-Pívot', 'low', 'Disponible', 94, 'Hoy, 08:50'),
('11', 'Rafa Rodriguez', 6, '/default-avatar.jpg', 'Base', 'medium', 'Duda', 72, 'Hoy, 08:00'),
('12', 'Xabier Lopez', 9, '/default-avatar.jpg', 'Escolta', 'low', 'Disponible', 89, 'Hoy, 09:20')
ON CONFLICT (id) DO NOTHING;
