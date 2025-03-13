import { Bot } from "grammy";
import { SheetService } from "./google_api/sheet.service";

export class BrodcastService {
    readonly sheetService: SheetService;

    constructor() {
        this.sheetService = new SheetService();
    }

    async brodcastMessage(bot: Bot, text: string) {
        console.log(`brodcast starting`);

        let success = 0;
        let errors = 0;

        const chatIds = await this.sheetService.getChatIds();
        if (!chatIds && !Array.isArray(chatIds)) {
            return;
        }

        for (const chatId of chatIds) {
            try {

                console.log(`${chatId}: will recive this message: ${text}`);

                if (chatId == 257180579) {
                    await bot.api.sendMessage(chatId, text);
                    success++;
                } else {
                    errors++;
                }
            } catch (e) {
                console.error(`Can't send message to user with chat id: ${chatId}`, e);
                errors++;
            }
        }

        return {success, errors};
    }
}