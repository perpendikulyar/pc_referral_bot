import { readFile } from "fs/promises";
import { InputFile } from "grammy";
import path from "path";

export class AssetsService {
    private ASSETS_DIR: string = path.join(__dirname, "../../assets");

    public getImagePath(filename: string) {
        return path.join(this.ASSETS_DIR, "images", filename);
    }

    public async getImage(filename: string) {
        const file = await readFile(this.getImagePath(filename));
        return new InputFile(new Uint8Array(file));
    }
}