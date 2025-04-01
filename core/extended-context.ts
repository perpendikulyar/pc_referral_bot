import { Bot, Context } from 'grammy';

export interface User {
    id?: number;
    username?: string;
    isAdmin?: boolean;
    lang?: string;
}

declare module 'grammy' {
    interface Context {
        command?: string;
        source?: string;
        user: User;
    }
}
