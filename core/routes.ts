import { BotCommand } from 'grammy/types';
import { ROUTES } from './routes.enum';
import { locale } from './localisations';

interface IBotCommand extends BotCommand {
    command: ROUTES;
}

export const routes: IBotCommand[] = [
    { command: ROUTES.generate, description: locale('en').cmdGenerate },
    { command: ROUTES.help, description: locale('en').cmdHelp },
];
