import { Context, NextFunction } from 'grammy';

export async function loggerMiddleware(
    ctx: Context,
    next: NextFunction
): Promise<void> {
    const before = Date.now();
    await next();
    const after = Date.now();

    console.log(`Alive: response time ${after - before}ms`);
}
