import axios from 'axios';

import getConfig from '../config';
import { Context } from 'grammy';

const keys = getConfig().analytics;

interface IAnalyticsData {
    client_id: string;
    user_id?: string;
    events?: [
        {
            name?: string;
            params?: {
                engagement_time_msec: number;
                session_id?: string;
                message?: string;
                source?: string;
                username?:string
            };
        },
    ];
}

export class AnalyticsService {
    private url: string = `https://www.google-analytics.com/mp/collect?measurement_id=${keys.m_id}&api_secret=${keys.secret}`;

    async sendEvent(ctx: Context, event?: string) {
        if (!event && !ctx.command) {
            console.error('Failed to send GA event with no vent name');
            return;
        }

        const data: IAnalyticsData = {
            client_id: ctx.from?.username || 'guest',
            user_id: ctx.from?.username,
            events: [
                {
                    name: event || ctx.command,
                    params: {
                        engagement_time_msec: 100,
                        session_id: ctx.chat?.id.toString() || '',
                        message: ctx.message?.text || '',
                        source: ctx.source,
                        username: ctx.from?.username || 'guest',
                    },
                },
            ],
        };

        try {
            const response = await axios.post(this.url, JSON.stringify(data));

            if (response.status !== 200) {
                console.log('Processing by Google Analytics failed.');
            }
        } catch (e: any) {
            console.error('Error sending event to Google Analytics: ', e);
        }
    }
}
