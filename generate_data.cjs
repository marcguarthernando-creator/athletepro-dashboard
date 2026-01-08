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
    const playerName = file.replace('_Complete_Profile.xlsx', '').replace(/_/g, ' ');

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

    allPlayerData[playerName] = playerData;
});

const output = `export const playerMedicalData: Record<string, any> = ${JSON.stringify(allPlayerData, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'services/playerMedicalData.ts'), output);
console.log('Generated services/playerMedicalData.ts');
