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
    const firebaseConfig = process.env.FIREBASE_CONFIG
        ? JSON.parse(process.env.FIREBASE_CONFIG)
        : ({} as FirebaseOptions);
    const googleapiConfig = process.env.G_API_CONFIG
        ? JSON.parse(process.env.G_API_CONFIG)
        : ({} as JWTInput);
    const analytics = process.env.GA_CONFIG
        ? JSON.parse(process.env.GA_CONFIG)
        : { m_id: '', secret: '' };

    const config: IConfig = {
        tgToken: process.env.TG_TOKEN || '',
        sheetId: process.env.G_SHEET_ID || '',
        firebaseConfig,
        googleapiConfig,
        analytics,
        admins: process.env.ADMINS?.split(',') || [],
    };

    if (!config.tgToken) {
        console.error('TG TOKEN NOT SET');
    }

    if (!config.sheetId) {
        console.error('UNDEFIND SPREADSHEET ID');
    }

    if (!process.env.FIREBASE_CONFIG) {
        console.error('FIREBASE_CONFIG is not set');
    }

    if (!process.env.G_API_CONFIG) {
        console.error('G_API_CONFIG is not set');
    }

    if (!process.env.GA_CONFIG) {
        console.error('GA_CONFIG is not set');
    }

    return config;
}
