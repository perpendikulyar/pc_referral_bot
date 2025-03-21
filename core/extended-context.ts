import { Bot, Context } from 'grammy';

// Расширяем тип Context
declare module 'grammy' {
    interface Context {
        isAdmin?: boolean;
        command?: string;
        source?: string;
        lang?: string;
    }
}
