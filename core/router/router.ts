import { Bot, Context, FilterQuery } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

import { applicationRoutes, Route } from './routes';
import { botInstance } from '../bot.instance';
import { ROUTES } from './routes.enum';

export class Router {
    private static _instance: Router;
    private _routes: Route[] = [];
    private _bot: Bot<ConversationFlavor<Context>>;

    constructor() {
        this._routes = applicationRoutes();
        this._bot = botInstance;
        this.registerRoutes();
    }

    public static get Instanse() {
        return this._instance || new this();
    }

    public registerRoutes() {
        const commands = this._routes.filter((e) => e.type === 'command');
        this.registerBotCommands(commands);

        commands.forEach((e) => {
            this._bot.command(e.command, e.handler);
        });

        const callbacks = this._routes.filter((e) => e.type === 'callback');
        callbacks.forEach((e) => {
            this._bot.callbackQuery(e.command, e.handler);
        });

        const hears = this._routes.filter((e) => e.type === 'hears');
        hears.forEach((e) => {
            this._bot.hears(e.command, e.handler);
        });

        const specific = this._routes.filter((e) => e.type === 'specific');
        specific.forEach((e) => {
            this._bot.on(e.command as FilterQuery, e.handler);
        });
    }

    public addRoute(route: Route | string) {
        if (typeof route == 'string') {
            const findRoute: Route = applicationRoutes().filter(
                (e) => e.command === route
            )[0];
            this._routes.push(findRoute);
        } else {
            this._routes.push(route);
        }
        this.registerRoutes();
        return this._routes;
    }

    public addRoutes(_routes: Array<Route | string>) {
        _routes.forEach((e) => {
            this.addRoute(e);
        });
        this.registerRoutes();
        return this._routes;
    }

    public removeRoute(command: string) {
        this._routes = this._routes.filter((e) => e.command != command);
        this.registerRoutes();
        return this._routes;
    }

    public get routes() {
        return this._routes;
    }

    public registerBotCommands(routes: Array<Route | string>) {
        const result: Route[] = [];
        routes.forEach((e) => {
            if (typeof e === 'string') {
                result.push(this._routes.filter((r) => r.command === e)[0]);
            } else {
                result.push(e);
            }
        });
        const commands = result.filter((e) => e.allowedInMenu);
        this._bot.api.setMyCommands(commands);
    }
}
