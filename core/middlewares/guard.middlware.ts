import { Context, NextFunction } from 'grammy';
import { applicationRoutes } from '../router/routes';

export async function guardMiddleware(
    ctx: Context,
    next: NextFunction
): Promise<void> {
    const route = applicationRoutes().find((e) => e.command === ctx.command);
    if (route && route.guard) {
        const validation = await route.guard(ctx, next);
        if (validation) {
            await next();
        }
        return;
    } else {
        await next();
    }
}
