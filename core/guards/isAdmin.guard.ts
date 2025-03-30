import { Context } from 'grammy';

export async function isAdmin(ctx: Context): Promise<boolean> {
    if (!ctx.user.isAdmin) {
        await ctx.reply('You shall not pass');
        return false;
    } else {
        return true;
    }
}
