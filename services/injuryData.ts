
export type BodyArea =
    | 'CABEZA/CUELLO'
    | 'HOMBRO'
    | 'BRAZO/CODO'
    | 'ANTEBRAZO/MUÑECA'
    | 'MANO/DEDOS'
    | 'TORAX/ABDOMEN'
    | 'COLUMNA'
    | 'CADERA/INGLE'
    | 'MUSLO'
    | 'RODILLA'
    | 'PIERNA'
    | 'TOBILLO'
    | 'PIE/DEDOS';

export type InjurySide = 'IZQUIERDA' | 'DERECHA' | 'BILATERAL' | 'CENTRAL/NO APLICA';

export type InjuryType =
    | 'MUSCULAR'
    | 'TENDINOSA'
    | 'LIGAMENTOSA'
    | 'ARTICULAR/MENISCAL'
    | 'OSEA'
    | 'NEUROLOGICA'
    | 'OTRA';

export const BODY_AREAS: BodyArea[] = [
    'CABEZA/CUELLO', 'HOMBRO', 'BRAZO/CODO', 'ANTEBRAZO/MUÑECA', 'MANO/DEDOS',
    'TORAX/ABDOMEN', 'COLUMNA', 'CADERA/INGLE', 'MUSLO', 'RODILLA', 'PIERNA', 'TOBILLO', 'PIE/DEDOS'
];

export const INJURY_SIDES: InjurySide[] = ['IZQUIERDA', 'DERECHA', 'BILATERAL', 'CENTRAL/NO APLICA'];

export const INJURY_TYPES: InjuryType[] = [
    'MUSCULAR', 'TENDINOSA', 'LIGAMENTOSA', 'ARTICULAR/MENISCAL', 'OSEA', 'NEUROLOGICA', 'OTRA'
];

// Map of Body Area -> List of common specific structures based on type
// This is a simplified map to start with common keys.
// We can use a simpler structure: BodyArea -> List of Structure strings
export const STRUCTURES_BY_AREA: Record<BodyArea, string[]> = {
    'CABEZA/CUELLO': ['Cráneo', 'Cervicales', 'Bruxismo/ATM', 'Trapecio Superior', 'Esternocleidomastoideo', 'Conmoción'],
    'HOMBRO': ['Manguito Rotador', 'Supraespinoso', 'Infraespinoso', 'Subescapular', 'Labrum (SLAP)', 'Acromioclavicular', 'Deltoides', 'Bíceps (Cabeza Larga)'],
    'BRAZO/CODO': ['Bíceps Braquial', 'Tríceps', 'Epicóndilo (Tenista)', 'Epitróclea (Golfista)', 'Bursa Olecraniana'],
    'ANTEBRAZO/MUÑECA': ['Flexores Muñeca', 'Extensores Muñeca', 'Escafoides', 'Túnel Carpiano', 'Radio/Cúbito'],
    'MANO/DEDOS': ['Metacarpiano', 'Falange', 'Lig. Colateral Dedo', 'Tendón Flexor/Extensor'],
    'TORAX/ABDOMEN': ['Pectoral Mayor/Menor', 'Recto Abdominal', 'Oblicuos', 'Costillas', 'Esternón', 'Intercostales'],
    'COLUMNA': ['Lumbar', 'Dorsal', 'Hernia Discal', 'Ciática', 'Cuadrado Lumbar', 'Paravertebrales'],
    'CADERA/INGLE': ['Aductor Largo', 'Aductor Mayor', 'Psoas Ilíaco', 'Recto Anterior (Proximal)', 'Labrum Acetabular', 'Glúteo Medio/Mayor', 'Pubalgia', 'Trocánter'],
    'MUSLO': ['Recto Anterior', 'Vasto Interno/Externo', 'Bíceps Femoral', 'Semimembranoso', 'Semitendinoso', 'Cuádriceps (General)', 'Isquiosurales (General)', 'Bocadillo (Contusión)'],
    'RODILLA': ['LCA (Cruzado Anterior)', 'LCP (Cruzado Posterior)', 'LLI (Lateral Interno)', 'LLE (Lateral Externo)', 'Menisco Interno', 'Menisco Externo', 'Tendón Rotuliano', 'Cartílago/Condropatía', 'Cintilla Iliotibial'],
    'PIERNA': ['Gemelo Interno', 'Gemelo Externo', 'Sóleo', 'Tibial Anterior', 'Peroneos', 'Aquiles', 'Fractura Estrés Tibia'],
    'TOBILLO': ['LLE (PAA/PC/PCC)', 'Ligamento Deltoideo', 'Sindesmosis', 'Impingement Anterior/Posterior', 'Astrágalo'],
    'PIE/DEDOS': ['Fascitis Plantar', 'Metatarsiano (Fractura Estrés)', 'Sesamoideos', 'Neuroma Morton', 'Falange Dedo']
};
