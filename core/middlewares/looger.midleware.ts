import { Context, NextFunction } from 'grammy';
import { LoggerEvent } from '../dto/logger_event.dto';

export async function loggerMiddleware(
    ctx: Context,
    next: NextFunction
): Promise<void> {
    const before = Date.now();
    LoggerEvent.createAndSaveFromCtx(ctx);

    await next();
    const after = Date.now();

    console.log(
        `Alive on command "/${ctx.command}/${ctx.source || ''}" by ${ctx.from?.username}/${ctx.lang}: response time ${after - before}ms`
    );
}
