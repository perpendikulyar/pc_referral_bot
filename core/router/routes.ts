import { BotCommand } from 'grammy/types';

import { ROUTES } from './routes.enum';
import { locale } from '../localisations';
import { CommandContext, Context } from 'grammy';
import {
    adminPanel,
    generate,
    help,
    onGenerateAvatar,
    onGenerateQr,
    onGeneratorMore,
    onGetInvite,
    onGetLink,
    onGetStoriesTemplates,
    onMessage,
    onStartBroadcast,
    start,
} from '../commands';
import { isAdmin } from '../guards/isAdmin.guard';

export interface Route extends BotCommand {
    command: ROUTES;
    type: 'command' | 'callback' | 'hears' | 'specific';
    handler: (ctx: Context) => void;
    guard?: (ctx: Context) => Promise<boolean>;
    description: string;
    allowedInMenu?: boolean;
}

export const applicationRoutes = (): Route[] => {
    return [
        {
            command: ROUTES.start,
            type: 'command',
            handler: async (ctx) => start(ctx as CommandContext<Context>),
            description: 'start',
        },
        {
            command: ROUTES.generate,
            type: 'command',
            handler: async (ctx) => generate(ctx as CommandContext<Context>),
            description: locale('en').cmdGenerate,
            allowedInMenu: true,
        },
        {
            command: ROUTES.help,
            type: 'command',
            handler: async (ctx) => help(ctx as CommandContext<Context>),
            description: locale('en').cmdHelp,
            allowedInMenu: true,
        },
        {
            command: ROUTES.adminPanel,
            type: 'command',
            handler: async (ctx) => adminPanel(ctx as CommandContext<Context>),
            description: 'Admin',
            guard: isAdmin,
        },
        {
            command: ROUTES.generatorMoreData,
            type: 'callback',
            description: '',
            handler: onGeneratorMore,
        },
        {
            command: ROUTES.getLink,
            type: 'callback',
            description: '',
            handler: onGetLink,
        },
        {
            command: ROUTES.getInvite,
            type: 'callback',
            description: '',
            handler: onGetInvite,
        },
        {
            command: ROUTES.generateQr,
            type: 'callback',
            description: '',
            handler: onGenerateQr,
        },
        {
            command: ROUTES.getStories,
            type: 'callback',
            description: '',
            handler: onGetStoriesTemplates,
        },
        {
            command: ROUTES.generateAvatar,
            type: 'callback',
            description: '',
            handler: onGenerateAvatar,
        },
        {
            command: ROUTES.brodcast,
            type: 'hears',
            description: 'start broadcast',
            handler: onStartBroadcast,
            guard: isAdmin,
        },
        {
            command: ROUTES.message,
            type: 'specific',
            handler: onMessage,
            description: '',
        },
    ];
};
