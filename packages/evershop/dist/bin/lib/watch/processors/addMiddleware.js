import { warning } from '../../../../lib/log/logger.js';
import { Handler } from '../../../../lib/middleware/Handler.js';
export function addMiddleware(app, event) {
    try {
        const filePath = event.jsPath?.toString();
        Handler.addMiddlewareFromPath(filePath);
    } catch (error) {
        warning(`Failed to add new middleware from ${event.jsPath}: ${error.message}. Skipping.`);
    }
}
