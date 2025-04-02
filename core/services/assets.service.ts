import axios, { AxiosResponse } from 'axios';
import { readFile } from 'fs/promises';
import { InputFile } from 'grammy';
import path from 'path';
import sharp from 'sharp';

export enum AVATAR_TYPE {
    center = 'center.png',
    round = 'round.png',
    left = 'left.png',
    right = 'right.png',
}

export class AssetsService {
    private ASSETS_DIR: string = path.join(__dirname, '../../../assets');

    private async getImage(path: string) {
        const file = await readFile(path);
        return new InputFile(new Uint8Array(file));
    }

    public async getStorageImage(filename: string) {
        return await this.getImage(this.getImagePath(filename));
    }

    private getImagePath(filename: string, dir: string = 'images') {
        return path.join(this.ASSETS_DIR, dir, filename);
    }

    private getAvatarMaskPath(maskName: string) {
        return this.getImagePath(maskName, 'avatars');
    }

    private getAvatarMaskPreviewPath(maskName: string) {
        return this.getImagePath(maskName, 'avatars/preview');
    }

    public async getAvatarImage(maskName: string) {
        return await this.getImage(this.getAvatarMaskPreviewPath(maskName));
    }

    public async generateAvatar(proileAvatarUrl: string, type: AVATAR_TYPE) {
        const size = 512;

        const response: AxiosResponse<ArrayBuffer> = await axios.get(
            proileAvatarUrl,
            { responseType: 'arraybuffer' }
        );
        const avatarBuffer: Buffer = Buffer.from(response.data);
        const framePath = this.getAvatarMaskPath(type);

        const frameBuffer: Buffer = await sharp(framePath)
            .resize(size, size)
            .png()
            .toBuffer();

        const processed: Buffer = await sharp(avatarBuffer)
            .resize(size, size)
            .composite([
                {
                    input: frameBuffer,
                },
            ])
            .png({ force: true })
            .toBuffer();

        return new InputFile(new Uint8Array(processed));
    }
}
