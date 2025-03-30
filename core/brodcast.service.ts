import { Bot } from 'grammy';
import { SheetService } from './google_api/sheet.service';
import { botInstance } from './bot.instance';

export class BrodcastService {
    private _bot: Bot;
    readonly sheetService: SheetService;

    constructor() {
        this._bot = botInstance;
        this.sheetService = new SheetService();
    }

    async brodcastMessage(text: string) {
        console.log(`brodcast starting`);

        let success = 0;
        let errors = 0;

        const chatIds = await this.sheetService.getChatIds();
        if (!chatIds && !Array.isArray(chatIds)) {
            return;
        }

        for (const chatId of chatIds) {
            try {
                if (chatId == 257180579) {
                    await this._bot.api.sendMessage(chatId, text);
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
        console.log(
            `Brodcast sent to ${chatIds.length}, delivered: ${success}, failed: ${errors}`
        );
        return { success, errors };
    }
}
