import { BotCommand } from 'grammy/types';

import { ROUTES } from './routes.enum';
import { locale } from './localisations';
import { CommandContext, Context, FilterQuery } from 'grammy';
import {
    brodcast,
    generate,
    help,
    onGenerateQr,
    onGeneratorMore,
    onGetInvite,
    onGetLink,
    onGetStoriesTemplates,
    onMessage,
} from './commands';

export interface IBotCommand extends BotCommand {
    command: ROUTES | FilterQuery | string;
    type: 'command' | 'callback' | 'specific';
    handler: (ctx: Context) => void;
    guard?: boolean;
    description: string;
}

export const applicationRoutes = (): IBotCommand[] => {
    return [
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
            description: locale('en').cmdGenerate,
        },
        // {
        //     command: ROUTES.brodcast,
        //     type: 'command',
        //     handler: async (ctx) => brodcast(ctx as CommandContext<Context>),
        //     description: locale('en').cmdGenerate,
        // },
        {
            command: 'generatorMoreData',
            type: 'callback',
            description: '',
            handler: async (ctx) => onGeneratorMore(ctx),
        },
        {
            command: 'getLink',
            type: 'callback',
            description: '',
            handler: async (ctx) => onGetLink(ctx),
        },
        {
            command: 'getInvite',
            type: 'callback',
            description: '',
            handler: async (ctx) => onGetInvite(ctx),
        },
        {
            command: 'generateQr',
            type: 'callback',
            description: '',
            handler: async (ctx) => onGenerateQr(ctx),
        },
        {
            command: 'getStories',
            type: 'callback',
            description: '',
            handler: async (ctx) => onGetStoriesTemplates(ctx),
        },
        {
            command: 'message',
            type: 'specific',
            handler: async (ctx) => onMessage(ctx),
            description: '',
        },
    ];
};
