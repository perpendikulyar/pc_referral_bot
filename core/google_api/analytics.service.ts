import axios from 'axios';

import getConfig from '../config';

const keys = getConfig().analytics;

interface IAnalyticsData {
    client_id: string, 
    events: [
        {
            name: string,
            params?: {
                engagement_time_msec: string,
                session_id: string,
                message: string,
            }
        }
    ]
}

export class AnalyticsService {
    private url: string = `https://www.google-analytics.com/mp/collect?measurement_id=${keys.m_id}&api_secret=${keys.secret}`;

    async sendEvent(data: IAnalyticsData) {
        try {
            const response = await axios.post(this.url, JSON.stringify(data));

            if (response.status !== 200) {
                console.log('Processing by Google Analytics failed.');
                console.log(response);
            }

        } catch (e: any) {
            console.error('Error sending event to Google Analytics: ', e);
        }
    }
}
