import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { SheetService } from "./google_api/sheet.service";

export async function sendDidgest(
    //converstaion: Conversation,
    ctx: Context,
    args?: any
) {
    const sheetService = new SheetService();
    const digestData = await sheetService.getDidgestData();
    const allChatIds = await sheetService.getChatIds();

    allChatIds?.forEach((e) => {
        const result = digestData?.find(d => {d.chatId === e});

        if (result) {
            console.log('send didgest');
        } else {
            console.log('send otput');
        }
    });
}