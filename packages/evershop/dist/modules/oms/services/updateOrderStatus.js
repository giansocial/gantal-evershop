/**
 * This function will be executed automatically after either shipment status or payment status is updated.
 */ import { commit, getConnection, insert, rollback, select, startTransaction, update } from '@evershop/postgres-query-builder';
import Topo from '@hapi/topo';
import { error } from '../../../lib/log/logger.js';
import { pool } from '../../../lib/postgres/connection.js';
import { getConfig } from '../../../lib/util/getConfig.js';
import { hookable, hookAfter, hookBefore } from '../../../lib/util/hookable.js';
import { getValueSync } from '../../../lib/util/registry.js';
function getOrderStatusFlow() {
    try {
        const orderStatusList = getConfig('oms.order.status', {});
        const orderStatuses = new Topo.Sorter();
        Object.keys(orderStatusList).forEach((status)=>{
            orderStatuses.add(status, {
                before: orderStatusList[status].next,
                group: status
            });
        });
        return orderStatuses.nodes;
    } catch (err) {
        error(err);
        const message = `Failed to resolve order status. This is mostlikely due to the order status configuration. 
    Please check the configuration and try again. (${err.message})`;
        throw new Error(message);
    }
}
export function resolveOrderStatus(paymentStatus, shipmentStatus) {
    const orderStatusList = getConfig('oms.order.status', {});
    const shipmentStatusList = getConfig('oms.order.shipmentStatus', {});
    const paymentStatusList = getConfig('oms.order.paymentStatus', {});
    const psoMapping = getConfig('oms.order.psoMapping', {});
    const shipmentStatusDefination = shipmentStatusList[shipmentStatus];
    const paymentStatusDefination = paymentStatusList[paymentStatus];
    if (!shipmentStatusDefination || !paymentStatusDefination) {
        throw new Error('Either shipment status or payment status is invalid. Can not update order status');
    }
    const finalPsoMapping = getValueSync('psoMapping', psoMapping, {});
    // Reverse the order status list to get the highest priority status first
    const nextStatus = finalPsoMapping[`${paymentStatus}:${shipmentStatus}`] || finalPsoMapping[`*:${shipmentStatus}`] || finalPsoMapping[`${paymentStatus}:*`] || finalPsoMapping['*:*'];
    if (!nextStatus || !orderStatusList[nextStatus]) {
        throw new Error('Can not found a valid order status from the current shipment and payment status');
    }
    return nextStatus;
}
/**
 * This function means to be private and should not be called outside of this module. It will not perform any validation and directly update the order status.
 * You should consider updating the payment status and shipment status only, and let the system to update the order status automatically.
 *
 * @param orderId
 * @param status
 * @param connection
 */ async function updateOrderStatus(orderId, status, connection) {
    await update('order').given({
        status
    }).where('order_id', '=', orderId).execute(connection);
}
async function addOrderStatusChangeEvents(orderId, before, after, connection) {
    await insert('event').given({
        name: 'order_status_updated',
        data: {
            orderId: orderId,
            before,
            after
        }
    }).execute(connection);
}
export async function changeOrderStatus(orderId, status, conn) {
    const statusFlow = getOrderStatusFlow();
    const connection = conn || await getConnection(pool);
    const order = await select().from('order').where('order_id', '=', orderId).load(connection, false);
    if (!order) {
        throw new Error('Order not found');
    }
    if (order.status === status) {
        return;
    }
    // Do not allow to revert the status
    if (statusFlow.indexOf(order.status) > statusFlow.indexOf(status)) {
        throw new Error('Can not revert the status of the order');
    }
    try {
        if (!conn) {
            await startTransaction(connection);
        }
        await hookable(updateOrderStatus, {
            order,
            status
        })(order.order_id, status, connection);
        await hookable(addOrderStatusChangeEvents, {
            order,
            status
        })(order.order_id, order.status ? order.status.toString() : 'unknown', status, connection);
        if (!conn) {
            await commit(connection);
        }
    } catch (err) {
        error(err);
        if (!conn) {
            await rollback(connection);
        }
        throw err;
    }
}
export function hookBeforeUpdateOrderStatus(callback, priority = 10) {
    hookBefore('updateOrderStatus', callback, priority);
}
export function hookAfterUpdateOrderStatus(callback, priority = 10) {
    hookAfter('updateOrderStatus', callback, priority);
}
export function hookBeforeAddOrderStatusChangeEvents(callback, priority = 10) {
    hookBefore('addOrderStatusChangeEvents', callback, priority);
}
export function hookAfterAddOrderStatusChangeEvents(callback, priority = 10) {
    hookAfter('addOrderStatusChangeEvents', callback, priority);
}
