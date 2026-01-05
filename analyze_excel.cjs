const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'public/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
    console.log(`\n\n--- ANALYZING: ${file} ---`);
    const filePath = path.join(dataDir, file);
    const workbook = xlsx.readFileSync(filePath);

    workbook.SheetNames.forEach(sheetName => {
        console.log(`\nSHEET: ${sheetName}`);
        const worksheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // Log first 10 rows to see structure
        rows.slice(0, 15).forEach((row, i) => {
            console.log(`L${i}: ${JSON.stringify(row)}`);
        });
    });
});
