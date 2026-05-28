/**
 * Helper function to create a type-safe event subscriber.
 * Provides better IDE autocomplete and type checking.
 *
 * @example
 * ```typescript
 * import { createSubscriber } from '@evershop/evershop/lib/event/subscriber';
 *
 * export default createSubscriber('order_placed', async (data) => {
 *   // data is automatically typed
 *   await sendEmail(data.orderId);
 * });
 * ```
 */ export function createSubscriber(eventName, handler) {
    return async (data)=>{
        await handler(data);
    };
}
