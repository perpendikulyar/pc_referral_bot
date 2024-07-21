import dotenv from 'dotenv';

interface ConfigI {
    tgToken: string;
}

dotenv.config();

export default function getConfig(): ConfigI {
    const config: ConfigI = {
        tgToken: process.env.TG_TOKEN || '',
    };

    if (!config.tgToken) {
        console.error('TG TOKEN NOT SET');
        process.kill;
    }

    return config;
}
