import { Context, NextFunction } from 'grammy';
import getConfig from '../config';

const config = getConfig();

export async function contextExtenderMiddleware(
    ctx: Context,
    next: NextFunction
) {
    if (ctx.message?.text?.startsWith('/')) {
        const command = ctx.message.text.split(' ')[0]; // Получаем команду (первое слово)
        ctx.command = command.substring(1);

        if (ctx.command === 'start') {
            ctx.source = ctx.message.text.split(' ')[1]; // Получаем источник
        }
    } else if (ctx.callbackQuery) {
        ctx.command = ctx.callbackQuery.data;
    } else {
        ctx.command = 'message';
    }

    if (ctx.from) {
        ctx.user = {
            id: ctx.from.id,
            lang: ctx.from.language_code || 'ru',
            username: ctx.from.username || 'Guest',
            isAdmin:
                ctx.from?.username && config.admins.includes(ctx.from.username)
                    ? true
                    : false,
        };
    }

    await next();
}
