import { DTO } from './dto';

export class LoggerEvent extends DTO {
    readonly tableName: string = 'logs';

    readonly savedProps: string[] = [
        'dateTime',
        'username',
        'event',
        'message',
    ];

    private dateTime: string;
    private username?: String;
    private event?: String;
    private message?: String;

    constructor() {
        super();
        this.dateTime = new Date().toLocaleString('ru-RU', {timeZone: 'UTC'});
    }

    static createAndSave(
        username: string,
        event: string,
        message: string = ''
    ) {
        const rec = new LoggerEvent();
        rec.username = username;
        rec.event = event;
        rec.message = message;
        rec.save();
        return rec;
    }
}
