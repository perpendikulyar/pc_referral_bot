import { JWT } from 'google-auth-library';
import getConfig from '../../config';

const config = getConfig();
const keys = config.googleapiConfig;

export class AuthService {
    readonly client: JWT;

    constructor() {
        this.client = new JWT({
            email: keys.client_email,
            key: keys.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
    }
}
