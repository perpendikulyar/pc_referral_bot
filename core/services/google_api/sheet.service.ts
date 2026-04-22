import {
    GoogleSpreadsheet,
    GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

import { AuthService } from './auth.service';
import getConfig from '../../config';
import { DTO } from '../../dto/dto';

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
        if (!sheet) {
            console.error(
                `SheetService: list with name ${rec.tableName} not found`
            );
            return;
        }

        const values = rec.getProps();

        try {
            const result = await sheet.addRow(values);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async getRawByValue(
        sheetName: string,
        columnName: string,
        searchValue: string
    ) {
        const sheet = await this.getSheet(sheetName);
        if (!sheet) {
            console.error(
                `SheetService: list with name ${sheetName} not found`
            );
            return;
        }

        await sheet.loadCells();
        const rows = await sheet.getRows();
        try {
            return rows.find((row) => row.get(columnName) === searchValue);
        } catch (error) {
            console.error('Failed on load data form Google Sheets:', error);
        }
    }

    async getChatIds(): Promise<number[] | undefined> {
        const sheet = await this.getSheet('logs');
        if (!sheet) {
            console.error(`SheetService: list with name 'logs' not found`);
            return;
        }

        const rows = await sheet.getRows();

        const values = rows.map((row) => row.get('chat_id'));
        const uniqueValues = [...new Set(values)].filter(Number);

        return uniqueValues;
    }

    async getInvite() {
        const sheet = await this.getSheet('invites');
        if (!sheet) {
            console.error(`SheetService: list with name 'invites' not found`);
            return;
        }

        const rows = await sheet.getRows({ limit: 30 });

        let p1: string[] = [];
        let p2: string[] = [];
        let p3: string[] = [];
        let p4: string[] = [];

        rows.forEach((e) => {
            const v1 = e.get('p1');
            const v2 = e.get('p2');
            const v3 = e.get('p3');
            const v4 = e.get('p4');

            if (v1) p1.push(v1);
            if (v2) p2.push(v2);
            if (v3) p3.push(v3);
            if (v4) p4.push(v4);
        });

        const randomOrEmpty = (arr: string[]) =>
            arr.length ? arr[Math.floor(Math.random() * arr.length)] : '';

        const parts = [
            randomOrEmpty(p1),
            randomOrEmpty(p2),
            randomOrEmpty(p3),
            randomOrEmpty(p4),
        ].filter(Boolean);

        return parts.length
            ? parts.join('\n\n') + '\n'
            : 'Приглашение пока не готово. Попробуйте позже.';
    }
}
