import { insert } from '@evershop/postgres-query-builder';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
async function addOrderActivityLog(orderId, message, notifyCustomer, connection) {
    /* Add an activity log message */ const log = await insert('order_activity').given({
        order_activity_order_id: orderId,
        comment: message,
        customer_notified: notifyCustomer ? 1 : 0
    }).execute(connection);
    return log;
}
export default (async (orderId, message, notifyCustomer, connection)=>{
    return await hookable(addOrderActivityLog, {
        orderId,
        message,
        notifyCustomer
    })(orderId, message, notifyCustomer, connection);
});
export function hookBeforeAddOrderActivityLog(callback, priority = 10) {
    hookBefore('addOrderActivityLog', callback, priority);
}
export function hookAfterAddOrderActivityLog(callback, priority = 10) {
    hookAfter('addOrderActivityLog', callback, priority);
}
