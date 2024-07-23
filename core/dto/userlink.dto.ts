import { DTO } from './dto';

export class UserLink extends DTO {
    readonly tableName: string = 'links';
    readonly savedProps: string[] = ['username', 'link', 'dateTitme'];
    private dateTitme: Date;
    private username?: string;
    private link?: string;

    constructor () {
        super();
        this.dateTitme = new Date();
    }
    

    static createAndSave(username: string, link: string) {
        const rec = new UserLink();
        rec.username = username;
        rec.link = link;
        rec.save();
        return rec;
    }
}
