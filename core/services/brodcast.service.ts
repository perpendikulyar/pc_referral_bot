import { Context } from 'grammy';
import { Conversation } from '@grammyjs/conversations';

import { SheetService } from './google_api/sheet.service';
import { Message } from 'grammy/types';

export async function brodcastMessage(
    conversation: Conversation,
    ctx: Context,
    args?: { selfId: number }
) {
    await ctx.reply('Введите текст сообщения', {
        reply_markup: { remove_keyboard: true },
    });

    const { message } = await conversation.waitFor('message:text');
    if (message.text) {
        console.log(`brodcast starting...`);
        const sheetService = new SheetService();
        const chatIds = await sheetService.getChatIds();

        if (!chatIds && !Array.isArray(chatIds)) {
            console.log('Subscribers not found');
            await ctx.reply('Подписчики не найдены');
            return;
        }

        const { success, errors } = await sendMessage(ctx, chatIds, message);

        console.log(
            `Brodcast sent to ${chatIds.length}, delivered: ${success}, failed: ${errors}`
        );

        if (success === 0) {
            console.log(`Brodcast failed`);
            await ctx.reply('Рассылка не удалась');
            return;
        } else {
            await ctx.reply(
                `Brodcast completely finished with result — delivered: ${success}, failed: ${errors}`
            );
        }
    }
}

async function sendMessage(
    ctx: Context,
    chatIds: number[],
    message: Message
): Promise<{ success: number; errors: number }> {
    let success = 0;
    let errors = 0;

    if (!message.text) {
        return { success, errors };
    }

    for (const chatId of chatIds) {
        try {
            // Не отправляем себе
            if (chatId != ctx.chat?.id) {
                await ctx.api.sendMessage(chatId, message.text || '', {
                    link_preview_options: { is_disabled: true },
                    entities: message.entities,
                });
                success++;
            } else {
                errors++;
            }
        } catch (e) {
            console.error(
                `Can't send message to user with chat id: ${chatId}`,
                e
            );
            errors++;
        }
    }

    return { success, errors };
}
