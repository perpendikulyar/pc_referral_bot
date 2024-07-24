import { Bot, CommandContext } from 'grammy';

import getConfig from './core/config';
import {
    generate,
    help,
    onMessage,
    start,
    onGeneratorMore,
    onGetLink,
    onGetInvite,
} from './core/commands';
import { routes } from './core/routes';
import { ROUTES } from './core/routes.enum';

const config = getConfig();

const bot: Bot = new Bot(config.tgToken);

bot.api.setMyCommands(routes);

bot.command(ROUTES.start, async (ctx) => start(ctx));

bot.command(ROUTES.generate, async (ctx) => generate(ctx));

bot.command(ROUTES.help, async (ctx) => help(ctx));

bot.on('message', async (ctx) => onMessage(ctx));

bot.callbackQuery('generatorMoreData', async (ctx) => onGeneratorMore(ctx));

bot.callbackQuery('getLink', async (ctx) => onGetLink(ctx));

bot.callbackQuery('getInvite', async (ctx) => onGetInvite(ctx));

bot.start({ onStart: () => console.log('Bot running...') });
