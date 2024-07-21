import dotenv from 'dotenv';

interface ConfigI {
    tgToken: string;
    sheetId: string;
}

dotenv.config();

export default function getConfig(): ConfigI {
    const config: ConfigI = {
        tgToken: process.env.TG_TOKEN || '',
        sheetId: process.env.G_SHEET_ID || '',
    };

    if (!config.tgToken) {
        console.error('TG TOKEN NOT SET');
    }

    if (!config.sheetId) {
        console.error('UNDEFIND SPREADSHEET ID');
    }

    return config;
}
