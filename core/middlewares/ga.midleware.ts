import { Context, NextFunction } from 'grammy';
import { AnalyticsService } from '../services/google_api/analytics.service';

const analyticsService = new AnalyticsService();

export async function gaMidleware(
    ctx: Context,
    next: NextFunction
): Promise<void> {
    await analyticsService.sendEvent(ctx);
    await next();
}
