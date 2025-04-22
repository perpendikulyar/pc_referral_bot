import { Context, NextFunction } from 'grammy';
import { AssetsService } from '../services/assets.service';

const asstetService = new AssetsService();

export async function isAdmin(ctx: Context, next: NextFunction): Promise<boolean> {
    if (!ctx.user.isAdmin) {
        await ctx.replyWithPhoto(
            await asstetService.getStorageImage('admin-guard.jpg')
        );
        await ctx.reply('You shall not pass');
        return false;
    } else {
        await next();
        return true;
    }
}
