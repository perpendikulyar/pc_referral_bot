import { Context, InputFile } from 'grammy';
import * as QRCode from 'qrcode';

export default async function generateQR(ctx: Context, link: string) {
    try {
        const data = await QRCode.toBuffer(link, {
            errorCorrectionLevel: 'H',
            type: 'png',
            margin: 2,
            scale: 8,
            color: {
                dark: '#333333',
                light: '#E2E5EC'
            }
        });

        await ctx.replyWithPhoto(new InputFile(new Uint8Array(data), 'qr-code.png')), {
            caption: 'Твой QR-код готов!'
        }


    } catch (error) {
        console.error('Error on QR code generation:', error);
        ctx.reply('Не удалось сгенерировать QR-код');
    }
}