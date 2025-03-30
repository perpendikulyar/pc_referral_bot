import { Context } from 'grammy';
import { applicationRoutes } from './routes';
import { Router } from './router';

export async function isAdmin(ctx: Context): Promise<boolean> {
    if (!ctx.user.isAdmin) {
        await ctx.reply('You shall not pass');
        return false;
    } else {
        return true;
    }
}
