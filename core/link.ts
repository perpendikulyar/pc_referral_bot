const baseUrl: String = 'https://productcamp.ru/';
const utmMedium: String = 'referral';
const utmCampaign: String = 'refProg';

/*
 *  TODO: add link minifier
 */

export default function getUrl(ref: String) {
    return `${baseUrl}?utm_medium=${utmMedium}&utm_source=${ref}&utm_campaign=${utmCampaign}`;
}
