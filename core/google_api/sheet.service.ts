import { GoogleSpreadsheet } from 'google-spreadsheet';
import { AuthService } from './auth.service';

export class SheetService {
    private TABLE_NAME = 'links';
    private sheet: any;

    constructor(private sheetId: string) {
        this.sheet = null;
        this.run();
    }

    async run() {
        const auth = new AuthService();
        const doc = new GoogleSpreadsheet(this.sheetId, auth.client);
        await doc.loadInfo();
        this.sheet = doc.sheetsByTitle[this.TABLE_NAME];
    }

    async update(rec: any) {
        const values = Object.values(rec);
        try {
            const result = await this.sheet.addRow(values);
            return result;
        } catch (err) {
            console.error(err);
        }
    }
}
