import { Bot, FilterQuery } from 'grammy';

import { applicationRoutes, IBotCommand } from './routes';

export class Router {
    private _routes: IBotCommand[] = [];
    private _bot: Bot;

    constructor(bot: Bot) {
        this._routes = applicationRoutes();
        this._bot = bot;
    }

    public registerCommands() {
        const commands = this._routes.filter((e) => e.type === 'command');
        this._bot.api.setMyCommands(commands);
        commands.forEach((e) => {
            this._bot.command(e.command, e.handler);
        });

        const callbacks = this._routes.filter((e) => e.type === 'callback');
        callbacks.forEach((e) => {
            this._bot.callbackQuery(e.command, e.handler);
        });

        const specific = this._routes.filter((e) => e.type === 'specific');
        specific.forEach((e) => {
            this._bot.on(e.command as FilterQuery, e.handler);
        });
    }

    public addRoute(route: IBotCommand) {
        this._routes.push(route);
        return this._routes;
    }
}
