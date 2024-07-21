import { CommandContext, Context } from 'grammy';

import getConfig from '../core/config';
import getUrl from './link';
import { UserLink } from './dto/userlink.dto';
import { LoggerEvent } from './dto/logger_event.dto';

const config = getConfig();

export async function start(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    LoggerEvent.createAndSave(name, 'start');
    await ctx.reply(`Welcome ${name}`);
}

export async function generate(ctx: CommandContext<Context>) {
    const user =  ctx.from;
    const name = user?.username || 'guest';
    const url = getUrl(name);
    UserLink.createAndSave(name, url);
    LoggerEvent.createAndSave(name, 'generate');
    await ctx.reply(`${url}`, { link_preview_options: { is_disabled: true } });
    await ctx.reply(`Explain message`);
}

export async function help(ctx: CommandContext<Context>) {
    const user =  ctx.from;
    LoggerEvent.createAndSave(user?.username || 'guest', 'help');
    await ctx.reply('this is help text');
}

export async function onMessage(ctx: Context) {
    const user = ctx.from;
    const message = ctx.message;
    LoggerEvent.createAndSave(
        user?.username || 'guest',
        'message',
        `text: ${message?.text}`
    );
    await ctx.reply(
        `This bot is not provided unusual text commands, but you can use /generate command to get your own Refferal Link or use Menu tos see full list`
    );
}
