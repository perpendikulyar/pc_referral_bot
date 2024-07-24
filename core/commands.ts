import { CommandContext, Context, InlineKeyboard } from 'grammy';

import getConfig from '../core/config';
import getUrl from './link';
import { UserLink } from './dto/userlink.dto';
import { LoggerEvent } from './dto/logger_event.dto';
import { locale } from './localisations';

const config = getConfig();

export async function start(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const lang = user?.language_code;
    LoggerEvent.createAndSave(name, 'start');
    await ctx.reply(locale(lang).welcome);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(lang).getLink, 'getLink')
        .row()
        .url(locale(lang).moreAboutLabel, locale(lang).moreAboutUrl);
    await ctx.reply(locale(lang).welcomeMore, { reply_markup: inlineKeyborad });
}

export async function generate(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const lang = user?.language_code;
    const url = getUrl(name);
    UserLink.createAndSave(name, url);
    LoggerEvent.createAndSave(name, 'generate');
    await ctx.reply(`${url}`, {
        link_preview_options: { is_disabled: true },
        reply_markup: { remove_keyboard: true },
    });
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(lang).moreAboutLabel, locale(lang).moreAboutUrl);
    await ctx.reply(locale(lang).generatorExplain, {
        reply_markup: inlineKeyborad,
    });
}

export async function help(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const lang = user?.language_code;
    LoggerEvent.createAndSave(user?.username || 'guest', 'help');
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(lang).getLink, 'getLink')
        .row()
        .text(locale(lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(lang).moreAboutLabel, locale(lang).moreAboutUrl);
    await ctx.reply(locale(lang).helpText, { reply_markup: inlineKeyborad });
}

/** callbacks buttons */
export async function onGeneratorMore(ctx: Context) {
    const user = ctx.from;
    const lang = user?.language_code;
    await ctx.reply(locale(lang).generatorExplainMore);
}

export async function onGetLink(ctx: Context) {
    await generate(ctx as CommandContext<Context>);
}

/** messages recived */
export async function onMessage(ctx: Context) {
    const user = ctx.from;
    const message = ctx.message;
    const lang = user?.language_code;
    const text = message?.text || '';

    switch (text) {
        case locale(lang).getLink: {
            await generate(ctx as CommandContext<Context>);
            break;
        }
        default:
            LoggerEvent.createAndSave(
                user?.username || 'guest',
                'message',
                `text: ${text}`
            );
            await ctx.reply(locale(lang).unknown);
    }
}
