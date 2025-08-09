import { BotCommand } from 'grammy/types';

import { ROUTES } from './routes.enum';
import { locale } from '../localisations';
import { CommandContext, Context, Middleware, MiddlewareFn } from 'grammy';
import * as commands from '../commands';
import { isAdmin } from '../guards/isAdmin.guard';

export interface Route extends BotCommand {
    command: ROUTES | string;
    type: 'command' | 'callback' | 'hears' | 'specific';
    handler: Middleware<Context>;
    guard?: MiddlewareFn<Context>;
    description: string;
    allowedInMenu?: boolean;
}

export const applicationRoutes = (): Route[] => {
    return [
        {
            command: ROUTES.start,
            type: 'command',
            handler: async (ctx) => commands.start(ctx as CommandContext<Context>),
            description: 'start',
        },
        {
            command: ROUTES.generate,
            type: 'command',
            handler: async (ctx) => commands.generate(ctx as CommandContext<Context>),
            description: locale('en').cmdGenerate,
            allowedInMenu: true,
        },
        {
            command: ROUTES.help,
            type: 'command',
            handler: async (ctx) => commands.help(ctx as CommandContext<Context>),
            description: locale('en').cmdHelp,
            allowedInMenu: true,
        },
        {
            command: ROUTES.adminPanel,
            type: 'command',
            handler: async (ctx) => commands.adminPanel(ctx as CommandContext<Context>),
            description: 'Admin',
            guard: isAdmin,
        },
        {
            command: ROUTES.generatorMoreData,
            type: 'callback',
            description: '',
            handler: commands.onGeneratorMore,
        },
        {
            command: ROUTES.promoMaterials,
            type: 'callback',
            description: '',
            handler: commands.onPromoMaterials
        },
        {
            command: ROUTES.getLink,
            type: 'callback',
            description: '',
            handler: commands.onGetLink,
        },
        // {
        //     command: ROUTES.getInvite,
        //     type: 'callback',
        //     description: '',
        //     handler: commands.onGetInvite,
        // },
        {
            command: ROUTES.generateQr,
            type: 'callback',
            description: '',
            handler: commands.onGenerateQr,
        },
        // {
        //     command: ROUTES.getStories,
        //     type: 'callback',
        //     description: '',
        //     handler: commands.onGetStoriesTemplates,
        // },
        {
            command: ROUTES.generateAvatar,
            type: 'callback',
            description: '',
            handler: commands.onGenerateAvatar,
        },
        {
            command: ROUTES.avatarCenter,
            type: 'callback',
            description: '',
            handler: commands.onCreateAvatar,
        },
        {
            command: ROUTES.avatarRound,
            type: 'callback',
            description: '',
            handler: commands.onCreateAvatar,
        },
        {
            command: ROUTES.avatarLeft,
            type: 'callback',
            description: '',
            handler: commands.onCreateAvatar,
        },
        {
            command: ROUTES.avatarRight,
            type: 'callback',
            description: '',
            handler: commands.onCreateAvatar,
        },
        // {
        //     command: ROUTES.results,
        //     type: 'command',
        //     description: 'Results',
        //     handler: async (ctx) => commands.results(ctx as CommandContext<Context>),
        //     allowedInMenu: true,
        // },
        {
            command: ROUTES.brodcast,
            type: 'hears',
            description: 'start broadcast',
            handler: commands.onStartBroadcast,
            guard: isAdmin,
        },
        {
            command: ROUTES.message,
            type: 'specific',
            handler: commands.onMessage,
            description: '',
        },
    ];
};
