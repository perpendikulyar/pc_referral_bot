import { Bot, GrammyError, HttpError } from 'grammy';

import getConfig from './core/config';
import {
    generate,
    help,
    onMessage,
    start,
    onGeneratorMore,
    onGetLink,
    onGetInvite,
    onGenerateQr,
    onGetStoriesTemplates,
    brodcast,
} from './core/commands';
import { routes } from './core/routes';
import { ROUTES } from './core/routes.enum';
import { loggerMiddleware } from './core/middlewares/looger.midleware';
import { contextExtenderMiddleware } from './core/middlewares/context-extender.middleware';
import { gaMidleware } from './core/middlewares/ga.midleware';

const config = getConfig();

const bot: Bot = new Bot(config.tgToken);

bot.use(contextExtenderMiddleware, loggerMiddleware, gaMidleware);

bot.api.setMyCommands(routes);

bot.command(ROUTES.start, async (ctx) => start(ctx));

bot.command(ROUTES.generate, async (ctx) => generate(ctx));

bot.command(ROUTES.help, async (ctx) => help(ctx));

bot.command(ROUTES.brodcast, async (ctx) => brodcast(ctx, bot));

bot.on('message', async (ctx) => onMessage(ctx));

bot.callbackQuery('generatorMoreData', async (ctx) => onGeneratorMore(ctx));

bot.callbackQuery('getLink', async (ctx) => onGetLink(ctx));

bot.callbackQuery('getInvite', async (ctx) => onGetInvite(ctx));

bot.callbackQuery('generateQr', async (ctx) => onGenerateQr(ctx));

bot.callbackQuery('getStories', async (ctx) => onGetStoriesTemplates(ctx));

bot.catch((e) => {
    const ctx = e.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const error = e.error;
    if (error instanceof GrammyError) {
        console.error('Error in request:', error.description);
    } else if (error instanceof HttpError) {
        console.error('Could not contact Telegram:', error);
    } else {
        console.error('Unknown error:', error);
    }
});

bot.start({ onStart: () => console.log('Bot starting all services...') });
