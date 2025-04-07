import { Composer, Context, FilterQuery, Middleware, MiddlewareFn, MiddlewareObj, NextFunction } from 'grammy';

import { applicationRoutes, Route } from './routes';

type MaybePromise<T> = T | Promise<T>;

export class Router <C extends Context> implements MiddlewareObj<C> {
    private _routes: Route[] = [];

    public routeHandlers: Record<PropertyKey, Middleware<C>>;
    private otherwiseHandler: Composer<C> | undefined;

    constructor(
        private readonly router: (
            ctx: C
        ) => MaybePromise<PropertyKey | undefined>, 
        routeHandlers: 
        | Record<PropertyKey, Middleware<C>>
        | Map<PropertyKey, Middleware<C>> = {}
    ) {
        this._routes = applicationRoutes();
        this.routeHandlers = routeHandlers instanceof Map
        ? Object.fromEntries(routeHandlers.entries())
        : { ...routeHandlers };
    }

     private route(route: PropertyKey, ...middlewares: Array<Middleware<C>>) {
        const composer = new Composer(...middlewares);
        this.routeHandlers[route] = composer;
        return composer;
    }

    public otherwise(...middlewares: Array<Middleware<C>>) {
        return this.otherwiseHandler = new Composer( ...middlewares );
    }

    public middleware(): MiddlewareFn<C> {
        return new Composer<C>().route(
            (ctx) => this.router(ctx),
            this.routeHandlers,
            this.otherwiseHandler,
        ).middleware();
    }
    
    public registerRoutes(routes: Array<Route>) {
        routes.forEach(e => {
            this.addRoute(e.command);
        })
    }

    public addRoute(route: Route | string) {
        if (typeof route == 'string') {
            const findRoute: Route | undefined = applicationRoutes().find(
                (e) => e.command === route
            );
            if (findRoute) {
                this._routes.push(findRoute);
                this.route(
                    findRoute.command, 
                    findRoute.guard 
                        ? findRoute.guard 
                        : async (ctx, next: NextFunction) =>  { await next() }, 
                    findRoute.handler
                );
            } else {
                console.error(`Route ${route} is not exist`);
                return;
            }
        } else {
            this._routes.push(route);
            this.route(
                route.command, 
                route.guard 
                    ? route.guard 
                    : async (ctx, next: NextFunction) => { await next()}, 
                route.handler
            );
        }
    }

    public addRoutes(_routes: Array<Route | string>) {
        _routes.forEach((e) => {
            this.addRoute(e);
        });
    }

    public removeRoute(command: string) {
        this._routes = this._routes.filter((e) => e.command != command);
        this.registerRoutes(this._routes);
    }

    public get routes() {
        return this._routes;
    }
}
