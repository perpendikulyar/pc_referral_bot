const BASE_URL = 'https://productcamp.ru/';
const UTM_MEDIUM = 'referral';
const UTM_CAMPAIGN = 'refProg';

export class LinkService {
    private _endpoint = 'https://clck.ru/--';

    private async minify(url: string): Promise<string> {
        const result = await fetch(`${this._endpoint}?url=${url}`);
        return result.text();
    }

    public async getUrl(ref: string): Promise<string> {
        // Экранируем только значение utm_source, так как оно поступает от пользователя
        const safeRef = encodeURIComponent(ref);
        const url = `${BASE_URL}?utm_medium=${UTM_MEDIUM}&utm_source=${safeRef}&utm_campaign=${UTM_CAMPAIGN}`;
        return await this.minify(url);
    }
}
