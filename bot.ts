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
    getQR,
} from './core/commands';
import { routes } from './core/routes';
import { ROUTES } from './core/routes.enum';
import { loggerMiddleware } from './core/looger.midleware';

const config = getConfig();

const bot: Bot = new Bot(config.tgToken);

bot.api.setMyCommands(routes);

bot.use(loggerMiddleware);

bot.command(ROUTES.start, async (ctx) => start(ctx));

bot.command(ROUTES.generate, async (ctx) => generate(ctx));

bot.command(ROUTES.help, async (ctx) => help(ctx));

bot.command(ROUTES.getQR, async (ctx) => getQR(ctx));

bot.on('message', async (ctx) => onMessage(ctx));

bot.callbackQuery('generatorMoreData', async (ctx) => onGeneratorMore(ctx));

bot.callbackQuery('getLink', async (ctx) => onGetLink(ctx));

bot.callbackQuery('getInvite', async (ctx) => onGetInvite(ctx));

bot.catch((e) => {
    const ctx = e.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const error = e.error;
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Unknown error:", error);
  }
});

bot.start({ onStart: () => console.log('Bot starting all services...') });


