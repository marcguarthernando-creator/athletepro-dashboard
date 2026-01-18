
export type BodyArea = 'Head' | 'Neck' | 'Shoulder' | 'Trunk' | 'Arm' | 'Leg';

export type InjurySide = 'Left' | 'Right' | 'Bilateral' | 'Center/NA';

export type InjuryType =
    | 'Common disease'
    | 'Articular'
    | 'Muscular'
    | 'Tendinous'
    | 'Ligamentous'
    | 'Osseous'
    | 'Meniscus'
    | 'Cartilage'
    | 'Concussion'
    | 'Hematoma / Bruise';

export const BODY_AREAS: BodyArea[] = ['Head', 'Neck', 'Shoulder', 'Trunk', 'Arm', 'Leg'];

export const INJURY_SIDES: InjurySide[] = ['Left', 'Right', 'Bilateral', 'Center/NA'];

export const INJURY_TYPES: InjuryType[] = [
    'Common disease',
    'Articular',
    'Muscular',
    'Tendinous',
    'Ligamentous',
    'Osseous',
    'Meniscus',
    'Cartilage',
    'Concussion',
    'Hematoma / Bruise'
];

export const STRUCTURES_BY_AREA: Record<BodyArea, string[]> = {
    'Head': [
        'Top of the head', 'Fronthead', 'Back of the head', 'Ear', 'Eyebrow',
        'Eye', 'Nose', 'Mouth', 'Cheek', 'Jaw', 'Chin'
    ],
    'Neck': [
        'Cervical Spine', 'Trapezius', 'Sternocleidomastoid', 'Throat', 'Nape'
    ],
    'Shoulder': [
        'Clavicle', 'Scapula', 'Rotator Cuff', 'Deltoid', 'AC Joint', 'Glenohumeral Joint'
    ],
    'Trunk': [
        'Chest', 'Waist', 'Hip', 'Belly', 'Groin', 'Back',
        'Lung', 'Heart', 'Stomach', 'Liver', 'Kidney', 'Pubis'
    ],
    'Arm': [
        'Arm', 'Elbow', 'Forearm', 'Wrist', 'Hand', 'Finger', 'Nail'
    ],
    'Leg': [
        'Buttock', 'Adductor', 'Thigh', 'Knee', 'Calf',
        'Shin', 'Ankle', 'Foot', 'Heel', 'Instep', 'Sole', 'Toe', 'Nail'
    ]
};

// Start of Specific Diagnoses Map based on InjuryType
export const DIAGNOSES_BY_TYPE: Record<InjuryType, string[]> = {
    'Muscular': [
        'Overload', 'Cramp', 'Distension', 'Rupture Grade I', 'Rupture Grade II', 'Rupture Grade III', 'Contusion'
    ],
    'Tendinous': [
        'Tendinosis', 'Tendinitis', 'Rupture', 'Tenosynovitis'
    ],
    'Ligamentous': [
        'Sprain Grade I', 'Sprain Grade II', 'Sprain Grade III', 'Complete Rupture'
    ],
    'Osseous': [
        'Fracture', 'Stress Fracture', 'Bone Edema', 'Periostitis', 'Fissure'
    ],
    'Articular': [
        'Dislocation', 'Subluxation', 'Chondromalacia', 'Arthritis', 'Synovitis'
    ],
    'Meniscus': [
        'Tear (Radial)', 'Tear (Bucket Handle)', 'Degeneration', 'Cyst'
    ],
    'Cartilage': [
        'Chondral Defect', 'Osteochondritis', 'Softening'
    ],
    'Concussion': [
        'Grade I', 'Grade II', 'Grade III'
    ],
    'Hematoma / Bruise': [
        'Superficial', 'Deep / Intermuscular'
    ],
    'Common disease': [
        'Flu', 'Gastroenteritis', 'Cold', 'Fever', 'Allergy', 'Infection'
    ]
};
