import { Context, InlineKeyboard } from 'grammy';
import { locale } from './localisations';

export class CommandsService {
    /* generateKeyboard() send a reply with all functions to generate some media */
    public async generateKeyboard(ctx: Context) {
        const inlineKeyborad = new InlineKeyboard();
        inlineKeyborad
            .text(locale(ctx.lang).getInvite, 'getInvite')
            .row()
            .text(locale(ctx.lang).stories, 'getStories')
            .row()
            .text(locale(ctx.lang).getQr, 'generateQr');

        await ctx.reply(locale(ctx.lang).genKeyboard, {
            parse_mode: 'Markdown',
            reply_markup: inlineKeyborad,
            link_preview_options: { is_disabled: true },
        });
    }
}
