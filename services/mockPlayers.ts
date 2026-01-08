export interface Player {
    id: string;
    name: string;
    number: number;
    photo: string;
    position: string;
    risk: 'low' | 'medium' | 'high';
    status: 'Disponible' | 'Duda' | 'Baja';
    readiness: number;
    lastAssessment: string;
}

export const mockPlayers: Player[] = [
    { id: '1', name: 'Antonio López', number: 10, photo: '/default-avatar.jpg', position: 'Alero', risk: 'low', status: 'Disponible', readiness: 92, lastAssessment: 'Hoy, 09:00' },
    { id: '2', name: 'Carlos Ruiz', number: 15, photo: '/default-avatar.jpg', position: 'Pívot', risk: 'low', status: 'Disponible', readiness: 88, lastAssessment: 'Hoy, 09:15' },
    { id: '3', name: 'Javier García', number: 7, photo: '/default-avatar.jpg', position: 'Base', risk: 'medium', status: 'Duda', readiness: 75, lastAssessment: 'Hoy, 08:30' },
    { id: '4', name: 'Sergio Martín', number: 12, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 95, lastAssessment: 'Hoy, 08:45' },
    { id: '5', name: 'Pedro Sánchez', number: 5, photo: '/default-avatar.jpg', position: 'Base', risk: 'low', status: 'Disponible', readiness: 91, lastAssessment: 'Hoy, 09:10' },
    { id: '6', name: 'Miguel Ángel', number: 8, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 90, lastAssessment: 'Hoy, 09:00' },
    { id: '7', name: 'Lucas Vázquez', number: 14, photo: '/default-avatar.jpg', position: 'Alero', risk: 'medium', status: 'Duda', readiness: 68, lastAssessment: 'Hoy, 08:20' },
    { id: '8', name: 'Daniel Pérez', number: 11, photo: '/default-avatar.jpg', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 85, lastAssessment: 'Hoy, 09:30' },
    { id: '9', name: 'Jorge González', number: 20, photo: '/default-avatar.jpg', position: 'Pívot', risk: 'high', status: 'Baja', readiness: 35, lastAssessment: 'Ayer, 18:00' },
    { id: '10', name: 'Raúl Martínez', number: 23, photo: '/default-avatar.jpg', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 94, lastAssessment: 'Hoy, 08:50' },
    { id: '11', name: 'Pablo Torres', number: 6, photo: '/default-avatar.jpg', position: 'Base', risk: 'medium', status: 'Duda', readiness: 72, lastAssessment: 'Hoy, 08:00' },
    { id: '12', name: 'Andrés Iniesta', number: 9, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 89, lastAssessment: 'Hoy, 09:20' },
];
