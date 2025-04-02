const baseUrl: String = 'https://productcamp.ru/';
const utmMedium: String = 'referral';
const utmCampaign: String = 'refProg';

export class LinkService {
    private _endpoint = 'https://clck.ru/--';

    private async minify(url: string): Promise<string> {
        const result = await fetch(`${this._endpoint}?url=${url}`);
        return result.text();
    }

    public async getUrl(ref: string): Promise<string> {
        const url = `${baseUrl}?utm_medium=${utmMedium}&utm_source=${ref}&utm_campaign=${utmCampaign}`;
        return await this.minify(encodeURIComponent(url));
    }
}
