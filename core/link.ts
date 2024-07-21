const baseUrl: String = 'https://productcamp.ru/';
const utmMedium: String = 'referral';
const utmSource: String = 'gen';
const utmCampaign: String = 'programm_participant';

/*
 *  TODO: add link minifier
 */

export default function getUrl(ref: String) {
    return `${baseUrl}?ref=${ref}&utm_medium=${utmMedium}&utm_source=${utmSource}&utm_campaign=${utmCampaign}`;
}
