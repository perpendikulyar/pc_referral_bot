import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

import keys from '../../.jwt.keys.json';

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
