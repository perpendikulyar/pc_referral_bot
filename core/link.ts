const baseUrl: String = 'https://productcamp.ru/';
const utmMedium: String = 'referral';
const utmCampaign: String = 'refProg';

async function minify(url: string) {
    const endpoint = 'https://clck.ru/--';

    const res = await fetch(`${endpoint}?url=${url}`);
    return res.text();
}

export default async function getUrl(ref: String) {
    const url = `${baseUrl}?utm_medium=${utmMedium}&utm_source=${ref}&utm_campaign=${utmCampaign}`;
    return await minify(encodeURIComponent(url));
}
