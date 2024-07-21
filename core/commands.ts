import { CommandContext, Context } from 'grammy';

import getConfig from '../core/config';
import getUrl from './link';
import { SheetService } from './google_api/sheet.service';

const config = getConfig();

const sheetService = new SheetService(config.sheetId);

export async function start(ctx: CommandContext<Context>) {
    const user = ctx.from;
    const name = user?.username || 'guest';
    await ctx.reply(`Welcome ${name}`);
}

export async function generate(ctx: CommandContext<Context>) {
    const user = await ctx.from;
    const name = user?.username || 'guest';
    const url = getUrl(name);
    await sheetService.update({ name: name, link: url });
    await ctx.reply(`${url}`, { link_preview_options: { is_disabled: true } });
    await ctx.reply(`Explain message`);
}

export async function help(ctx: CommandContext<Context>) {
    await ctx.reply('this is help text');
}

export async function onMessage(ctx: any) {
    await ctx.reply(
        `This bot is not provided unusual text commands, but you can use /generate command to get your own Refferal Link or use Menu tos see full list`
    );
}
