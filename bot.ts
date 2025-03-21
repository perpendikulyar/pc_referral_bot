import { Bot, GrammyError, HttpError } from 'grammy';

import getConfig from './core/config';
import { Router } from './core/router';
import { loggerMiddleware } from './core/middlewares/looger.midleware';
import { contextExtenderMiddleware } from './core/middlewares/context-extender.middleware';
import { gaMidleware } from './core/middlewares/ga.midleware';

const config = getConfig();

const bot: Bot = new Bot(config.tgToken);
bot.use(contextExtenderMiddleware, loggerMiddleware, gaMidleware);
const router: Router = new Router(bot);
router.registerCommands();

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
