import { CommandContext, Context, InlineKeyboard, Keyboard } from 'grammy';

import { LinkService } from './services/link.service';
import { UserLink } from './dto/userlink.dto';
import { locale } from './localisations';
import { SheetService } from './services/google_api/sheet.service';
import { AssetsService, AVATAR_TYPE } from './services/assets.service';
import { CommandsService } from './commands.service';
import { ROUTES } from './router/routes.enum';
import { QrCodeService } from './services/qr-code.service';

const sheetService = new SheetService();
const assetsService = new AssetsService();
const linkService = new LinkService();
const qrCodeService = new QrCodeService();

export async function start(ctx: CommandContext<Context>) {
    const inlineKeyborad = new InlineKeyboard();
    if (ctx.source === 'avatar') {
        await ctx.reply(
            'Привет, это реферальный бот ProductCamp.\n\n🔥🔥🔥 Теперь ты можешь сделать себе фирменную аватарку кэмпа!'
        );
        await onGenerateAvatar(ctx);
    } else {
        const inlineKeyborad = new InlineKeyboard();
        inlineKeyborad
            .text('Результаты', ROUTES.results)
            .row()
            .url(locale('ru').moreAboutLabel, locale('ru').moreAboutUrl);

        await ctx.reply(locale('ru').welcome, {
            reply_markup: inlineKeyborad,
            parse_mode: 'Markdown',
            link_preview_options: { is_disabled: true },
        });
    }
}

export async function generate(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const url = await linkService.getUrl(name);
    await UserLink.createAndSave(name, url);
    await ctx.reply(`${url}`, {
        link_preview_options: { is_disabled: true },
        reply_markup: { remove_keyboard: true },
    });
    const inlineKeyborad = CommandsService.appKeyboard(ctx);

    await ctx.reply(locale(ctx.user.lang).generatorExplain, {
        reply_markup: inlineKeyborad,
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
    });
}

export async function results(ctx: CommandContext<Context>) {
    await ctx.replyWithPhoto(
        await assetsService.getStorageImage('a25-results.png')
    );
    await ctx.reply(locale('ru').results, { parse_mode: 'Markdown' });
}

export async function help(ctx: CommandContext<Context>) {
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.user.lang).getLink, 'getLink')
        .row()
        .text(locale(ctx.user.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(
            locale(ctx.user.lang).moreAboutLabel,
            locale(ctx.user.lang).moreAboutUrl
        );
    await ctx.reply(locale(ctx.user.lang).helpText, {
        reply_markup: inlineKeyborad,
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
    });
}

export async function adminPanel(ctx: Context) {
    const keyboard = new Keyboard().text(ROUTES.brodcast);
    await ctx.reply('Это админка', {
        reply_markup: keyboard,
    });
}

/** callbacks buttons */
export async function onGeneratorMore(ctx: Context) {
    await ctx.reply(locale(ctx.user.lang).generatorExplainMore, {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard().text(
            '📦 Материалы для продвижения',
            ROUTES.promoMaterials
        ),
        link_preview_options: { is_disabled: true },
    });
}

export async function onPromoMaterials(ctx: Context) {
    await CommandsService.generateKeyboard(ctx);
}

export async function onGetLink(ctx: Context) {
    await generate(ctx as CommandContext<Context>);
}

export async function onGetInvite(ctx: Context) {
    const name = ctx.user.username || 'guest';
    const inviteText = await sheetService.getInvite();
    const link = await linkService.getUrl(name);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad.text(locale(ctx.user.lang).getAnotherInvite, 'getInvite');
    await ctx.reply(
        inviteText + '\n' + locale(ctx.user.lang).register + '\n\n' + link,
        {
            link_preview_options: { is_disabled: true },
            reply_markup: inlineKeyborad,
        }
    );
}

export async function onGenerateQr(ctx: Context) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    const link = await linkService.getUrl(name);
    await qrCodeService.generate(ctx, link);
    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.user.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(
            locale(ctx.user.lang).moreAboutLabel,
            locale(ctx.user.lang).moreAboutUrl
        );

    await ctx.reply(locale(ctx.user.lang).qrReady, {
        reply_markup: inlineKeyborad,
    });
}

export async function onGetStoriesTemplates(ctx: Context) {
    await ctx.replyWithMediaGroup([
        {
            type: 'photo',
            media: await assetsService.getStorageImage('astro.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('dark-story.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('bright-story.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('dark-sq.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('bright-sq.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('planet.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getStorageImage('sins.png'),
        },
    ]);

    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text(locale(ctx.user.lang).generatorMoreBtn, 'generatorMoreData')
        .row()
        .url(
            locale(ctx.user.lang).moreAboutLabel,
            locale(ctx.user.lang).moreAboutUrl
        );

    await ctx.reply(locale(ctx.user.lang).storiesHelp, {});
}

export async function onGenerateAvatar(ctx: Context) {
    await ctx.replyWithMediaGroup([
        {
            type: 'photo',
            media: await assetsService.getAvatarImage('center.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getAvatarImage('round.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getAvatarImage('left.png'),
        },
        {
            type: 'photo',
            media: await assetsService.getAvatarImage('right.png'),
        },
    ]);

    const inlineKeyborad = new InlineKeyboard();
    inlineKeyborad
        .text('1', 'avatar-center')
        .text('2', 'avatar-round')
        .row()
        .text('3', 'avatar-left')
        .text('4', 'avatar-right');

    await ctx.reply('Выбери, какой аватар тебе больше подходит', {
        reply_markup: inlineKeyborad,
    });
}

export async function onCreateAvatar(ctx: Context) {
    await ctx.answerCallbackQuery();

    if (ctx.callbackQuery?.message) {
        ctx.api.deleteMessage(
            ctx.callbackQuery?.message.chat.id,
            ctx.callbackQuery?.message.message_id
        );
    }

    const data = ctx.callbackQuery?.data;
    const type: AVATAR_TYPE = (data?.split('-')[1] + '.png') as AVATAR_TYPE;
    return createAvatar(ctx, type);
}

async function createAvatar(ctx: Context, type: AVATAR_TYPE) {
    const userAvatarPath = await CommandsService.getUserAvatarPath(ctx);
    if (!userAvatarPath) return;
    const newAvatar = await assetsService.generateAvatar(userAvatarPath, type);
    await ctx.replyWithPhoto(newAvatar);
    await ctx.reply(
        'Поставь себе новую классную аватарку, и не забудь добавить свою реферальную ссылку в профайл'
    );
}

// hears
export async function onStartBroadcast(ctx: any) {
    // Для отправке только себе или по указанному списку
    // const chatIds: number [] = [ctx.chat?.id];

    await ctx.conversation.enter('brodcastMessage');
}

/** messages recived */
export async function onMessage(ctx: Context) {
    const text = ctx.message?.text || '';

    switch (text) {
        case locale(ctx.user.lang).getLink: {
            await generate(ctx as CommandContext<Context>);
            break;
        }
        default:
            await ctx.reply(locale(ctx.user.lang).unknown);
    }
}
