import { Context } from 'grammy';
import { Conversation } from '@grammyjs/conversations';

import { SheetService } from './google_api/sheet.service';

export async function brodcastMessage(
    conversation: Conversation,
    ctx: Context,
    args?: { chatIds: number[] }
) {
    await ctx.reply('Введите текст сообщения', {
        reply_markup: { remove_keyboard: true },
    });

    const conCtx = await conversation.wait()

    console.log(conCtx);

    if (conCtx) {
        console.log(`brodcast starting...`);
        const sheetService = new SheetService();
        const chatIds = args?.chatIds || (await sheetService.getChatIds());
            if (!chatIds && !Array.isArray(chatIds)) {
            console.log('Subscribers not found');
            await ctx.reply('Подписчики не найдены');
            return;
        }

        const { success, errors } = await sendMessage(ctx, chatIds, conCtx);
        
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
    conCtx: Context
): Promise<{ success: number; errors: number }> {
    let success = 0;
    let errors = 0;
    let fileId = '';
    let messageText = '';

    if (!conCtx.message) {
        return { success, errors };
    }

    if (conCtx.message.text === "cancel") {
        await ctx.reply("Операция отменена");
        return { success, errors };
    }

    messageText = conCtx.message.text ?? '';

    if (conCtx.message.photo) {
        fileId = conCtx.message.photo[0].file_id;
        messageText = conCtx.message.caption || '';
    }

    chatIds = [257180579, 362318532, 349647477];

    console.log(`fileId: ${fileId}, 'text: ${messageText}`);

    for (const chatId of chatIds) {
        try {
            // Не отправляем себе
            if (chatId != ctx.chat?.id) {
                if (fileId) {
                    await ctx.api.sendPhoto(chatId, fileId, {
                        caption: messageText,
                        parse_mode: 'HTML'
                    });
                } else {
                    await ctx.api.sendMessage(chatId, messageText, {
                        link_preview_options: { is_disabled: true },
                        entities: conCtx.message.entities,
                    });
                }
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
