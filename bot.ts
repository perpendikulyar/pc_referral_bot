import { Bot, Context, GrammyError, HttpError } from 'grammy';
import { ConversationFlavor, conversations, createConversation } from "@grammyjs/conversations";

import { botInstance } from './core/bot.instance';
import { Router } from './core/router/router';
import { loggerMiddleware } from './core/middlewares/looger.midleware';
import { contextExtenderMiddleware } from './core/middlewares/context-extender.middleware';
import { gaMidleware } from './core/middlewares/ga.midleware';
import { brodcastMessage } from './core/services/brodcast.service';
import { guardMiddleware } from './core/middlewares/guard.middlware';
import { autoRetry } from '@grammyjs/auto-retry';

const bot: Bot<ConversationFlavor<Context>> = botInstance;
bot.api.config.use(autoRetry());

bot.use(
    contextExtenderMiddleware,
    loggerMiddleware,
    gaMidleware,
    guardMiddleware,
    conversations(),
    createConversation(brodcastMessage)
);
const router: Router = new Router();


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
