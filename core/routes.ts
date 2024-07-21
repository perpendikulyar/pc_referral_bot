import { BotCommand } from 'grammy/types';
import { ROUTES } from './routes.enum';

interface IBotCommand extends BotCommand {
    command: ROUTES;
}

export const routes: IBotCommand[] = [
    { command: ROUTES.generate, description: 'generate the referral link' },
    { command: ROUTES.help, description: "Let's see what i can do" },
    { command: ROUTES.stop, description: 'stop and refresh your expirience' },
];
