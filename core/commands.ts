import { CommandContext, Context, InlineKeyboard } from 'grammy';

import getUrl from './link';
import { UserLink } from './dto/userlink.dto';
import { locale } from './localisations';
import { SheetService } from './google_api/sheet.service';
import generateQR from './qr-generator';
import { AssetsService } from './assets.service';
import { CommandsService } from './commands.service';

const sheetService = new SheetService();
const assetsService = new AssetsService();
const commandsService = new CommandsService();

export async function start(ctx: CommandContext<Context>) {
    await ctx.reply(locale(ctx.lang).welcome);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.lang).getLink, 'getLink')
        .row()
        .url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl);
    await ctx.reply(locale(ctx.lang).welcomeMore, {
        reply_markup: inlineKeyborad,
    });
}

export async function generate(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const url = await getUrl(name);
    UserLink.createAndSave(name, url);
    await ctx.reply(`${url}`, {
        link_preview_options: { is_disabled: true },
        reply_markup: { remove_keyboard: true },
    });
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl);
    await ctx.reply(locale(ctx.lang).generatorExplain, {
        reply_markup: inlineKeyborad,
    });

    await commandsService.generateKeyboard(ctx);
}

export async function help(ctx: CommandContext<Context>) {
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.lang).getLink, 'getLink')
        .row()
        .text(locale(ctx.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl);
    await ctx.reply(locale(ctx.lang).helpText, {
        reply_markup: inlineKeyborad,
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
    });
}

/** callbacks buttons */
export async function onGeneratorMore(ctx: Context) {
    await ctx.reply(locale(ctx.lang).generatorExplainMore, {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard().url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl),
        link_preview_options: { is_disabled: true },
    });

    await commandsService.generateKeyboard(ctx);
}

export async function onGetLink(ctx: Context) {
    await generate(ctx as CommandContext<Context>);
}

export async function onGetInvite(ctx: Context) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const inviteText = await sheetService.getInvite();
    const link = await getUrl(name);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad.text(locale(ctx.lang).getAnotherInvite, 'getInvite');
    await ctx.reply(
        inviteText + '\n' + locale(ctx.lang).register + '\n\n' + link,
        {
            link_preview_options: { is_disabled: true },
            reply_markup: inlineKeyborad,
        }
    );
}

export async function onGenerateQr(ctx: Context) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const link = await getUrl(name);
    await generateQR(ctx, link);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl);

    await ctx.reply(locale(ctx.lang).qrReady, {
        reply_markup: inlineKeyborad,
    });
}

export async function onGetStoriesTemplates (ctx: Context) {
    await ctx.replyWithMediaGroup([
        {type: 'photo', media: await assetsService.getImage('story.png')},
        {type: 'photo', media: await assetsService.getImage('square-post.png')}
    ]);

    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(locale(ctx.lang).moreAboutLabel, locale(ctx.lang).moreAboutUrl);

    await ctx.reply(locale(ctx.lang).storiesHelp, {
        reply_markup: inlineKeyborad,
    });
}

/** messages recived */
export async function onMessage(ctx: Context) {
    const text = ctx.message?.text || '';

    switch (text) {
        case locale(ctx.lang).getLink: {
            await generate(ctx as CommandContext<Context>);
            break;
        }
        default:
            await ctx.reply(locale(ctx.lang).unknown);
    }
}
