import { DTO } from './dto';

export class UserLink extends DTO {
    readonly tableName: string = 'links';
    readonly savedProps: string[] = ['dateTime', 'username', 'link'];
    private username?: string;
    private link?: string;
    private dateTime: string;

    constructor() {
        super();
        this.dateTime = new Date().toLocaleString('ru-RU', {
            timeZone: 'UTC',
        });
    }

    static async createAndSave(username: string, link: string) {
        const rec = new UserLink();
        rec.username = username;
        rec.link = link;
        await rec.save();
        return rec;
    }
}
