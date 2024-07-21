import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

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
}
