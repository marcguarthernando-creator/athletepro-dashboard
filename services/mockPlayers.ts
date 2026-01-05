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
    { id: '1', name: 'Alejandro Guerra', number: 10, photo: '/players/ALEJANDRO_GUERRA.png', position: 'Alero', risk: 'low', status: 'Disponible', readiness: 92, lastAssessment: 'Hoy, 09:00' },
    { id: '2', name: 'Babel Lipasi', number: 15, photo: '/players/BABEL_LIPASI.PNG', position: 'Pívot', risk: 'low', status: 'Disponible', readiness: 88, lastAssessment: 'Hoy, 09:15' },
    { id: '3', name: 'David Acosta', number: 7, photo: '/players/DAVID_ACOSTA.png', position: 'Base', risk: 'medium', status: 'Duda', readiness: 75, lastAssessment: 'Hoy, 08:30' },
    { id: '4', name: 'David Delgado', number: 12, photo: '/players/DAVID_DELGADO.png', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 95, lastAssessment: 'Hoy, 08:45' },
    { id: '5', name: 'Diego Fernández', number: 5, photo: '/players/DIEGO_FERNANDEZ.png', position: 'Base', risk: 'low', status: 'Disponible', readiness: 91, lastAssessment: 'Hoy, 09:10' },
    { id: '6', name: 'Dylan Bordón', number: 8, photo: '/players/DYLAN_BORDON.png', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 90, lastAssessment: 'Hoy, 09:00' },
    { id: '7', name: 'Emilis Prekivicius', number: 14, photo: '/players/EMILIS_PREKIVICIUS.png', position: 'Alero', risk: 'medium', status: 'Duda', readiness: 68, lastAssessment: 'Hoy, 08:20' },
    { id: '8', name: 'Louis Riga', number: 11, photo: '/players/LOUIS_RIGA.png', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 85, lastAssessment: 'Hoy, 09:30' },
    { id: '9', name: 'Manuel Crujeiras', number: 20, photo: '/players/MANUEL_CRUJEIRAS.png', position: 'Pívot', risk: 'high', status: 'Baja', readiness: 35, lastAssessment: 'Ayer, 18:00' },
    { id: '10', name: 'Mohamed Sangare', number: 23, photo: '/players/MOHAMED_SANGARE.png', position: 'Ala-Pívot', risk: 'low', status: 'Disponible', readiness: 94, lastAssessment: 'Hoy, 08:50' },
    { id: '11', name: 'Rafa Rodríguez', number: 6, photo: '/players/RAFA_RODRIGUEZ.png', position: 'Base', risk: 'medium', status: 'Duda', readiness: 72, lastAssessment: 'Hoy, 08:00' },
    { id: '12', name: 'Xabier López', number: 9, photo: '/players/XABIER_LOPEZ.png', position: 'Escolta', risk: 'low', status: 'Disponible', readiness: 89, lastAssessment: 'Hoy, 09:20' },
];
