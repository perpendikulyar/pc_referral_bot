import { Context, InlineKeyboard } from 'grammy';
import { locale } from './localisations';

export class CommandsService {
    /* generateKeyboard() send a reply with all functions to generate some media */
    public static async generateKeyboard(ctx: Context) {
        const inlineKeyborad = new InlineKeyboard();
        const lang = ctx.user.lang;
        inlineKeyborad
            .text(locale(lang).getInvite, 'getInvite')
            .row()
            .text(locale(lang).stories, 'getStories')
            .row()
            .text(locale(lang).getQr, 'generateQr');

        await ctx.reply(locale(lang).genKeyboard, {
            parse_mode: 'Markdown',
            reply_markup: inlineKeyborad,
            link_preview_options: { is_disabled: true },
        });
    }
}
