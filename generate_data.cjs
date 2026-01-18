const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.xlsx'));

const allPlayerData = {};

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const workbook = xlsx.readFileSync(filePath);

    // Extracting name from filename (e.g. ALEJANDRO_GUERRA_Complete_Profile.xlsx -> ALEJANDRO GUERRA)
    const playerName = file.replace('_Complete_Profile.xlsx', '').replace(/_/g, ' ').toUpperCase().trim();

    const playerData = {
        name: playerName,
        biometrics: {},
        anthropometry: {},
        injuries: [],
        info: {
            medication: ["Aspirina 100mg", "Vitamina D3"],
            supplementation: ["Proteína Whey", "Creatina"],
            allergies: ["Ninguna conocida"],
            previousInjuries: ["Esguince leve (2022)"],
            familyHistory: ["Ninguno relevante"],
            personalHistory: ["Operado de apéndice"]
        }
    };

    // Anthropometry sheet mapping
    if (workbook.SheetNames.includes('Anthropometry')) {
        const sheet = workbook.Sheets['Anthropometry'];
        const rows = xlsx.utils.sheet_to_json(sheet);
        if (rows.length > 0) {
            const r = rows[0];
            // Since data is normalized 0-1, we'll denormalize for realism
            playerData.biometrics.weight = (r.Var_1 * 40 + 80).toFixed(1); // 80kg - 120kg
            playerData.biometrics.height = (r.Var_2 * 30 + 185).toFixed(1); // 185cm - 215cm
            playerData.biometrics.age = Math.floor(r.Var_3 * 15 + 18);   // 18 - 33 years
            playerData.biometrics.wingspan = (r.Var_2 * 35 + 190).toFixed(1);

            playerData.anthropometry.fat = (r.Var_4 * 10 + 6).toFixed(1);    // 6% - 16%
            playerData.anthropometry.muscle = (r.Var_5 * 10 + 40).toFixed(1); // 40% - 50%
            playerData.anthropometry.bone = (r.Var_6 * 5 + 10).toFixed(1);    // 10% - 15%
            playerData.anthropometry.residual = (100 - (parseFloat(playerData.anthropometry.fat) + parseFloat(playerData.anthropometry.muscle) + parseFloat(playerData.anthropometry.bone))).toFixed(1);

            playerData.anthropometry.somatotype = {
                endo: (r.Var_7 * 2 + 1.5).toFixed(1),
                meso: (r.Var_8 * 4 + 4).toFixed(1),
                ecto: (r.Var_9 * 2 + 1).toFixed(1)
            };
        }
    }

    // Injury History
    if (workbook.SheetNames.includes('Injury_History')) {
        const sheet = workbook.Sheets['Injury_History'];
        const rows = xlsx.utils.sheet_to_json(sheet);
        rows.forEach((r, i) => {
            playerData.injuries.push({
                date: `2025-${Math.floor(r.Var_1 * 11 + 1).toString().padStart(2, '0')}-15`,
                type: r.Var_2 > 0.5 ? "Esguince Tobillo" : "Sobrecarga Isquios",
                zone: r.Var_2 > 0.5 ? "Lower Body" : "Lower Body",
                status: r.Var_3 > 0.7 ? "Activa" : "Recuperada",
                private: r.Var_4 > 0.8
            });
        });
    }

    // ROM (Mobility)
    playerData.rom = {
        lower: {
            "Tobillo Flexión Dorsal": { l: "42°", r: "44°", history: [{ date: 'OCT 2025', val: '40° | 41°' }] },
            "Cadera Flexión": { l: "115°", r: "112°", history: [{ date: 'OCT 2025', val: '110° | 108°' }] },
            "Knee Extension": { l: "0°", r: "0°", history: [{ date: 'OCT 2025', val: '0° | -2°' }] }
        },
        upper: {
            "Hombro Flexión": { l: "175°", r: "178°", history: [{ date: 'JUN 2025', val: '170° | 172°' }] },
            "Hombro Rot. Interna": { l: "65°", r: "62°", history: [{ date: 'JUN 2025', val: '60° | 58°' }] }
        }
    };

    // Physical Evaluation
    playerData.evaluation = {
        "UPPER BODY": { score: "8.5", desc: "Sin asimetrías detectadas. Excelente estabilidad.", history: [{ date: 'OCT 2025', val: '8.2' }] },
        "SPINAL COLUMN": { score: "7.8", desc: "Control motor adecuado en movimientos dinámicos.", history: [{ date: 'OCT 2025', val: '7.5' }] },
        "LOWER BODY": { score: "9.0", desc: "Potencia explosiva en rango óptimo.", history: [{ date: 'OCT 2025', val: '8.5' }] },
        "ABS / CORE": { score: "8.0", desc: "Estabilidad central sólida en anti-rotación.", history: [{ date: 'OCT 2025', val: '7.8' }] }
    };

    // Physical Tests
    playerData.physicalTests = {
        jump: {
            history: [
                { date: "15 DIC", value: "42" },
                { date: "01 DIC", value: "40" },
                { date: "15 NOV", value: "43" },
                { date: "01 NOV", value: "41" }
            ],
            comments: "Mejora constante en la potencia reactiva."
        },
        hopTest: {
            history: [
                { date: "15 DIC", lVal: "185", rVal: "182", asymmetry: "1.6%" },
                { date: "01 DIC", lVal: "180", rVal: "178", asymmetry: "1.1%" }
            ],
            comments: "Asimetría dentro de los rangos de normalidad (<5%)."
        },
        strengthPeaks: {
            history: [
                { date: "15 DIC", isometric: "450", eccentric: "510" },
                { date: "01 DIC", isometric: "435", eccentric: "495" }
            ],
            comments: "Pico de fuerza isométrica en niveles óptimos."
        },
        custom: [
            { name: "Grip Strength", value: "65", unit: "kg", date: "15 DIC" }
        ]
    };

    // AI and Questionnaires
    playerData.extra = {
        aiReports: [
            { title: "Análisis de Recuperación Semanal", date: "15 Dic 2025", type: "Weekly" },
            { title: "Predicción de Riesgo de Lesión", date: "01 Dic 2025", type: "Risk" }
        ],
        questionnaires: [
            { date: "20 DIC 2025", name: "Well-being (WBQ)", score: "85/100", status: "Completo" },
            { date: "19 DIC 2025", name: "Well-being (WBQ)", score: "82/100", status: "Completo" },
            { date: "18 DIC 2025", name: "Well-being (WBQ)", score: "88/100", status: "Completo" }
        ]
    };

    // Extra Tests
    playerData.extraTests = {
        selected: Math.random() > 0.5 ? ["ECOGRAFÍA", "RESONANCIA MAGNÉTICA (RMN)"] : ["ANALÍTICA SANGUÍNEA"],
        comment: "Resultados pendientes de revisión por el especialista. El jugador presenta molestias leves en la zona."
    };

    allPlayerData[playerName] = playerData;
});

const output = `export const playerMedicalData: Record<string, any> = ${JSON.stringify(allPlayerData, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'services/playerMedicalData.ts'), output);
console.log('Generated services/playerMedicalData.ts');
