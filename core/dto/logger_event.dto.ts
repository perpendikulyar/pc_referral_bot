import { Context } from 'grammy';
import { DTO } from './dto';

export class LoggerEvent extends DTO {
    readonly tableName: string = 'logs';

    readonly savedProps: string[] = [
        'dateTime',
        'username',
        'event',
        'message',
        'chatId',
        'source',
    ];

    private dateTime: string;
    private username?: String;
    private event?: String;
    private message?: String;
    private chatId?: Number;
    private source?: String;

    constructor() {
        super();
        this.dateTime = new Date().toLocaleString('ru-RU', { timeZone: 'UTC' });
    }

    static createAndSave(
        username: string,
        event: string,
        message: string = '',
        chatId?: number,
        source: string = ''
    ) {
        const rec = new LoggerEvent();
        rec.username = username;
        rec.event = event;
        rec.message = message;
        rec.chatId = chatId;
        rec.source = source;
        rec.save();
        return rec;
    }

    static createAndSaveFromCtx(ctx: Context) {
        const rec = new LoggerEvent();
        rec.username = ctx.from?.username || 'guest';
        rec.chatId = ctx.chat?.id;
        rec.event = ctx.command;
        rec.message =
            ctx.message && ctx.command === 'message' ? ctx.message.text : '';
        rec.source = ctx.source;
        rec.save();
        return rec;
    }
}
