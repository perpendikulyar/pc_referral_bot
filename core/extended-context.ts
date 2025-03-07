import { Bot, Context } from 'grammy';

// Расширяем тип Context
declare module 'grammy' {
    interface Context {
        command?: string;
        source?: string;
    }
}
