import { commit, execute, getConnection, rollback, select, startTransaction } from '@evershop/postgres-query-builder';
import { error } from '../../../lib/log/logger.js';
import { pool } from '../../../lib/postgres/connection.js';
import { getConfig } from '../../../lib/util/getConfig.js';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
import addOrderActivityLog from './addOrderActivityLog.js';
import { updatePaymentStatus } from './updatePaymentStatus.js';
import { updateShipmentStatus } from './updateShipmentStatus.js';
function validateStatus(paymentStatus, shipmentStatus) {
    const shipmentStatusList = getConfig('oms.order.shipmentStatus', {});
    const paymentStatusList = getConfig('oms.order.paymentStatus', {});
    const paymentStatusConfig = paymentStatusList[paymentStatus];
    const shipmentStatusConfig = shipmentStatusList[shipmentStatus];
    if (paymentStatusConfig.isCancelable === false || shipmentStatusConfig.isCancelable === false) {
        return false;
    }
    return true;
}
async function updatePaymentStatusToCancel(orderID, connection) {
    await updatePaymentStatus(orderID, 'canceled', connection);
}
async function updateShipmentStatusToCancel(orderID, connection) {
    await updateShipmentStatus(orderID, 'canceled', connection);
}
async function reStockAfterCancel(orderID, connection) {
    const orderItems = await select().from('order_item').where('order_item_order_id', '=', orderID).execute(connection, false);
    await Promise.all(orderItems.map(async (orderItem)=>{
        await execute(connection, `UPDATE product_inventory SET qty = qty + ${orderItem.qty} WHERE product_inventory_product_id = ${orderItem.product_id}`);
    }));
}
async function cancelOrder(uuid, reason) {
    const connection = await getConnection(pool);
    try {
        await startTransaction(connection);
        const order = await select().from('order').where('uuid', '=', uuid).load(connection, false);
        if (!order) {
            throw new Error('Order not found');
        }
        const statusCheck = hookable(validateStatus, {
            order
        })(order.payment_status, order.shipment_status);
        if (!statusCheck) {
            throw new Error('Order is not cancelable at this status');
        }
        await hookable(updatePaymentStatusToCancel, {
            order
        })(order.order_id, connection);
        await hookable(updateShipmentStatusToCancel, {
            order
        })(order.order_id, connection);
        await addOrderActivityLog(order.order_id, `Order canceled ${reason ? `(${reason})` : ''}`, false, connection);
        await hookable(reStockAfterCancel, {
            order
        })(order.order_id, connection);
        await commit(connection);
    } catch (err) {
        error(err);
        await rollback(connection);
        throw err;
    }
}
/**
 * Cancels an order by its UUID and adds a cancellation reason.
 * @param uuid - The UUID of the order to cancel.
 * @param reason - The reason for cancellation.
 * @returns A promise that resolves when the order is canceled.
 */ export default (async (uuid, reason)=>{
    await hookable(cancelOrder, {
        uuid
    })(uuid, reason);
});
export function hookBeforeValidateStatus(callback, priority = 10) {
    hookBefore('validateStatus', callback, priority);
}
export function hookAfterValidateStatus(callback, priority = 10) {
    hookAfter('validateStatus', callback, priority);
}
export function hookBeforeUpdatePaymentStatusToCancel(callback, priority = 10) {
    hookBefore('updatePaymentStatusToCancel', callback, priority);
}
export function hookAfterUpdatePaymentStatusToCancel(callback, priority = 10) {
    hookAfter('updatePaymentStatusToCancel', callback, priority);
}
export function hookBeforeUpdateShipmentStatusToCancel(callback, priority = 10) {
    hookBefore('updateShipmentStatusToCancel', callback, priority);
}
export function hookAfterUpdateShipmentStatusToCancel(callback, priority = 10) {
    hookAfter('updateShipmentStatusToCancel', callback, priority);
}
export function hookBeforeReStockAfterCancel(callback, priority = 10) {
    hookBefore('reStockAfterCancel', callback, priority);
}
export function hookAfterReStockAfterCancel(callback, priority = 10) {
    hookAfter('reStockAfterCancel', callback, priority);
}
export function hookBeforeCancelOrder(callback, priority = 10) {
    hookBefore('cancelOrder', callback, priority);
}
export function hookAfterCancelOrder(callback, priority = 10) {
    hookAfter('cancelOrder', callback, priority);
}
