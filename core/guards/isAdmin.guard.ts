import { Context } from 'grammy';
import { AssetsService } from '../services/assets.service';

const asstetService = new AssetsService();

export async function isAdmin(ctx: Context): Promise<boolean> {
    if (!ctx.user.isAdmin) {
        await ctx.replyWithPhoto(await asstetService.getImage('admin-guard.jpg'));
        await ctx.reply('You shall not pass');
        return false;
    } else {
        return true;
    }
}
