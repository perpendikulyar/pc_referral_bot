import { Bot, Context, GrammyError, HttpError, NextFunction } from 'grammy';
import {
    ConversationFlavor,
    conversations,
    createConversation,
} from '@grammyjs/conversations';

import { botInstance } from './core/bot.instance';
import { Router } from './core/router/router';
import { loggerMiddleware } from './core/middlewares/looger.midleware';
import { contextExtenderMiddleware } from './core/middlewares/context-extender.middleware';
import { gaMidleware } from './core/middlewares/ga.midleware';
import { brodcastMessage } from './core/services/brodcast.service';
import { autoRetry } from '@grammyjs/auto-retry';
import { applicationRoutes } from './core/router/routes';

const bot: Bot<ConversationFlavor<Context>> = botInstance;
bot.api.config.use(autoRetry());

const router = new Router((ctx) => {
    return ctx.command;
});
router.registerRoutes(applicationRoutes());

bot.use(
    contextExtenderMiddleware,
    loggerMiddleware,
    gaMidleware,
    conversations(),
    createConversation(brodcastMessage),
    router
);

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
