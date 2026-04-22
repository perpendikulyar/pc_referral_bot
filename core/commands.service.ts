import { Context, InlineKeyboard, Keyboard } from 'grammy';
import { locale } from './localisations';
import { UserProfilePhotos } from 'grammy/types';
import { botInstance } from './bot.instance';
import { ROUTES } from './router/routes.enum';

export class CommandsService {
    /* generateKeyboard() send a reply with all functions to generate some media */
    public static async generateKeyboard(ctx: Context) {
        const inlineKeyborad = new InlineKeyboard();
        const lang = ctx.user.lang;
        inlineKeyborad
            // .text('Сделать аватар Кэмпа', ROUTES.generateAvatar)
            // .row()
            .text(locale(lang).getInvite, 'getInvite')
            .row()
            // .text(locale(lang).stories, 'getStories')
            // .row()
            .text(locale(lang).getQr, 'generateQr');

        await ctx.reply(locale(lang).genKeyboard, {
            parse_mode: 'Markdown',
            reply_markup: inlineKeyborad,
            link_preview_options: { is_disabled: true },
        });
    }

    public static appKeyboard(ctx: Context) {
        const keyboard = new InlineKeyboard();
        const lang = ctx.user.lang;

        keyboard
            // .text('Резульаты', ROUTES.results)
            // .text('Сделать аватар кэмпа', ROUTES.generateAvatar)
            // .row()
            .text(locale(lang).generatorMoreBtn, ROUTES.generatorMoreData)
            .text('📦 Промо-материалы', ROUTES.promoMaterials)
            .row()
            .url(locale(lang).moreAboutLabel, locale(lang).moreAboutUrl);

        return keyboard;
    }

    public static async getUserAvatarPath(ctx: Context) {
        const userId = ctx.from?.id;
        if (!userId) {
            await ctx.answerCallbackQuery('Пользователь не найден.');
            return;
        }
        try {
            const profileAvatars: UserProfilePhotos =
                await ctx.api.getUserProfilePhotos(userId);

            if (
                !profileAvatars.photos.length ||
                !profileAvatars.photos[0].length
            ) {
                await ctx.reply('У вас нет аватара в Telegram!');
                return;
            }

            const photoSizes = profileAvatars.photos[0];
            const avatarPhoto =
                photoSizes[photoSizes.length - 1] ?? photoSizes[0];

            if (!avatarPhoto?.file_id) {
                await ctx.reply(
                    'Не удалось получить ваш аватар. Попробуйте снова.'
                );
                return;
            }

            const avatarFile = await ctx.api.getFile(avatarPhoto.file_id);

            return `https://api.telegram.org/file/bot${botInstance.token}/${avatarFile.file_path}`;
        } catch (error: unknown) {
            console.error('', error);
            await ctx.answerCallbackQuery(
                'Произошла ошибка. Попробуйте снова.'
            );
        }
    }
}
