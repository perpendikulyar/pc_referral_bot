import {
    GoogleSpreadsheet,
    GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

import { AuthService } from './auth.service';
import getConfig from '../config';
import { DTO } from '../dto/dto';

export class SheetService {
    private doc: GoogleSpreadsheet;

    constructor() {
        const auth = new AuthService();
        const config = getConfig();
        this.doc = new GoogleSpreadsheet(config.sheetId, auth.client);
    }

    async getSheet(name: string): Promise<GoogleSpreadsheetWorksheet> {
        await this.doc.loadInfo();
        return this.doc.sheetsByTitle[name];
    }

    async save<T extends DTO>(rec: T) {
        const sheet = await this.getSheet(rec.tableName);
        const values = rec.getProps();

        try {
            const result = await sheet.addRow(values);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getInvite() {
        const sheet = await this.getSheet('invites');
        const rows = await sheet.getRows({ limit: 25 });

        let p1: string[] = [];
        let p2: string[] = [];
        let p3: string[] = [];
        let p4: string[] = [];

        rows.forEach(async (e) => {
            if (e.get('p1')) p1.push(e.get('p1'));
            if (e.get('p2')) p2.push(e.get('p2'));
            if (e.get('p3')) p3.push(e.get('p3'));
            if (e.get('p4')) p4.push(e.get('p4'));
        });

        return (
            p1[Math.floor(Math.random() * p1.length)] +
            '\n\n' +
            p2[Math.floor(Math.random() * p2.length)] +
            '\n' +
            p3[Math.floor(Math.random() * p3.length)] +
            '\n\n' +
            p4[Math.floor(Math.random() * p4.length)] +
            '\n'
        );
    }
}
