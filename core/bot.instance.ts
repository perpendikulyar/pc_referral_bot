import { Bot } from 'grammy';

import getConfig from './config';

const config = getConfig();
export const botInstance: Bot = new Bot(config.tgToken);
