import { Bot, Context } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

import getConfig from './config';

const config = getConfig();
export const botInstance: Bot<ConversationFlavor<Context>> = new Bot(config.tgToken);
