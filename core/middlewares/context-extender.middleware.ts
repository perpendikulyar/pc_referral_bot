import { Context, NextFunction } from 'grammy';

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

    ctx.lang = ctx.from?.language_code || 'ru';

    await next();
}
