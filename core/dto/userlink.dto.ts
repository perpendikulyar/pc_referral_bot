import { DTO } from './dto';

export class UserLink extends DTO {
    readonly tableName: string = 'links';
    readonly savedProps: string[] = ['username', 'link'];
    private username?: string;
    private link?: string;

    static createAndSave(username: string, link: string) {
        const rec = new UserLink();
        rec.username = username;
        rec.link = link;
        rec.save();
        return rec;
    }
}
