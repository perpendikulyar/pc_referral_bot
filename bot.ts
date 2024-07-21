import { Bot } from 'grammy';

import getConfig from './core/config';
import { generate, help, onMessage, start } from './core/commands';
import { routes } from './core/routes';
import { ROUTES } from './core/routes.enum';

const config = getConfig();

const bot: Bot = new Bot(config.tgToken);

bot.api.setMyCommands(routes);

bot.command(ROUTES.start, async (ctx) => start(ctx));

bot.command(ROUTES.generate, async (ctx) => generate(ctx));

bot.command(ROUTES.help, async (ctx) => help(ctx));

bot.on('message', (ctx) => onMessage(ctx));

bot.start();
