import { BotCommand } from 'grammy/types';

import { ROUTES } from './routes.enum';
import { locale } from './localisations';
import { CommandContext, Context, FilterQuery } from 'grammy';
import {
    adminPanel,
    brodcast,
    generate,
    help,
    onGenerateQr,
    onGeneratorMore,
    onGetInvite,
    onGetLink,
    onGetStoriesTemplates,
    onMessage,
    start,
} from './commands';
import { isAdmin } from './isAdmin.guard';

export interface Route extends BotCommand {
    command: ROUTES | FilterQuery | string;
    type: 'command' | 'callback' | 'specific';
    handler: (ctx: Context) => void;
    guard?: (ctx: Context) => Promise<boolean>;
    description: string;
}

export const applicationRoutes = (): Route[] => {
    return [
        {
            command: 'start',
            type: 'command',
            handler: async (ctx) => start(ctx as CommandContext<Context>),
            description: 'start',
        },
        {
            command: ROUTES.generate,
            type: 'command',
            handler: async (ctx) => generate(ctx as CommandContext<Context>),
            description: locale('en').cmdGenerate,
        },
        {
            command: ROUTES.help,
            type: 'command',
            handler: async (ctx) => help(ctx as CommandContext<Context>),
            description: locale('en').cmdHelp,
        },
        {
            command: ROUTES.adminPanel,
            type: 'command',
            handler: async (ctx) => adminPanel(ctx as CommandContext<Context>),
            description: 'Admin',
            guard: isAdmin
        },
        {
            command: ROUTES.brodcast,
            type: 'command',
            handler: async (ctx) => brodcast(ctx as CommandContext<Context>),
            description: 'Start Broadcast',
            guard: isAdmin,
        },
        {
            command: 'generatorMoreData',
            type: 'callback',
            description: '',
            handler: onGeneratorMore
        },
        {
            command: 'getLink',
            type: 'callback',
            description: '',
            handler: onGetLink,
        },
        {
            command: 'getInvite',
            type: 'callback',
            description: '',
            handler: onGetInvite,
        },
        {
            command: 'generateQr',
            type: 'callback',
            description: '',
            handler: onGenerateQr,
        },
        {
            command: 'getStories',
            type: 'callback',
            description: '',
            handler: onGetStoriesTemplates,
        },
        {
            command: 'message',
            type: 'specific',
            handler: onMessage,
            description: '',
        },
    ];
};
