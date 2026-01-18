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
    injuryHistory?: {
        date: string;
        injury: string;
        duration: string;
        status: 'Recuperado' | 'Activa' | 'Recaída';
    }[];
}

export const mockPlayers: Player[] = [
    {
        id: '1', name: 'Alejandro Guerra', number: 10, photo: '/default-avatar.jpg', position: 'Alero', risk: 'low', status: 'Disponible', readiness: 92, lastAssessment: 'Hoy, 09:00',
        injuryHistory: [
            { date: '12/10/2025', injury: 'Esguince Tobillo Grado II', duration: '3 semanas', status: 'Recuperado' },
            { date: '15/05/2025', injury: 'Sobrecarga Isquios', duration: '5 días', status: 'Recuperado' }
        ]
    },
    { id: '2', name: 'Babel Lipasi', number: 15, photo: '/default-avatar.jpg', position: 'Pívot', risk: 'low', status: 'Disponible', readiness: 88, lastAssessment: 'Hoy, 09:15' },
    { id: '3', name: 'David Acosta', number: 7, photo: '/default-avatar.jpg', position: 'Base', risk: 'medium', status: 'Duda', readiness: 75, lastAssessment: 'Hoy, 08:30' },
    { id: '4', name: 'David Delgado', number: 12, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 95, lastAssessment: 'Hoy, 08:45' },
    { id: '5', name: 'Diego Fernandez', number: 5, photo: '/default-avatar.jpg', position: 'Base', risk: 'low', status: 'Disponible', readiness: 91, lastAssessment: 'Hoy, 09:10' },
    { id: '6', name: 'Dylan Bordon', number: 8, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 90, lastAssessment: 'Hoy, 09:00' },
    { id: '7', name: 'Emilis Prekivicius', number: 14, photo: '/default-avatar.jpg', position: 'Alero', risk: 'medium', status: 'Duda', readiness: 68, lastAssessment: 'Hoy, 08:20' },
    { id: '8', name: 'Louis Riga', number: 11, photo: '/default-avatar.jpg', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 85, lastAssessment: 'Hoy, 09:30' },
    {
        id: '9', name: 'Manuel Crujeiras', number: 20, photo: '/default-avatar.jpg', position: 'Pívot', risk: 'high', status: 'Baja', readiness: 35, lastAssessment: 'Ayer, 18:00',
        injuryHistory: [
            { date: '08/01/2026', injury: 'Rotura Menisco Externo', duration: 'Indefinida', status: 'Activa' },
            { date: '02/11/2025', injury: 'Tendinopatia Rotuliana', duration: '2 semanas', status: 'Recuperado' }
        ]
    },
    { id: '10', name: 'Mohamed Sangare', number: 23, photo: '/default-avatar.jpg', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 94, lastAssessment: 'Hoy, 08:50' },
    { id: '11', name: 'Rafa Rodriguez', number: 6, photo: '/default-avatar.jpg', position: 'Base', risk: 'medium', status: 'Duda', readiness: 72, lastAssessment: 'Hoy, 08:00' },
    { id: '12', name: 'Xabier Lopez', number: 9, photo: '/default-avatar.jpg', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 89, lastAssessment: 'Hoy, 09:20' },
];
