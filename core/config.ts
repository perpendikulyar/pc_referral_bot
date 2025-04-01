import dotenv from 'dotenv';
import { FirebaseOptions } from 'firebase/app';
import { JWTInput } from 'google-auth-library';

interface IConfig {
    tgToken: string;
    sheetId: string;
    firebaseConfig: FirebaseOptions;
    googleapiConfig: JWTInput;
    analytics: { m_id: string; secret: string };
    admins: string[];
}

dotenv.config();

export default function getConfig(): IConfig {
    const config: IConfig = {
        tgToken: process.env.TG_TOKEN || '',
        sheetId: process.env.G_SHEET_ID || '',
        firebaseConfig: JSON.parse(process.env.FIREBASE_CONFIG || ''),
        googleapiConfig: JSON.parse(process.env.G_API_CONFIG || ''),
        analytics: JSON.parse(process.env.GA_CONFIG || ''),
        admins: process.env.ADMINS?.split(',') || [],
    };

    if (!config.tgToken) {
        console.error('TG TOKEN NOT SET');
    }

    if (!config.sheetId) {
        console.error('UNDEFIND SPREADSHEET ID');
    }

    return config;
}
